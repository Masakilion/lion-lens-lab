"use client";

import { useState, useEffect, useRef } from "react";
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
  const [copied, setCopied] = useState(false);
  // 初回ロード時のURLインポートが終わったかどうかのフラグ
  const initialized = useRef(false);

  // ページ起動時：URLにインポートデータがあれば優先して読み込む
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const importParam = params.get("import");

    if (importParam) {
      try {
        const decoded = JSON.parse(atob(importParam));
        if (decoded.projects && decoded.tasks) {
          localStorage.setItem(PROJECTS_KEY, JSON.stringify(decoded.projects));
          localStorage.setItem(TASKS_KEY, JSON.stringify(decoded.tasks));
          // URLのimportパラメータを消してきれいにする
          window.history.replaceState({}, "", window.location.pathname);
        }
      } catch {
        // デコード失敗は無視する
      }
    }

    const savedProjects = localStorage.getItem(PROJECTS_KEY);
    const savedTasks = localStorage.getItem(TASKS_KEY);
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    initialized.current = true;
  }, []);

  // プロジェクトが変わったら保存する（初期化前は保存しない）
  useEffect(() => {
    if (!initialized.current) return;
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  // タスクが変わったら保存する（初期化前は保存しない）
  useEffect(() => {
    if (!initialized.current) return;
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // データをURLに埋め込んでクリップボードにコピーする
  const exportAsUrl = () => {
    const data = { projects, tasks };
    const encoded = btoa(JSON.stringify(data));
    const url = `${window.location.origin}?import=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const addProject = (name: string, color: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      color,
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
  };

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

  const updateProgress = (id: string, progress: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, progress } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

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
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
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

          {/* 別デバイスへのデータ共有ボタン */}
          {projects.length > 0 && (
            <button
              onClick={exportAsUrl}
              className="w-full py-2 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs font-medium hover:bg-slate-50 transition-colors"
            >
              {copied ? "✅ リンクをコピーしました！スマホで開いてください" : "📲 このデータを別のデバイスで開く"}
            </button>
          )}
        </div>
      </header>

      {/* プロジェクト一覧 */}
      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
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

      {addTaskProjectId !== null && projects.length > 0 && (
        <AddTaskModal
          projects={projects}
          defaultProjectId={addTaskProjectId}
          onAdd={addTask}
          onClose={() => setAddTaskProjectId(null)}
        />
      )}

      {showAddProject && (
        <AddProjectModal
          onAdd={addProject}
          onClose={() => setShowAddProject(false)}
        />
      )}
    </main>
  );
}
