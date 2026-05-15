import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { PopularContent, RelatedArticles } from "@/components/ContentBlocks";
import { SubscribeCta, TodayReturnCta } from "@/components/CTABlocks";
import { DreamDictionaryIntro, PopularDreams } from "@/components/DreamBlocks";
import { JsonLd } from "@/components/JsonLd";
import { MysticIllustration } from "@/components/MysticIllustration";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Uranai Garden｜毎日楽しめる占い・診断・おみくじ",
  description: "今日の運勢、星座占い、タロット、おみくじ、夢占い、診断をスマホで気軽に楽しめるエンタメ占いサイトです。"
});

const featureLinks = [
  { href: "/today", title: "今日の運勢", body: "12星座の総合運、恋愛運、仕事運、金運、ラッキーカラーを毎日チェック。", art: "today" },
  { href: "/tarot", title: "タロット1枚引き", body: "22枚の大アルカナから、今日の気分に合うカードを1枚引けます。", art: "tarot" },
  { href: "/omikuji", title: "おみくじ", body: "大吉から凶まで、前向きに読めるやさしいおみくじです。", art: "omikuji" },
  { href: "/dreams", title: "夢占い辞典", body: "300件以上の夢キーワードから、気になる夢の意味を探せます。", art: "dream" },
  { href: "/diagnosis", title: "診断コンテンツ", body: "恋愛、性格、相性、仕事、金運、推し活、スポーツ勝負運を診断。", art: "diagnosis" },
  { href: "/sports", title: "スポーツ占い", body: "野球、サッカー、バスケなど競技イメージで今日の流れをチェック。", art: "sports" },
  { href: "/monthly", title: "月別占い", body: "1月から12月まで、月ごとのテーマと過ごし方をまとめました。", art: "monthly" },
  { href: "/birthday/5/15", title: "誕生日占い", body: "365日分の誕生日ページで、自分や友達の誕生日を楽しめます。", art: "birthday" },
  { href: "/articles", title: "占い記事", body: "ランキング、比較、SEO、収益化向けの記事テンプレートも用意。", art: "articles" }
] as const;

export default function HomePage() {
  return (
    <main>
      <JsonLd
        data={faqJsonLd([
          {
            question: "Uranai Gardenは無料で使えますか？",
            answer: "基本コンテンツは無料で楽しめます。広告やPRリンクを含む場合があります。"
          },
          {
            question: "占い結果は本格的な助言ですか？",
            answer: "占い・診断結果はエンタメ目的です。医療、投資、法律、人生の重大な判断は専門家へご相談ください。"
          }
        ])}
      />
      <section className="relative overflow-hidden">
        <Image src="/images/hero-garden.png" alt="幻想的な占いガーデン" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-plum/35 via-plum/20 to-paper" />
        <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-center px-4 py-16">
          <div className="max-w-2xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-bold backdrop-blur">
              <Sparkles size={16} aria-hidden />
              毎日使える占いガーデン
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">Uranai Garden</h1>
            <p className="mt-5 text-lg leading-8 text-white/90">
              今日の運勢、星座占い、タロット、おみくじ、診断、夢占いをスマホで気軽に楽しめるエンタメ占いサイトです。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn-primary bg-white text-plum hover:bg-honey" href="/today">
                今日の運勢を見る
              </Link>
              <Link className="btn-secondary bg-white/90" href="/tarot">
                タロットを引く
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="page-shell space-y-10">
        <AdSlot placement="article-top" label="トップページ上部広告" />
        <DreamDictionaryIntro />
        <PopularDreams />

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureLinks.map((link) => (
            <Link key={link.href} className="soft-card group flex min-h-full flex-col" href={link.href}>
              <MysticIllustration variant={link.art} />
              <h2 className="mt-4 text-xl font-bold text-plum">{link.title}</h2>
              <p className="mt-2 text-sm leading-7 text-plum/70">{link.body}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-orchid">
                開く <ArrowRight size={15} className="transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <TodayReturnCta />
            <AffiliateCards title="記事下に置くおすすめ商品枠" />
            <RelatedArticles />
            <SubscribeCta />
          </div>
          <aside className="space-y-4">
            <PopularContent />
            <AdSlot placement="sidebar" />
          </aside>
        </div>

        <PageHero kicker="NEW ARTICLES" title="占い記事とランキング" description="比較記事、ランキング記事、夢占い記事、収益化向けの記事を追加しています。" />
        <div className="grid gap-3 sm:grid-cols-2">
          {articles.slice(0, 12).map((article) => (
            <Link key={article.slug} className="soft-card" href={`/articles/${article.slug}`}>
              <p className="kicker">{article.category}</p>
              <h2 className="mt-2 text-xl font-bold text-plum">{article.title}</h2>
              <p className="mt-2 text-sm leading-7 text-plum/70">{article.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
