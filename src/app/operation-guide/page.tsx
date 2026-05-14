import { AdSlot } from "@/components/AdSlot";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Uranai Garden 運用ガイド",
  description: "Uranai Gardenを育てるための記事追加、夢占い追加、広告、SEO確認の運用メモです。",
  path: "/operation-guide"
});

const tasks = [
  "週1回、夢占いキーワードを10〜30件追加する",
  "月1回、ランキング記事か比較記事を1本追加する",
  "Search Consoleで表示回数が増えているキーワードを見る",
  "AdSense審査結果が出たら、広告表示とポリシー違反がないか確認する",
  "アフィリエイトリンクを追加するときは広告・PR表記を残す"
];

const articleIdeas = [
  "初心者向けタロットカードおすすめランキング",
  "占い本おすすめ比較",
  "開運グッズの選び方",
  "夢占いでよく検索される夢100選",
  "スポーツの日に見たい勝負運占い",
  "誕生日占いの楽しみ方"
];

export default function OperationGuidePage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="OPERATION" title="運用ガイド" description="サイトを育てるために、次に何をすればいいかをまとめたページです。" />
      <section className="soft-card">
        <h2 className="text-2xl font-bold text-plum">毎週やること</h2>
        <ul className="mt-4 grid gap-3">
          {tasks.map((task) => (
            <li key={task} className="rounded-lg bg-paper p-4 text-sm font-bold text-plum">
              {task}
            </li>
          ))}
        </ul>
      </section>
      <AdSlot placement="article-middle" />
      <section className="soft-card">
        <h2 className="text-2xl font-bold text-plum">追加しやすい記事ネタ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {articleIdeas.map((idea) => (
            <div key={idea} className="rounded-lg bg-white/75 p-4 text-sm font-bold text-plum shadow-soft">
              {idea}
            </div>
          ))}
        </div>
      </section>
      <section className="soft-card">
        <h2 className="text-2xl font-bold text-plum">収益化の注意</h2>
        <p className="mt-3 leading-8 text-plum/78">
          AdSenseやアフィリエイトは、審査・規約・税務の確認が必要です。広告やPRリンクを入れる記事では「広告」「PR」の表記を残し、
          医療・投資・法律・人生の重大な判断を断定しないようにします。収益が出た場合は、必要に応じて確定申告の対象になります。
        </p>
      </section>
    </main>
  );
}
