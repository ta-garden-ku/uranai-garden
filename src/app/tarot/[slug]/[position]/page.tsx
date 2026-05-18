import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { RelatedArticles } from "@/components/ContentBlocks";
import { TodayReturnCta } from "@/components/CTABlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ShareButtons } from "@/components/ShareButtons";
import { TarotCardArt } from "@/components/TarotCardArt";
import { tarotCards } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

type Position = "upright" | "reversed";
type Props = { params: Promise<{ slug: string; position: Position }> };

const positionLabels: Record<Position, string> = {
  upright: "正位置",
  reversed: "逆位置"
};

function getTarotCard(slug: string) {
  return tarotCards.find((card) => card.slug === slug);
}

function isPosition(value: string): value is Position {
  return value === "upright" || value === "reversed";
}

export function generateStaticParams() {
  return tarotCards.flatMap((card) => [
    { slug: card.slug, position: "upright" },
    { slug: card.slug, position: "reversed" }
  ]);
}

export async function generateMetadata({ params }: Props) {
  const { slug, position } = await params;
  const card = getTarotCard(slug);
  if (!card || !isPosition(position)) return {};
  const label = positionLabels[position];

  return buildMetadata({
    title: `${card.name}${label}の意味｜恋愛・仕事・人間関係のタロット解説`,
    description: `${card.name}${label}の意味を、恋愛・仕事・人間関係・今日の行動ヒントとして前向きに解説します。`,
    path: `/tarot/${card.slug}/${position}`,
    type: "article"
  });
}

export default async function TarotDetailPage({ params }: Props) {
  const { slug, position } = await params;
  const card = getTarotCard(slug);
  if (!card || !isPosition(position)) notFound();

  const label = positionLabels[position];
  const meaning = position === "upright" ? card.upright : card.reversed;
  const path = `/tarot/${card.slug}/${position}`;
  const title = `${card.name}${label}の意味`;
  const description = `${card.name}${label}は「${card.theme}」をテーマに、今日の気持ちや行動をやさしく整えるカードです。`;

  return (
    <main className="page-shell space-y-8">
      <JsonLd
        data={articleJsonLd({
          title,
          description,
          path,
          datePublished: "2026-05-17",
          category: "tarot"
        })}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: `${card.name}${label}は悪い意味ですか？`,
            answer: "悪い意味と決めつける必要はありません。エンタメ目的のタロットとして、今の気持ちや行動を見直すヒントとして楽しんでください。"
          },
          {
            question: "このカードの結果で大事な判断をしてもいいですか？",
            answer: "医療、投資、法律、人生の重大な判断は、占いだけで決めず必要に応じて専門家へ相談してください。"
          }
        ])}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "タロット", path: "/tarot" },
          { name: title, path }
        ])}
      />

      <PageHero kicker="TAROT CARD MEANING" title={title} description={description} />

      <section className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        <div className="soft-card">
          <div className="mx-auto w-[210px]">
            <TarotCardArt slug={card.slug} reversed={position === "reversed"} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link className="btn-primary" href="/tarot">
              もう一度カードを引く
            </Link>
            <Link className="btn-secondary" href={`/tarot/${card.slug}/${position === "upright" ? "reversed" : "upright"}`}>
              {position === "upright" ? "逆位置" : "正位置"}を見る
            </Link>
          </div>
        </div>

        <article className="space-y-5">
          <section className="soft-card">
            <p className="kicker">MEANING</p>
            <h2 className="mt-2 text-2xl font-black text-plum">{card.theme}</h2>
            <p className="mt-3 text-lg font-bold leading-8 text-plum">{meaning}</p>
            <p className="mt-4 leading-8 text-plum/75">{card.detail}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.keywords.map((keyword) => (
                <span key={keyword} className="rounded-full bg-paper px-3 py-1 text-xs font-bold text-plum/70">
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          <div className="grid gap-3 sm:grid-cols-3">
            <section className="rounded-lg bg-white/85 p-4 shadow-soft">
              <p className="kicker">恋愛</p>
              <p className="mt-2 text-sm leading-7 text-plum/75">{card.love}</p>
            </section>
            <section className="rounded-lg bg-white/85 p-4 shadow-soft">
              <p className="kicker">仕事</p>
              <p className="mt-2 text-sm leading-7 text-plum/75">{card.work}</p>
            </section>
            <section className="rounded-lg bg-white/85 p-4 shadow-soft">
              <p className="kicker">人間関係</p>
              <p className="mt-2 text-sm leading-7 text-plum/75">{card.relationships}</p>
            </section>
          </div>

          <section className="soft-card">
            <h2 className="text-2xl font-bold text-plum">今日の読み方</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-paper p-4">
                <p className="kicker">ADVICE</p>
                <p className="mt-2 text-sm font-bold leading-7 text-plum">{card.advice}</p>
              </div>
              <div className="rounded-lg bg-paper p-4">
                <p className="kicker">AVOID</p>
                <p className="mt-2 text-sm font-bold leading-7 text-plum">{card.avoid}</p>
              </div>
              <div className="rounded-lg bg-paper p-4">
                <p className="kicker">ACTION</p>
                <p className="mt-2 text-sm font-bold leading-7 text-plum">{card.action}</p>
              </div>
            </div>
          </section>

          <AdSlot placement="result-bottom" />
          <ShareButtons title={title} text={`今日のカードは${card.name}${label}。${meaning}`} url={path} tarotSlug={card.slug} tarotPosition={position} />
        </article>
      </section>

      <AffiliateCards category="タロット" title="タロット後に読みたいおすすめPR" />
      <RelatedArticles currentSlug="tarot-major-arcana-meaning" />
      <TodayReturnCta />
    </main>
  );
}
