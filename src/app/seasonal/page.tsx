import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { PageHero } from "@/components/PageHero";
import { seasonalFortunes } from "@/lib/calendarFortunes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "季節の運勢｜春夏秋冬の占い",
  description: "春・夏・秋・冬の季節ごとの運勢、ラッキーアクション、ラッキーアイテムをまとめました。",
  path: "/seasonal"
});

export default function SeasonalPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="SEASONAL" title="季節の運勢" description="春夏秋冬の流れに合わせて、今の気分を整える占いです。" />
      <AdSlot placement="article-top" />
      <section className="grid gap-4 sm:grid-cols-2">
        {seasonalFortunes.map((season) => (
          <Link key={season.slug} className="soft-card block transition hover:-translate-y-1" href={`/seasonal/${season.slug}`}>
            <p className="kicker">{season.months}</p>
            <h2 className="mt-2 text-2xl font-black text-plum">{season.name}</h2>
            <p className="mt-3 text-sm leading-7 text-plum/75">{season.description}</p>
          </Link>
        ))}
      </section>
      <AffiliateCards />
    </main>
  );
}
