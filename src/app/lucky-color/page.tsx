import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { QuizDiagnosis } from "@/components/QuizDiagnosis";
import { diagnosisContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ラッキーカラー診断｜今日の気分に合う色",
  description: "今日の気分やほしい力から、取り入れたいラッキーカラーを診断します。",
  path: "/lucky-color"
});

export default function LuckyColorPage() {
  return (
    <main className="page-shell space-y-8">
      <QuizDiagnosis {...diagnosisContent.luckyColor} />
      <AdSlot placement="result-bottom" />
      <AffiliateCards category="ラッキーカラー" title="色や天然石を楽しむおすすめPR" />
    </main>
  );
}
