"use client";

import { useState } from "react";
import { zodiacSigns } from "@/lib/content";
import { pickBySeed, scoreFromSeed, todayKey, zodiacFromDate } from "@/lib/fortune";
import { ResultCard } from "@/components/ResultCard";

const colors = ["ローズピンク", "ラベンダー", "ミントグリーン", "ゴールド", "パールブルー"];
const items = ["手帳", "小さな花", "香りのミスト", "お気に入りのペン", "アクセサリー"];

export function BirthdayFortune() {
  const [birthday, setBirthday] = useState("");
  const [submitted, setSubmitted] = useState("");

  const date = submitted ? new Date(`${submitted}T00:00:00`) : null;
  const signSlug = date ? zodiacFromDate(date.getMonth() + 1, date.getDate()) : null;
  const sign = zodiacSigns.find((item) => item.slug === signSlug);
  const seed = `${submitted}-${todayKey()}`;
  const score = submitted ? scoreFromSeed(seed) : 0;
  const color = submitted ? pickBySeed(colors, `${seed}-color`) : "";
  const item = submitted ? pickBySeed(items, `${seed}-item`) : "";

  return (
    <div className="space-y-5">
      <form
        className="soft-card space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(birthday);
        }}
      >
        <label className="grid gap-2 text-sm font-bold text-plum">
          生年月日
          <input
            className="rounded-lg border border-plum/15 bg-white px-4 py-3 text-base"
            type="date"
            value={birthday}
            onChange={(event) => setBirthday(event.target.value)}
            required
          />
        </label>
        <button className="btn-primary w-full sm:w-auto" type="submit">
          診断する
        </button>
      </form>

      {submitted && sign && (
        <ResultCard title={`${sign.name}の誕生日占い`} subtitle={`今日の総合運 ${score}点 / ラッキーカラーは${color}`}>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-paper p-4">
              <p className="kicker">BIRTH SIGN</p>
              <p className="mt-2 text-xl font-bold">{sign.name}</p>
              <p className="text-sm text-plum/65">{sign.period}</p>
            </div>
            <div className="rounded-lg bg-paper p-4">
              <p className="kicker">COLOR</p>
              <p className="mt-2 text-xl font-bold">{color}</p>
            </div>
            <div className="rounded-lg bg-paper p-4">
              <p className="kicker">ITEM</p>
              <p className="mt-2 text-xl font-bold">{item}</p>
            </div>
          </div>
          <p className="leading-7">
            今日は「整える」「受け取る」を意識すると、あなたらしい流れが戻ってきます。急な判断を迫る占いではなく、
            気分を明るくするヒントとして楽しんでください。
          </p>
        </ResultCard>
      )}
    </div>
  );
}
