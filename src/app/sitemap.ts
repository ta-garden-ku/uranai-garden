import type { MetadataRoute } from "next";
import { articles, articleThemes, categories, dreamCategories, dreams, sportsFortunes, zodiacSigns } from "@/lib/content";
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

  const dynamicPaths = [
    ...zodiacSigns.map((item) => `/zodiac/${item.slug}`),
    ...dreams.map((item) => `/dreams/${item.slug}`),
    ...dreamCategories.map((item) => `/dreams/category/${item.slug}`),
    ...sportsFortunes.map((item) => `/sports/${item.slug}`),
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
