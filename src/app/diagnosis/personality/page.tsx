import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { QuizDiagnosis } from "@/components/QuizDiagnosis";
import { diagnosisContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "性格診断｜あなたの動き方タイプをチェック",
  description: "質問に答えて、あなたの性格タイプと今日のヒントを診断します。",
  path: "/diagnosis/personality"
});

export default function PersonalityDiagnosisPage() {
  return (
    <main className="page-shell space-y-8">
      <QuizDiagnosis {...diagnosisContent.personality} />
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
    </main>
  );
}
