"use client";

import { useState } from "react";
import { Project, colorClasses } from "@/lib/types";

type Props = {
  projects: Project[];
  defaultProjectId?: string;
  onAdd: (title: string, dueDate: string, projectId: string) => void;
  onClose: () => void;
};

export default function AddTaskModal({ projects, defaultProjectId, onAdd, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState(defaultProjectId ?? projects[0]?.id ?? "");

  // デフォルトの期限を今日から7日後に設定
  const defaultDue = new Date();
  defaultDue.setDate(defaultDue.getDate() + 7);
  const [dueDate, setDueDate] = useState(defaultDue.toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;
    onAdd(title.trim(), dueDate, projectId);
    onClose();
  };

  const selectedProject = projects.find((p) => p.id === projectId);
  const color = selectedProject ? (colorClasses[selectedProject.color] ?? colorClasses.blue) : colorClasses.blue;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-slate-800 mb-4">タスクを追加</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* プロジェクト選択 */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">プロジェクト</label>
            <div className="flex flex-wrap gap-2">
              {projects.map((p) => {
                const c = colorClasses[p.color] ?? colorClasses.blue;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProjectId(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${
                      projectId === p.id
                        ? `${c.bg} text-white border-transparent`
                        : `border-slate-200 text-slate-600 hover:border-slate-300`
                    }`}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* タスク名の入力 */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">タスク名</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：レポートを書く"
              className={`w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 transition-all`}
              style={{ "--tw-ring-color": "currentColor" } as React.CSSProperties}
              autoFocus
            />
          </div>

          {/* 期限の入力 */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">期限</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* ボタン */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 font-medium hover:bg-slate-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !projectId}
              className={`flex-1 py-3 rounded-xl text-white font-medium transition-colors disabled:opacity-40 ${color.bg} hover:opacity-90`}
            >
              追加する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
