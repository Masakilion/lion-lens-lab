"use client";

import { useState } from "react";

const IMG = {
  heroBg:      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
  aboutLens:   "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=80",
  aboutPerson: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
  svcResearch: null, // SNSロゴをSVGで直接描画するため画像不要
  svcStrategy: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80",
  svcOps:      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80",
  resultsBg:   "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80",
  ctaBg:       "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
  voice1:      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  voice2:      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  voice3:      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
};

// Formspree フォームID（formspree.ioで取得後ここを更新）
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqbwppo";

// スタイリッシュなジオメトリックライオン＋レンズロゴ
function LionLensLogo() {
  // たてがみ：シャープな三角スパイク8枚（明暗交互で立体感）
  const spikes = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* レンズ枠（二重リング） */}
      <circle cx="20" cy="20" r="19.3" stroke="#78350F" strokeWidth="0.7"/>
      <circle cx="20" cy="20" r="17.8" stroke="#F59E0B" strokeWidth="1.5"/>

      {/* たてがみ：先の尖った三角スパイクを放射状に配置 */}
      {spikes.map((angle, i) => (
        <path key={angle}
          d="M20 2.5 L22.4 12.2 L17.6 12.2 Z"
          fill={i % 2 === 0 ? "#92400E" : "#D97706"}
          transform={`rotate(${angle} 20 20)`}
        />
      ))}

      {/* 顔ベース */}
      <circle cx="20" cy="21" r="10.8" fill="#FDE68A"/>
      {/* マズル */}
      <ellipse cx="20" cy="25.8" rx="5.5" ry="4" fill="#FCD34D"/>

      {/* 眉毛：内下がりの太いラインで強さ・威厳を表現 */}
      <line x1="13"   y1="16.2" x2="18"   y2="17.9" stroke="#5C3009" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="22"   y1="17.9" x2="27"   y2="16.2" stroke="#5C3009" strokeWidth="1.8" strokeLinecap="round"/>

      {/* 左目（鋭いアーモンド形） */}
      <path d="M13.5 19.8 Q15.8 17.3 18.3 19.8 Q15.8 22 13.5 19.8Z" fill="#5C3009"/>
      <circle cx="15.9"  cy="19.8" r="1.4"  fill="#0C0400"/>
      <circle cx="16.45" cy="19.1" r="0.52" fill="white"/>

      {/* 右目（鋭いアーモンド形） */}
      <path d="M21.7 19.8 Q24.2 17.3 26.5 19.8 Q24.2 22 21.7 19.8Z" fill="#5C3009"/>
      <circle cx="24.1"  cy="19.8" r="1.4"  fill="#0C0400"/>
      <circle cx="24.65" cy="19.1" r="0.52" fill="white"/>

      {/* 鼻（逆台形・ボールド） */}
      <path d="M18.5 23 L20 21.2 L21.5 23 Q20 24.4 18.5 23Z" fill="#C2410C"/>
      {/* 人中 */}
      <line x1="20" y1="23" x2="20" y2="25.2" stroke="#9A1C1C" strokeWidth="0.8" strokeLinecap="round"/>
      {/* 口 */}
      <path d="M17 25.5 Q20 28.5 23 25.5" stroke="#9A1C1C" strokeWidth="1" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

const NAV_LINKS = [
  { label: "サービス",     href: "#service"  },
  { label: "実績",         href: "#results"  },
  { label: "特徴",         href: "#features" },
  { label: "よくある質問", href: "#faq"      },
  { label: "お問い合わせ", href: "#contact"  },
];

const STEPS = [
  {
    number: "01",
    title:  "SNSリサーチ",
    desc:   "あなたの名前・ブランド・商品が、今どう検索されSNS上でどう語られているかを徹底調査。現状を数値とデータで可視化します。",
    img:    IMG.svcResearch, // null → SVGロゴ背景
  },
  {
    number: "02",
    title:  "戦略設計",
    desc:   "丁寧なヒアリングで将来像を深く理解し、あなただけのSNS戦略を設計。目指すゴールから逆算した現実的なロードマップを提示します。",
    img:    IMG.svcStrategy,
  },
  {
    number: "03",
    title:  "運用支援",
    desc:   "戦略に沿ったSNS運用を継続的にサポート。投稿企画・制作から効果測定まで、伴走しながらブランドを育てます。",
    img:    IMG.svcOps,
  },
];

const STATS = [
  { num: "30+",   label: "累計支援数"           },
  { num: "92%",   label: "継続率"               },
  { num: "3.1x",  label: "平均フォロワー増加率"  },
  { num: "4.8/5", label: "顧客満足度"           },
];

const RESULTS = [
  { category: "飲食店オーナー",         detail: "X＋Instagram運用支援",   metric: "フォロワー数 3.2倍",    period: "6ヶ月" },
  { category: "美容サロン経営者",       detail: "X＋Instagram",          metric: "予約経由SNS 月+40件",   period: "4ヶ月" },
  { category: "フリーランスデザイナー", detail: "個人ブランディング支援",  metric: "指名案件 2倍以上",      period: "5ヶ月" },
  { category: "コンサルタント",         detail: "X＋LinkedIn 戦略設計",   metric: "月の問い合わせ 5→18件", period: "3ヶ月" },
];

const VOICES = [
  {
    img:  IMG.voice1,
    text: "「自分がどう見られているか、全く考えていなかった。リサーチ結果を見て、ようやく課題が見えました」",
    attr: "飲食店経営者・40代",
  },
  {
    img:  IMG.voice2,
    text: "「ヒアリングがとにかく丁寧で、自分でも気づいていなかった強みを言語化してもらえた」",
    attr: "フリーランス・30代",
  },
  {
    img:  IMG.voice3,
    text: "「SNSは苦手意識があったが、戦略が明確になってから発信が楽になった」",
    attr: "サロン経営者・30代",
  },
];

// タレント・インフルエンサー実績（ご本人意向により匿名）
const TALENT_STATS = [
  { num: "最大 +27万",  label: "フォロワー増加数（単一アカウント）" },
  { num: "10名以上",    label: "タレント・芸能人の支援実績"        },
  { num: "平均 4.2x",  label: "エンゲージメント率の向上倍率"       },
  { num: "月 +dozen+", label: "支援後の案件・コラボオファー増加"    },
];

const TALENT_CASES = [
  {
    category: "インフルエンサー（美容・ライフスタイル）",
    platform: "Instagram / TikTok",
    metric:   "フォロワー 1.2万 → 28万",
    period:   "8ヶ月",
    note:     "投稿設計とハッシュタグ戦略を刷新。TikTokとの連動でバズを複数回創出。",
  },
  {
    category: "タレント（芸能活動中）",
    platform: "X / Instagram",
    metric:   "フォロワー 3.8万 → 22万",
    period:   "6ヶ月",
    note:     "パーソナルブランドの再設計から着手。ファンとの距離感を戦略的にコントロール。",
  },
  {
    category: "YouTuber（エンタメ・情報系）",
    platform: "YouTube / X",
    metric:   "登録者 9千 → 14.2万",
    period:   "10ヶ月",
    note:     "X での発信を起点に認知を拡大。YouTube への流入導線を設計し登録者が急増。",
  },
  {
    category: "経営者インフルエンサー",
    platform: "X（旧Twitter）",
    metric:   "フォロワー 4,100 → 7.3万・案件月0→9件",
    period:   "5ヶ月",
    note:     "専門性を可視化する投稿戦略でフォロワーが急増。案件依頼が継続的に入るように。",
  },
];

const FEATURES = [
  {
    icon:  "📊",
    title: "データドリブン",
    desc:  "感覚や経験則ではなく、リサーチデータをもとに現状を正確に把握。根拠のある戦略を立案します。",
  },
  {
    icon:  "🎯",
    title: "丁寧なヒアリング",
    desc:  "あなたのビジョンや価値観を深く理解してから動き出します。「なんとなくSNSをやる」ではなく、目的の明確な発信を。",
  },
  {
    icon:  "🤝",
    title: "伴走型サポート",
    desc:  "レポートを渡して終わり、ではありません。運用まで一緒に取り組み、成果が出るまでそばにいます。",
  },
];

const FAQS = [
  {
    q: "個人事業主や小規模な事業者でも依頼できますか？",
    a: "はい、むしろ個人事業主・フリーランス・小規模ビジネスを得意としています。あなたの規模と目標に合った現実的な戦略をご提案します。",
  },
  {
    q: "どんなSNSに対応していますか？",
    a: "X（旧Twitter）を中心に、Instagram、TikTok、YouTube、LinkedIn、Facebookなど主要SNSに対応しています。特にXのアルゴリズムや運用ノウハウは豊富です。",
  },
  {
    q: "料金はどのくらいかかりますか？",
    a: "サービスの範囲や目標によって異なります。まずは無料相談で現状をお聞きし、最適なプランと料金をご提示します。",
  },
  {
    q: "SNSの知識がなくても大丈夫ですか？",
    a: "まったく問題ありません。「SNSはほとんどやったことがない」という方のサポートも得意です。基礎から丁寧に説明しながら進めます。",
  },
  {
    q: "SNS運用を外注していることは、フォロワーにバレませんか？",
    a: "バレません。ヒアリングであなたのお人柄や言葉のクセを丁寧に把握したうえで、あなた自身の「声」として設計します。",
  },
  {
    q: "契約期間の縛りはありますか？",
    a: "長期契約を強制することはありません。リサーチと戦略設計のみのスポット依頼から始めることも可能です。",
  },
];

export default function CorporatePage() {
  const [openFaq, setOpenFaq]   = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // お問い合わせフォームの状態管理
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Formspree経由でinfo@lion-cons.comに送信する
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _replyto: form.email }),
      });
      setFormStatus(res.ok ? "sent" : "error");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* ===== ナビゲーション ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* ロゴ：SVGアイコン＋テキスト */}
          <a href="#" className="flex items-center gap-2.5">
            <LionLensLogo />
            <span className="text-xl font-black tracking-tight leading-none">
              <span className="text-amber-500">Lion</span> Lens Lab
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="text-sm text-slate-600 hover:text-amber-500 transition-colors font-medium">
                {l.label}
              </a>
            ))}
            <a href="#contact"
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors">
              無料相談
            </a>
          </div>
          <button
            className="md:hidden text-2xl w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 pb-5 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="text-sm text-slate-700 py-2 font-medium border-b border-slate-50"
                onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#contact"
              className="bg-amber-500 text-white text-sm font-bold px-5 py-3 rounded-full text-center mt-1"
              onClick={() => setMenuOpen(false)}>
              無料相談を申し込む
            </a>
          </div>
        )}
      </nav>

      {/* ===== ヒーロー ===== */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${IMG.heroBg}')`,
            animation: "bgZoom 20s ease-in-out infinite alternate",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20">
          <div className="inline-block bg-amber-500/25 text-amber-400 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-6 border border-amber-400/40">
            SNS RESEARCH &amp; CONSULTING
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight text-white mb-6">
            SNSの今を知り、<br />
            <span className="text-amber-400">未来を切り拓く。</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-xl mb-8 leading-relaxed">
            あなたのブランドが今どこにいるか。<br />
            データと対話で、確かな戦略を描きます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-full text-center text-lg transition-colors shadow-xl shadow-amber-500/30">
              無料相談を申し込む →
            </a>
            <a href="#service"
              className="border border-white/40 hover:border-white/80 text-white font-medium px-8 py-4 rounded-full text-center transition-colors">
              サービスを見る
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bgZoom {
          from { transform: scale(1);    }
          to   { transform: scale(1.08); }
        }
      `}</style>

      {/* ===== 数値ストリップ ===== */}
      <section className="bg-slate-900 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">{s.num}</div>
              <div className="text-xs text-slate-400 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== About（レンズ写真を控えめな背景に、手前にコンサルタント写真） ===== */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* レンズ写真を薄い背景として使用 — 存在感を消しつつ "Lens" を示唆 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${IMG.aboutLens}')` }}
        />
        <div className="absolute inset-0 bg-white/91" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={IMG.aboutPerson}
              alt="コンサルタント"
              className="w-full h-[480px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-400 rounded-2xl -z-10" />
          </div>
          <div>
            <p className="text-amber-500 font-bold text-sm tracking-widest mb-3">ABOUT 3L</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
              あなたのブランドに、<br />
              <span className="text-amber-500">レンズを当てる。</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              <strong className="text-slate-900">Lion Lens Lab（3L）</strong>は、SNSリサーチとコンサルティングを専門とするサービスです。「今の自分はどう見られているのか」を正確に把握することから、すべてが始まります。
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              データに基づいたリサーチと、丁寧なヒアリングで、あなただけの戦略を設計・実行します。
            </p>
            {/* X得意の強調 */}
            <div className="bg-slate-900 rounded-2xl px-5 py-4 flex items-start gap-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="flex-shrink-0 mt-0.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <div>
                <p className="text-white font-bold text-sm mb-0.5">X（旧Twitter）に特に強みを持ちます</p>
                <p className="text-slate-400 text-xs leading-relaxed">アルゴリズムの仕組み・バズる投稿の設計・アカウント成長戦略まで、Xならではのノウハウを豊富に持っています。もちろん他SNSとの組み合わせ戦略も対応可能です。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== サービスフロー ===== */}
      <section id="service" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 font-bold text-sm tracking-widest mb-2">SERVICE</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              3つのステップで、<br />ブランドを育てます
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.number} className="group relative overflow-hidden rounded-2xl shadow-lg">
                {step.img ? (
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  /* SNSリサーチカード：Xを大きく、他SNSロゴを散らして間接表現 */
                  <div className="w-full h-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                    {/* X ロゴ：中央に大きく */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-44 h-44 opacity-[0.18]" viewBox="0 0 24 24" fill="white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    {/* Instagram：右上 */}
                    <svg className="absolute top-5 right-6 w-9 h-9 opacity-[0.22]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4.5"/>
                      <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none"/>
                    </svg>
                    {/* TikTok：左上 */}
                    <svg className="absolute top-6 left-5 w-8 h-8 opacity-[0.22]" viewBox="0 0 24 24" fill="white">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34l.01-8.77a8.18 8.18 0 004.77 1.52V6.88a4.85 4.85 0 01-3.02-.19z"/>
                    </svg>
                    {/* YouTube：右下 */}
                    <svg className="absolute bottom-[5.5rem] right-5 w-10 h-10 opacity-[0.22]" viewBox="0 0 24 24" fill="white">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95 29 29 0 00.46-5.29 29 29 0 00-.46-5.44z"/>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1e293b"/>
                    </svg>
                    {/* LinkedIn：左下 */}
                    <svg className="absolute bottom-[5.5rem] left-5 w-8 h-8 opacity-[0.22]" viewBox="0 0 24 24" fill="white">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="text-amber-400 font-black text-xs tracking-widest mb-1">STEP {step.number}</div>
                  <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 実績（写真背景） ===== */}
      <section id="results" className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${IMG.resultsBg}')` }}
        />
        <div className="absolute inset-0 bg-slate-900/85" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-amber-400 font-bold text-sm tracking-widest mb-2">RESULTS</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">支援実績</h2>
            <p className="text-slate-400 text-sm mt-3">
              ※ クライアントのご要望により、業種・数値のみ掲載しています
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-14">
            {RESULTS.map((r) => (
              <div key={r.category}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-7 hover:bg-white/15 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-amber-400 font-bold text-xs tracking-wide mb-1">{r.category}</p>
                    <p className="text-slate-300 text-sm">{r.detail}</p>
                  </div>
                  <span className="text-xs bg-white/15 text-slate-300 px-3 py-1 rounded-full flex-shrink-0">{r.period}</span>
                </div>
                <p className="text-2xl font-black text-white">{r.metric}</p>
              </div>
            ))}
          </div>

          <h3 className="text-center text-xl font-black text-white mb-8">お客様の声</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {VOICES.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <img src={v.img} alt={v.attr}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400" />
                  <p className="text-xs text-slate-500 font-medium">{v.attr}</p>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== タレント・インフルエンサー実績 ===== */}
      <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
        {/* 背景グロー */}
        <div className="absolute top-24 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 right-1/4 w-72 h-72 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-14">
            <p className="text-amber-400 font-bold text-sm tracking-widest mb-3">TALENT &amp; INFLUENCER</p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              タレント・インフルエンサーの<br />
              <span className="text-amber-400">支援実績も、豊富にあります。</span>
            </h2>
            <p className="text-slate-500 text-sm">
              ※ ご本人・所属事務所のご意向により、お名前・活動詳細は非公開としています
            </p>
          </div>

          {/* ビッグナンバー */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {TALENT_STATS.map((s) => (
              <div key={s.label} className="border border-white/10 rounded-2xl p-6 text-center bg-white/5 backdrop-blur">
                <div className="text-xl md:text-2xl font-black text-amber-400 mb-2 leading-tight">{s.num}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>

          {/* 事例カード */}
          <div className="grid md:grid-cols-2 gap-5 mb-14">
            {TALENT_CASES.map((r) => (
              <div key={r.category}
                className="border border-white/10 rounded-2xl p-7 bg-white/5 hover:bg-white/8 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {/* ✦ スターアイコンで「タレント」の雰囲気を演出 */}
                    <p className="text-amber-400 font-bold text-xs tracking-wide mb-1 flex items-center gap-1.5">
                      <span>✦</span>{r.category}
                    </p>
                    <p className="text-slate-400 text-xs">{r.platform}</p>
                  </div>
                  <span className="text-xs bg-white/10 text-slate-400 px-3 py-1 rounded-full flex-shrink-0">{r.period}</span>
                </div>
                <p className="text-2xl font-black text-white mb-3">{r.metric}</p>
                <p className="text-slate-500 text-xs leading-relaxed border-t border-white/10 pt-3">{r.note}</p>
              </div>
            ))}
          </div>

          {/* 詳細はご相談で */}
          <div className="border border-amber-400/30 rounded-2xl p-8 text-center bg-amber-500/5">
            <p className="text-slate-300 text-sm mb-2">
              <strong className="text-white">「もっと詳しく知りたい」</strong>という方へ
            </p>
            <p className="text-slate-500 text-sm mb-6">
              具体的な実績・支援内容は、守秘義務の範囲内でご相談時にお伝えしています。
            </p>
            <a href="#contact"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black px-8 py-3.5 rounded-full transition-colors text-sm">
              実績の詳細を聞いてみる →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 特徴 ===== */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 font-bold text-sm tracking-widest mb-2">WHY 3L</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">3Lが選ばれる理由</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title}
                className="bg-slate-50 rounded-2xl p-9 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-5">{f.icon}</div>
                <h3 className="text-xl font-black mb-3 text-slate-900">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTAバナー（写真背景） ===== */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${IMG.ctaBg}')` }}
        />
        <div className="absolute inset-0 bg-amber-600/80" />
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-5">
            まずは、現状を一緒に確認しませんか？
          </h2>
          <p className="text-amber-100 text-lg mb-10">
            初回相談は無料です。「何から始めればいいかわからない」という方も大歓迎です。
          </p>
          <a href="#contact"
            className="bg-white text-amber-600 font-black px-10 py-5 rounded-full hover:bg-amber-50 transition-colors inline-block text-lg shadow-xl">
            無料相談を申し込む →
          </a>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-500 font-bold text-sm tracking-widest mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">よくあるご質問</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-bold text-slate-800 text-sm">{faq.q}</span>
                  <span className="text-amber-500 text-xl flex-shrink-0 font-bold">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== お問い合わせ ===== */}
      <section id="contact" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-400 font-bold text-sm tracking-widest mb-2">CONTACT</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">お問い合わせ</h2>
            <p className="text-slate-400 leading-relaxed">
              サービスのご質問・無料相談のお申し込みはこちらから。<br className="hidden md:block" />
              通常1〜2営業日以内にご返信します。
            </p>
          </div>

          {/* 送信完了表示 */}
          {formStatus === "sent" ? (
            <div className="bg-white/10 border border-amber-400/40 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-black text-white mb-2">送信が完了しました</h3>
              <p className="text-slate-400 text-sm">内容を確認次第、担当者よりご連絡いたします。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* お名前・メールアドレス */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">お名前 <span className="text-amber-400">*</span></label>
                  <input
                    type="text" name="name" required
                    value={form.name} onChange={handleChange}
                    placeholder="山田 太郎"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">メールアドレス <span className="text-amber-400">*</span></label>
                  <input
                    type="email" name="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* ご相談内容 */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">ご相談内容</label>
                <select
                  name="service"
                  value={form.service} onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors text-white"
                >
                  <option value="" className="bg-slate-900">選択してください（任意）</option>
                  <option value="SNSリサーチのみ" className="bg-slate-900">SNSリサーチのみ依頼したい</option>
                  <option value="戦略設計まで" className="bg-slate-900">リサーチ＋戦略設計まで依頼したい</option>
                  <option value="運用まですべて" className="bg-slate-900">SNS運用まですべて依頼したい</option>
                  <option value="まずは相談" className="bg-slate-900">まずは話を聞いてみたい</option>
                </select>
              </div>

              {/* メッセージ */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">メッセージ（任意）</label>
                <textarea
                  name="message" rows={4}
                  value={form.message} onChange={handleChange}
                  placeholder="現在のSNS状況や、お悩みをご自由にご記入ください。"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              {/* エラー表示 */}
              {formStatus === "error" && (
                <p className="text-red-400 text-sm text-center">送信に失敗しました。お手数ですが、時間をおいて再度お試しください。</p>
              )}

              {/* 送信ボタン */}
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-white font-black py-4 rounded-xl text-lg transition-colors shadow-lg shadow-amber-500/20"
              >
                {formStatus === "sending" ? "送信中..." : "無料相談を申し込む →"}
              </button>

              <p className="text-slate-500 text-xs text-center">
                通常1〜2営業日以内にご返信いたします
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ===== フッター ===== */}
      <footer className="bg-slate-950 text-slate-500 text-sm py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <LionLensLogo />
          <p className="font-black text-white">
            <span className="text-amber-400">Lion</span> Lens Lab
          </p>
        </div>
        {/* 法的ページへのリンク */}
        <div className="flex justify-center gap-6 mb-3 text-xs">
          <a href="/privacy" className="hover:text-amber-400 transition-colors">プライバシーポリシー</a>
          <a href="/legal"   className="hover:text-amber-400 transition-colors">特定商取引法に基づく表記</a>
        </div>
        <p>© 2025 Lion Lens Lab. All rights reserved.</p>
      </footer>

    </div>
  );
}
