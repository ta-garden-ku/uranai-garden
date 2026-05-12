import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { BirthdayFortune } from "@/components/BirthdayFortune";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "誕生日占い｜生年月日から今日の運勢を診断",
  description: "誕生日を入力して、今日の総合運、ラッキーカラー、ラッキーアイテムを楽しめます。",
  path: "/birthday"
});

export default function BirthdayPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="BIRTHDAY" title="誕生日占い" description="生年月日から、今日の気分を明るくするヒントを表示します。" />
      <BirthdayFortune />
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
    </main>
  );
}
