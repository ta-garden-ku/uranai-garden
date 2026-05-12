import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { OmikujiDraw } from "@/components/OmikujiDraw";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "おみくじ｜今日の運勢を前向きに楽しむ",
  description: "大吉から凶まで、すべて前向きな言葉で受け取れるエンタメおみくじ。",
  path: "/omikuji"
});

export default function OmikujiPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="OMIKUJI" title="おみくじ" description="今日の気分を軽く整える、やさしいおみくじです。" />
      <OmikujiDraw />
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
    </main>
  );
}
