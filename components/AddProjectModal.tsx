"use client";

import { useState } from "react";
import { PROJECT_COLORS, colorClasses } from "@/lib/types";

type Props = {
  onAdd: (name: string, color: string) => void;
  onClose: () => void;
};

export default function AddProjectModal({ onAdd, onClose }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(PROJECT_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), color);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-slate-800 mb-4">プロジェクトを追加</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* プロジェクト名 */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">プロジェクト名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：マーケティング"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoFocus
            />
          </div>

          {/* カラー選択 */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">カラー</label>
            <div className="flex gap-2">
              {PROJECT_COLORS.map((c) => {
                const cls = colorClasses[c];
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full ${cls.bg} transition-transform ${
                      color === c ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    aria-label={c}
                  />
                );
              })}
            </div>
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
              disabled={!name.trim()}
              className={`flex-1 py-3 rounded-xl text-white font-medium transition-colors disabled:opacity-40 ${colorClasses[color].bg}`}
            >
              作成する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
