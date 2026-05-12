import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { zodiacSigns } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "星座占い一覧｜12星座の今日の運勢",
  description: "牡羊座から魚座まで、12星座ごとの今日の運勢を一覧で確認できます。",
  path: "/zodiac"
});

export default function ZodiacIndexPage() {
  return (
    <main className="page-shell space-y-6">
      <PageHero kicker="ZODIAC" title="星座占い" description="あなたの星座を選んで、今日の運勢とラッキーアイテムをチェックしましょう。" />
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {zodiacSigns.map((sign) => (
          <Link key={sign.slug} className="soft-card" href={`/zodiac/${sign.slug}`}>
            <p className="kicker">{sign.element}のエレメント</p>
            <h2 className="mt-2 text-2xl font-bold text-plum">{sign.name}</h2>
            <p className="mt-2 text-sm text-plum/65">{sign.period}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
