import { ExternalLink } from "lucide-react";
import { affiliateDisclosure, affiliateItems, getAffiliateItems, type AffiliateItem } from "@/lib/affiliate";

type Props = {
  title?: string;
  items?: AffiliateItem[];
  category?: string;
};

export function AffiliateCards({ title = "おすすめ商品", items, category }: Props) {
  const displayItems = items ?? (category ? getAffiliateItems(category, 3) : affiliateItems.slice(0, 3));
  const filledItems = displayItems.length > 0 ? displayItems : affiliateItems.slice(0, 3);

  return (
    <section className="space-y-3">
      <div>
        <p className="text-xs font-bold tracking-[0.18em] text-mintnight">広告・PR</p>
        <h2 className="text-xl font-bold text-plum">{title}</h2>
        <p className="text-sm text-plum/65">{affiliateDisclosure}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {filledItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            className="rounded-lg border border-white/80 bg-white/85 p-4 shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
            rel="sponsored noopener noreferrer"
          >
            <span className="inline-flex rounded-full bg-honey/25 px-2 py-1 text-xs font-bold text-plum">
              {item.badge}
            </span>
            <h3 className="mt-3 font-bold text-plum">{item.title}</h3>
            <p className="mt-2 text-sm text-plum/70">{item.description}</p>
            <div className="mt-3 flex items-center justify-between text-sm font-bold text-mintnight">
              <span>{item.priceLabel}</span>
              <ExternalLink aria-hidden size={16} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
