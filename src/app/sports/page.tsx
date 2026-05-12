import Link from "next/link";
import { Trophy } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { PageHero } from "@/components/PageHero";
import { sportsFortunes } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "スポーツ占い一覧｜野球・サッカー・バスケで今日の流れをチェック",
  description:
    "野球、サッカー、バスケ、ランニング、テニス、ゴルフのイメージで今日の行動ヒントを楽しめるスポーツ占い。",
  path: "/sports"
});

export default function SportsPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero
        kicker="SPORTS FORTUNE"
        title="スポーツ占い"
        description="競技の特徴を、今日の集中力・チームワーク・行動のヒントとして前向きに楽しめます。試合結果を断定する占いではありません。"
      />
      <AdSlot placement="article-top" />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sportsFortunes.map((sport) => (
          <Link key={sport.slug} className="soft-card group" href={`/sports/${sport.slug}`}>
            <div className="flex items-center gap-2 text-mintnight">
              <Trophy size={18} aria-hidden />
              <p className="kicker">SPORTS</p>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-plum">{sport.name}</h2>
            <p className="mt-2 text-sm leading-7 text-plum/70">{sport.description}</p>
            <p className="mt-4 rounded-lg bg-paper p-3 text-sm font-bold text-plum">{sport.message}</p>
          </Link>
        ))}
      </section>
      <AffiliateCards title="スポーツ占いと一緒に楽しむおすすめ商品枠" />
    </main>
  );
}
