import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="soft-card text-center">
        <p className="kicker">404</p>
        <h1 className="mt-2 text-3xl font-black text-plum">ページが見つかりません</h1>
        <p className="mt-3 text-plum/70">占いの小道を少し外れてしまったようです。トップへ戻って探してみましょう。</p>
        <Link className="btn-primary mt-5" href="/">
          トップへ戻る
        </Link>
      </section>
    </main>
  );
}
