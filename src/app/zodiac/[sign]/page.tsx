import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { TodayReturnCta } from "@/components/CTABlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ShareButtons } from "@/components/ShareButtons";
import { zodiacSigns } from "@/lib/content";
import { buildDailyFortunes, todayKey } from "@/lib/fortune";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ sign: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return zodiacSigns.map((sign) => ({ sign: sign.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { sign: signSlug } = await params;
  const sign = zodiacSigns.find((item) => item.slug === signSlug);
  if (!sign) return {};
  return buildMetadata({
    title: `${sign.name}の今日の運勢｜日替わり星座占い`,
    description: `${sign.name}の今日の運勢、ランキング、ラッキーカラー、ラッキーアイテムを日替わりでチェック。`,
    path: `/zodiac/${sign.slug}`
  });
}

export default async function ZodiacDetailPage({ params }: Props) {
  const { sign: signSlug } = await params;
  const sign = zodiacSigns.find((item) => item.slug === signSlug);
  const fortunes = buildDailyFortunes(zodiacSigns.map((item) => item.slug), todayKey());
  const fortune = fortunes.find((item) => item.sign === signSlug);
  if (!sign || !fortune) notFound();

  return (
    <main className="page-shell space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "星座占い", path: "/zodiac" },
          { name: sign.name, path: `/zodiac/${sign.slug}` }
        ])}
      />
      <PageHero
        kicker={`${todayKey()} / ${fortune.rank}位`}
        title={`${sign.name}の今日の運勢`}
        description={`${fortune.score}点。${fortune.message}`}
      />
      <article className="soft-card space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">RANK</p>
            <p className="mt-2 text-3xl font-black text-orchid">{fortune.rank}位</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">SCORE</p>
            <p className="mt-2 text-3xl font-black text-orchid">{fortune.score}点</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">LUCKY</p>
            <p className="mt-2 font-bold text-plum">{fortune.luckyColor}</p>
            <p className="text-sm text-plum/70">{fortune.luckyItem}</p>
          </div>
        </div>
        <p className="text-lg leading-8">{fortune.total}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-paper p-4">
            <strong>恋愛運</strong>
            <p className="mt-2">{fortune.love}</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <strong>仕事運</strong>
            <p className="mt-2">{fortune.work}</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <strong>金運</strong>
            <p className="mt-2">{fortune.money}</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <strong>健康運</strong>
            <p className="mt-2">{fortune.wellness}</p>
          </div>
        </div>
        <ShareButtons title={`${sign.name}の今日の運勢`} text={`${fortune.rank}位・${fortune.score}点。${fortune.message}`} />
      </article>
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
      <TodayReturnCta />
    </main>
  );
}
