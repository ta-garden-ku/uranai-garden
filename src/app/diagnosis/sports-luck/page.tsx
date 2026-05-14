import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { QuizDiagnosis } from "@/components/QuizDiagnosis";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "スポーツ勝負運診断｜今日の集中力とチーム運",
  description: "部活、観戦、趣味スポーツの前に楽しめる、勝負運と集中力のエンタメ診断です。",
  path: "/diagnosis/sports-luck"
});

const content = {
  title: "スポーツ勝負運診断",
  description: "今日の集中力、チームワーク、気分の整え方をスポーツ占いとして診断します。",
  questions: [
    { text: "試合前に大事にしたいことは？", options: ["準備", "勢い", "声かけ"] },
    { text: "得意なプレーは？", options: ["守る", "攻める", "つなぐ"] },
    { text: "緊張したときは？", options: ["深呼吸", "体を動かす", "仲間を見る"] },
    { text: "今日のテーマは？", options: ["安定", "挑戦", "連携"] },
    { text: "ラッキーアイテムにするなら？", options: ["タオル", "ボトル", "手帳"] }
  ],
  results: [
    { title: "安定ディフェンスタイプ", body: "準備と落ち着きが味方になる日。最初の一歩を丁寧にすると集中しやすくなります。" },
    { title: "チャレンジアタックタイプ", body: "前向きな勢いが出やすい日。結果を急がず、思い切って試す姿勢が魅力です。" },
    { title: "チームワークタイプ", body: "周りとの声かけが運気を整えます。小さな合図や感謝が良い流れを作りそうです。" }
  ]
} as const;

export default function SportsLuckDiagnosisPage() {
  return (
    <main className="page-shell space-y-8">
      <QuizDiagnosis {...content} />
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
    </main>
  );
}
