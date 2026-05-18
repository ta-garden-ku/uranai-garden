import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { PageHero } from "@/components/PageHero";
import { TarotCardArt } from "@/components/TarotCardArt";
import { TarotDraw } from "@/components/TarotDraw";
import { tarotCards } from "@/lib/content";
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
      <section className="soft-card">
        <p className="kicker">CARD MEANINGS</p>
        <h2 className="mt-2 text-2xl font-black text-plum">大アルカナ22枚の意味一覧</h2>
        <p className="mt-2 text-sm leading-7 text-plum/70">
          引いたカードの正位置・逆位置を詳しく読めます。検索から来た人にも、1枚引きへ戻りやすい導線にしています。
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tarotCards.map((card) => (
            <Link key={card.slug} className="tarot-meaning-card rounded-lg bg-white/80 p-3 shadow-soft" href={`/tarot/${card.slug}/upright`}>
              <TarotCardArt slug={card.slug} compact />
              <div>
                <h3 className="font-black text-plum">{card.name}</h3>
                <p className="mt-1 text-xs font-bold text-mintnight">{card.theme}</p>
                <p className="mt-2 text-xs leading-6 text-plum/65">{card.upright}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <AdSlot placement="result-bottom" />
      <AffiliateCards category="タロットカード" title="タロットカードのおすすめ枠" />
    </main>
  );
}
