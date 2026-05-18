/* eslint-disable @next/next/no-img-element */
import { ExternalLink } from "lucide-react";
import { affiliateDisclosure, affiliateItems, getAffiliateItems, type AffiliateItem } from "@/lib/affiliate";

type Props = {
  title?: string;
  items?: AffiliateItem[];
  category?: string;
  tags?: string[];
};

export function AffiliateCards({ title = "おすすめ商品", items, category, tags }: Props) {
  const displayItems = items ?? getAffiliateItems({ category, tags }, 3);
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
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
          >
            {item.imageUrl && (
              // A8の広告素材画像です。altは商品名にして、広告でも内容が伝わるようにします。
              <img className="mb-3 aspect-[6/5] w-full rounded-md object-cover" src={item.imageUrl} alt={item.title} loading="lazy" />
            )}
            <span className="inline-flex rounded-full bg-honey/25 px-2 py-1 text-xs font-bold text-plum">
              {item.badge}
            </span>
            <h3 className="mt-3 font-bold text-plum">{item.title}</h3>
            <p className="mt-2 text-sm text-plum/70">{item.description}</p>
            <div className="mt-3 flex items-center justify-between text-sm font-bold text-mintnight">
              <span>{item.priceLabel}</span>
              <ExternalLink aria-hidden size={16} />
            </div>
            {item.trackingPixelUrl && <img src={item.trackingPixelUrl} width="1" height="1" alt="" loading="lazy" />}
          </a>
        ))}
      </div>
    </section>
  );
}
