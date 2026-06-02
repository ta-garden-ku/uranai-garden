import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const reviewDisallow = [
    "/share/result",
    "/birthday/",
    "/zodiac/",
    "/monthly/",
    "/seasonal/",
    "/tarot/",
    "/categories/affiliate",
    "/categories/monetization",
    "/articles/category/lucky-goods",
    "/articles/tarot-phone-fortune-safe-guide",
    "/articles/lucky-color-power-stone-accessory-guide",
    "/articles/a8-affiliate-program-selection-sheet",
    "/articles/fortune-ad-placement-ab-test-plan"
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: siteConfig.adsenseReviewMode ? reviewDisallow : ["/share/result"]
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  };
}
