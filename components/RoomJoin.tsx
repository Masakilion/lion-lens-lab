"use client";

import { useState, useEffect } from "react";

type Props = {
  onJoin: (roomCode: string) => void;
};

// ランダムな6文字のチームコードを生成する
function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function RoomJoin({ onJoin }: Props) {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<"select" | "join" | "create">("select");
  const generated = useState(() => generateCode())[0];

  // URLに ?room=XXXXXX がある場合は自動でそのコードで参加する
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room");
    if (roomParam) {
      window.history.replaceState({}, "", window.location.pathname);
      onJoin(roomParam.toUpperCase());
    }
  }, [onJoin]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">TODO</h1>
        <p className="text-sm text-slate-400 mb-8">チームでタスクを共有・管理する</p>

        {mode === "select" && (
          <div className="space-y-3">
            <button
              onClick={() => setMode("create")}
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
            >
              新しいチームを作る
            </button>
            <button
              onClick={() => setMode("join")}
              className="w-full py-4 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-colors"
            >
              チームコードで参加する
            </button>
          </div>
        )}

        {mode === "create" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">このコードをチームに共有してください</p>
            {/* 生成されたチームコードを大きく表示 */}
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-black tracking-widest text-blue-500">{generated}</p>
              <p className="text-xs text-slate-400 mt-1">チームコード</p>
            </div>
            <button
              onClick={() => onJoin(generated)}
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
            >
              このコードで始める
            </button>
            <button
              onClick={() => setMode("select")}
              className="w-full py-2 text-slate-400 text-sm"
            >
              戻る
            </button>
          </div>
        )}

        {mode === "join" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">チームコードを入力</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="例：ABC123"
                maxLength={6}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-center text-2xl font-black tracking-widest text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase"
                autoFocus
              />
            </div>
            <button
              onClick={() => onJoin(code)}
              disabled={code.length < 4}
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors disabled:opacity-40"
            >
              参加する
            </button>
            <button
              onClick={() => setMode("select")}
              className="w-full py-2 text-slate-400 text-sm"
            >
              戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
