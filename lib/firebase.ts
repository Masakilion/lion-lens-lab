import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL:       process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ビルド時や環境変数未設定時にクラッシュしないよう try/catch で保護する
// GitHub PagesのようなサーバーレスビルドではFirebase設定が存在しないため
let db: ReturnType<typeof getDatabase>;
try {
  // すでに初期化済みの場合は再利用する（Next.jsのホットリロード対策）
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getDatabase(app);
} catch {
  // 環境変数がない場合（静的ビルド時）は null を入れておく
  // ブラウザ上での実際の動作時はここには来ない
  db = null as unknown as ReturnType<typeof getDatabase>;
}

export { db };
