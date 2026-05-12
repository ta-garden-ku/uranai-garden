import affiliateConfig from "@/content/affiliate-links.json";

export type AffiliateItem = (typeof affiliateConfig.items)[number];

export const affiliateDisclosure = affiliateConfig.disclosure;
export const affiliateItems = affiliateConfig.items;

export function getAffiliateItems(category?: string, limit = 3): AffiliateItem[] {
  const filtered = category
    ? affiliateItems.filter((item) => item.category === category)
    : affiliateItems;
  return filtered.slice(0, limit);
}
