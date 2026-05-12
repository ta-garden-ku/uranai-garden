import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { PageHero } from "@/components/PageHero";
import { articles, articleThemes } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articleThemes.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const theme = articleThemes.find((item) => item.slug === slug);
  if (!theme) return {};
  return buildMetadata({
    title: `${theme.name}一覧｜Uranai Garden`,
    description: theme.description,
    path: `/articles/category/${theme.slug}`
  });
}

export default async function ArticleThemePage({ params }: Props) {
  const { slug } = await params;
  const theme = articleThemes.find((item) => item.slug === slug);
  if (!theme) notFound();
  const items = articles.filter((article) =>
    article.tags.some((tag) => theme.matchTags.some((matchTag) => matchTag === tag))
  );

  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="ARTICLE CATEGORY" title={theme.name} description={theme.description} />
      <AdSlot placement="article-top" />
      <section className="grid gap-4 sm:grid-cols-2">
        {items.map((article) => (
          <Link key={article.slug} className="soft-card" href={`/articles/${article.slug}`}>
            <p className="kicker">{article.category} / {article.readingMinutes}分</p>
            <h2 className="mt-2 text-xl font-bold text-plum">{article.title}</h2>
            <p className="mt-2 text-sm leading-7 text-plum/70">{article.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
