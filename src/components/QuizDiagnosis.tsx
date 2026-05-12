"use client";

import { useMemo, useState } from "react";
import { ResultCard } from "@/components/ResultCard";

type Question = {
  text: string;
  options: readonly string[];
};

type Result = {
  title: string;
  body: string;
};

type Props = {
  title: string;
  description: string;
  questions: readonly Question[];
  results: readonly Result[];
};

export function QuizDiagnosis({ title, description, questions, results }: Props) {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [done, setDone] = useState(false);
  const result = useMemo(() => {
    const total = answers.reduce((sum, value) => sum + value, 0);
    return results[total % results.length];
  }, [answers, results]);

  return (
    <div className="space-y-5">
      <form
        className="soft-card space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setDone(true);
        }}
      >
        <div>
          <p className="kicker">DIAGNOSIS</p>
          <h2 className="mt-2 text-2xl font-bold text-plum">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-plum/70">{description}</p>
        </div>
        {questions.map((question, questionIndex) => (
          <fieldset key={question.text} className="rounded-lg bg-paper p-4">
            <legend className="font-bold text-plum">{question.text}</legend>
            <div className="mt-3 grid gap-2">
              {question.options.map((option, optionIndex) => (
                <label key={option} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={answers[questionIndex] === optionIndex}
                    onChange={() =>
                      setAnswers((current) =>
                        current.map((value, index) => (index === questionIndex ? optionIndex : value))
                      )
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <button className="btn-primary w-full sm:w-auto" type="submit">
          結果を見る
        </button>
      </form>
      {done && (
        <ResultCard title={result.title} subtitle={result.body}>
          <p className="leading-7">
            今日のヒントは、結果を「決めつけ」ではなく、自分の気持ちを眺める鏡として使うことです。
          </p>
        </ResultCard>
      )}
    </div>
  );
}
