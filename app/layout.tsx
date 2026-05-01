import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODO管理ツール",
  description: "タスクの進捗を管理するツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
