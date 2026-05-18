import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { PopularContent, RelatedArticles } from "@/components/ContentBlocks";
import { SubscribeCta, TodayReturnCta } from "@/components/CTABlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
    type: "article"
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <main className="page-shell space-y-8">
      <JsonLd data={articleJsonLd({ ...article, path: `/articles/${article.slug}` })} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "ホーム", path: "/" }, { name: "記事", path: "/articles" }, { name: article.title, path: `/articles/${article.slug}` }])} />
      <PageHero kicker={`${article.category} / ${article.readingMinutes}分`} title={article.title} description={article.description} />
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <article className="space-y-6">
          <AdSlot placement="article-top" />
          {article.sections.map((section, index) => (
            <section key={section.heading} className="soft-card">
              <h2 className="text-2xl font-bold text-plum">{section.heading}</h2>
              <p className="mt-3 leading-8 text-plum/78">{section.body}</p>
              {index === 0 && <div className="mt-5"><AdSlot placement="article-middle" /></div>}
            </section>
          ))}
          <section className="soft-card">
            <h2 className="text-2xl font-bold text-plum">よくある質問</h2>
            <div className="mt-4 space-y-3">
              {article.faq.map((item) => (
                <details key={item.question} className="rounded-lg bg-paper p-4">
                  <summary className="cursor-pointer font-bold">{item.question}</summary>
                  <p className="mt-2 text-sm leading-7 text-plum/70">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <AffiliateCards title="記事下のおすすめ商品枠" category={article.category} tags={article.tags} />
          <AdSlot placement="article-bottom" />
          <RelatedArticles currentSlug={article.slug} />
          <TodayReturnCta />
          <SubscribeCta />
        </article>
        <aside className="space-y-4">
          <PopularContent />
          <AdSlot placement="sidebar" />
        </aside>
      </div>
    </main>
  );
}
