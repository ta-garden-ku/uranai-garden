import type { MetadataRoute } from "next";
import { articles, articleThemes, categories, dreamCategories, dreams, popularDreamSlugs, tarotCards, zodiacSigns } from "@/lib/content";
import { daysInMonth, monthlyFortunes, seasonalFortunes } from "@/lib/calendarFortunes";
import { sportsProfiles } from "@/lib/sports";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/today",
    "/birthday",
    "/tarot",
    "/omikuji",
    "/diagnosis",
    "/diagnosis/love",
    "/diagnosis/personality",
    "/diagnosis/compatibility",
    "/diagnosis/sports-luck",
    "/dreams",
    "/dreams/category",
    "/sports",
    "/lucky-color",
    "/lucky-item",
    "/articles",
    "/contact",
    "/about",
    "/privacy",
    "/disclaimer",
    "/ads-affiliate-policy"
  ];

  const reviewDreamPaths = dreams
    .filter((item) => popularDreamSlugs.includes(item.slug as (typeof popularDreamSlugs)[number]))
    .map((item) => `/dreams/${item.slug}`);

  const fullDynamicPaths = [
    ...zodiacSigns.map((item) => `/zodiac/${item.slug}`),
    ...dreams.map((item) => `/dreams/${item.slug}`),
    ...dreamCategories.map((item) => `/dreams/category/${item.slug}`),
    ...tarotCards.flatMap((item) => [`/tarot/${item.slug}/upright`, `/tarot/${item.slug}/reversed`]),
    ...sportsProfiles.map((item) => `/sports/${item.slug}`),
    ...monthlyFortunes.map((item) => `/monthly/${item.month}`),
    ...seasonalFortunes.map((item) => `/seasonal/${item.slug}`),
    ...Array.from({ length: 12 }, (_, index) => index + 1).flatMap((month) =>
      Array.from({ length: daysInMonth(month) }, (_, dayIndex) => `/birthday/${month}/${dayIndex + 1}`)
    ),
    ...articles.map((item) => `/articles/${item.slug}`),
    ...articleThemes.map((item) => `/articles/category/${item.slug}`),
    ...categories.map((item) => `/categories/${item.slug}`)
  ];

  const reviewDynamicPaths = [
    ...reviewDreamPaths,
    ...dreamCategories.slice(0, 6).map((item) => `/dreams/category/${item.slug}`),
    ...sportsProfiles.slice(0, 4).map((item) => `/sports/${item.slug}`),
    ...articles
      .filter((item) => item.category !== "affiliate" && item.category !== "monetization")
      .slice(0, 8)
      .map((item) => `/articles/${item.slug}`),
    ...articleThemes
      .filter((item) => ["tarot", "dream", "love", "daily", "sports"].includes(item.slug))
      .map((item) => `/articles/category/${item.slug}`),
    ...categories
      .filter((item) => ["seo", "sports"].includes(item.slug))
      .map((item) => `/categories/${item.slug}`)
  ];

  const dynamicPaths = siteConfig.adsenseReviewMode ? reviewDynamicPaths : fullDynamicPaths;

  return [...staticPaths, ...dynamicPaths].map((path) => {
    const changeFrequency = path === "/today" || path.startsWith("/zodiac") ? "daily" : "weekly";
    return {
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority: path === "" ? 1 : path === "/today" ? 0.9 : 0.7
    };
  });
}
