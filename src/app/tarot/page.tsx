import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { PageHero } from "@/components/PageHero";
import { TarotDraw } from "@/components/TarotDraw";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "タロット1枚引き｜大アルカナ22枚で今日のヒント",
  description: "22枚の大アルカナから1枚をランダムに引き、恋愛・仕事・人間関係のメッセージを表示します。",
  path: "/tarot"
});

export default function TarotPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="TAROT" title="タロット1枚引き" description="正位置・逆位置のメッセージを、前向きなセルフリフレクションとして楽しめます。" />
      <TarotDraw />
      <AdSlot placement="result-bottom" />
      <AffiliateCards category="タロットカード" title="タロットカードのおすすめ枠" />
    </main>
  );
}
