import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { DreamCategoryLinks, PopularDreams } from "@/components/DreamBlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { dreamCategories, dreams } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return dreamCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = dreamCategories.find((item) => item.slug === slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name}一覧｜夢占い辞典`,
    description: category.description,
    path: `/dreams/category/${category.slug}`
  });
}

export default async function DreamCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = dreamCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  const items = category.dreamSlugs
    .map((dreamSlug) => dreams.find((dream) => dream.slug === dreamSlug))
    .filter(Boolean);

  return (
    <main className="page-shell space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "夢占い辞典", path: "/dreams" },
          { name: category.name, path: `/dreams/category/${category.slug}` }
        ])}
      />
      <PageHero kicker="DREAM CATEGORY" title={category.name} description={category.description} />
      <AdSlot placement="article-top" />
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((dream) => (
          dream && (
            <Link key={dream.slug} className="soft-card" href={`/dreams/${dream.slug}`}>
              <p className="kicker">DREAM</p>
              <h2 className="mt-2 text-xl font-bold text-plum">{dream.keyword}の夢</h2>
              <p className="mt-2 text-sm leading-7 text-plum/70">{dream.meaning}</p>
            </Link>
          )
        ))}
      </section>
      <PopularDreams />
      <DreamCategoryLinks />
    </main>
  );
}
