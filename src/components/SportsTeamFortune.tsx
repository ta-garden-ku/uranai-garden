"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Flag, RefreshCcw, Sparkles, Trophy } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";
import { SportsIllustration } from "@/components/SportsIllustration";
import { buildSportsDailyFortune, getTeamGroupsForSport, sportsProfiles } from "@/lib/sports";

type Props = {
  sportSlug: string;
};

type Phase = "idle" | "reading" | "result";

function scoreLabel(score: number) {
  if (score >= 90) return "勝負どころに強い日";
  if (score >= 78) return "流れを作りやすい日";
  if (score >= 68) return "落ち着きが味方の日";
  return "準備で運を整える日";
}

export function SportsTeamFortune({ sportSlug }: Props) {
  const sport = sportsProfiles.find((item) => item.slug === sportSlug) ?? sportsProfiles[0];
  const teamGroups = useMemo(() => getTeamGroupsForSport(sportSlug), [sportSlug]);
  const teamOptions = useMemo(() => teamGroups.flatMap((group) => group.teams), [teamGroups]);
  const defaultTeam = teamOptions[0] ?? "応援チーム";
  const [teamName, setTeamName] = useState(defaultTeam);
  const [customTeam, setCustomTeam] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [nonce, setNonce] = useState(0);
  const [submittedTeam, setSubmittedTeam] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const selectedTeam = teamOptions.includes(teamName) ? teamName : defaultTeam;
  const displayTeam = customTeam.trim() || selectedTeam;
  const fortune = useMemo(() => {
    if (!submittedTeam) return null;
    return buildSportsDailyFortune(sport.slug, submittedTeam, `${sport.slug}-${submittedTeam}-${nonce}`);
  }, [nonce, sport.slug, submittedTeam]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function drawFortune() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSubmittedTeam(displayTeam);
    setNonce((value) => value + 1);
    setPhase("reading");
    timerRef.current = window.setTimeout(() => setPhase("result"), 1250);
  }

  return (
    <section className="sports-widget overflow-hidden rounded-lg border border-white/80 bg-white/88 p-5 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="kicker">TEAM FORTUNE</p>
          <h2 className="mt-2 text-2xl font-black text-plum">応援チームの今日の勝負運</h2>
          <p className="mt-2 text-sm leading-7 text-plum/70">チームを選んでから結果を表示します。開いた瞬間に点数は出さず、試合前のワクワク感を残します。</p>
        </div>
        <button className="btn-secondary" type="button" onClick={drawFortune} disabled={phase === "reading"}>
          <Sparkles size={16} aria-hidden />
          {phase === "reading" ? "読み込み中" : "占う"}
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-lg bg-paper p-4">
          <label className="grid gap-2 text-sm font-bold text-plum">
            チームを選ぶ
            <select className="rounded-lg border border-plum/15 bg-white px-4 py-3" value={selectedTeam} onChange={(event) => setTeamName(event.target.value)}>
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
          <label className="mt-3 grid gap-2 text-sm font-bold text-plum">
            好きなチーム名を入力
            <input className="rounded-lg border border-plum/15 bg-white px-4 py-3" value={customTeam} onChange={(event) => setCustomTeam(event.target.value)} placeholder="例：地元のクラブ、推しチーム" />
          </label>
          <button className="btn-primary mt-4 w-full" type="button" onClick={drawFortune} disabled={phase === "reading"}>
            <Flag size={16} aria-hidden />
            {displayTeam}で占う
          </button>
        </div>

        <div className={`sports-score-card team-reveal-card rounded-lg p-5 text-white phase-${phase}`} style={{ "--sport-accent": sport.accent } as CSSProperties & Record<"--sport-accent", string>}>
          {phase === "idle" && (
            <div className="grid min-h-[260px] place-items-center text-center">
              <div>
                <SportsIllustration sport={sport} compact />
                <p className="mt-4 text-sm font-bold text-white/80">まだ結果は出ていません</p>
                <p className="mt-2 text-2xl font-black">チームを選んで占う</p>
              </div>
            </div>
          )}

          {phase === "reading" && (
            <div className="grid min-h-[260px] place-items-center text-center">
              <div className="team-reveal-spinner">
                <SportsIllustration sport={sport} compact />
                <p className="mt-4 text-sm font-bold text-white/80">{displayTeam}</p>
                <p className="mt-2 text-2xl font-black">勝負運を読み込み中...</p>
              </div>
            </div>
          )}

          {phase === "result" && fortune && submittedTeam && (
            <div className="team-reveal-result">
              <div className="flex items-center gap-2 text-sm font-bold text-white/85">
                <Trophy size={18} aria-hidden />
                {submittedTeam}
              </div>
              <div className="mt-3 flex items-end gap-3">
                <p className="text-6xl font-black">{fortune.score}</p>
                <p className="pb-2 text-lg font-bold">点</p>
              </div>
              <p className="mt-2 text-lg font-bold">{scoreLabel(fortune.score)}</p>
              <p className="mt-3 rounded-lg bg-white/15 p-3 text-sm leading-7">今日のテーマは「{fortune.mood}」。{fortune.chant}。</p>

              <div className="mt-4 grid gap-3">
                {[
                  ["攻め運", fortune.attack],
                  ["守り運", fortune.defense],
                  ["チーム運", fortune.teamwork]
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="flex items-center justify-between text-sm font-bold text-white/90">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/18">
                      <div className="sports-meter h-full rounded-full bg-white" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <button className="btn-secondary w-full" type="button" onClick={drawFortune}>
                  <RefreshCcw size={16} aria-hidden />
                  もう一度占う
                </button>
                <ShareButtons title={`${submittedTeam}の勝負運`} text={`今日のスポーツ占いは${fortune.score}点。${fortune.chant}`} />
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 rounded-lg bg-honey/20 p-3 text-xs leading-6 text-plum/70">
        スポーツ占いはエンタメ目的です。試合結果、選手成績、健康状態、賭け事などを予測・保証するものではありません。
      </p>
    </section>
  );
}
