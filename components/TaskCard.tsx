"use client";

import { Task, getUrgencyLevel, urgencyStyles, colorClasses } from "@/lib/types";

type Props = {
  task: Task;
  projectColor: string;
  onProgressChange: (id: string, progress: number) => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({ task, projectColor, onProgressChange, onDelete }: Props) {
  const urgency = getUrgencyLevel(task.dueDate, task.progress);
  const styles = urgencyStyles[urgency];
  const color = colorClasses[projectColor] ?? colorClasses.blue;

  // 期限までの残り日数を計算
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const dueDateLabel =
    diffDays < 0 ? `${Math.abs(diffDays)}日オーバー` : diffDays === 0 ? "今日まで" : `あと${diffDays}日`;

  // 進捗バーの色（緊急度が高い場合は警告色、通常はプロジェクトカラー）
  const progressColor =
    task.progress === 100 ? "bg-green-500"
    : urgency === "overdue" ? "bg-red-500"
    : urgency === "urgent" ? "bg-orange-400"
    : urgency === "soon" ? "bg-yellow-400"
    : color.progress;

  return (
    <div
      className={`bg-white rounded-xl border ${styles.border} p-3 transition-all duration-300 ${
        task.progress === 100 ? "opacity-50" : ""
      }`}
    >
      {/* タスクタイトルと削除ボタン */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3
          className={`text-sm font-medium leading-snug ${
            task.progress === 100 ? "line-through text-slate-400" : "text-slate-800"
          }`}
        >
          {task.title}
        </h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-300 hover:text-red-400 transition-colors text-lg leading-none flex-shrink-0"
          aria-label="タスクを削除"
        >
          ×
        </button>
      </div>

      {/* 期限バッジ */}
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles.badge}`}>
          {styles.label || dueDateLabel}
        </span>
        {styles.label && <span className="text-xs text-slate-400">{dueDateLabel}</span>}
        <span className="text-xs text-slate-400 ml-auto">
          {new Date(task.dueDate).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })}
        </span>
      </div>

      {/* 進捗スライダー */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">進捗</span>
          <span className="text-xs font-bold text-slate-600">{task.progress}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${progressColor}`}
            style={{ width: `${task.progress}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={task.progress}
          onChange={(e) => onProgressChange(task.id, Number(e.target.value))}
          className="w-full cursor-pointer"
          style={{ accentColor: "currentColor" }}
          aria-label="進捗を調整"
        />
      </div>

      {task.progress === 100 && (
        <p className="text-center text-green-500 text-xs font-medium mt-1">完了！お疲れさまでした</p>
      )}
    </div>
  );
}
