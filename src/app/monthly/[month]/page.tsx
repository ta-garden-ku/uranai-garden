import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { TodayReturnCta } from "@/components/CTABlocks";
import { PageHero } from "@/components/PageHero";
import { ShareButtons } from "@/components/ShareButtons";
import { monthlyFortunes } from "@/lib/calendarFortunes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ month: string }> };

export function generateStaticParams() {
  return monthlyFortunes.map((item) => ({ month: String(item.month) }));
}

export async function generateMetadata({ params }: Props) {
  const { month } = await params;
  const item = monthlyFortunes.find((entry) => entry.month === Number(month));
  if (!item) return {};
  return buildMetadata({
    title: `${item.name}｜恋愛運・仕事運・金運・ラッキーカラー`,
    description: item.description,
    path: `/monthly/${item.month}`
  });
}

export default async function MonthlyDetailPage({ params }: Props) {
  const { month } = await params;
  const item = monthlyFortunes.find((entry) => entry.month === Number(month));
  if (!item) notFound();

  return (
    <main className="page-shell space-y-8">
      <PageHero kicker={`MONTH ${item.month}`} title={item.name} description={item.description} />
      <article className="soft-card space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">THEME</p>
            <p className="mt-2 text-2xl font-black text-orchid">{item.theme}</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">COLOR</p>
            <p className="mt-2 font-bold text-plum">{item.luckyColor}</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">ITEM</p>
            <p className="mt-2 font-bold text-plum">{item.luckyItem}</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <section className="rounded-lg bg-white/75 p-4">
            <h2 className="font-bold text-plum">恋愛運</h2>
            <p className="mt-2 text-sm leading-7 text-plum/75">{item.love}</p>
          </section>
          <section className="rounded-lg bg-white/75 p-4">
            <h2 className="font-bold text-plum">仕事運</h2>
            <p className="mt-2 text-sm leading-7 text-plum/75">{item.work}</p>
          </section>
          <section className="rounded-lg bg-white/75 p-4">
            <h2 className="font-bold text-plum">金運</h2>
            <p className="mt-2 text-sm leading-7 text-plum/75">{item.money}</p>
          </section>
          <section className="rounded-lg bg-white/75 p-4">
            <h2 className="font-bold text-plum">健康運</h2>
            <p className="mt-2 text-sm leading-7 text-plum/75">{item.wellness}</p>
          </section>
        </div>
        <p className="rounded-lg bg-honey/20 p-4 text-sm leading-7 text-plum/70">
          占い結果はエンタメ目的です。医療・投資・法律・人生の重大な判断は、必要に応じて専門家へご相談ください。
        </p>
        <ShareButtons title={item.name} text={item.description} />
      </article>
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
      <TodayReturnCta />
    </main>
  );
}
