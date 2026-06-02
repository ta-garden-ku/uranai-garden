"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Activity, Flag, RefreshCcw, Shield, Sparkles, Swords, Trophy } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";
import { SportsIllustration } from "@/components/SportsIllustration";
import { buildSportsDailyFortune, getTeamGroupsForSport, sportsProfiles } from "@/lib/sports";

const matchModes = [
  { value: "before", label: "試合前" },
  { value: "watching", label: "観戦中" },
  { value: "practice", label: "練習前" },
  { value: "after", label: "試合後" }
] as const;

const focusOptions = [
  { value: "attack", label: "攻め" },
  { value: "defense", label: "守り" },
  { value: "team", label: "チーム" },
  { value: "calm", label: "集中" }
] as const;

const resultMessages = [
  "最初の流れを大切にすると、応援の気分が自然と上がります。",
  "声に出すほど空気が明るくなり、チームを見る目も前向きになります。",
  "焦らず、良いプレーをひとつ見つける意識が今日の開運ポイントです。",
  "勝ち負けを決めつけず、最後まで流れを楽しむ姿勢がラッキーです。"
] as const;

type Metric = {
  label: string;
  value: number;
  icon: LucideIcon;
};

type Phase = "idle" | "reading" | "result";

type SubmittedValues = {
  sportSlug: string;
  team: string;
  opponent: string;
  mode: string;
  focus: string;
  nonce: number;
};

function pick<T>(items: readonly T[], seed: number) {
  return items[Math.abs(seed) % items.length];
}

function getModeText(mode: string) {
  if (mode === "watching") return "観戦中は、流れが変わる瞬間を楽しむと運気が上がります。";
  if (mode === "practice") return "練習前は、ひとつだけ意識するテーマを決めると集中しやすい日です。";
  if (mode === "after") return "試合後は、良かったプレーを言葉にすると次の応援運につながります。";
  return "試合前は、深呼吸して最初のプレーを前向きに見るのがおすすめです。";
}

function scoreLabel(score: number) {
  if (score >= 90) return "流れをつかみやすい日";
  if (score >= 80) return "応援の熱が届きやすい日";
  if (score >= 70) return "落ち着きが味方の日";
  return "準備で流れを整える日";
}

export function SportsMatchDay() {
  const [sportSlug, setSportSlug] = useState("baseball");
  const [teamName, setTeamName] = useState("阪神タイガース");
  const [customTeam, setCustomTeam] = useState("");
  const [opponent, setOpponent] = useState("");
  const [mode, setMode] = useState("before");
  const [focus, setFocus] = useState("team");
  const [phase, setPhase] = useState<Phase>("idle");
  const [nonce, setNonce] = useState(0);
  const [submitted, setSubmitted] = useState<SubmittedValues | null>(null);
  const timerRef = useRef<number | null>(null);

  const sport = sportsProfiles.find((item) => item.slug === sportSlug) ?? sportsProfiles[0];
  const teamGroups = useMemo(() => getTeamGroupsForSport(sportSlug), [sportSlug]);
  const teamOptions = useMemo(() => teamGroups.flatMap((group) => group.teams), [teamGroups]);
  const selectedTeam = teamOptions.includes(teamName) ? teamName : (teamOptions[0] ?? "応援チーム");
  const displayTeam = customTeam.trim() || selectedTeam;
  const displayOpponent = opponent.trim() || "今日の相手";

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const fortune = useMemo(() => {
    if (!submitted) return null;
    const seed = `${submitted.team}-${submitted.opponent}-${submitted.mode}-${submitted.focus}-${submitted.nonce}`;
    return buildSportsDailyFortune(submitted.sportSlug, submitted.team, seed);
  }, [submitted]);

  const resultSport = sportsProfiles.find((item) => item.slug === submitted?.sportSlug) ?? sport;
  const message = fortune ? pick(resultMessages, fortune.seedNumber) : "";
  const metrics: Metric[] = fortune
    ? [
        { label: "攻め運", value: fortune.attack, icon: Swords },
        { label: "守り運", value: fortune.defense, icon: Shield },
        { label: "チーム運", value: fortune.teamwork, icon: Flag }
      ]
    : [];

  function drawFortune() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    const nextNonce = nonce + 1;
    setNonce(nextNonce);
    setSubmitted({
      sportSlug,
      team: displayTeam,
      opponent: displayOpponent,
      mode,
      focus,
      nonce: nextNonce
    });
    setPhase("reading");
    timerRef.current = window.setTimeout(() => setPhase("result"), 1450);
  }

  function changeSport(nextSportSlug: string) {
    const nextTeam = getTeamGroupsForSport(nextSportSlug)[0]?.teams[0] ?? "応援チーム";
    setSportSlug(nextSportSlug);
    setTeamName(nextTeam);
    setCustomTeam("");
    setPhase("idle");
    setSubmitted(null);
  }

  return (
    <section className="matchday-panel overflow-hidden rounded-lg bg-plum p-5 text-white shadow-soft">
      <div className="matchday-bg" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="relative grid gap-5 lg:grid-cols-[1fr_380px] lg:items-stretch">
        <div className="space-y-5">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-black tracking-[0.18em] text-honey">
              <Trophy size={15} aria-hidden />
              MATCH DAY FORTUNE
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">試合前に見るスポーツ占い</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">
              競技、応援チーム、今の気分を選んでから占います。勝敗予想ではなく、試合前や観戦前の気分づくりとして楽しめるエンタメ占いです。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              競技
              <select className="matchday-input" value={sportSlug} onChange={(event) => changeSport(event.target.value)}>
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
              相手チーム・ライバル
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

          <button className="matchday-draw-button" type="button" onClick={drawFortune} disabled={phase === "reading"}>
            <Sparkles size={18} aria-hidden />
            {phase === "reading" ? "勝負運を読み込み中..." : "この条件で占う"}
          </button>
        </div>

        <div className={`matchday-stage rounded-lg bg-white/94 p-5 text-plum phase-${phase}`} style={{ "--sport-accent": resultSport.accent } as CSSProperties & Record<"--sport-accent", string>}>
          <div className="matchday-field" aria-hidden>
            <span />
            <span />
            <span />
          </div>

          {phase === "idle" && (
            <div className="matchday-empty">
              <SportsIllustration sport={sport} compact />
              <p className="kicker mt-4">WAITING</p>
              <h3 className="mt-2 text-2xl font-black">条件を選んで占おう</h3>
              <p className="mt-2 text-sm leading-7 text-plum/70">点数はまだ出ません。競技とチームを選んでから、カードがめくれるように結果が出ます。</p>
            </div>
          )}

          {phase === "reading" && (
            <div className="matchday-reading">
              <div className="matchday-spinner">
                <SportsIllustration sport={sport} compact />
              </div>
              <p className="kicker mt-5">READING</p>
              <h3 className="mt-2 text-2xl font-black">{displayTeam}の流れを読んでいます</h3>
              <p className="mt-2 text-sm leading-7 text-plum/70">攻め運、守り運、チーム運を合わせて今日の応援ムードを整えます。</p>
            </div>
          )}

          {phase === "result" && fortune && submitted && (
            <div className="matchday-result-card">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="kicker">TODAY SCORE</p>
                  <h3 className="mt-1 text-xl font-black">{submitted.team}</h3>
                  <p className="text-xs font-bold text-plum/55">vs {submitted.opponent}</p>
                </div>
                <SportsIllustration sport={resultSport} compact />
              </div>

              <div className="matchday-score mt-4">
                <span>{fortune.score}</span>
                <small>点</small>
              </div>
              <p className="mt-1 text-lg font-black text-orchid">{scoreLabel(fortune.score)}</p>
              <p className="mt-3 rounded-lg bg-paper p-3 text-sm font-bold leading-7">{message}</p>

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
                      <div className="sports-meter h-full rounded-full" style={{ width: `${value}%`, background: resultSport.accent }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-honey/25 p-3 text-sm leading-7">
                <span className="inline-flex items-center gap-2 font-black">
                  <Activity size={15} aria-hidden />
                  今日の見どころ
                </span>
                <p className="mt-1">{getModeText(submitted.mode)}</p>
                <p className="mt-1">ラッキーカラーは{fortune.luckyColor}。合言葉は「{fortune.chant}」。</p>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <button className="btn-secondary w-full" type="button" onClick={drawFortune}>
                  <RefreshCcw size={16} aria-hidden />
                  もう一度占う
                </button>
                <ShareButtons title={`${submitted.team}のスポーツ占い`} text={`今日の勝負運は${fortune.score}点。${fortune.chant}`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
