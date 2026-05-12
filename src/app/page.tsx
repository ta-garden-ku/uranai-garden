import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { PopularContent, RelatedArticles } from "@/components/ContentBlocks";
import { SubscribeCta, TodayReturnCta } from "@/components/CTABlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { articles } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Uranai Garden｜毎日楽しめる占い・診断・おみくじ",
  description: "今日の運勢、星座占い、タロット、おみくじ、夢占い、診断を楽しめる占いエンタメサイト。"
});

const featureLinks = [
  { href: "/today", title: "今日の運勢", body: "12星座の総合運・恋愛運・仕事運・金運を毎日チェック。" },
  { href: "/tarot", title: "タロット1枚引き", body: "22枚の大アルカナから、今日のヒントを1枚で。" },
  { href: "/omikuji", title: "おみくじ", body: "凶も前向きに読める、やさしいおみくじ。" },
  { href: "/diagnosis/love", title: "恋愛診断", body: "質問に答えて恋愛タイプを診断。" },
  { href: "/dreams", title: "夢占い検索", body: "30件以上の夢キーワードから意味を探せます。" },
  { href: "/articles", title: "記事一覧", body: "比較記事・ランキング記事・収益化テンプレート。" }
] as const;

export default function HomePage() {
  return (
    <main>
      <JsonLd
        data={faqJsonLd([
          { question: "Uranai Gardenは無料で使えますか？", answer: "MVPではすべて無料で楽しめる想定です。広告・PRリンクを含む枠があります。" },
          { question: "占い結果は本格的な助言ですか？", answer: "占い結果はエンタメ目的です。重大な判断は専門家や信頼できる人へ相談してください。" }
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
              今日の運勢、星座占い、タロット、おみくじ、診断、夢占いをスマホで軽く楽しめるエンタメ占いサイトです。
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
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureLinks.map((link) => (
            <Link key={link.href} className="soft-card group" href={link.href}>
              <h2 className="text-xl font-bold text-plum">{link.title}</h2>
              <p className="mt-2 text-sm leading-7 text-plum/70">{link.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orchid">
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
        <PageHero kicker="NEW ARTICLES" title="収益化しやすい記事テンプレート" description="比較記事、ランキング記事、AdSense配置、再訪問導線をMVP時点から用意しています。" />
        <div className="grid gap-3 sm:grid-cols-2">
          {articles.map((article) => (
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
