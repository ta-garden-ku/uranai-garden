import Link from "next/link";
import { ChevronRight, Flame } from "lucide-react";
import { articles } from "@/lib/content";
import { popularLinks } from "@/lib/site";

export function PopularContent() {
  return (
    <section className="rounded-lg bg-white/80 p-4 shadow-soft">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-mintnight">
        <Flame size={17} aria-hidden />
        人気コンテンツランキング
      </div>
      <ol className="space-y-2">
        {popularLinks.map((link, index) => (
          <li key={link.href}>
            <Link className="flex items-center justify-between rounded-lg bg-paper/80 px-3 py-2 text-sm font-bold text-plum" href={link.href}>
              <span>
                {index + 1}. {link.title}
              </span>
              <span className="text-xs text-plum/55">{link.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RelatedArticles({ currentSlug }: { currentSlug?: string }) {
  const current = articles.find((article) => article.slug === currentSlug);
  const items = current
    ? current.related.map((slug) => articles.find((article) => article.slug === slug)).filter(Boolean)
    : articles.slice(0, 3);

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-plum">関連記事</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map(
          (article) =>
            article && (
              <Link key={article.slug} className="rounded-lg bg-white/85 p-4 shadow-soft" href={`/articles/${article.slug}`}>
                <p className="text-xs font-bold text-mintnight">{article.category}</p>
                <h3 className="mt-2 font-bold text-plum">{article.title}</h3>
                <p className="mt-2 text-sm text-plum/70">{article.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-orchid">
                  読む <ChevronRight size={15} aria-hidden />
                </span>
              </Link>
            )
        )}
      </div>
    </section>
  );
}
