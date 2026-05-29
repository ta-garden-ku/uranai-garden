"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

type DailyFortunePreview = {
  sign: string;
  name: string;
  rank: number;
  score: number;
  color: string;
  item: string;
  message: string;
};

type Phase = "idle" | "reading" | "revealed";

export function DailyFortuneReveal({ fortunes }: { fortunes: DailyFortunePreview[] }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = fortunes[selectedIndex] ?? fortunes[0];
  const topThree = useMemo(() => [...fortunes].sort((a, b) => a.rank - b.rank).slice(0, 3), [fortunes]);
  const isReading = phase === "reading";

  function readFortune() {
    if (isReading) return;
    setPhase("reading");

    const nextIndex = topThree.length > 0 ? fortunes.findIndex((item) => item.sign === topThree[0].sign) : 0;
    window.setTimeout(() => {
      setSelectedIndex(Math.max(0, nextIndex));
      setPhase("revealed");
    }, 1350);
  }

  return (
    <section className={`daily-oracle soft-card overflow-hidden phase-${phase}`}>
      <div className="daily-oracle-bg" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="relative grid gap-6 lg:grid-cols-[310px_1fr] lg:items-center">
        <div className="daily-zodiac-stage mx-auto" aria-hidden>
          <div className={`daily-zodiac-ring ${isReading ? "is-reading" : ""}`}>
            {fortunes.slice(0, 12).map((fortune, index) => (
              <span
                key={fortune.sign}
                className={selected?.sign === fortune.sign && phase === "revealed" ? "is-selected" : ""}
                style={{ "--zodiac-i": index } as CSSProperties}
              >
                {fortune.name.slice(0, 1)}
              </span>
            ))}
          </div>
          <div className={`daily-crystal ${isReading ? "is-reading" : ""}`}>
            <Sparkles size={42} aria-hidden />
          </div>
        </div>

        <div className="relative">
          <p className="kicker">DAILY ORACLE</p>
          <h2 className="mt-2 text-2xl font-black text-plum">星の流れを読む</h2>
          <p className="mt-3 max-w-2xl leading-8 text-plum/75">
            今日の12星座ランキングから、いま最初に見てほしい運勢を演出つきで表示します。結果はエンタメ目的の小さなヒントとして楽しんでください。
          </p>

          <button className="btn-primary mt-5" type="button" onClick={readFortune} disabled={isReading}>
            <Sparkles size={16} className={isReading ? "animate-pulse" : ""} aria-hidden />
            {isReading ? "星を読み取っています..." : phase === "revealed" ? "もう一度読む" : "今日の星を読む"}
          </button>

          {phase === "revealed" && selected && (
            <div className="daily-oracle-result result-pop mt-5">
              <div>
                <p className="kicker">TODAY PICK</p>
                <h3 className="mt-1 text-3xl font-black text-plum">
                  {selected.rank}位・{selected.name}
                </h3>
                <p className="mt-2 text-sm font-bold text-mintnight">
                  {selected.score}点 / 色は{selected.color} / アイテムは{selected.item}
                </p>
              </div>
              <p className="leading-8 text-plum/76">{selected.message}</p>
              <Link className="btn-secondary w-full sm:w-auto" href={`/zodiac/${selected.sign}`}>
                この星座を詳しく見る
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
