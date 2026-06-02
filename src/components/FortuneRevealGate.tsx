"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

type RevealVariant = "daily" | "zodiac" | "monthly" | "dream" | "article";

type Props = {
  kicker?: string;
  title: string;
  description: string;
  buttonLabel: string;
  readingLabel?: string;
  variant?: RevealVariant;
  children: ReactNode;
};

type Phase = "idle" | "reading" | "revealed";

export function FortuneRevealGate({
  kicker = "FORTUNE REVEAL",
  title,
  description,
  buttonLabel,
  readingLabel = "結果を読み込んでいます...",
  variant = "daily",
  children
}: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<number | null>(null);
  const isReading = phase === "reading";

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function reveal() {
    if (isReading) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setPhase("reading");
    timerRef.current = window.setTimeout(() => setPhase("revealed"), 1200);
  }

  return (
    <section className={`fortune-reveal soft-card overflow-hidden phase-${phase} reveal-${variant}`}>
      <div className="fortune-reveal-bg" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      {phase !== "revealed" && (
        <div className="fortune-reveal-cover">
          <div className="fortune-reveal-orb" aria-hidden>
            <Sparkles size={42} />
          </div>
          <p className="kicker mt-4">{kicker}</p>
          <h2 className="mt-2 text-2xl font-black text-plum">{title}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-plum/70">{description}</p>
          <button className="btn-primary mt-5" type="button" onClick={reveal} disabled={isReading}>
            <Sparkles size={16} className={isReading ? "animate-pulse" : ""} aria-hidden />
            {isReading ? readingLabel : buttonLabel}
          </button>
        </div>
      )}

      {phase === "revealed" && <div className="fortune-reveal-content result-pop">{children}</div>}
    </section>
  );
}
