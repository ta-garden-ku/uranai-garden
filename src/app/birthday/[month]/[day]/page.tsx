import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { TodayReturnCta } from "@/components/CTABlocks";
import { PageHero } from "@/components/PageHero";
import { ShareButtons } from "@/components/ShareButtons";
import { daysInMonth, getBirthdayFortune } from "@/lib/calendarFortunes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ month: string; day: string }> };

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, index) => index + 1).flatMap((month) =>
    Array.from({ length: daysInMonth(month) }, (_, dayIndex) => ({
      month: String(month),
      day: String(dayIndex + 1)
    }))
  );
}

function isValidDate(month: number, day: number) {
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(month);
}

export async function generateMetadata({ params }: Props) {
  const { month, day } = await params;
  const monthNumber = Number(month);
  const dayNumber = Number(day);
  if (!isValidDate(monthNumber, dayNumber)) return {};
  return buildMetadata({
    title: `${monthNumber}月${dayNumber}日生まれの誕生日占い`,
    description: `${monthNumber}月${dayNumber}日生まれの性格、恋愛傾向、ラッキーカラーをエンタメとして楽しめる誕生日占いです。`,
    path: `/birthday/${monthNumber}/${dayNumber}`
  });
}

export default async function BirthdayDetailPage({ params }: Props) {
  const { month, day } = await params;
  const monthNumber = Number(month);
  const dayNumber = Number(day);
  if (!isValidDate(monthNumber, dayNumber)) notFound();
  const fortune = getBirthdayFortune(monthNumber, dayNumber);

  return (
    <main className="page-shell space-y-8">
      <PageHero
        kicker="BIRTHDAY"
        title={`${monthNumber}月${dayNumber}日生まれの誕生日占い`}
        description={`${fortune.sign.name}の気質をベースに、今日を前向きに過ごすヒントをまとめました。`}
      />
      <article className="soft-card space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">SCORE</p>
            <p className="mt-2 text-3xl font-black text-orchid">{fortune.score}点</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">ZODIAC</p>
            <p className="mt-2 font-bold text-plum">{fortune.sign.name}</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">LUCKY</p>
            <p className="mt-2 font-bold text-plum">{fortune.luckyColor}</p>
            <p className="text-sm text-plum/70">{fortune.luckyItem}</p>
          </div>
        </div>
        <section>
          <h2 className="text-2xl font-bold text-plum">性格のヒント</h2>
          <p className="mt-3 leading-8 text-plum/80">{fortune.personality}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-plum">恋愛のヒント</h2>
          <p className="mt-3 leading-8 text-plum/80">{fortune.love}</p>
        </section>
        <p className="rounded-lg bg-honey/20 p-4 text-sm leading-7 text-plum/70">
          誕生日占いはエンタメ目的です。自分を決めつけるものではなく、気分を整える小さなヒントとしてお楽しみください。
        </p>
        <ShareButtons title={`${monthNumber}月${dayNumber}日生まれの誕生日占い`} text={fortune.personality} />
      </article>
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
      <TodayReturnCta />
    </main>
  );
}
