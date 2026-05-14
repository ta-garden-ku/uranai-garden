import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="soft-card overflow-hidden text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-plum text-honey shadow-soft">
          <Sparkles size={34} aria-hidden />
        </div>
        <p className="kicker mt-5">404</p>
        <h1 className="mt-2 text-3xl font-black text-plum">ページが見つかりません</h1>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-plum/70">
          占いの小道を少し外れてしまったようです。トップページや夢占い辞典から、もう一度探してみましょう。
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link className="btn-primary" href="/">
            トップへ戻る
          </Link>
          <Link className="btn-secondary" href="/dreams">
            夢占い辞典へ
          </Link>
        </div>
      </section>
    </main>
  );
}
