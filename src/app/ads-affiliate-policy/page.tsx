import { PolicyPage } from "@/components/PolicyPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "広告・アフィリエイトポリシー｜Uranai Garden",
  description: "広告、PR、アフィリエイトリンク、商品紹介に関する運営方針。",
  path: "/ads-affiliate-policy"
});

export default function AdsAffiliatePolicyPage() {
  return (
    <PolicyPage
      kicker="ADS POLICY"
      title="広告・アフィリエイトポリシー"
      description="広告・PRリンクの表示と、商品紹介の考え方をまとめています。"
      sections={[
        { heading: "広告・PR表記", body: "広告やアフィリエイトリンクを含む枠には「広告」「PR」などの表記を行い、読者に分かりやすく表示します。" },
        { heading: "アフィリエイトリンク", body: "リンク経由で商品やサービスが購入された場合、当サイトが報酬を受け取ることがあります。読者の追加負担は通常ありません。" },
        { heading: "商品紹介の基準", body: "商品は楽しみ方、使いやすさ、選び方を中心に紹介します。開運効果や健康・金銭的成果を断定する表現は避けます。" },
        { heading: "広告掲載位置", body: "記事上部、記事中、記事下、サイドバー、結果ページ下部に広告枠を設置します。ユーザー体験を妨げない配置を優先します。" }
      ]}
    />
  );
}
