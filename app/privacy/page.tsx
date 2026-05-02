import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー | Lion Lens Lab（3L）",
  description: "Lion Lens Lab（3L）のプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ヘッダー */}
      <header className="bg-slate-900 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-white hover:text-amber-400 transition-colors">
            <span className="text-xl font-black tracking-tight">
              <span className="text-amber-400">Lion</span> Lens Lab
            </span>
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
            ← トップに戻る
          </Link>
        </div>
      </header>

      {/* ヒーロー */}
      <div className="bg-slate-900 pb-12 pt-8 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-400 font-bold text-xs tracking-widest mb-2">PRIVACY POLICY</p>
          <h1 className="text-3xl md:text-4xl font-black text-white">プライバシーポリシー</h1>
        </div>
      </div>

      {/* 本文 */}
      <main className="max-w-4xl mx-auto px-6 py-14">
        <div className="prose prose-slate max-w-none space-y-10">

          <p className="text-slate-600 text-sm leading-relaxed">
            Lion Lens Lab（以下「当サービス」）は、ご利用者様の個人情報の保護を重要な責務と考え、以下のプライバシーポリシーを定めます。
          </p>

          {/* 1 */}
          <section>
            <h2 className="text-lg font-black text-slate-900 border-l-4 border-amber-400 pl-4 mb-4">
              1. 取得する個人情報
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              当サービスでは、以下の情報をお問い合わせフォーム等を通じて取得することがあります。
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-2">
              <li>氏名</li>
              <li>メールアドレス</li>
              <li>ご相談内容・メッセージ</li>
              <li>その他、ご自身が任意にご提供いただいた情報</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-black text-slate-900 border-l-4 border-amber-400 pl-4 mb-4">
              2. 個人情報の利用目的
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              取得した個人情報は、以下の目的のみに使用します。
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-2">
              <li>お問い合わせ・無料相談のご返答</li>
              <li>サービスのご提案・見積もり送付</li>
              <li>契約・業務の遂行</li>
              <li>サービス改善のための統計的分析（個人を特定しない形での利用）</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-black text-slate-900 border-l-4 border-amber-400 pl-4 mb-4">
              3. 第三者への提供
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              当サービスは、以下の場合を除き、取得した個人情報を第三者に提供・開示しません。
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-2 mt-3">
              <li>ご本人の同意がある場合</li>
              <li>法令に基づき開示が求められる場合</li>
              <li>人の生命・財産の保護のために緊急の必要がある場合</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-black text-slate-900 border-l-4 border-amber-400 pl-4 mb-4">
              4. 個人情報の管理
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              個人情報への不正アクセス・漏洩・滅失・毀損を防止するため、適切な安全管理措置を講じます。お問い合わせフォームの送受信には、SSL暗号化通信（Formspree）を使用しています。
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-black text-slate-900 border-l-4 border-amber-400 pl-4 mb-4">
              5. Cookieおよびアクセス解析
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              当サービスのウェブサイトでは、アクセス状況の把握を目的として、Cookieや類似の技術を使用する場合があります。これらは個人を特定するものではなく、ブラウザの設定により無効化することも可能です。
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-black text-slate-900 border-l-4 border-amber-400 pl-4 mb-4">
              6. 個人情報の開示・訂正・削除
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              ご自身の個人情報について、開示・訂正・削除をご希望の場合は、下記お問い合わせ先までご連絡ください。ご本人確認のうえ、合理的な範囲で対応いたします。
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-black text-slate-900 border-l-4 border-amber-400 pl-4 mb-4">
              7. プライバシーポリシーの変更
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              本ポリシーは、法令改正やサービス変更に応じて予告なく改定することがあります。改定後は、本ページへの掲載をもってお知らせします。
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-black text-slate-900 border-l-4 border-amber-400 pl-4 mb-4">
              8. お問い合わせ先
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm text-slate-600 space-y-1">
              <p><span className="font-bold text-slate-800">屋号：</span>Lion Lens Lab（3L）</p>
              <p><span className="font-bold text-slate-800">メール：</span>
                <a href="mailto:info@lion-cons.com" className="text-amber-600 hover:underline">info@lion-cons.com</a>
              </p>
            </div>
          </section>

          <p className="text-slate-400 text-xs text-right pt-6 border-t border-slate-100">
            制定日：2025年1月　最終更新：2025年1月
          </p>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-slate-950 text-slate-500 text-sm py-8 px-6 text-center">
        <p className="font-black text-white mb-2">
          <span className="text-amber-400">Lion</span> Lens Lab
        </p>
        <div className="flex justify-center gap-6 mb-3">
          <Link href="/privacy" className="hover:text-amber-400 transition-colors">プライバシーポリシー</Link>
          <Link href="/legal" className="hover:text-amber-400 transition-colors">特定商取引法に基づく表記</Link>
        </div>
        <p>© 2025 Lion Lens Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
