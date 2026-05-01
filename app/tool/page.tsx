"use client";

import { useState, useEffect } from "react";
import { ref, onValue, set, remove, update } from "firebase/database";
import { db } from "@/lib/firebase";
import { Project, Task } from "@/lib/types";
import ProjectSection from "@/components/ProjectSection";
import AddTaskModal from "@/components/AddTaskModal";
import AddProjectModal from "@/components/AddProjectModal";
import RoomJoin from "@/components/RoomJoin";

const ROOM_KEY = "todo-room-code";

export default function Home() {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTaskProjectId, setAddTaskProjectId] = useState<string | null>(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [synced, setSynced] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 前回使ったチームコードがあれば自動でログイン
  useEffect(() => {
    const saved = localStorage.getItem(ROOM_KEY);
    if (saved) setRoomCode(saved);
  }, []);

  // スクロール量を監視してトップ戻るボタンの表示を切り替える
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // チームコードが決まったらFirebaseをリアルタイムで購読する
  useEffect(() => {
    if (!roomCode) return;
    localStorage.setItem(ROOM_KEY, roomCode);

    const unsubProjects = onValue(ref(db, `rooms/${roomCode}/projects`), (snap) => {
      const data = snap.val();
      setProjects(data ? Object.values(data) : []);
      setSynced(true);
    });

    const unsubTasks = onValue(ref(db, `rooms/${roomCode}/tasks`), (snap) => {
      const data = snap.val();
      setTasks(data ? Object.values(data) : []);
    });

    return () => { unsubProjects(); unsubTasks(); };
  }, [roomCode]);

  const addProject = async (name: string, color: string) => {
    const id = crypto.randomUUID();
    await set(ref(db, `rooms/${roomCode}/projects/${id}`), { id, name, color, createdAt: new Date().toISOString() });
  };

  const editProject = async (id: string, name: string, color: string) => {
    await update(ref(db, `rooms/${roomCode}/projects/${id}`), { name, color });
  };

  const deleteProject = async (id: string) => {
    // プロジェクトを削除し、紐づくタスクも全て削除する
    await remove(ref(db, `rooms/${roomCode}/projects/${id}`));
    const relatedTasks = tasks.filter((t) => t.projectId === id);
    await Promise.all(relatedTasks.map((t) => remove(ref(db, `rooms/${roomCode}/tasks/${t.id}`))));
  };

  const addTask = async (title: string, dueDate: string, projectId: string) => {
    const id = crypto.randomUUID();
    await set(ref(db, `rooms/${roomCode}/tasks/${id}`), { id, projectId, title, progress: 0, dueDate, createdAt: new Date().toISOString() });
  };

  const updateProgress = async (id: string, progress: number) => {
    await set(ref(db, `rooms/${roomCode}/tasks/${id}/progress`), progress);
  };

  const deleteTask = async (id: string) => {
    await remove(ref(db, `rooms/${roomCode}/tasks/${id}`));
  };

  const leaveRoom = () => {
    localStorage.removeItem(ROOM_KEY);
    setRoomCode(null);
    setProjects([]);
    setTasks([]);
    setSynced(false);
  };

  if (!roomCode) {
    return <RoomJoin onJoin={(code) => setRoomCode(code)} />;
  }

  const totalTasks     = tasks.length;
  const completedCount = tasks.filter((t) => t.progress === 100).length;
  const overdueCount   = tasks.filter((t) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const due   = new Date(t.dueDate); due.setHours(0, 0, 0, 0);
    return t.progress < 100 && due < today;
  }).length;

  // チームコード共有用のURLを生成する
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}?room=${roomCode}`;

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-800">TODO</h1>
              <p className="text-xs text-slate-400">
                {completedCount}/{totalTasks}件完了
                {overdueCount > 0 && (
                  <span className="ml-2 text-red-500 font-medium">⚠️ {overdueCount}件期限切れ</span>
                )}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setShowAddProject(true)}
                className="border border-slate-200 text-slate-600 font-medium px-3 py-2 rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                ＋ PJ
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

          {/* チームコードバー */}
          <div className="flex items-center gap-2 mt-2 bg-slate-50 rounded-xl px-3 py-2">
            <span className="text-xs text-slate-400">チームコード</span>
            <span className="font-black text-blue-500 tracking-widest text-sm">{roomCode}</span>
            {synced
              ? <span className="text-xs text-green-500 ml-1">● 同期中</span>
              : <span className="text-xs text-slate-400 ml-1">○ 接続中…</span>
            }
            {/* URLを共有するボタン */}
            <button
              onClick={() => setShowShareModal(true)}
              className="ml-auto text-xs bg-blue-500 text-white px-2.5 py-1 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              🔗 共有
            </button>
            <button onClick={leaveRoom} className="text-xs text-slate-400 hover:text-slate-600">
              変更
            </button>
          </div>
        </div>
      </header>

      {/* プロジェクト一覧 */}
      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {projects.length === 0 && synced && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-5xl mb-4">📋</p>
            <p className="font-medium">プロジェクトがありません</p>
            <p className="text-sm mt-1">「＋ PJ」から始めましょう</p>
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
            onEditProject={editProject}
            onDeleteProject={deleteProject}
          />
        ))}
      </div>

      {/* トップに戻るボタン（スクロール時に表示） */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-white border border-slate-200 shadow-lg text-slate-600 w-11 h-11 rounded-full flex items-center justify-center text-lg hover:bg-slate-50 transition-all z-20"
          aria-label="トップに戻る"
        >
          ↑
        </button>
      )}

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

      {/* URL共有モーダル */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-bold text-slate-800 mb-1">チームに共有する</h2>
            <p className="text-xs text-slate-400 mb-4">このURLを送るだけで、同じデータにアクセスできます</p>

            {/* チームコードを大きく表示 */}
            <div className="bg-blue-50 rounded-xl p-3 text-center mb-3">
              <p className="text-xs text-blue-400 mb-1">チームコード</p>
              <p className="text-3xl font-black tracking-widest text-blue-500">{roomCode}</p>
            </div>

            {/* 共有URL */}
            <textarea
              readOnly
              value={shareUrl}
              rows={2}
              className="w-full text-xs border border-slate-200 rounded-xl p-3 text-slate-700 bg-slate-50 resize-none mb-3"
              onFocus={(e) => e.target.select()}
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium"
              >
                閉じる
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl).catch(() => {})}
                className="flex-1 py-3 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600"
              >
                URLをコピー
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
