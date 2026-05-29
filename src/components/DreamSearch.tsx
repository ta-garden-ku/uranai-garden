"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { dreams } from "@/lib/content";

export function DreamSearch() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => dreams.filter((dream) => dream.keyword.includes(query) || dream.meaning.includes(query)),
    [query]
  );

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
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dream) => (
          <Link key={dream.slug} className="dream-result-card soft-card" href={`/dreams/${dream.slug}`}>
            <p className="kicker">DREAM</p>
            <h2 className="mt-2 text-xl font-bold text-plum">{dream.keyword}</h2>
            <p className="mt-2 text-sm leading-7 text-plum/70">{dream.meaning}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
