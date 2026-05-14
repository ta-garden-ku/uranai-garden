import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { QuizDiagnosis } from "@/components/QuizDiagnosis";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "金運タイプ診断｜今日のお金との付き合い方",
  description: "金運を投資助言ではなく、買い物や予算感を見直すエンタメ診断として楽しめます。",
  path: "/diagnosis/money"
});

const content = {
  title: "金運タイプ診断",
  description: "今日のお金との付き合い方を、買い物・整理・楽しみ方のヒントとして診断します。",
  questions: [
    { text: "買い物前にすることは？", options: ["比較する", "直感で選ぶ", "口コミを見る"] },
    { text: "今日気になるものは？", options: ["実用品", "気分が上がるもの", "学びになるもの"] },
    { text: "お金の不安があるときは？", options: ["予算を見る", "少し保留する", "誰かに聞く"] },
    { text: "節約のイメージは？", options: ["整える", "我慢しすぎない", "楽しく工夫する"] },
    { text: "今日のラッキー行動は？", options: ["財布を整える", "欲しい物リストを書く", "レシートを見る"] }
  ],
  results: [
    { title: "予算すっきりタイプ", body: "見える化が金運の味方。今日の支出を軽く確認すると、安心して楽しめます。" },
    { title: "満足度重視タイプ", body: "安さだけでなく、使うたび気分が上がるかを基準にすると良い買い物になりそうです。" },
    { title: "学び投資タイプ", body: "本や道具など、未来の自分を助けるものに目が向きやすい日。ただし大きな判断は情報整理を優先しましょう。" }
  ]
} as const;

export default function MoneyDiagnosisPage() {
  return (
    <main className="page-shell space-y-8">
      <QuizDiagnosis {...content} />
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
    </main>
  );
}
