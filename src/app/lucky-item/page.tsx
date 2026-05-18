import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { QuizDiagnosis } from "@/components/QuizDiagnosis";
import { diagnosisContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ラッキーアイテム診断｜今日持ちたい小物",
  description: "予定や気分に合わせて、今日のラッキーアイテムを診断します。",
  path: "/lucky-item"
});

export default function LuckyItemPage() {
  return (
    <main className="page-shell space-y-8">
      <QuizDiagnosis {...diagnosisContent.luckyItem} />
      <AdSlot placement="result-bottom" />
      <AffiliateCards category="ラッキーアイテム" title="今日の気分に合わせたいおすすめPR" />
    </main>
  );
}
