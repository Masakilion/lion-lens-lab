"use client";

import { useState } from "react";
import { Project, Task, getUrgencyLevel, colorClasses } from "@/lib/types";
import TaskCard from "./TaskCard";

type Props = {
  project: Project;
  tasks: Task[];
  onProgressChange: (id: string, progress: number) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (projectId: string) => void;
};

export default function ProjectSection({ project, tasks, onProgressChange, onDeleteTask, onAddTask }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const color = colorClasses[project.color] ?? colorClasses.blue;

  const activeTasks = tasks.filter((t) => t.progress < 100);
  const completedTasks = tasks.filter((t) => t.progress === 100);

  // プロジェクト全体の平均進捗を計算
  const avgProgress = tasks.length === 0 ? 0 : Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length);

  // 期限切れタスクの件数
  const overdueCount = activeTasks.filter((t) => getUrgencyLevel(t.dueDate, t.progress) === "overdue").length;

  return (
    <div className={`rounded-2xl border-2 ${color.border} overflow-hidden`}>
      {/* プロジェクトヘッダー */}
      <div
        className={`${color.light} px-4 py-3 flex items-center gap-3 cursor-pointer`}
        onClick={() => setIsOpen((v) => !v)}
      >
        {/* 折りたたみアイコン */}
        <span className={`text-slate-400 text-sm transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>
          ▶
        </span>

        {/* プロジェクト名 */}
        <h2 className={`font-bold text-base ${color.text} flex-1`}>{project.name}</h2>

        {/* 期限切れ警告 */}
        {overdueCount > 0 && (
          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">
            ⚠️ {overdueCount}件期限切れ
          </span>
        )}

        {/* タスク数と全体進捗 */}
        <div className="text-right">
          <span className={`text-xs font-bold ${color.text}`}>{avgProgress}%</span>
          <span className="text-xs text-slate-400 ml-1">({tasks.length}件)</span>
        </div>
      </div>

      {/* プロジェクト全体の進捗バー */}
      <div className="h-1 bg-slate-100">
        <div
          className={`h-full transition-all duration-500 ${avgProgress === 100 ? "bg-green-500" : color.progress}`}
          style={{ width: `${avgProgress}%` }}
        />
      </div>

      {/* タスクリスト（折りたたみ対応） */}
      {isOpen && (
        <div className="p-3 space-y-2 bg-white">
          {/* 進行中タスク */}
          {activeTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              projectColor={project.color}
              onProgressChange={onProgressChange}
              onDelete={onDeleteTask}
            />
          ))}

          {/* 完了済みタスク */}
          {completedTasks.length > 0 && (
            <div className="pt-1">
              <p className="text-xs text-slate-400 font-medium mb-1.5 px-1">完了済み ({completedTasks.length})</p>
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  projectColor={project.color}
                  onProgressChange={onProgressChange}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}

          {/* タスクが0件のとき */}
          {tasks.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-4">タスクがありません</p>
          )}

          {/* タスク追加ボタン */}
          <button
            onClick={() => onAddTask(project.id)}
            className={`w-full py-2 rounded-xl border-2 border-dashed ${color.border} ${color.text} text-sm font-medium hover:${color.light} transition-colors`}
          >
            ＋ タスクを追加
          </button>
        </div>
      )}
    </div>
  );
}
