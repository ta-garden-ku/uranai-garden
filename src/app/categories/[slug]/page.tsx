import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { articles, categories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name}の記事一覧｜Uranai Garden`,
    description: category.description,
    path: `/categories/${category.slug}`
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const items = articles.filter((article) => article.category === category.slug);

  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="CATEGORY" title={`${category.name}の記事`} description={category.description} />
      <section className="grid gap-4 sm:grid-cols-2">
        {items.map((article) => (
          <Link key={article.slug} className="soft-card" href={`/articles/${article.slug}`}>
            <h2 className="text-xl font-bold text-plum">{article.title}</h2>
            <p className="mt-2 text-sm leading-7 text-plum/70">{article.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
