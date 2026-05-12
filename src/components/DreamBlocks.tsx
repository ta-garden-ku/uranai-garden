import Link from "next/link";
import { BookOpen, Flame, Tags } from "lucide-react";
import { dreamCategories, dreams, popularDreamSlugs } from "@/lib/content";

export function DreamCategoryLinks() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Tags size={18} className="text-mintnight" aria-hidden />
        <h2 className="text-xl font-bold text-plum">カテゴリから夢占いを探す</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dreamCategories.map((category) => (
          <Link key={category.slug} className="soft-card" href={`/dreams/category/${category.slug}`}>
            <p className="kicker">DREAM CATEGORY</p>
            <h3 className="mt-2 text-xl font-bold text-plum">{category.name}</h3>
            <p className="mt-2 text-sm leading-7 text-plum/70">{category.description}</p>
            <p className="mt-3 text-xs font-bold text-mintnight">{category.dreamSlugs.length}件の夢キーワード</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PopularDreams() {
  const items = popularDreamSlugs
    .map((slug) => dreams.find((dream) => dream.slug === slug))
    .filter(Boolean);

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Flame size={18} className="text-mintnight" aria-hidden />
        <h2 className="text-xl font-bold text-plum">人気の夢占いランキング</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((dream, index) => (
          dream && (
            <Link key={dream.slug} className="rounded-lg bg-white/85 p-4 shadow-soft" href={`/dreams/${dream.slug}`}>
              <p className="text-xs font-black tracking-[0.18em] text-mintnight">No.{index + 1}</p>
              <h3 className="mt-2 text-lg font-bold text-plum">{dream.keyword}の夢</h3>
              <p className="mt-2 text-sm leading-6 text-plum/70">{dream.meaning}</p>
            </Link>
          )
        ))}
      </div>
    </section>
  );
}

export function DreamDictionaryIntro() {
  return (
    <section className="rounded-lg bg-plum p-5 text-white shadow-soft">
      <div className="flex items-center gap-2 text-sm font-bold text-honey">
        <BookOpen size={17} aria-hidden />
        夢占い辞典
      </div>
      <h2 className="mt-2 text-2xl font-bold">100件以上の夢キーワードを収録</h2>
      <p className="mt-2 text-sm leading-7 text-white/80">
        動物、恋愛、人、場所、物、行動、色、スポーツなどのカテゴリから、夢の意味を前向きに読み解けます。
      </p>
      <Link className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-plum" href="/dreams">
        夢占い辞典を見る
      </Link>
    </section>
  );
}
