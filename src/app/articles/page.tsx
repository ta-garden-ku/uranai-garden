import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { PageHero } from "@/components/PageHero";
import { articles, categories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "記事一覧｜占いサイトのSEO・収益化・比較記事テンプレート",
  description: "占い・診断サイトのSEO、AdSense、アフィリエイト、比較記事、ランキング記事テンプレートをまとめています。",
  path: "/articles"
});

export default function ArticlesPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="ARTICLES" title="記事一覧" description="検索流入と収益化を狙うための初期記事テンプレートです。" />
      <AdSlot placement="article-top" />
      <section className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link key={category.slug} className="btn-secondary" href={`/categories/${category.slug}`}>
            {category.name}
          </Link>
        ))}
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.slug} className="soft-card" href={`/articles/${article.slug}`}>
            <p className="kicker">{article.category} / {article.readingMinutes}分</p>
            <h2 className="mt-2 text-2xl font-bold text-plum">{article.title}</h2>
            <p className="mt-2 leading-7 text-plum/70">{article.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-paper px-2 py-1 text-xs font-bold text-plum/60">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
