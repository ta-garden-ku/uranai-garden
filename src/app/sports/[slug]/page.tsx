import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCards } from "@/components/AffiliateCards";
import { RelatedArticles } from "@/components/ContentBlocks";
import { TodayReturnCta } from "@/components/CTABlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SportsIllustration } from "@/components/SportsIllustration";
import { SportsTeamFortune } from "@/components/SportsTeamFortune";
import { getSportsProfile, sportsProfiles } from "@/lib/sports";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sportsProfiles.map((sport) => ({ slug: sport.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const sport = getSportsProfile(slug);
  if (!sport) return {};
  return buildMetadata({
    title: `${sport.name}｜チームを選んで今日の勝負運を占う`,
    description: sport.description,
    path: `/sports/${sport.slug}`
  });
}

export default async function SportsDetailPage({ params }: Props) {
  const { slug } = await params;
  const sport = getSportsProfile(slug);
  if (!sport) notFound();

  return (
    <main className="page-shell space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "スポーツ占い", path: "/sports" },
          { name: sport.name, path: `/sports/${sport.slug}` }
        ])}
      />
      <PageHero kicker="SPORTS FORTUNE" title={sport.name} description={sport.description} />

      <section className="sports-hero-panel overflow-hidden rounded-lg bg-white/88 p-5 shadow-soft">
        <div className="grid gap-5 lg:grid-cols-[260px_1fr] lg:items-center">
          <SportsIllustration sport={sport} />
          <div>
            <p className="kicker">SELECT AND REVEAL</p>
            <h2 className="mt-2 text-3xl font-black text-plum">チームを選んでから結果を見る</h2>
            <p className="mt-3 rounded-lg bg-paper p-4 text-sm leading-7 text-plum/75">{sport.message}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className="btn-primary" href="#team-fortune">
                この競技で占う
              </Link>
              <Link className="btn-secondary" href="/sports">
                他の競技を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="team-fortune">
        <SportsTeamFortune sportSlug={sport.slug} />
      </div>

      <article className="soft-card space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">LUCKY ACTION</p>
            <p className="mt-2 text-lg font-bold leading-8 text-plum">{sport.luckyAction}</p>
          </div>
          <div className="rounded-lg bg-paper p-4">
            <p className="kicker">LUCKY ITEM</p>
            <p className="mt-2 text-lg font-bold text-plum">{sport.luckyItem}</p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-plum">試合前に見たい3つのヒント</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {sport.preGame.map((tip, index) => (
              <div key={tip} className="rounded-lg bg-white/80 p-4 shadow-soft">
                <p className="text-xs font-black tracking-[0.18em] text-mintnight">TIP {index + 1}</p>
                <p className="mt-2 text-sm font-bold leading-7 text-plum">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="rounded-lg bg-honey/20 p-4 text-sm leading-7 text-plum/70">
          このスポーツ占いはエンタメ目的です。試合結果、選手成績、健康状態、賭け事などを予測・保証するものではありません。
          応援前やプレー前の気分づくりとしてお楽しみください。
        </p>
      </article>
      <AdSlot placement="result-bottom" />
      <AffiliateCards />
      <RelatedArticles currentSlug="sports-fortune-goods-ranking" />
      <TodayReturnCta />
    </main>
  );
}
