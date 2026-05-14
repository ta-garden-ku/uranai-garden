import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { DreamCategoryLinks, PopularDreams } from "@/components/DreamBlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { TodayReturnCta } from "@/components/CTABlocks";
import { dreamCategories, dreams } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const categoryGuides: Record<string, { name: string; title: string; lead: string; points: string[]; faq: Array<{ question: string; answer: string }> }> = {
  animals: {
    name: "動物の夢",
    title: "動物の夢占い一覧",
    lead: "猫、犬、蛇、鳥など、動物が出てくる夢は、身近な人間関係や自分の本音をやさしく映すことがあります。",
    points: ["動物の印象が明るいほど、対人運のヒントとして読みやすいです。", "怖い夢でも不吉と決めつけず、距離感や疲れのサインとして受け取りましょう。", "気になった夢は、今日の運勢やタロットとあわせて見ると回遊しやすいです。"],
    faq: [
      { question: "動物の夢は良い意味ですか？", answer: "夢の印象によって読み方が変わります。Uranai Gardenでは不安を煽らず、今の気持ちを整えるヒントとして紹介しています。" }
    ]
  },
  nature: {
    name: "自然・天気の夢",
    title: "自然・天気の夢占い一覧",
    lead: "海、空、雨、雪、山など自然の夢は、気分の流れやリセットしたい気持ちを表すテーマとして人気です。",
    points: ["空や海が明るい夢は、気持ちが広がるサインとして楽しめます。", "雨や雪は、心を洗い流す・静かに整えるヒントとして読めます。", "自然の夢を見た日は、無理のない気分転換がおすすめです。"],
    faq: [{ question: "雨の夢は悪い意味ですか？", answer: "悪い意味と決めつける必要はありません。気持ちを洗い流す、休むタイミングとして前向きに受け取れます。" }]
  },
  love: {
    name: "恋愛の夢",
    title: "恋愛の夢占い一覧",
    lead: "元恋人、告白、結婚式、指輪など恋愛の夢は、相手との関係だけでなく自分の望みを見つめるヒントにもなります。",
    points: ["夢だけで相手の気持ちを断定しないことが大切です。", "恋愛の夢は、安心したい気持ちや期待の表れとして読むとやさしく受け取れます。", "相性診断や恋愛診断への導線と相性が良いカテゴリです。"],
    faq: [{ question: "元恋人の夢は復縁のサインですか？", answer: "復縁を断定するものではありません。過去の気持ちを整理したい時に見やすい夢として楽しんでください。" }]
  },
  people: {
    name: "人が出てくる夢",
    title: "人が出てくる夢占い一覧",
    lead: "知らない人、友達、家族、有名人など人が出る夢は、対人関係や自分の一面を映すテーマです。",
    points: ["夢の中の相手は、現実の本人そのものではなく、自分の気持ちの象徴として読めます。", "会話の内容や夢の雰囲気を思い出すとヒントが見つかりやすいです。", "不安な夢でも、決めつけず距離感を整えるきっかけにしましょう。"],
    faq: [{ question: "知らない人の夢は何を表しますか？", answer: "まだ気づいていない自分の一面や、新しい環境への期待として読むことがあります。" }]
  },
  places: {
    name: "場所・建物の夢",
    title: "場所・建物の夢占い一覧",
    lead: "学校、病院、駅、部屋、庭など場所の夢は、今いる環境や心の居場所を見直すヒントになります。",
    points: ["懐かしい場所は過去の経験、知らない場所は新しい可能性として読めます。", "建物の状態は、気持ちの整い方を映すことがあります。", "気になった場所の夢は、関連記事や今日の運勢と一緒に読むと楽しめます。"],
    faq: [{ question: "学校の夢は学生時代の意味だけですか？", answer: "学生時代だけでなく、学び直しや人間関係のヒントとして読むこともあります。" }]
  },
  objects: {
    name: "物・アイテムの夢",
    title: "物・アイテムの夢占い一覧",
    lead: "財布、鍵、鏡、手紙、アクセサリーなど物の夢は、欲しいものや大切にしたい価値観を映します。",
    points: ["なくす夢は不安を煽るものではなく、見直したいものへの気づきとして読めます。", "きれいな物が印象的なら、気分を整える小さな楽しみのサインです。", "ラッキーアイテム診断や商品紹介記事とつなげやすいカテゴリです。"],
    faq: [{ question: "財布の夢は金運を表しますか？", answer: "お金そのものを断定するものではありません。使い方や安心感を見直すヒントとして楽しめます。" }]
  },
  actions: {
    name: "行動の夢",
    title: "行動の夢占い一覧",
    lead: "落ちる、飛ぶ、追いかけられる、走る、泣くなど行動の夢は、今の気持ちの動きが出やすいテーマです。",
    points: ["怖い夢でも、心が整理したがっているサインとして前向きに読めます。", "飛ぶ夢や走る夢は、自由さや前進したい気持ちの象徴として人気です。", "診断コンテンツと組み合わせるとSNSで共有されやすくなります。"],
    faq: [{ question: "追いかけられる夢は悪い夢ですか？", answer: "悪い夢と決めつけなくて大丈夫です。忙しさや緊張をやさしく整理するヒントとして読めます。" }]
  },
  transport: {
    name: "乗り物・移動の夢",
    title: "乗り物・移動の夢占い一覧",
    lead: "電車、車、飛行機、船、自転車など移動の夢は、人生の流れや次の予定を考えるきっかけになります。",
    points: ["乗り物のスピードは、今のペース感として読むとわかりやすいです。", "乗り遅れる夢は不安ではなく、予定の見直しサインとして受け取れます。", "今日の運勢への再訪問導線と相性が良いカテゴリです。"],
    faq: [{ question: "電車の夢は何を表しますか？", answer: "予定や流れ、周りとの歩調を表すテーマとして読むことがあります。" }]
  },
  colors: {
    name: "色の夢",
    title: "色の夢占い一覧",
    lead: "白、黒、赤、青、緑、金色など色の夢は、気分やラッキーカラー診断とつなげやすいテーマです。",
    points: ["色の印象が明るいほど、気持ちを整えるヒントとして読みやすいです。", "黒や赤も悪い意味と決めつけず、強い感情や集中力の象徴として読めます。", "ラッキーカラー診断への内部リンクを置きやすいカテゴリです。"],
    faq: [{ question: "黒い夢は悪い意味ですか？", answer: "必ず悪い意味ではありません。落ち着きや集中、見直しのタイミングとして読むこともできます。" }]
  },
  sports: {
    name: "スポーツの夢",
    title: "スポーツの夢占い一覧",
    lead: "野球、サッカー、バスケ、マラソンなどスポーツの夢は、勝負運やチームワークを楽しく読める新しいテーマです。",
    points: ["勝ち負けを断定せず、挑戦する気持ちや準備のヒントとして楽しめます。", "チームスポーツの夢は、人間関係や役割意識を映すことがあります。", "スポーツ占いページと内部リンクでつなげると回遊率が上がります。"],
    faq: [{ question: "スポーツの夢は勝負運に関係しますか？", answer: "勝敗を保証するものではありません。前向きな準備や集中のヒントとして楽しめます。" }]
  }
};

export function generateStaticParams() {
  return dreamCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = dreamCategories.find((item) => item.slug === slug);
  const guide = categoryGuides[slug];
  if (!category || !guide) return {};
  return buildMetadata({
    title: `${guide.title}｜夢占い辞典`,
    description: guide.lead,
    path: `/dreams/category/${category.slug}`
  });
}

export default async function DreamCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = dreamCategories.find((item) => item.slug === slug);
  const guide = categoryGuides[slug];
  if (!category || !guide) notFound();
  const items = category.dreamSlugs
    .map((dreamSlug) => dreams.find((dream) => dream.slug === dreamSlug))
    .filter(Boolean);

  return (
    <main className="page-shell space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "夢占い辞典", path: "/dreams" },
          { name: guide.name, path: `/dreams/category/${category.slug}` }
        ])}
      />
      <JsonLd data={faqJsonLd(guide.faq)} />
      <PageHero kicker="DREAM CATEGORY" title={guide.title} description={guide.lead} />
      <AdSlot placement="article-top" />

      <section className="soft-card">
        <h2 className="text-2xl font-bold text-plum">{guide.name}の読み方</h2>
        <p className="mt-3 leading-8 text-plum/78">{guide.lead}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {guide.points.map((point) => (
            <div key={point} className="rounded-lg bg-paper p-4 text-sm leading-7 text-plum/75">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(
          (dream) =>
            dream && (
              <Link key={dream.slug} className="soft-card transition hover:-translate-y-1" href={`/dreams/${dream.slug}`}>
                <p className="kicker">DREAM</p>
                <h2 className="mt-2 text-xl font-bold text-plum">{dream.keyword}の夢</h2>
                <p className="mt-2 text-sm leading-7 text-plum/70">{dream.meaning}</p>
              </Link>
            )
        )}
      </section>

      <section className="soft-card">
        <h2 className="text-2xl font-bold text-plum">よくある質問</h2>
        <div className="mt-4 space-y-3">
          {guide.faq.map((item) => (
            <details key={item.question} className="rounded-lg bg-paper p-4">
              <summary className="cursor-pointer font-bold text-plum">{item.question}</summary>
              <p className="mt-2 text-sm leading-7 text-plum/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <PopularDreams />
      <AdSlot placement="article-bottom" />
      <AffiliateCards />
      <TodayReturnCta />
      <DreamCategoryLinks />
    </main>
  );
}
