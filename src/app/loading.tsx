import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="page-shell">
      <section className="soft-card text-center">
        <div className="diagnosis-crystal mx-auto">
          <Sparkles size={34} aria-hidden />
        </div>
        <p className="kicker mt-5">LOADING</p>
        <h1 className="mt-2 text-2xl font-bold text-plum">星の流れを読み込み中...</h1>
      </section>
    </main>
  );
}
