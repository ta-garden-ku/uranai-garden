import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { TodayReturnCta } from "@/components/CTABlocks";
import { PageHero } from "@/components/PageHero";
import { ShareButtons } from "@/components/ShareButtons";
import { seasonalFortunes } from "@/lib/calendarFortunes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seasonalFortunes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = seasonalFortunes.find((entry) => entry.slug === slug);
  if (!item) return {};
  return buildMetadata({
    title: `${item.name}｜${item.months}の開運ヒント`,
    description: item.description,
    path: `/seasonal/${item.slug}`
  });
}

export default async function SeasonalDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = seasonalFortunes.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <main className="page-shell space-y-8">
      <PageHero kicker={item.months} title={item.name} description={item.description} />
      <article className="soft-card space-y-5">
        <section className="rounded-lg bg-paper p-5">
          <p className="kicker">THEME</p>
          <h2 className="mt-2 text-3xl font-black text-orchid">{item.theme}</h2>
        </section>
        <div className="grid gap-3 sm:grid-cols-2">
          <section className="rounded-lg bg-white/75 p-4">
            <h2 className="font-bold text-plum">ラッキーアクション</h2>
            <p className="mt-2 text-sm leading-7 text-plum/75">{item.luckyAction}</p>
          </section>
          <section className="rounded-lg bg-white/75 p-4">
            <h2 className="font-bold text-plum">ラッキーアイテム</h2>
            <p className="mt-2 text-sm leading-7 text-plum/75">{item.luckyItem}</p>
          </section>
        </div>
        <ShareButtons title={item.name} text={item.description} />
      </article>
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
      <TodayReturnCta />
    </main>
  );
}
