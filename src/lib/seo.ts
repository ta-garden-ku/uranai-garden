import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/hero-garden.png",
  type = "website"
}: PageMeta): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      locale: "ja_JP",
      type
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: absoluteUrl(article.path),
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    articleSection: article.category,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name }
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
