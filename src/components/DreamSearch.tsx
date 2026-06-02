"use client";

import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { dreams } from "@/lib/content";

type Phase = "idle" | "reading" | "revealed";

export function DreamSearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<number | null>(null);
  const filtered = useMemo(
    () => dreams.filter((dream) => dream.keyword.includes(submittedQuery) || dream.meaning.includes(submittedQuery)),
    [submittedQuery]
  );
  const hasQuery = submittedQuery.trim().length > 0;
  const results = hasQuery ? filtered : [];
  const isReading = phase === "reading";

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function readDream() {
    if (isReading) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSubmittedQuery(query.trim());
    setPhase("reading");
    timerRef.current = window.setTimeout(() => setPhase("revealed"), 1050);
  }

  return (
    <section className="space-y-4">
      <div className="dream-oracle-panel soft-card overflow-hidden">
        <div className="dream-oracle-visual" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="relative">
          <p className="kicker">DREAM SEARCH</p>
          <h2 className="mt-2 text-2xl font-black text-plum">夢の断片を探す</h2>
          <p className="mt-2 text-sm leading-7 text-plum/70">
            気になった言葉を入れると、夢占い辞典の中から近いキーワードがふわっと浮かび上がります。
          </p>
        </div>
      </div>
      <label className="soft-card flex items-center gap-3">
        <Search size={20} className="text-orchid" aria-hidden />
        <input
          className="w-full bg-transparent text-base outline-none"
          placeholder="猫、海、遅刻などで検索"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPhase("idle");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") readDream();
          }}
        />
      </label>
      <button className="btn-primary w-full sm:w-auto" type="button" onClick={readDream} disabled={isReading}>
        <Sparkles size={16} className={isReading ? "animate-pulse" : ""} aria-hidden />
        {isReading ? "夢の意味を読み解いています..." : "夢を読み解く"}
      </button>

      <div className={`dream-search-stage soft-card phase-${phase}`}>
        {phase === "idle" && (
          <div className="text-center">
            <p className="kicker">WAITING</p>
            <h2 className="mt-2 text-2xl font-black text-plum">キーワードを入れてから読み解く</h2>
            <p className="mt-2 text-sm leading-7 text-plum/70">結果はまだ表示しません。夢に出てきた言葉を入れて、ボタンを押してください。</p>
          </div>
        )}
        {phase === "reading" && (
          <div className="dream-reading text-center">
            <div className="fortune-reveal-orb mx-auto" aria-hidden>
              <Sparkles size={38} />
            </div>
            <p className="kicker mt-4">READING</p>
            <h2 className="mt-2 text-2xl font-black text-plum">夢の断片を探しています</h2>
          </div>
        )}
        {phase === "revealed" && (
          <div className="result-pop">
            <p className="kicker">DREAM RESULTS</p>
            <h2 className="mt-2 text-2xl font-black text-plum">
              {hasQuery ? `「${submittedQuery}」の検索結果` : "キーワードを入力してください"}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((dream) => (
                <Link key={dream.slug} className="dream-result-card rounded-lg bg-white/88 p-5 shadow-soft" href={`/dreams/${dream.slug}`}>
                  <p className="kicker">DREAM</p>
                  <h2 className="mt-2 text-xl font-bold text-plum">{dream.keyword}</h2>
                  <p className="mt-2 text-sm leading-7 text-plum/70">{dream.meaning}</p>
                </Link>
              ))}
            </div>
            {hasQuery && results.length === 0 && (
              <p className="mt-4 rounded-lg bg-paper p-4 text-sm font-bold text-plum">近い夢キーワードが見つかりませんでした。別の言葉で探してみてください。</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
