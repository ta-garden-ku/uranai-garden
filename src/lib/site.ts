export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Uranai Garden",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uranai-garden.example.com",
  description: "今日の運勢、タロット、夢占い、診断をスマホで気軽に楽しめるエンタメ占いサイトです。結果は断定ではなく、毎日の気分を整えるヒントとして読めます。",
  lineCtaUrl: process.env.NEXT_PUBLIC_LINE_CTA_URL ?? "https://line.me/R/",
  emailCtaUrl: process.env.NEXT_PUBLIC_EMAIL_CTA_URL ?? "/contact",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-3214842113322197",
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  adsenseReviewMode: process.env.NEXT_PUBLIC_ADSENSE_REVIEW_MODE !== "false",
  showAdPlaceholders: process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true",
  showAffiliateCards: process.env.NEXT_PUBLIC_SHOW_AFFILIATE_CARDS === "true"
} as const;

export const entertainmentNotice =
  "Uranai Gardenの占い・診断結果はエンタメ目的です。医療・投資・法律・人生の重大な判断は、必要に応じて専門家へご相談ください。";

export const mainNav = [
  { href: "/today", label: "今日の運勢" },
  { href: "/monthly", label: "月別占い" },
  { href: "/zodiac", label: "星座占い" },
  { href: "/tarot", label: "タロット" },
  { href: "/omikuji", label: "おみくじ" },
  { href: "/sports", label: "スポーツ占い" },
  { href: "/dreams", label: "夢占い" },
  { href: "/articles", label: "記事" }
] as const;

export const popularLinks = [
  { href: "/today", title: "今日の運勢", label: "毎日チェック" },
  { href: "/tarot", title: "タロット1枚引き", label: "人気" },
  { href: "/dreams", title: "夢占い辞典", label: "辞典" },
  { href: "/omikuji", title: "おみくじ", label: "気軽" },
  { href: "/diagnosis/love", title: "恋愛タイプ診断", label: "診断" },
  { href: "/diagnosis/personality", title: "性格タイプ診断", label: "診断" },
  { href: "/lucky-color", title: "ラッキーカラー診断", label: "毎日" },
  { href: "/sports", title: "スポーツ占い", label: "試合前" },
  { href: "/articles/common-dreams-30", title: "よく見る夢30選", label: "読み物" },
  { href: "/about", title: "運営者情報", label: "方針" }
] as const;
