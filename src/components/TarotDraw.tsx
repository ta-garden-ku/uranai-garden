"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw, Sparkles } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { TarotCardArt } from "@/components/TarotCardArt";
import { tarotCards } from "@/lib/content";

type DrawState = {
  index: number;
  reversed: boolean;
};

type DrawPhase = "idle" | "shuffling" | "selecting" | "revealing";

export function TarotDraw() {
  const [draw, setDraw] = useState<DrawState | null>(null);
  const [phase, setPhase] = useState<DrawPhase>("idle");
  const card = draw ? tarotCards[draw.index] : null;
  const isDrawing = phase !== "idle";
  const resultPosition = draw?.reversed ? "reversed" : "upright";
  const resultPath = card ? `/tarot/${card.slug}/${resultPosition}` : "/tarot";
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${resultPath}` : resultPath;

  function handleDraw() {
    if (isDrawing) return;
    setDraw(null);
    setPhase("shuffling");

    window.setTimeout(() => setPhase("selecting"), 650);
    window.setTimeout(() => {
      setDraw({
        index: Math.floor(Math.random() * tarotCards.length),
        reversed: Math.random() > 0.5
      });
      setPhase("revealing");
    }, 1450);
    window.setTimeout(() => setPhase("idle"), 2200);
  }

  return (
    <div className="space-y-5">
      <section className="soft-card overflow-hidden text-center">
        <p className="kicker">ONE CARD TAROT</p>
        <h2 className="mt-2 text-2xl font-bold text-plum">心を静かにして1枚引く</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-plum/70">
          カードをシャッフルして、今日の気分を整える前向きなヒントを受け取りましょう。
        </p>

        <div className={`tarot-stage mx-auto mt-6 phase-${phase} ${card ? "has-card" : ""}`}>
          <div className={`tarot-orbit ${isDrawing ? "is-drawing" : ""}`} aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className={`tarot-particles ${isDrawing || card ? "is-active" : ""}`} aria-hidden>
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className={`tarot-fan ${phase === "shuffling" ? "is-drawing" : ""}`} aria-hidden>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={`tarot-choice-row ${phase === "selecting" ? "is-selecting" : ""}`} aria-hidden>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className={index === 2 ? "is-chosen" : ""} />
            ))}
          </div>
          <div className={`tarot-deck ${phase === "shuffling" ? "is-shuffling" : ""}`} aria-live="polite">
            <div className="tarot-card tarot-card-back tarot-card-left" />
            <div className="tarot-card tarot-card-back tarot-card-right" />
            <div className={`tarot-card tarot-card-main ${card ? "is-revealed" : ""}`}>
              <div className="tarot-card-face tarot-card-face-back">
                <Sparkles size={30} aria-hidden />
                <span>TAROT</span>
              </div>
              <div className="tarot-card-face tarot-card-face-front">
                <span className="tarot-position-label">
                  {draw?.reversed ? "REVERSED" : "UPRIGHT"}
                </span>
                <TarotCardArt slug={card?.slug} reversed={draw?.reversed} />
                <strong className="tarot-card-title">{card?.name ?? "?"}</strong>
              </div>
            </div>
          </div>
          <p className="tarot-phase-label" aria-live="polite">
            {phase === "shuffling" && "カードを混ぜています"}
            {phase === "selecting" && "1枚のカードが選ばれています"}
            {phase === "revealing" && "カードを開いています"}
          </p>
        </div>

        <button className="btn-primary mt-6" type="button" onClick={handleDraw} disabled={isDrawing}>
          <RotateCcw size={16} className={phase === "shuffling" ? "animate-spin" : ""} aria-hidden />
          {isDrawing ? "カードを読み取り中..." : card ? "もう一度引く" : "カードを引く"}
        </button>
      </section>

      {card && !isDrawing && (
        <div className="result-pop result-pop-luminous">
          <ResultCard
            title={`${card.name}${draw?.reversed ? " 逆位置" : " 正位置"}`}
            subtitle={`今日のカードは${card.name}。${draw?.reversed ? card.reversed : card.upright}`}
            shareUrl={shareUrl}
            tarotSlug={card.slug}
            tarotPosition={resultPosition}
          >
            <div className="tarot-result-preview">
              <TarotCardArt slug={card.slug} reversed={draw?.reversed} compact />
              <div>
                <p className="kicker">DRAWN CARD</p>
                <h3 className="mt-2 text-xl font-black text-plum">{card.name}</h3>
                <p className="mt-2 text-sm leading-7 text-plum/70">
                  クラシックなタロットカードの絵柄と一緒に、今日のヒントを前向きに読み取ります。
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-paper p-4">
                <p className="kicker">恋愛</p>
                <p className="mt-2 text-sm leading-7">{card.love}</p>
              </div>
              <div className="rounded-lg bg-paper p-4">
                <p className="kicker">仕事</p>
                <p className="mt-2 text-sm leading-7">{card.work}</p>
              </div>
              <div className="rounded-lg bg-paper p-4">
                <p className="kicker">人間関係</p>
                <p className="mt-2 text-sm leading-7">{card.relationships}</p>
              </div>
            </div>
            <div className="rounded-lg bg-honey/20 p-4">
              <p className="kicker">LUCKY ACTION</p>
              <p className="mt-2 text-sm font-bold leading-7 text-plum">{card.action}</p>
              <Link className="btn-secondary mt-4" href={resultPath}>
                このカードの詳しい解説を見る
              </Link>
            </div>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
