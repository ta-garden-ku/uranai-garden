"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { omikujiResults } from "@/lib/content";
import { ResultCard } from "@/components/ResultCard";

export function OmikujiDraw() {
  const [index, setIndex] = useState<number | null>(null);
  const result = index === null ? null : omikujiResults[index];

  return (
    <div className="space-y-5">
      <section className="soft-card text-center">
        <p className="kicker">OMIKUJI</p>
        <h2 className="mt-2 text-2xl font-bold text-plum">今日のおみくじ</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-plum/70">
          凶も前向きに受け取れる、やさしいおみくじです。
        </p>
        <button
          className="btn-primary mt-5"
          type="button"
          onClick={() => setIndex(Math.floor(Math.random() * omikujiResults.length))}
        >
          <Sparkles size={16} aria-hidden />
          おみくじを引く
        </button>
      </section>
      {result && (
        <ResultCard title={`今日のおみくじは${result.rank}`} subtitle={result.summary}>
          <p className="text-lg leading-8 text-plum">{result.advice}</p>
        </ResultCard>
      )}
    </div>
  );
}
