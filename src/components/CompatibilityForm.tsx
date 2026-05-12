"use client";

import { useState } from "react";
import { ResultCard } from "@/components/ResultCard";
import { scoreFromSeed } from "@/lib/fortune";

export function CompatibilityForm() {
  const [you, setYou] = useState("");
  const [partner, setPartner] = useState("");
  const [submitted, setSubmitted] = useState<{ you: string; partner: string } | null>(null);
  const score = submitted ? scoreFromSeed(`${submitted.you}-${submitted.partner}`, 62, 98) : 0;

  return (
    <div className="space-y-5">
      <form
        className="soft-card space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted({ you, partner });
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">
            あなたの名前
            <input className="rounded-lg border border-plum/15 px-4 py-3" value={you} onChange={(event) => setYou(event.target.value)} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            相手の名前
            <input className="rounded-lg border border-plum/15 px-4 py-3" value={partner} onChange={(event) => setPartner(event.target.value)} required />
          </label>
        </div>
        <button className="btn-primary w-full sm:w-auto" type="submit">
          相性を見る
        </button>
      </form>
      {submitted && (
        <ResultCard title={`${submitted.you}さんと${submitted.partner}さんの相性`} subtitle={`今日の相性スコア ${score}%`}>
          <p className="leading-7">
            価値観の違いを面白がるほど、会話がやわらかく広がります。相性は固定ではなく、関わり方で育つものとして楽しんでください。
          </p>
        </ResultCard>
      )}
    </div>
  );
}
