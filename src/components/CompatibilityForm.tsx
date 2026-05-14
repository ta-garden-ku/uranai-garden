"use client";

import { useMemo, useState } from "react";
import { ShareButtons } from "@/components/ShareButtons";
import { zodiacSigns } from "@/lib/content";
import { scoreFromSeed } from "@/lib/fortune";

type Result = {
  you: string;
  partner: string;
  yourSign: string;
  partnerSign: string;
  relationship: string;
};

const relationshipTypes = [
  { value: "love", label: "恋愛" },
  { value: "friend", label: "友達" },
  { value: "work", label: "仕事仲間" },
  { value: "family", label: "家族" }
] as const;

function signName(slug: string) {
  return zodiacSigns.find((sign) => sign.slug === slug)?.name ?? "星座";
}

function resultMessage(score: number) {
  if (score >= 90) return "自然体で話せる、とても心地よい組み合わせです。相手のよさを言葉にすると、さらに関係が育ちます。";
  if (score >= 78) return "違いを楽しめる良い相性です。急いで結論を出さず、会話の回数を重ねるほど安心感が増します。";
  return "ペースの違いが魅力になる相性です。無理に合わせすぎず、心地よい距離を探してみましょう。";
}

export function CompatibilityForm() {
  const [you, setYou] = useState("");
  const [partner, setPartner] = useState("");
  const [yourSign, setYourSign] = useState(zodiacSigns[0]?.slug ?? "aries");
  const [partnerSign, setPartnerSign] = useState(zodiacSigns[1]?.slug ?? "taurus");
  const [relationship, setRelationship] = useState("love");
  const [submitted, setSubmitted] = useState<Result | null>(null);

  const scores = useMemo(() => {
    if (!submitted) return null;
    const seed = `${submitted.you}-${submitted.partner}-${submitted.yourSign}-${submitted.partnerSign}-${submitted.relationship}`;
    return {
      overall: scoreFromSeed(`${seed}-overall`, 68, 98),
      communication: scoreFromSeed(`${seed}-communication`, 60, 96),
      pace: scoreFromSeed(`${seed}-pace`, 60, 96),
      spark: scoreFromSeed(`${seed}-spark`, 60, 96)
    };
  }, [submitted]);

  return (
    <div className="space-y-5">
      <form
        className="soft-card space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted({ you, partner, yourSign, partnerSign, relationship });
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-plum">
            あなたの名前
            <input className="rounded-lg border border-plum/15 px-4 py-3" value={you} onChange={(event) => setYou(event.target.value)} required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-plum">
            相手の名前
            <input className="rounded-lg border border-plum/15 px-4 py-3" value={partner} onChange={(event) => setPartner(event.target.value)} required />
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-plum">
            あなたの星座
            <select className="rounded-lg border border-plum/15 px-4 py-3" value={yourSign} onChange={(event) => setYourSign(event.target.value)}>
              {zodiacSigns.map((sign) => (
                <option key={sign.slug} value={sign.slug}>
                  {sign.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-plum">
            相手の星座
            <select className="rounded-lg border border-plum/15 px-4 py-3" value={partnerSign} onChange={(event) => setPartnerSign(event.target.value)}>
              {zodiacSigns.map((sign) => (
                <option key={sign.slug} value={sign.slug}>
                  {sign.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-plum">
            関係性
            <select className="rounded-lg border border-plum/15 px-4 py-3" value={relationship} onChange={(event) => setRelationship(event.target.value)}>
              {relationshipTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="btn-primary w-full sm:w-auto" type="submit">
          相性をみる
        </button>
      </form>

      {submitted && scores && (
        <section className="result-card result-card-hero space-y-5">
          <div>
            <p className="kicker">COMPATIBILITY</p>
            <h2 className="mt-2 text-3xl font-black text-white">
              {submitted.you}さんと{submitted.partner}さん
            </h2>
            <p className="mt-2 text-white/85">
              {signName(submitted.yourSign)} × {signName(submitted.partnerSign)}
            </p>
          </div>
          <div className="rounded-lg bg-white/90 p-5 text-center text-plum">
            <p className="text-sm font-bold">今日の相性スコア</p>
            <p className="mt-1 text-5xl font-black text-orchid">{scores.overall}%</p>
            <p className="mt-3 text-sm leading-7">{resultMessage(scores.overall)}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["会話", scores.communication],
              ["ペース", scores.pace],
              ["ときめき", scores.spark]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white/85 p-4 text-center text-plum">
                <p className="text-sm font-bold">{label}</p>
                <p className="mt-1 text-2xl font-black text-orchid">{value}%</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-white/85 p-4 text-sm leading-7 text-plum/75">
            相性診断はエンタメ目的です。相手との関係を決めつけるものではなく、会話や距離感をやわらかく見直すヒントとしてお楽しみください。
          </div>
          <ShareButtons title={`${submitted.you}さんと${submitted.partner}さんの相性診断`} text={`今日の相性は${scores.overall}%。${resultMessage(scores.overall)}`} />
        </section>
      )}
    </div>
  );
}
