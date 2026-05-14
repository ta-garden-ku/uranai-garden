"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
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
  const [answers, setAnswers] = useState<Array<number | null>>(Array(questions.length).fill(null));
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const question = questions[current];

  const result = useMemo(() => {
    const total = answers.reduce((sum, value) => sum + (value ?? 0), 0);
    return results[total % results.length];
  }, [answers, results]);

  function chooseAnswer(optionIndex: number) {
    setAnswers((currentAnswers) =>
      currentAnswers.map((value, index) => (index === current ? optionIndex : value))
    );

    window.setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((value) => value + 1);
        return;
      }

      setIsAnalyzing(true);
      window.setTimeout(() => {
        setIsAnalyzing(false);
        setDone(true);
      }, 950);
    }, 220);
  }

  function goBack() {
    setDone(false);
    setIsAnalyzing(false);
    setCurrent((value) => Math.max(0, value - 1));
  }

  return (
    <div className="space-y-5">
      <section className="soft-card overflow-hidden">
        <div>
          <p className="kicker">DIAGNOSIS</p>
          <h2 className="mt-2 text-2xl font-bold text-plum">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-plum/70">{description}</p>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-paper">
          <div className="h-full rounded-full bg-gradient-to-r from-orchid to-roseglow transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs font-bold text-plum/55">
          {answeredCount} / {questions.length} 問回答
        </p>

        {!done && !isAnalyzing && (
          <div className="quiz-slide mt-6" key={current}>
            <div className="rounded-lg bg-paper p-5">
              <p className="kicker">QUESTION {current + 1}</p>
              <h3 className="mt-2 text-xl font-bold text-plum">{question.text}</h3>
              <div className="mt-4 grid gap-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    className={`quiz-option ${answers[current] === optionIndex ? "is-selected" : ""}`}
                    type="button"
                    onClick={() => chooseAnswer(optionIndex)}
                  >
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button className="btn-secondary" type="button" onClick={goBack} disabled={current === 0}>
                <ChevronLeft size={16} aria-hidden />
                戻る
              </button>
              <span className="text-sm font-bold text-plum/55">選ぶと次へ進みます</span>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="diagnosis-analyzing mt-6 rounded-lg bg-paper p-8 text-center">
            <div className="diagnosis-crystal mx-auto">
              <Sparkles size={34} aria-hidden />
            </div>
            <h3 className="mt-4 text-xl font-bold text-plum">診断中...</h3>
            <p className="mt-2 text-sm text-plum/65">回答から、今日のあなたに合う結果を読み解いています。</p>
          </div>
        )}
      </section>

      {done && (
        <div className="result-pop">
          <ResultCard title={result.title} subtitle={result.body}>
            <p className="leading-7">
              今日のヒントは、結果を決めつけではなく、自分の気持ちを眺める鏡として使うことです。
            </p>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
