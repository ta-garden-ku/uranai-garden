import type { MetadataRoute } from "next";
import { articles, articleThemes, categories, dreamCategories, dreams, zodiacSigns } from "@/lib/content";
import { daysInMonth, monthlyFortunes, seasonalFortunes } from "@/lib/calendarFortunes";
import { sportsProfiles } from "@/lib/sports";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/today",
    "/zodiac",
    "/birthday",
    "/tarot",
    "/omikuji",
    "/diagnosis",
    "/diagnosis/love",
    "/diagnosis/personality",
    "/diagnosis/compatibility",
    "/diagnosis/work",
    "/diagnosis/money",
    "/diagnosis/oshi",
    "/diagnosis/sports-luck",
    "/dreams",
    "/dreams/category",
    "/sports",
    "/monthly",
    "/seasonal",
    "/lucky-color",
    "/lucky-item",
    "/articles",
    "/share/result",
    "/operation-guide",
    "/contact",
    "/about",
    "/privacy",
    "/disclaimer",
    "/ads-affiliate-policy"
  ];

  const dynamicPaths = [
    ...zodiacSigns.map((item) => `/zodiac/${item.slug}`),
    ...dreams.map((item) => `/dreams/${item.slug}`),
    ...dreamCategories.map((item) => `/dreams/category/${item.slug}`),
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
