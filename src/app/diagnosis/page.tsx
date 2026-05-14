import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "診断一覧｜恋愛・性格・相性・仕事・金運・推し活・スポーツ",
  description: "恋愛タイプ、性格タイプ、相性、仕事、金運、推し活、スポーツ勝負運など、SNSで楽しめる診断をまとめました。",
  path: "/diagnosis"
});

const diagnosisLinks = [
  { href: "/diagnosis/love", title: "恋愛タイプ診断", body: "恋愛コミュニケーションの傾向をチェック。" },
  { href: "/diagnosis/personality", title: "性格タイプ診断", body: "今日の自分らしい動き方を診断。" },
  { href: "/diagnosis/compatibility", title: "相性診断", body: "名前と星座から今日の相性スコアを表示。" },
  { href: "/diagnosis/work", title: "仕事タイプ診断", body: "集中しやすい働き方と進め方のヒント。" },
  { href: "/diagnosis/money", title: "金運タイプ診断", body: "買い物や予算感を楽しく見直す診断。" },
  { href: "/diagnosis/oshi", title: "推し活タイプ診断", body: "今日の推し活の楽しみ方をチェック。" },
  { href: "/diagnosis/sports-luck", title: "スポーツ勝負運診断", body: "部活・観戦・趣味スポーツ前に楽しめる診断。" },
  { href: "/lucky-color", title: "ラッキーカラー診断", body: "今日の気分に合う色を診断。" },
  { href: "/lucky-item", title: "ラッキーアイテム診断", body: "今日持ち歩きたい小物を診断。" }
] as const;

export default function DiagnosisPage() {
  return (
    <main className="page-shell space-y-6">
      <PageHero kicker="DIAGNOSIS" title="診断一覧" description="短い質問に答えて、今日の自分をやさしく眺めるヒントを受け取れます。" />
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {diagnosisLinks.map((item) => (
          <Link key={item.href} className="soft-card transition hover:-translate-y-1" href={item.href}>
            <p className="kicker">QUIZ</p>
            <h2 className="mt-2 text-xl font-bold text-plum">{item.title}</h2>
            <p className="mt-2 text-sm leading-7 text-plum/70">{item.body}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
