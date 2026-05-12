import type { MetadataRoute } from "next";
import { articles, categories, dreams, zodiacSigns } from "@/lib/content";
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
    ...articles.map((item) => `/articles/${item.slug}`),
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
