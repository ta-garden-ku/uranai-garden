export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Uranai Garden",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uranai-garden.example.com",
  description:
    "毎日使える占い・診断・おみくじを楽しめる、スマホ向けエンタメ占いサイトです。",
  lineCtaUrl: process.env.NEXT_PUBLIC_LINE_CTA_URL ?? "https://line.me/R/",
  emailCtaUrl: process.env.NEXT_PUBLIC_EMAIL_CTA_URL ?? "/contact",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-xxxxxxxxxxxxxxxx"
} as const;

export const entertainmentNotice =
  "Uranai Gardenの占い・診断結果はエンタメ目的です。医療・投資・法律・人生の重大な判断は、必要に応じて専門家へご相談ください。";

export const mainNav = [
  { href: "/today", label: "今日の運勢" },
  { href: "/zodiac", label: "星座占い" },
  { href: "/tarot", label: "タロット" },
  { href: "/omikuji", label: "おみくじ" },
  { href: "/dreams", label: "夢占い" },
  { href: "/articles", label: "記事" }
] as const;

export const popularLinks = [
  { href: "/today", title: "今日の運勢", label: "毎朝チェック" },
  { href: "/tarot", title: "タロット1枚引き", label: "SNSで人気" },
  { href: "/diagnosis/love", title: "恋愛タイプ診断", label: "診断" },
  { href: "/dreams", title: "夢占い検索", label: "検索流入" },
  { href: "/lucky-color", title: "ラッキーカラー診断", label: "再訪問" }
] as const;
