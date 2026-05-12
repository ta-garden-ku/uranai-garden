import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { RelatedArticles } from "@/components/ContentBlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ShareButtons } from "@/components/ShareButtons";
import { dreams } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return dreams.map((dream) => ({ slug: dream.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dream = dreams.find((item) => item.slug === slug);
  if (!dream) return {};
  return buildMetadata({
    title: `${dream.keyword}の夢占い｜意味と前向きなヒント`,
    description: dream.meaning,
    path: `/dreams/${dream.slug}`
  });
}

export default async function DreamDetailPage({ params }: Props) {
  const { slug } = await params;
  const dream = dreams.find((item) => item.slug === slug);
  if (!dream) notFound();

  return (
    <main className="page-shell space-y-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "ホーム", path: "/" }, { name: "夢占い", path: "/dreams" }, { name: dream.keyword, path: `/dreams/${dream.slug}` }])} />
      <PageHero kicker="DREAM" title={`${dream.keyword}の夢占い`} description={dream.meaning} />
      <AdSlot placement="article-top" />
      <article className="soft-card space-y-4">
        <h2 className="text-2xl font-bold text-plum">夢から受け取るヒント</h2>
        <p className="leading-8 text-plum/80">{dream.advice}</p>
        <p className="rounded-lg bg-paper p-4 text-sm leading-7 text-plum/70">
          夢占いはエンタメとして、今の気分を眺めるきっかけにしてください。不安が強い時は一人で抱え込まず、信頼できる人へ話すことも大切です。
        </p>
        <ShareButtons title={`${dream.keyword}の夢占い`} text={dream.meaning} />
      </article>
      <AdSlot placement="article-bottom" />
      <AffiliateCards />
      <RelatedArticles />
    </main>
  );
}
