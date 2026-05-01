"use client";

import { useState, useEffect } from "react";
import { Project, Task, PROJECT_COLORS } from "@/lib/types";
import ProjectSection from "@/components/ProjectSection";
import AddTaskModal from "@/components/AddTaskModal";
import AddProjectModal from "@/components/AddProjectModal";

const TASKS_KEY = "todo-tasks";
const PROJECTS_KEY = "todo-projects";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTaskProjectId, setAddTaskProjectId] = useState<string | null>(null);
  const [showAddProject, setShowAddProject] = useState(false);

  // 保存済みデータを読み込む
  useEffect(() => {
    const savedProjects = localStorage.getItem(PROJECTS_KEY);
    const savedTasks = localStorage.getItem(TASKS_KEY);
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // プロジェクトが変わったら保存する
  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  // タスクが変わったら保存する
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // 新しいプロジェクトを追加する
  const addProject = (name: string, color: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      color,
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
  };

  // 新しいタスクを追加する
  const addTask = (title: string, dueDate: string, projectId: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      projectId,
      title,
      progress: 0,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // タスクの進捗を更新する
  const updateProgress = (id: string, progress: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, progress } : t)));
  };

  // タスクを削除する
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // 全体の統計
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.progress === 100).length;
  const overdueTasks = tasks.filter((t) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const due = new Date(t.dueDate); due.setHours(0, 0, 0, 0);
    return t.progress < 100 && due < today;
  }).length;

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">TODO</h1>
            <p className="text-xs text-slate-400">
              {completedTasks}/{totalTasks}件完了
              {overdueTasks > 0 && (
                <span className="ml-2 text-red-500 font-medium">⚠️ {overdueTasks}件期限切れ</span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddProject(true)}
              className="border border-slate-200 text-slate-600 font-medium px-3 py-2 rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              ＋ プロジェクト
            </button>
            <button
              onClick={() => setAddTaskProjectId(projects[0]?.id ?? null)}
              disabled={projects.length === 0}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-2 rounded-xl text-sm transition-colors shadow-sm disabled:opacity-40"
            >
              ＋ タスク
            </button>
          </div>
        </div>
      </header>

      {/* プロジェクト一覧 */}
      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {/* プロジェクトが0件のときの案内 */}
        {projects.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-5xl mb-4">📋</p>
            <p className="font-medium">プロジェクトがありません</p>
            <p className="text-sm mt-1">「＋ プロジェクト」から始めましょう</p>
          </div>
        )}

        {projects.map((project) => (
          <ProjectSection
            key={project.id}
            project={project}
            tasks={tasks.filter((t) => t.projectId === project.id)}
            onProgressChange={updateProgress}
            onDeleteTask={deleteTask}
            onAddTask={(projectId) => setAddTaskProjectId(projectId)}
          />
        ))}
      </div>

      {/* タスク追加モーダル */}
      {addTaskProjectId !== null && projects.length > 0 && (
        <AddTaskModal
          projects={projects}
          defaultProjectId={addTaskProjectId}
          onAdd={addTask}
          onClose={() => setAddTaskProjectId(null)}
        />
      )}

      {/* プロジェクト追加モーダル */}
      {showAddProject && (
        <AddProjectModal
          onAdd={addProject}
          onClose={() => setShowAddProject(false)}
        />
      )}
    </main>
  );
}
