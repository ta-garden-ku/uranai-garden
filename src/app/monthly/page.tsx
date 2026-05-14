import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { SubscribeCta, TodayReturnCta } from "@/components/CTABlocks";
import { PageHero } from "@/components/PageHero";
import { monthlyFortunes } from "@/lib/calendarFortunes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "今月の運勢・月別占い一覧",
  description: "1月から12月までの月別運勢をまとめました。恋愛運、仕事運、金運、ラッキーカラーをエンタメとして楽しめます。",
  path: "/monthly"
});

export default function MonthlyPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="MONTHLY" title="月別占い" description="毎月のテーマと運勢を、スマホで読みやすくまとめました。" />
      <AdSlot placement="article-top" />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {monthlyFortunes.map((month) => (
          <Link key={month.month} className="soft-card block transition hover:-translate-y-1" href={`/monthly/${month.month}`}>
            <p className="kicker">{month.month} MONTH</p>
            <h2 className="mt-2 text-2xl font-black text-plum">{month.name}</h2>
            <p className="mt-3 text-sm leading-7 text-plum/75">{month.description}</p>
            <span className="mt-4 inline-flex rounded-full bg-orchid px-4 py-2 text-sm font-bold text-white">詳しく見る</span>
          </Link>
        ))}
      </section>
      <TodayReturnCta />
      <SubscribeCta />
      <AffiliateCards />
    </main>
  );
}
