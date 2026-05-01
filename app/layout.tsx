import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lion Lens Lab（3L）| SNSリサーチ＆コンサルティング",
  description: "見えていなかった自分が、見えてくる。SNSにレンズを当て、解像度を上げ、あなただけの戦略を描きます。",
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
