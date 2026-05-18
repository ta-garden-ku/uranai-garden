import affiliateConfig from "@/content/affiliate-links.json";

export type AffiliateItem = {
  id: string;
  category: string;
  tags: string[];
  title: string;
  description: string;
  priceLabel: string;
  badge: string;
  url: string;
  imageUrl?: string;
  trackingPixelUrl?: string;
};

export const affiliateDisclosure = affiliateConfig.disclosure;
export const affiliateItems = affiliateConfig.items as AffiliateItem[];

type AffiliateMatchOptions = {
  category?: string;
  tags?: string[];
};

export function getAffiliateItems(category?: string, limit?: number): AffiliateItem[];
export function getAffiliateItems(options?: AffiliateMatchOptions, limit?: number): AffiliateItem[];
export function getAffiliateItems(
  input?: string | AffiliateMatchOptions,
  limit = 3
): AffiliateItem[] {
  const options = typeof input === "string" ? { category: input } : (input ?? {});
  const keys = [options.category, ...(options.tags ?? [])].filter(Boolean) as string[];

  if (keys.length === 0) return affiliateItems.slice(0, limit);

  const scored = affiliateItems
    .map((item) => {
      const score = keys.reduce((total, key) => {
        if (item.category === key) return total + 3;
        if (item.tags.includes(key)) return total + 2;
        if (item.title.includes(key) || item.description.includes(key)) return total + 1;
        return total;
      }, 0);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);

  return (scored.length > 0 ? scored : affiliateItems).slice(0, limit);
}
