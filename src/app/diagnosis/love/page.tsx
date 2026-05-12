import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { QuizDiagnosis } from "@/components/QuizDiagnosis";
import { buildMetadata } from "@/lib/seo";
import { diagnosisContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "恋愛タイプ診断｜5つの質問で恋の傾向をチェック",
  description: "恋愛コミュニケーションの傾向を、前向きな診断結果として楽しめます。",
  path: "/diagnosis/love"
});

export default function LoveDiagnosisPage() {
  const content = diagnosisContent.love;
  return (
    <main className="page-shell space-y-8">
      <QuizDiagnosis {...content} />
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
    </main>
  );
}
