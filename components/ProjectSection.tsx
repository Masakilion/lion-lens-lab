"use client";

import { useState } from "react";
import { Project, Task, getUrgencyLevel, colorClasses, PROJECT_COLORS } from "@/lib/types";
import TaskCard from "./TaskCard";

type Props = {
  project: Project;
  tasks: Task[];
  onProgressChange: (id: string, progress: number) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (projectId: string) => void;
  onEditProject: (id: string, name: string, color: string) => void;
  onDeleteProject: (id: string) => void;
};

export default function ProjectSection({
  project, tasks, onProgressChange, onDeleteTask, onAddTask, onEditProject, onDeleteProject,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const [editColor, setEditColor] = useState(project.color);

  const color = colorClasses[project.color] ?? colorClasses.blue;
  const activeTasks = tasks.filter((t) => t.progress < 100);
  const completedTasks = tasks.filter((t) => t.progress === 100);
  const avgProgress = tasks.length === 0 ? 0 : Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length);
  const overdueCount = activeTasks.filter((t) => getUrgencyLevel(t.dueDate, t.progress) === "overdue").length;

  const saveEdit = () => {
    if (editName.trim()) {
      onEditProject(project.id, editName.trim(), editColor);
    }
    setEditing(false);
  };

  return (
    <div className={`rounded-2xl border-2 ${color.border} overflow-hidden`}>
      {/* プロジェクトヘッダー */}
      <div className={`${color.light} px-4 py-3 flex items-center gap-2`}>
        {/* 折りたたみアイコン */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className={`text-slate-400 text-sm transition-transform duration-200 ${isOpen ? "rotate-90" : ""} flex-shrink-0`}
        >
          ▶
        </button>

        {/* プロジェクト名（クリックで開閉） */}
        <h2
          className={`font-bold text-base ${color.text} flex-1 cursor-pointer`}
          onClick={() => setIsOpen((v) => !v)}
        >
          {project.name}
        </h2>

        {/* 期限切れ警告 */}
        {overdueCount > 0 && (
          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-medium flex-shrink-0">
            ⚠️ {overdueCount}
          </span>
        )}

        {/* 進捗とタスク数 */}
        <div className="text-right flex-shrink-0">
          <span className={`text-xs font-bold ${color.text}`}>{avgProgress}%</span>
          <span className="text-xs text-slate-400 ml-1">({tasks.length})</span>
        </div>

        {/* 編集メニューボタン */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="text-slate-400 hover:text-slate-600 text-lg leading-none px-1"
          >
            ⋯
          </button>
          {showMenu && (
            <>
              {/* メニュー外クリックで閉じる透明レイヤー */}
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-6 bg-white rounded-xl shadow-lg border border-slate-100 z-20 w-36 overflow-hidden">
                <button
                  onClick={() => { setEditing(true); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  ✏️ 編集
                </button>
                <button
                  onClick={() => {
                    if (confirm(`「${project.name}」を削除しますか？\nタスクも全て削除されます。`)) {
                      onDeleteProject(project.id);
                    }
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                >
                  🗑️ 削除
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* プロジェクト編集フォーム */}
      {editing && (
        <div className="bg-white px-4 py-3 border-b border-slate-100 space-y-3">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
          />
          <div className="flex gap-2">
            {PROJECT_COLORS.map((c) => {
              const cls = colorClasses[c];
              return (
                <button
                  key={c}
                  onClick={() => setEditColor(c)}
                  className={`w-7 h-7 rounded-full ${cls.bg} transition-transform ${
                    editColor === c ? "ring-2 ring-offset-1 ring-slate-400 scale-110" : "opacity-50"
                  }`}
                />
              );
            })}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="flex-1 py-2 text-sm text-slate-500 border border-slate-200 rounded-xl">キャンセル</button>
            <button onClick={saveEdit} className="flex-1 py-2 text-sm text-white bg-blue-500 rounded-xl font-medium">保存</button>
          </div>
        </div>
      )}

      {/* プロジェクト全体の進捗バー */}
      <div className="h-1 bg-slate-100">
        <div
          className={`h-full transition-all duration-500 ${avgProgress === 100 ? "bg-green-500" : color.progress}`}
          style={{ width: `${avgProgress}%` }}
        />
      </div>

      {/* タスクリスト */}
      {isOpen && (
        <div className="p-3 space-y-2 bg-white">
          {activeTasks.map((task) => (
            <TaskCard key={task.id} task={task} projectColor={project.color} onProgressChange={onProgressChange} onDelete={onDeleteTask} />
          ))}
          {completedTasks.length > 0 && (
            <div className="pt-1">
              <p className="text-xs text-slate-400 font-medium mb-1.5 px-1">完了済み ({completedTasks.length})</p>
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} projectColor={project.color} onProgressChange={onProgressChange} onDelete={onDeleteTask} />
              ))}
            </div>
          )}
          {tasks.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-4">タスクがありません</p>
          )}
          <button
            onClick={() => onAddTask(project.id)}
            className={`w-full py-2 rounded-xl border-2 border-dashed ${color.border} ${color.text} text-sm font-medium transition-colors`}
          >
            ＋ タスクを追加
          </button>
        </div>
      )}
    </div>
  );
}
