import Link from "next/link";
import { Trophy } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { PageHero } from "@/components/PageHero";
import { SportsIllustration } from "@/components/SportsIllustration";
import { SportsMatchDay } from "@/components/SportsMatchDay";
import { buildSportsDailyFortune, sportsProfiles } from "@/lib/sports";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "スポーツ占い一覧｜試合前に見たい今日の勝負運",
  description:
    "野球、サッカー、バスケ、ランニング、テニス、ゴルフなど、試合前や観戦前に楽しめるスポーツ占いです。応援チームの今日の勝負運もチェックできます。",
  path: "/sports"
});

export default function SportsPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero
        kicker="SPORTS FORTUNE"
        title="スポーツ占い"
        description="試合前、観戦前、部活や趣味スポーツの前に。今日の勝負運、集中力、チーム運をエンタメとして楽しめます。"
      />
      <SportsMatchDay />
      <AdSlot placement="article-top" />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sportsProfiles.map((sport) => {
          const fortune = buildSportsDailyFortune(sport.slug, sport.shortName);
          return (
            <Link key={sport.slug} className="sports-card group rounded-lg bg-white/88 p-4 shadow-soft transition hover:-translate-y-1" href={`/sports/${sport.slug}`}>
              <SportsIllustration sport={sport} compact />
              <div className="mt-4 flex items-center gap-2 text-mintnight">
                <Trophy size={18} aria-hidden />
                <p className="kicker">SPORTS</p>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-plum">{sport.name}</h2>
              <p className="mt-2 text-sm leading-7 text-plum/70">{sport.description}</p>
              <div className="mt-4 rounded-lg bg-paper p-3">
                <p className="text-xs font-bold text-plum/55">今日の勝負運</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-black text-orchid">{fortune.score}</span>
                  <span className="pb-1 text-sm font-bold text-plum">点</span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
      <AffiliateCards title="スポーツ占いと一緒に楽しむおすすめ商品枠" />
    </main>
  );
}
