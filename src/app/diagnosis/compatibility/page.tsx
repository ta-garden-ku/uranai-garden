import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { CompatibilityForm } from "@/components/CompatibilityForm";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "相性診断｜名前と星座で今日の相性スコアをチェック",
  description: "2人の名前、星座、関係性から今日の相性スコアを表示します。恋愛、友達、仕事仲間、家族の関係をエンタメとして楽しめます。",
  path: "/diagnosis/compatibility"
});

export default function CompatibilityPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero
        kicker="COMPATIBILITY"
        title="相性診断"
        description="名前と星座から、今日の相性スコアと関係を育てるヒントを表示します。"
      />
      <CompatibilityForm />
      <AdSlot placement="result-bottom" />
      <AffiliateCards category="恋愛" title="相性や恋愛の気持ちを整理したい方向けPR" />
    </main>
  );
}
