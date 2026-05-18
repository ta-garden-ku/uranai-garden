import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { PageHero } from "@/components/PageHero";
import { TarotCardArt } from "@/components/TarotCardArt";
import { tarotCards } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SNSシェア用結果カード",
  description: "占い結果をSNSで見せやすいカード風に表示します。",
  path: "/share/result"
});

type Props = {
  searchParams: Promise<{ title?: string; text?: string; tarot?: string; position?: string }>;
};

export default async function ShareResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const title = params.title?.slice(0, 60) || "Uranai Gardenの占い結果";
  const text = params.text?.slice(0, 160) || "今日の小さなヒントを受け取りました。";
  const tarot = tarotCards.find((card) => card.slug === params.tarot);
  const reversed = params.position === "reversed";

  return (
    <main className="page-shell space-y-8">
      <PageHero kicker="SHARE CARD" title="シェア用カード" description="結果をスクリーンショットしやすいカード表示にしました。" />
      <section className="mx-auto max-w-xl rounded-[28px] bg-gradient-to-br from-plum via-orchid to-rose p-1 shadow-soft">
        <div className="rounded-[24px] bg-white/90 p-6 text-center">
          <p className="kicker">Uranai Garden</p>
          {tarot && (
            <div className="mx-auto mt-3 w-[120px]">
              <TarotCardArt slug={tarot.slug} reversed={reversed} />
            </div>
          )}
          <h1 className="mt-3 text-3xl font-black text-plum">{title}</h1>
          <p className="mt-4 text-base leading-8 text-plum/78">{text}</p>
          <div className="mt-5 rounded-lg bg-honey/25 p-4 text-sm font-bold text-plum">占い結果はエンタメ目的です</div>
        </div>
      </section>
      <div className="flex justify-center gap-3">
        <Link className="btn-primary" href="/today">
          今日の運勢へ
        </Link>
        <Link className="btn-secondary" href="/">
          トップへ戻る
        </Link>
      </div>
      <AdSlot placement="result-bottom" />
    </main>
  );
}
