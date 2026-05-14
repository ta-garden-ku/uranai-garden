"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { omikujiResults } from "@/lib/content";
import { ResultCard } from "@/components/ResultCard";

export function OmikujiDraw() {
  const [index, setIndex] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const result = index === null ? null : omikujiResults[index];

  function handleDraw() {
    if (isDrawing) return;
    setIndex(null);
    setIsDrawing(true);

    window.setTimeout(() => {
      setIndex(Math.floor(Math.random() * omikujiResults.length));
      setIsDrawing(false);
    }, 950);
  }

  return (
    <div className="space-y-5">
      <section className="soft-card overflow-hidden text-center">
        <p className="kicker">OMIKUJI</p>
        <h2 className="mt-2 text-2xl font-bold text-plum">今日のおみくじ</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-plum/70">
          凶も前向きに受け取れる、やさしいおみくじです。筒を振って今日の一言を受け取りましょう。
        </p>

        <div className="omikuji-stage mx-auto mt-6" aria-hidden>
          <div className={`omikuji-sparkles ${isDrawing ? "is-active" : result ? "is-active" : ""}`}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={`omikuji-box ${isDrawing ? "is-shaking" : ""}`}>
            <Sparkles size={26} />
            <span>運</span>
          </div>
          <div className={`omikuji-stick ${isDrawing ? "is-drawing" : result ? "is-out" : ""}`}>
            {result?.rank ?? "?"}
          </div>
        </div>

        <button className="btn-primary mt-6" type="button" onClick={handleDraw} disabled={isDrawing}>
          <Sparkles size={16} className={isDrawing ? "animate-pulse" : ""} aria-hidden />
          {isDrawing ? "おみくじを振っています..." : result ? "もう一度引く" : "おみくじを引く"}
        </button>
      </section>
      {result && !isDrawing && (
        <div className="result-pop">
          <ResultCard title={`今日のおみくじは${result.rank}`} subtitle={result.summary}>
            <p className="text-lg leading-8 text-plum">{result.advice}</p>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
