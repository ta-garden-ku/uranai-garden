import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "@/app/globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { entertainmentNotice, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Uranai Garden｜毎日楽しめる占い・診断・おみくじ",
  description: siteConfig.description
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4b235f"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-site-verification" content="RJvGN6LGUJqEPGGMLFMpFK9H2x8rEgyZcFpmG_smE2E" />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-aurora">
        {siteConfig.gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteConfig.gaId}');
              `}
            </Script>
          </>
        ) : null}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.url}/dreams?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          }}
        />
        <SiteHeader />
        <div className="bg-honey/20 px-4 py-2 text-center text-xs font-bold text-plum/75">
          {entertainmentNotice}
        </div>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
