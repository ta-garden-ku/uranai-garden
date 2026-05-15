"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { RefreshCcw, Trophy } from "lucide-react";
import { buildSportsDailyFortune, getTeamGroupsForSport, sportsProfiles } from "@/lib/sports";

type Props = {
  sportSlug: string;
};

function scoreLabel(score: number) {
  if (score >= 90) return "勝負どころに強い日";
  if (score >= 78) return "流れを作りやすい日";
  if (score >= 68) return "落ち着きが味方の日";
  return "準備で運を整える日";
}

export function SportsTeamFortune({ sportSlug }: Props) {
  const sport = sportsProfiles.find((item) => item.slug === sportSlug) ?? sportsProfiles[0];
  const teamGroups = useMemo(() => getTeamGroupsForSport(sportSlug), [sportSlug]);
  const defaultTeam = teamGroups[0]?.teams[0] ?? "応援チーム";
  const [teamName, setTeamName] = useState(defaultTeam);
  const [customTeam, setCustomTeam] = useState("");
  const [nonce, setNonce] = useState(0);

  const displayTeam = customTeam.trim() || teamName;
  const fortune = useMemo(() => buildSportsDailyFortune(sport.slug, displayTeam, `${new Date().toISOString().slice(0, 10)}-${nonce}`), [displayTeam, nonce, sport.slug]);

  return (
    <section className="sports-widget overflow-hidden rounded-lg border border-white/80 bg-white/88 p-5 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="kicker">TEAM FORTUNE</p>
          <h2 className="mt-2 text-2xl font-black text-plum">応援チームの今日の勝負運</h2>
          <p className="mt-2 text-sm leading-7 text-plum/70">プロ野球12球団や、好きなJリーグ・Bリーグ・WEリーグのチーム名で楽しめます。</p>
        </div>
        <button className="btn-secondary" type="button" onClick={() => setNonce((value) => value + 1)}>
          <RefreshCcw size={16} aria-hidden />
          気分を更新
        </button>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-lg bg-paper p-4">
          <label className="grid gap-2 text-sm font-bold text-plum">
            チームを選ぶ
            <select className="rounded-lg border border-plum/15 bg-white px-4 py-3" value={teamName} onChange={(event) => setTeamName(event.target.value)}>
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
            <input
              className="rounded-lg border border-plum/15 bg-white px-4 py-3"
              value={customTeam}
              onChange={(event) => setCustomTeam(event.target.value)}
              placeholder="例：地元のクラブ、推しチーム"
            />
          </label>
        </div>

        <div className="sports-score-card rounded-lg p-5 text-white" style={{ "--sport-accent": sport.accent } as CSSProperties & Record<"--sport-accent", string>}>
          <div className="flex items-center gap-2 text-sm font-bold text-white/85">
            <Trophy size={18} aria-hidden />
            {displayTeam}
          </div>
          <div className="mt-3 flex items-end gap-3">
            <p className="text-6xl font-black">{fortune.score}</p>
            <p className="pb-2 text-lg font-bold">点</p>
          </div>
          <p className="mt-2 text-lg font-bold">{scoreLabel(fortune.score)}</p>
          <p className="mt-3 rounded-lg bg-white/15 p-3 text-sm leading-7">今日のテーマは「{fortune.mood}」。{fortune.chant}。</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["攻め運", fortune.attack],
          ["守り運", fortune.defense],
          ["チーム運", fortune.teamwork]
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white/80 p-4">
            <div className="flex items-center justify-between text-sm font-bold text-plum">
              <span>{label}</span>
              <span>{value}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper">
              <div className="sports-meter h-full rounded-full" style={{ width: `${value}%`, background: sport.accent }} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-lg bg-honey/20 p-3 text-xs leading-6 text-plum/70">
        スポーツ占いはエンタメ目的です。試合結果や選手の成績を予測・保証するものではありません。応援前の気分づくりとしてお楽しみください。
      </p>
    </section>
  );
}
