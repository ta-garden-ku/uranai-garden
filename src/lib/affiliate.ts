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

export function getAffiliateItems(category?: string, limit = 3): AffiliateItem[] {
  const filtered = category
    ? affiliateItems.filter((item) => item.category === category)
    : affiliateItems;
  const tagMatched = category
    ? affiliateItems.filter((item) => item.category !== category && item.tags.includes(category))
    : [];
  return [...filtered, ...tagMatched].slice(0, limit);
}
