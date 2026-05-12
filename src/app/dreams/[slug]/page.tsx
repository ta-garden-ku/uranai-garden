import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { RelatedArticles } from "@/components/ContentBlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ShareButtons } from "@/components/ShareButtons";
import { dreams } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return dreams.map((dream) => ({ slug: dream.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dream = dreams.find((item) => item.slug === slug);
  if (!dream) return {};
  return buildMetadata({
    title: `${dream.keyword}の夢占い｜意味・恋愛・仕事の前向きなヒント`,
    description: dream.meaning,
    path: `/dreams/${dream.slug}`
  });
}

function relatedDreams(slug: string) {
  const index = dreams.findIndex((dream) => dream.slug === slug);
  return [1, 2, 3, 4]
    .map((offset) => dreams[(index + offset + dreams.length) % dreams.length])
    .filter((dream) => dream.slug !== slug);
}

export default async function DreamDetailPage({ params }: Props) {
  const { slug } = await params;
  const dream = dreams.find((item) => item.slug === slug);
  if (!dream) notFound();
  const related = relatedDreams(dream.slug);

  return (
    <main className="page-shell space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "夢占い辞典", path: "/dreams" },
          { name: dream.keyword, path: `/dreams/${dream.slug}` }
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: `${dream.keyword}の夢は悪い意味ですか？`,
            answer:
              "悪い意味と決めつける必要はありません。Uranai Gardenでは、夢占いをエンタメとして前向きに受け取れるヒントとして紹介しています。"
          },
          {
            question: "夢占いは現実の判断に使えますか？",
            answer:
              "夢占いはエンタメ目的です。医療、投資、法律、人生の重大な判断は専門家や信頼できる人へ相談してください。"
          }
        ])}
      />
      <PageHero kicker="DREAM DICTIONARY" title={`${dream.keyword}の夢占い`} description={dream.meaning} />
      <AdSlot placement="article-top" />
      <article className="soft-card space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-plum">{dream.keyword}の夢が表す基本の意味</h2>
          <p className="mt-3 leading-8 text-plum/80">{dream.meaning}</p>
          <p className="mt-3 leading-8 text-plum/80">{dream.advice}</p>
        </section>
        <section className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">LOVE</p>
            <h3 className="mt-2 font-bold text-plum">恋愛のヒント</h3>
            <p className="mt-2 text-sm leading-7 text-plum/70">
              相手の気持ちを決めつけず、自分が安心して関われる距離感を見直す合図として受け取ってみましょう。
            </p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">WORK</p>
            <h3 className="mt-2 font-bold text-plum">仕事のヒント</h3>
            <p className="mt-2 text-sm leading-7 text-plum/70">
              目の前のタスクを小さく分けると、迷いや不安が整理されやすくなります。
            </p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">MIND</p>
            <h3 className="mt-2 font-bold text-plum">気持ちの整え方</h3>
            <p className="mt-2 text-sm leading-7 text-plum/70">
              夢の印象を一言でメモして、今の自分が何を大切にしたいかをやさしく眺めてください。
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-plum">この夢を見た日の過ごし方</h2>
          <p className="mt-3 leading-8 text-plum/80">
            {dream.keyword}の夢を見た日は、結論を急がず、生活の中に小さな余白を作るのがおすすめです。
            部屋を整える、予定をひとつ減らす、短い散歩をするなど、無理のない行動で気分を切り替えてみましょう。
          </p>
          <p className="mt-3 rounded-lg bg-honey/20 p-4 text-sm leading-7 text-plum/70">
            夢占いはエンタメ目的です。不安が強い時は一人で抱え込まず、信頼できる人や専門家に相談してください。
          </p>
        </section>
        <ShareButtons title={`${dream.keyword}の夢占い`} text={dream.meaning} />
      </article>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-plum">関連する夢占い</h2>
        <div className="grid gap-3 sm:grid-cols-4">
          {related.map((item) => (
            <Link key={item.slug} className="rounded-lg bg-white/85 p-4 text-sm font-bold text-plum shadow-soft" href={`/dreams/${item.slug}`}>
              {item.keyword}の夢
            </Link>
          ))}
        </div>
      </section>
      <AdSlot placement="article-bottom" />
      <AffiliateCards />
      <RelatedArticles />
    </main>
  );
}
