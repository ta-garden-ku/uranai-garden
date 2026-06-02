"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const analyzeTimerRef = useRef<number | null>(null);
  const nextTimerRef = useRef<number | null>(null);

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const question = questions[current];

  const result = useMemo(() => {
    const total = answers.reduce<number>((sum, value) => sum + (value ?? 0), 0);
    return results[total % results.length];
  }, [answers, results]);

  useEffect(() => {
    return () => {
      if (analyzeTimerRef.current) window.clearTimeout(analyzeTimerRef.current);
      if (nextTimerRef.current) window.clearTimeout(nextTimerRef.current);
    };
  }, []);

  function chooseAnswer(optionIndex: number) {
    setAnswers((currentAnswers) => currentAnswers.map((value, index) => (index === current ? optionIndex : value)));

    if (nextTimerRef.current) window.clearTimeout(nextTimerRef.current);
    nextTimerRef.current = window.setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((value) => value + 1);
        return;
      }

      setIsAnalyzing(true);
      if (analyzeTimerRef.current) window.clearTimeout(analyzeTimerRef.current);
      analyzeTimerRef.current = window.setTimeout(() => {
        setIsAnalyzing(false);
        setDone(true);
      }, 1250);
    }, 240);
  }

  function goBack() {
    setDone(false);
    setIsAnalyzing(false);
    setCurrent((value) => Math.max(0, value - 1));
  }

  function restart() {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setDone(false);
    setIsAnalyzing(false);
    setStarted(false);
  }

  return (
    <div className="space-y-5">
      <section className="soft-card overflow-hidden">
        <div>
          <p className="kicker">DIAGNOSIS</p>
          <h2 className="mt-2 text-2xl font-bold text-plum">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-plum/70">{description}</p>
        </div>

        {!started && !done && !isAnalyzing && (
          <div className="diagnosis-start mt-6 rounded-lg bg-paper p-6 text-center">
            <div className="diagnosis-rings mx-auto" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className="diagnosis-crystal mx-auto">
              <Sparkles size={34} aria-hidden />
            </div>
            <h3 className="mt-4 text-xl font-black text-plum">診断を始める</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-plum/70">
              質問に答えたあと、鑑定中の演出を挟んで結果カードを表示します。
            </p>
            <button className="btn-primary mt-5" type="button" onClick={() => setStarted(true)}>
              <Sparkles size={16} aria-hidden />
              最初の質問へ
            </button>
          </div>
        )}

        {started && (
          <>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-paper">
              <div className="quiz-progress h-full rounded-full bg-gradient-to-r from-orchid to-roseglow transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs font-bold text-plum/55">
              {answeredCount} / {questions.length} 回答済み
            </p>
          </>
        )}

        {started && !done && !isAnalyzing && (
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
            <div className="diagnosis-rings mx-auto" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className="diagnosis-crystal mx-auto">
              <Sparkles size={34} aria-hidden />
            </div>
            <h3 className="mt-4 text-xl font-bold text-plum">診断中...</h3>
            <p className="mt-2 text-sm text-plum/65">回答から、今日のあなたに合う結果を読み取っています。</p>
          </div>
        )}
      </section>

      {done && (
        <div className="result-pop result-pop-luminous">
          <div className="diagnosis-result-altar mb-4 rounded-lg bg-paper p-5 text-center" aria-hidden>
            <div className="diagnosis-result-symbol mx-auto">
              <Sparkles size={36} />
            </div>
            <div className="diagnosis-result-stars">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <ResultCard title={result.title} subtitle={result.body}>
            <p className="leading-7">
              今日のヒントは、結果を決めつけるものではなく、自分の気持ちを眺める鏡としてお楽しみください。
            </p>
            <button className="btn-secondary mt-4" type="button" onClick={restart}>
              もう一度診断する
            </button>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
