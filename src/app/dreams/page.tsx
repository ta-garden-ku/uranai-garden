import { AdSlot } from "@/components/AdSlot";
import { DreamSearch } from "@/components/DreamSearch";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "夢占い一覧｜30件の夢キーワード検索",
  description: "猫、犬、蛇、海、空、落ちる、飛ぶなど30件以上の夢キーワードから意味を検索できます。",
  path: "/dreams"
});

export default function DreamsPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="DREAM DICTIONARY" title="夢占い一覧" description="夢に出てきたキーワードを検索して、今の気持ちをやさしく読み解きましょう。" />
      <AdSlot placement="article-top" />
      <DreamSearch />
    </main>
  );
}
