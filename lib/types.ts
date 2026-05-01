// プロジェクトの型定義
export type Project = {
  id: string;
  name: string;
  color: string;   // Tailwindのカラークラス (例: "blue")
  createdAt: string;
};

// タスクの型定義
export type Task = {
  id: string;
  projectId: string;  // 所属プロジェクトのID
  title: string;
  progress: number;   // 0〜100の進捗率
  dueDate: string;    // ISO形式の日付文字列 (例: "2024-12-31")
  createdAt: string;
};

// 期限の状態（色分けに使う）
export type UrgencyLevel = "overdue" | "urgent" | "soon" | "normal";

// タスクの期限状態を計算する関数
export function getUrgencyLevel(dueDate: string, progress: number): UrgencyLevel {
  if (progress === 100) return "normal";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "urgent";
  if (diffDays <= 3) return "soon";
  return "normal";
}

// 期限状態に対応するスタイル
export const urgencyStyles: Record<UrgencyLevel, { border: string; badge: string; label: string }> = {
  overdue: {
    border: "border-red-500",
    badge: "bg-red-500 text-white",
    label: "期限切れ",
  },
  urgent: {
    border: "border-orange-400",
    badge: "bg-orange-400 text-white",
    label: "今日まで！",
  },
  soon: {
    border: "border-yellow-400",
    badge: "bg-yellow-400 text-gray-800",
    label: "もうすぐ期限",
  },
  normal: {
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-600",
    label: "",
  },
};

// プロジェクトのカラーパレット（追加時に順番に使う）
export const PROJECT_COLORS = ["blue", "violet", "emerald", "orange", "rose", "cyan", "amber"];

// プロジェクトカラーに対応するTailwindクラス
export const colorClasses: Record<string, { bg: string; text: string; border: string; light: string; progress: string }> = {
  blue:    { bg: "bg-blue-500",    text: "text-blue-600",    border: "border-blue-500",    light: "bg-blue-50",    progress: "bg-blue-500" },
  violet:  { bg: "bg-violet-500",  text: "text-violet-600",  border: "border-violet-500",  light: "bg-violet-50",  progress: "bg-violet-500" },
  emerald: { bg: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-500", light: "bg-emerald-50", progress: "bg-emerald-500" },
  orange:  { bg: "bg-orange-500",  text: "text-orange-600",  border: "border-orange-500",  light: "bg-orange-50",  progress: "bg-orange-500" },
  rose:    { bg: "bg-rose-500",    text: "text-rose-600",    border: "border-rose-500",    light: "bg-rose-50",    progress: "bg-rose-500" },
  cyan:    { bg: "bg-cyan-500",    text: "text-cyan-600",    border: "border-cyan-500",    light: "bg-cyan-50",    progress: "bg-cyan-500" },
  amber:   { bg: "bg-amber-500",   text: "text-amber-600",   border: "border-amber-500",   light: "bg-amber-50",   progress: "bg-amber-500" },
};
