import { AdSlot } from "@/components/AdSlot";
import { DreamCategoryLinks, PopularDreams } from "@/components/DreamBlocks";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "夢占いカテゴリ一覧｜動物・恋愛・人・場所・行動・色の夢",
  description: "夢占い辞典をカテゴリ別に探せます。動物、自然、恋愛、人、場所、物、行動、色、スポーツの夢を収録。",
  path: "/dreams/category"
});

export default function DreamCategoryIndexPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero
        kicker="DREAM CATEGORIES"
        title="夢占いカテゴリ一覧"
        description="夢の内容をカテゴリから探せます。印象に残っているもの、人、場所、行動、色から意味を見つけてみましょう。"
      />
      <AdSlot placement="article-top" />
      <DreamCategoryLinks />
      <PopularDreams />
    </main>
  );
}
