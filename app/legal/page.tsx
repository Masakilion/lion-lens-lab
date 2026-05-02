import Link from "next/link";

export const metadata = {
  title: "特定商取引法に基づく表記 | Lion Lens Lab（3L）",
  description: "Lion Lens Lab（3L）の特定商取引法に基づく表記です。",
};

// テーブル行コンポーネント（可読性のため分離）
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <th className="w-2/5 md:w-1/3 text-left text-xs font-bold text-slate-500 bg-slate-50 px-5 py-4 align-top whitespace-nowrap">
        {label}
      </th>
      <td className="text-sm text-slate-700 px-5 py-4 leading-relaxed">{value}</td>
    </tr>
  );
}

export default function LegalPage() {
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
          <p className="text-amber-400 font-bold text-xs tracking-widest mb-2">LEGAL</p>
          <h1 className="text-3xl md:text-4xl font-black text-white">特定商取引法に基づく表記</h1>
        </div>
      </div>

      {/* 本文 */}
      <main className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          特定商取引法（特商法）第11条の規定に基づき、以下の事項を表示します。
        </p>

        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm mb-12">
          <table className="w-full border-collapse">
            <tbody>
              <Row label="販売業者" value="Lion Lens Lab（3L）" />
              <Row
                label="運営責任者"
                value={<span>※ お問い合わせにてご案内します</span>}
              />
              <Row
                label="所在地"
                value={<span>※ お問い合わせにてご案内します</span>}
              />
              <Row
                label="連絡先"
                value={
                  <a href="mailto:info@lion-cons.com" className="text-amber-600 hover:underline">
                    info@lion-cons.com
                  </a>
                }
              />
              <Row
                label="サービス内容"
                value={
                  <ul className="space-y-1">
                    <li>SNSリサーチ・現状分析</li>
                    <li>SNS戦略設計・コンサルティング</li>
                    <li>SNS運用支援・伴走サポート</li>
                  </ul>
                }
              />
              <Row
                label="販売価格"
                value="サービス内容・範囲によって異なります。無料相談後、お見積もりを提示します。"
              />
              <Row
                label="支払方法"
                value="銀行振込（請求書払い）。詳細は契約時にご案内します。"
              />
              <Row
                label="支払時期"
                value="契約締結後、請求書発行日より14日以内。詳細は契約時にご案内します。"
              />
              <Row
                label="サービス提供時期"
                value="契約締結・入金確認後、別途合意した日程よりサービスを開始します。"
              />
              <Row
                label="返品・キャンセルについて"
                value={
                  <div className="space-y-2">
                    <p>
                      サービスの性質上、提供済みの役務（リサーチレポート・戦略書等の納品物）に対する返金には応じかねます。
                    </p>
                    <p>
                      サービス開始前のキャンセルについては、個別にご相談ください。
                    </p>
                  </div>
                }
              />
              <Row
                label="動作環境"
                value="本ウェブサイトは最新版の主要ブラウザ（Chrome・Firefox・Safari・Edge）での閲覧を推奨します。"
              />
              <Row
                label="その他特記事項"
                value={
                  <div className="space-y-2">
                    <p>
                      初回の無料相談は費用・義務なしでお受けしています。相談後に無理な勧誘は行いません。
                    </p>
                    <p>
                      業務委託契約については、別途書面にて詳細を取り決めます。
                    </p>
                  </div>
                }
              />
            </tbody>
          </table>
        </div>

        {/* 注記 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
          <p className="font-bold mb-1">📌 所在地・運営責任者について</p>
          <p className="leading-relaxed">
            個人事業主のため、プライバシー保護の観点から住所・氏名の掲載を省略しています。
            ご請求の場合は <a href="mailto:info@lion-cons.com" className="underline font-medium">info@lion-cons.com</a> までご連絡ください。遅滞なく開示します（特商法第11条ただし書きに基づく対応）。
          </p>
        </div>

        <p className="text-slate-400 text-xs text-right pt-8">
          制定日：2025年1月　最終更新：2025年1月
        </p>
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
