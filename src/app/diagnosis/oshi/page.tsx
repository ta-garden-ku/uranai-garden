import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { QuizDiagnosis } from "@/components/QuizDiagnosis";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "推し活タイプ診断｜今日の楽しみ方をチェック",
  description: "推し活の楽しみ方、SNSとの距離感、今日のラッキー行動を診断するエンタメコンテンツです。",
  path: "/diagnosis/oshi"
});

const content = {
  title: "推し活タイプ診断",
  description: "今日の推し活をもっと楽しくする距離感と行動のヒントを診断します。",
  questions: [
    { text: "推し活で一番楽しい瞬間は？", options: ["情報を追う", "グッズを眺める", "友達と語る"] },
    { text: "SNSを見る時間は？", options: ["短めにしたい", "たくさん見たい", "気分で決めたい"] },
    { text: "今日の気分は？", options: ["静かに楽しみたい", "全力で盛り上がりたい", "誰かと共有したい"] },
    { text: "グッズを選ぶなら？", options: ["実用性", "見た目", "記念感"] },
    { text: "推しからもらう元気は？", options: ["安心", "刺激", "つながり"] }
  ],
  results: [
    { title: "癒やしチャージタイプ", body: "無理に追いかけすぎず、好きな場面をゆっくり味わうと満たされる日です。" },
    { title: "きらめき全力タイプ", body: "楽しい気持ちを行動に変えやすい日。お気に入りを写真に残すのもおすすめです。" },
    { title: "共有ハッピータイプ", body: "誰かと語ることで楽しさが増える日。SNSは心地よい範囲で使いましょう。" }
  ]
} as const;

export default function OshiDiagnosisPage() {
  return (
    <main className="page-shell space-y-8">
      <QuizDiagnosis {...content} />
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
    </main>
  );
}
