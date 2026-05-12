import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "診断一覧｜恋愛・性格・相性・ラッキーカラー",
  description: "恋愛タイプ診断、性格診断、相性診断、ラッキーカラー診断を一覧で楽しめます。",
  path: "/diagnosis"
});

const diagnosisLinks = [
  { href: "/diagnosis/love", title: "恋愛タイプ診断", body: "恋愛コミュニケーションの傾向をチェック。" },
  { href: "/diagnosis/personality", title: "性格タイプ診断", body: "あなたの得意な動き方を診断。" },
  { href: "/diagnosis/compatibility", title: "相性診断", body: "2人の名前から今日の相性スコアを表示。" },
  { href: "/lucky-color", title: "ラッキーカラー診断", body: "今日の気分に合う色を診断。" },
  { href: "/lucky-item", title: "ラッキーアイテム診断", body: "今日持ち歩きたい小物を診断。" }
] as const;

export default function DiagnosisPage() {
  return (
    <main className="page-shell space-y-6">
      <PageHero kicker="DIAGNOSIS" title="診断一覧" description="短い質問に答えて、今日の自分をやさしく眺めるヒントを受け取れます。" />
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {diagnosisLinks.map((item) => (
          <Link key={item.href} className="soft-card" href={item.href}>
            <h2 className="text-xl font-bold text-plum">{item.title}</h2>
            <p className="mt-2 text-sm leading-7 text-plum/70">{item.body}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
