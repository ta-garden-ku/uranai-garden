import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { PopularContent } from "@/components/ContentBlocks";
import { SubscribeCta } from "@/components/CTABlocks";
import { PageHero } from "@/components/PageHero";
import { ShareButtons } from "@/components/ShareButtons";
import { zodiacSigns } from "@/lib/content";
import { buildDailyFortunes, todayKey } from "@/lib/fortune";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "今日の運勢｜12星座の日替わり占いランキング",
  description:
    "12星座ごとの今日の運勢を日付ベースで表示。総合運、恋愛運、仕事運、金運、健康運、ラッキーカラーを毎日チェック。",
  path: "/today"
});

export const revalidate = 3600;

export default function TodayPage() {
  const date = todayKey();
  const fortunes = buildDailyFortunes(zodiacSigns.map((sign) => sign.slug), date);

  return (
    <main className="page-shell space-y-8">
      <PageHero
        kicker={date}
        title="今日の運勢"
        description="日付と星座をもとに、毎日変わる12星座ランキングと運勢をお届けします。結果はエンタメとして楽しんでください。"
      />
      <AdSlot placement="article-top" />
      <section className="soft-card">
        <p className="kicker">DAILY RANKING</p>
        <h2 className="mt-2 text-2xl font-bold text-plum">今日の12星座ランキング</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {fortunes.map((fortune) => {
            const sign = zodiacSigns.find((item) => item.slug === fortune.sign);
            return (
              <Link
                key={fortune.sign}
                className="flex items-center justify-between rounded-lg bg-paper px-3 py-2 text-sm font-bold text-plum"
                href={`/zodiac/${fortune.sign}`}
              >
                <span>
                  {fortune.rank}位 {sign?.name}
                </span>
                <span className="text-mintnight">{fortune.score}点</span>
              </Link>
            );
          })}
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="grid gap-4">
          {fortunes.map((fortune) => {
            const sign = zodiacSigns.find((item) => item.slug === fortune.sign);
            return (
              <article key={fortune.sign} className="soft-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="kicker">
                      {fortune.rank}位 / {sign?.period}
                    </p>
                    <h2 className="text-2xl font-bold text-plum">{sign?.name}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-orchid">{fortune.score}</p>
                    <p className="text-xs font-bold text-plum/55">総合スコア</p>
                  </div>
                </div>
                <p className="mt-4 leading-8 text-plum/80">{fortune.total}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <p>
                    <strong>恋愛運：</strong>
                    {fortune.love}
                  </p>
                  <p>
                    <strong>仕事運：</strong>
                    {fortune.work}
                  </p>
                  <p>
                    <strong>金運：</strong>
                    {fortune.money}
                  </p>
                  <p>
                    <strong>健康運：</strong>
                    {fortune.wellness}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full bg-honey/25 px-3 py-1 font-bold">色: {fortune.luckyColor}</span>
                  <span className="rounded-full bg-mintnight/10 px-3 py-1 font-bold text-mintnight">
                    物: {fortune.luckyItem}
                  </span>
                </div>
                <p className="mt-4 rounded-lg bg-paper p-3 font-bold text-plum">{fortune.message}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link className="btn-secondary" href={`/zodiac/${fortune.sign}`}>
                    詳細を見る
                  </Link>
                  <ShareButtons title={`${sign?.name}の今日の運勢`} text={`${fortune.rank}位・${fortune.score}点。${fortune.message}`} />
                </div>
              </article>
            );
          })}
        </section>
        <aside className="space-y-4">
          <PopularContent />
          <AdSlot placement="sidebar" />
        </aside>
      </div>
      <AffiliateCards />
      <SubscribeCta />
    </main>
  );
}
