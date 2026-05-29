"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Sparkles } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { zodiacSigns } from "@/lib/content";
import { pickBySeed, scoreFromSeed, todayKey, zodiacFromDate } from "@/lib/fortune";

const colors = ["ローズピンク", "ラベンダー", "ミントグリーン", "ゴールド", "パールブルー"];
const items = ["手帳", "小さな花", "香りのミスト", "お気に入りのペン", "アクセサリー"];

export function BirthdayFortune() {
  const [birthday, setBirthday] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [isReading, setIsReading] = useState(false);

  const date = submitted ? new Date(`${submitted}T00:00:00`) : null;
  const signSlug = date ? zodiacFromDate(date.getMonth() + 1, date.getDate()) : null;
  const sign = zodiacSigns.find((item) => item.slug === signSlug);
  const seed = `${submitted}-${todayKey()}`;
  const score = submitted ? scoreFromSeed(seed) : 0;
  const color = submitted ? pickBySeed(colors, `${seed}-color`) : "";
  const item = submitted ? pickBySeed(items, `${seed}-item`) : "";

  function submitBirthday(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!birthday || isReading) return;

    setSubmitted("");
    setIsReading(true);
    window.setTimeout(() => {
      setSubmitted(birthday);
      setIsReading(false);
    }, 1050);
  }

  return (
    <div className="space-y-5">
      <form className="soft-card space-y-4" onSubmit={submitBirthday}>
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
        <button className="btn-primary w-full sm:w-auto" type="submit" disabled={isReading}>
          <Sparkles size={16} className={isReading ? "animate-pulse" : ""} aria-hidden />
          {isReading ? "誕生日の星を読んでいます..." : "診断する"}
        </button>
      </form>

      {isReading && (
        <section className="birth-oracle soft-card text-center">
          <div className="birth-oracle-stage mx-auto" aria-hidden>
            <div className="birth-oracle-moon" />
            <div className="birth-oracle-rings">
              <span />
              <span />
              <span />
            </div>
            <Sparkles className="birth-oracle-spark" size={42} />
          </div>
          <h2 className="mt-4 text-2xl font-black text-plum">星座と今日の流れを照らしています</h2>
          <p className="mt-2 text-sm leading-7 text-plum/70">
            生まれ日の星座、今日の流れ、ラッキーカラーを重ねて読み取っています。
          </p>
        </section>
      )}

      {submitted && sign && (
        <div className="result-pop result-pop-luminous">
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
              気分を明るくする小さなヒントとして楽しんでください。
            </p>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
