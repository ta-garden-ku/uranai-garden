"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { omikujiResults } from "@/lib/content";

type OmikujiPhase = "idle" | "shaking" | "opening" | "revealed";

export function OmikujiDraw() {
  const [index, setIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<OmikujiPhase>("idle");
  const result = index === null ? null : omikujiResults[index];
  const isDrawing = phase === "shaking" || phase === "opening";

  function handleDraw() {
    if (isDrawing) return;
    setIndex(null);
    setPhase("shaking");

    window.setTimeout(() => setPhase("opening"), 760);
    window.setTimeout(() => {
      setIndex(Math.floor(Math.random() * omikujiResults.length));
      setPhase("revealed");
    }, 1350);
  }

  return (
    <div className="space-y-5">
      <section className="soft-card overflow-hidden text-center">
        <p className="kicker">OMIKUJI</p>
        <h2 className="mt-2 text-2xl font-bold text-plum">今日のおみくじ</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-plum/70">
          筒を振って、今日を前向きにする一言を受け取りましょう。凶もやさしいヒントとして表示します。
        </p>

        <div className={`omikuji-stage mx-auto mt-6 phase-${phase}`} aria-hidden>
          <div className={`omikuji-sparkles ${phase !== "idle" ? "is-active" : ""}`}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={`omikuji-box ${phase === "shaking" ? "is-shaking" : ""} ${phase === "opening" ? "is-opening" : ""}`}>
            <div className="omikuji-lid" />
            <Sparkles size={26} />
            <span>運</span>
          </div>
          <div className={`omikuji-stick ${phase === "opening" ? "is-drawing" : result ? "is-out" : ""}`}>
            {result?.rank ?? "?"}
          </div>
          <div className={`omikuji-paper ${result ? "is-open" : ""}`}>
            <strong>{result?.rank ?? ""}</strong>
          </div>
          <p className="omikuji-phase-label">
            {phase === "shaking" && "筒を振っています"}
            {phase === "opening" && "おみくじが出てきます"}
            {phase === "revealed" && "結果が開きました"}
          </p>
        </div>

        <button className="btn-primary mt-6" type="button" onClick={handleDraw} disabled={isDrawing}>
          <Sparkles size={16} className={isDrawing ? "animate-pulse" : ""} aria-hidden />
          {isDrawing ? "おみくじを引いています..." : result ? "もう一度引く" : "おみくじを引く"}
        </button>
      </section>
      {result && !isDrawing && (
        <div className="result-pop result-pop-luminous">
          <ResultCard title={`今日のおみくじは${result.rank}`} subtitle={result.summary}>
            <p className="text-lg leading-8 text-plum">{result.advice}</p>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
