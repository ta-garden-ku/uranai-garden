import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { CompatibilityForm } from "@/components/CompatibilityForm";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "相性診断｜名前で今日の相性スコアをチェック",
  description: "2人の名前を入力して、今日の相性スコアと前向きな関わり方のヒントを表示します。",
  path: "/diagnosis/compatibility"
});

export default function CompatibilityPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="COMPATIBILITY" title="相性診断" description="相性は決めつけではなく、関わり方を楽しむヒントとして受け取ってください。" />
      <CompatibilityForm />
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
    </main>
  );
}
