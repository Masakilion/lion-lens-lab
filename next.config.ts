import type { NextConfig } from "next";

// GitHub Pages用の静的エクスポート設定
// basePath: リポジトリ名に合わせたパス（例: /lion-lens-lab）
const nextConfig: NextConfig = {
  output: "export",           // 静的HTMLとして書き出す（GitHub Pagesはサーバー不要）
  basePath: "/lion-lens-lab", // GitHub PagesのURL: https://masakilion.github.io/lion-lens-lab
  images: {
    unoptimized: true,        // GitHub PagesはNext.jsの画像最適化サーバーがないため無効化
  },
};

export default nextConfig;
