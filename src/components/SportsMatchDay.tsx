"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Activity, Flag, RefreshCcw, Shield, Swords, Trophy } from "lucide-react";
import { buildSportsDailyFortune, getTeamGroupsForSport, sportsProfiles } from "@/lib/sports";
import { SportsIllustration } from "@/components/SportsIllustration";

const matchModes = [
  { value: "before", label: "試合前" },
  { value: "watching", label: "観戦中" },
  { value: "after", label: "試合後" }
] as const;

const focusOptions = [
  { value: "attack", label: "攻め" },
  { value: "defense", label: "守り" },
  { value: "team", label: "チームワーク" },
  { value: "calm", label: "落ち着き" }
] as const;

type Metric = {
  label: string;
  value: number;
  icon: LucideIcon;
};

const preGameMessages = [
  "最初の流れを取りにいく気持ちで、応援もプレーも一歩目を大切に。",
  "今日は声を出すほど空気が明るくなります。小さな拍手も運づくり。",
  "焦らず、良いプレーを見つける目が勝負運を整えてくれます。",
  "勝ち負けを決めつけず、最後まで流れを楽しむ姿勢がラッキーです。"
] as const;

function pick<T>(items: readonly T[], seed: number) {
  return items[Math.abs(seed) % items.length];
}

function getModeText(mode: string) {
  if (mode === "watching") return "観戦中は、流れが変わる瞬間を楽しむと運気が上がります。";
  if (mode === "after") return "試合後は、良かったプレーをひとつ言葉にすると次の応援運につながります。";
  return "試合前は、深呼吸して最初のプレーを前向きに見るのがおすすめです。";
}

export function SportsMatchDay() {
  const [sportSlug, setSportSlug] = useState("baseball");
  const [teamName, setTeamName] = useState("阪神タイガース");
  const [customTeam, setCustomTeam] = useState("");
  const [opponent, setOpponent] = useState("");
  const [mode, setMode] = useState("before");
  const [focus, setFocus] = useState("team");
  const [nonce, setNonce] = useState(0);

  const sport = sportsProfiles.find((item) => item.slug === sportSlug) ?? sportsProfiles[0];
  const teamGroups = useMemo(() => getTeamGroupsForSport(sportSlug), [sportSlug]);
  const teamOptions = teamGroups.flatMap((group) => group.teams);
  const selectedTeam = teamOptions.includes(teamName) ? teamName : (teamOptions[0] ?? "応援チーム");
  const displayTeam = customTeam.trim() || selectedTeam;
  const displayOpponent = opponent.trim() || "今日の相手";
  const seed = `${displayTeam}-${displayOpponent}-${sportSlug}-${mode}-${focus}-${nonce}`;
  const fortune = useMemo(() => buildSportsDailyFortune(sportSlug, seed), [seed, sportSlug]);
  const message = pick(preGameMessages, fortune.seedNumber);
  const metrics: Metric[] = [
    { label: "攻め運", value: fortune.attack, icon: Swords },
    { label: "守り運", value: fortune.defense, icon: Shield },
    { label: "チーム運", value: fortune.teamwork, icon: Flag }
  ];

  return (
    <section className="matchday-panel overflow-hidden rounded-lg bg-plum p-5 text-white shadow-soft">
      <div className="matchday-bg" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="relative grid gap-5 lg:grid-cols-[1fr_360px] lg:items-stretch">
        <div className="space-y-5">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-black tracking-[0.18em] text-honey">
              <Trophy size={15} aria-hidden />
              MATCH DAY FORTUNE
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">試合前に見るスポーツ占い</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">
              応援チーム、競技、今日の気分を入れると、勝負運・攻め運・守り運・チーム運が出ます。試合結果の予測ではなく、応援前の気分づくりです。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              競技
              <select className="matchday-input" value={sportSlug} onChange={(event) => setSportSlug(event.target.value)}>
                {sportsProfiles.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.shortName}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold">
              応援チーム
              <select className="matchday-input" value={selectedTeam} onChange={(event) => setTeamName(event.target.value)}>
                {teamGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold">
              チーム名を自由入力
              <input className="matchday-input" value={customTeam} onChange={(event) => setCustomTeam(event.target.value)} placeholder="例：地元クラブ、母校、推しチーム" />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              対戦相手・ライバル
              <input className="matchday-input" value={opponent} onChange={(event) => setOpponent(event.target.value)} placeholder="例：今日の相手チーム" />
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {matchModes.map((item) => (
              <button key={item.value} className={`matchday-chip ${mode === item.value ? "is-active" : ""}`} type="button" onClick={() => setMode(item.value)}>
                {item.label}
              </button>
            ))}
            {focusOptions.map((item) => (
              <button key={item.value} className={`matchday-chip ${focus === item.value ? "is-active" : ""}`} type="button" onClick={() => setFocus(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="matchday-card rounded-lg bg-white/94 p-5 text-plum" style={{ "--sport-accent": sport.accent } as CSSProperties & Record<"--sport-accent", string>}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="kicker">TODAY SCORE</p>
              <h3 className="mt-1 text-xl font-black">{displayTeam}</h3>
              <p className="text-xs font-bold text-plum/55">vs {displayOpponent}</p>
            </div>
            <SportsIllustration sport={sport} compact />
          </div>

          <div className="matchday-score mt-4">
            <span>{fortune.score}</span>
            <small>点</small>
          </div>
          <p className="mt-2 rounded-lg bg-paper p-3 text-sm font-bold leading-7">{message}</p>

          <div className="mt-4 grid gap-3">
            {metrics.map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm font-black">
                  <span className="inline-flex items-center gap-2">
                    <Icon size={15} aria-hidden />
                    {label}
                  </span>
                  <span>{value}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-plum/10">
                  <div className="sports-meter h-full rounded-full" style={{ width: `${value}%`, background: sport.accent }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg bg-honey/25 p-3 text-sm leading-7">
            <span className="inline-flex items-center gap-2 font-black">
              <Activity size={15} aria-hidden />
              今日の見どころ
            </span>
            <p className="mt-1">{getModeText(mode)}</p>
          </div>

          <button className="btn-primary mt-4 w-full" type="button" onClick={() => setNonce((value) => value + 1)}>
            <RefreshCcw size={16} aria-hidden />
            もう一度、気分を整える
          </button>
        </div>
      </div>
    </section>
  );
}
