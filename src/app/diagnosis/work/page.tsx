import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { QuizDiagnosis } from "@/components/QuizDiagnosis";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "仕事タイプ診断｜あなたの得意な働き方をチェック",
  description: "質問に答えて、今日のあなたに合う仕事の進め方や集中のヒントをエンタメ診断として楽しめます。",
  path: "/diagnosis/work"
});

const content = {
  title: "仕事タイプ診断",
  description: "今日の気分に合う働き方、集中しやすい進め方をやさしく診断します。",
  questions: [
    { text: "朝いちばんにやりたいことは？", options: ["予定を整理する", "手を動かして始める", "情報を集める"] },
    { text: "得意な役割は？", options: ["まとめ役", "実行役", "アイデア役"] },
    { text: "集中しやすい環境は？", options: ["静かな場所", "ほどよく人がいる場所", "音楽がある場所"] },
    { text: "迷ったときは？", options: ["リストにする", "まず試す", "誰かに相談する"] },
    { text: "今日ほしい言葉は？", options: ["大丈夫", "進んでる", "おもしろい"] }
  ],
  results: [
    { title: "整えるプランナータイプ", body: "段取りを組むほど力が出る日。やることを3つに絞ると、気持ちよく進められそうです。" },
    { title: "軽やかアクションタイプ", body: "考えすぎるより、短い時間で一歩動くと流れが作れます。完璧より着手を大切に。" },
    { title: "ひらめきクリエイタータイプ", body: "新しい見方が浮かびやすい日。メモを残しておくと、あとで良い形に育ちます。" }
  ]
} as const;

export default function WorkDiagnosisPage() {
  return (
    <main className="page-shell space-y-8">
      <QuizDiagnosis {...content} />
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
    </main>
  );
}
