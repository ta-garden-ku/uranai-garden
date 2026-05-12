import { PolicyPage } from "@/components/PolicyPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "免責事項｜Uranai Garden",
  description: "占い・診断コンテンツのエンタメ目的、外部リンク、情報の正確性に関する免責事項。",
  path: "/disclaimer"
});

export default function DisclaimerPage() {
  return (
    <PolicyPage
      kicker="DISCLAIMER"
      title="免責事項"
      description="安心して楽しんでいただくための免責事項です。"
      sections={[
        { heading: "エンタメ目的", body: "当サイトの占い・診断・夢占い・おみくじの結果はエンタメ目的です。人生の重大な意思決定を断定的に助言するものではありません。" },
        { heading: "専門的判断について", body: "医療、投資、法律、心理的な不調などに関する判断は、資格を持つ専門家や公的機関の情報をご確認ください。" },
        { heading: "情報の正確性", body: "掲載情報は可能な範囲で確認していますが、正確性や最新性を保証するものではありません。" },
        { heading: "外部リンク", body: "外部サイトで提供される情報、商品、サービスについて、当サイトは責任を負いません。" }
      ]}
    />
  );
}
