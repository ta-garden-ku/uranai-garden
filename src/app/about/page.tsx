import { PolicyPage } from "@/components/PolicyPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "運営者情報｜Uranai Garden",
  description: "Uranai Gardenの運営方針とコンテンツポリシー。",
  path: "/about"
});

export default function AboutPage() {
  return (
    <PolicyPage
      kicker="ABOUT"
      title="運営者情報"
      description="Uranai Gardenは、毎日を少し楽しくする占い・診断コンテンツを提供するエンタメサイトです。"
      sections={[
        { heading: "運営方針", body: "ユーザーが安心して楽しめるよう、結果はポジティブ寄りにし、不安を煽る表現や断定的な助言を避けます。" },
        { heading: "コンテンツについて", body: "占い、診断、夢占いの記事はエンタメ目的です。医療・投資・法律など専門性の高い判断は専門家へご相談ください。" },
        { heading: "広告について", body: "サイト運営のため、Google AdSenseやアフィリエイト広告を掲載する場合があります。広告・PR表記を分かりやすく表示します。" }
      ]}
    />
  );
}
