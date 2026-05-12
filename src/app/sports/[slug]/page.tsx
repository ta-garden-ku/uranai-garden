import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { RelatedArticles } from "@/components/ContentBlocks";
import { TodayReturnCta } from "@/components/CTABlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ShareButtons } from "@/components/ShareButtons";
import { sportsFortunes } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sportsFortunes.map((sport) => ({ slug: sport.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const sport = sportsFortunes.find((item) => item.slug === slug);
  if (!sport) return {};
  return buildMetadata({
    title: `${sport.name}｜今日の行動ヒントとラッキーアイテム`,
    description: sport.description,
    path: `/sports/${sport.slug}`
  });
}

export default async function SportsDetailPage({ params }: Props) {
  const { slug } = await params;
  const sport = sportsFortunes.find((item) => item.slug === slug);
  if (!sport) notFound();

  return (
    <main className="page-shell space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "スポーツ占い", path: "/sports" },
          { name: sport.name, path: `/sports/${sport.slug}` }
        ])}
      />
      <PageHero kicker="SPORTS FORTUNE" title={sport.name} description={sport.description} />
      <article className="soft-card space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">LUCKY ACTION</p>
            <p className="mt-2 text-lg font-bold leading-8 text-plum">{sport.luckyAction}</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">LUCKY ITEM</p>
            <p className="mt-2 text-lg font-bold text-plum">{sport.luckyItem}</p>
          </div>
        </div>
        <p className="rounded-lg bg-gradient-to-r from-plum to-orchid p-5 text-lg font-bold leading-8 text-white">
          {sport.message}
        </p>
        <p className="text-sm leading-7 text-plum/70">
          このスポーツ占いはエンタメ目的です。試合結果、健康状態、進路などを断定するものではありません。
          今日の気分を整える軽いヒントとして楽しんでください。
        </p>
        <ShareButtons title={sport.name} text={sport.message} />
      </article>
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
      <RelatedArticles currentSlug="sports-fortune-guide" />
      <TodayReturnCta />
    </main>
  );
}
