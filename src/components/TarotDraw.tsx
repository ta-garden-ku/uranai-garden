"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { tarotCards } from "@/lib/content";
import { ResultCard } from "@/components/ResultCard";

export function TarotDraw() {
  const [draw, setDraw] = useState<{ index: number; reversed: boolean } | null>(null);
  const card = draw ? tarotCards[draw.index] : null;

  return (
    <div className="space-y-5">
      <section className="soft-card text-center">
        <p className="kicker">ONE CARD TAROT</p>
        <h2 className="mt-2 text-2xl font-bold text-plum">心を静かにして1枚引く</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-plum/70">
          結果はエンタメとして、今日の気分を整えるヒントにしてください。
        </p>
        <button
          className="btn-primary mt-5"
          type="button"
          onClick={() =>
            setDraw({
              index: Math.floor(Math.random() * tarotCards.length),
              reversed: Math.random() > 0.5
            })
          }
        >
          <RotateCcw size={16} aria-hidden />
          カードを引く
        </button>
      </section>

      {card && (
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
      )}
    </div>
  );
}
