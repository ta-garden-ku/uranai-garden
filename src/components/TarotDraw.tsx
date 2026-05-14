"use client";

import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { tarotCards } from "@/lib/content";
import { ResultCard } from "@/components/ResultCard";

type DrawState = {
  index: number;
  reversed: boolean;
};

export function TarotDraw() {
  const [draw, setDraw] = useState<DrawState | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const card = draw ? tarotCards[draw.index] : null;

  function handleDraw() {
    if (isDrawing) return;
    setDraw(null);
    setIsDrawing(true);

    window.setTimeout(() => {
      setDraw({
        index: Math.floor(Math.random() * tarotCards.length),
        reversed: Math.random() > 0.5
      });
      setIsDrawing(false);
    }, 1200);
  }

  return (
    <div className="space-y-5">
      <section className="soft-card overflow-hidden text-center">
        <p className="kicker">ONE CARD TAROT</p>
        <h2 className="mt-2 text-2xl font-bold text-plum">心を静かにして1枚引く</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-plum/70">
          カードをシャッフルして、今日の気分を整える前向きなヒントを受け取りましょう。
        </p>

        <div className="tarot-stage mx-auto mt-6">
          <div className={`tarot-orbit ${isDrawing ? "is-drawing" : ""}`} aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className={`tarot-deck ${isDrawing ? "is-shuffling" : ""}`} aria-live="polite">
            <div className="tarot-card tarot-card-back tarot-card-left" />
            <div className="tarot-card tarot-card-back tarot-card-right" />
            <div className={`tarot-card tarot-card-main ${card ? "is-revealed" : ""}`}>
              <div className="tarot-card-face tarot-card-face-back">
                <Sparkles size={30} aria-hidden />
                <span>TAROT</span>
              </div>
              <div className="tarot-card-face tarot-card-face-front">
                <span className="text-xs font-black tracking-[0.18em] text-mintnight">
                  {draw?.reversed ? "REVERSED" : "UPRIGHT"}
                </span>
                <strong>{card?.name ?? "?"}</strong>
              </div>
            </div>
          </div>
        </div>

        <button className="btn-primary mt-6" type="button" onClick={handleDraw} disabled={isDrawing}>
          <RotateCcw size={16} className={isDrawing ? "animate-spin" : ""} aria-hidden />
          {isDrawing ? "カードをシャッフル中..." : card ? "もう一度引く" : "カードを引く"}
        </button>
      </section>

      {card && !isDrawing && (
        <div className="result-pop">
          <ResultCard
            title={`${card.name}${draw?.reversed ? " 逆位置" : " 正位置"}`}
            subtitle={draw?.reversed ? card.reversed : card.upright}
          >
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
          </ResultCard>
        </div>
      )}
    </div>
  );
}
