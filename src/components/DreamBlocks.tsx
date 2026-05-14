import Link from "next/link";
import { BookOpen, Flame, ListFilter, Tags } from "lucide-react";
import { dreamCategories, dreamKanaGroups, dreams, popularDreamSlugs } from "@/lib/content";
import { hashText, todayKey } from "@/lib/fortune";

const categoryLabels: Record<string, { name: string; description: string }> = {
  animals: { name: "動物の夢", description: "猫、犬、蛇、鳥など、生き物が出てくる夢をまとめました。" },
  nature: { name: "自然・天気の夢", description: "海、空、雨、雪、山など、自然や天気に関する夢占いです。" },
  love: { name: "恋愛の夢", description: "元恋人、告白、結婚式、指輪など恋愛に関する夢を集めました。" },
  people: { name: "人が出てくる夢", description: "知らない人、友達、家族、有名人など人間関係の夢占いです。" },
  places: { name: "場所・建物の夢", description: "学校、病院、駅、部屋など場所が印象的な夢を探せます。" },
  objects: { name: "物・アイテムの夢", description: "財布、鍵、鏡、手紙、アクセサリーなど物の夢占いです。" },
  actions: { name: "行動の夢", description: "落ちる、飛ぶ、追われる、泣くなど行動が印象的な夢です。" },
  transport: { name: "乗り物・移動の夢", description: "電車、車、飛行機、船など移動に関する夢占いです。" },
  colors: { name: "色の夢", description: "白、黒、赤、青、緑、金色など色が印象的な夢です。" },
  sports: { name: "スポーツの夢", description: "野球、サッカー、バスケなど勝負やチームワークの夢です。" }
};

const kanaLabels: Record<string, string> = {
  a: "あ行",
  ka: "か行",
  sa: "さ行",
  ta: "た行",
  na: "な行",
  ha: "は行",
  ma: "ま行",
  ya: "や行",
  ra: "ら行",
  wa: "わ行"
};

export function DreamCategoryLinks() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Tags size={18} className="text-mintnight" aria-hidden />
        <h2 className="text-xl font-bold text-plum">カテゴリから夢占いを探す</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dreamCategories.map((category) => {
          const label = categoryLabels[category.slug] ?? { name: category.name, description: category.description };
          return (
            <Link key={category.slug} className="soft-card transition hover:-translate-y-1" href={`/dreams/category/${category.slug}`}>
              <p className="kicker">DREAM CATEGORY</p>
              <h3 className="mt-2 text-xl font-bold text-plum">{label.name}</h3>
              <p className="mt-2 text-sm leading-7 text-plum/70">{label.description}</p>
              <p className="mt-3 text-xs font-bold text-mintnight">{category.dreamSlugs.length}件の夢キーワード</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function PopularDreams() {
  const rotated = [...popularDreamSlugs].sort((a, b) => {
    const key = todayKey();
    return hashText(`${key}-${a}`) - hashText(`${key}-${b}`);
  });
  const items = rotated.map((slug) => dreams.find((dream) => dream.slug === slug)).filter(Boolean);

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Flame size={18} className="text-mintnight" aria-hidden />
        <h2 className="text-xl font-bold text-plum">今日の人気夢占いランキング</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(
          (dream, index) =>
            dream && (
              <Link key={dream.slug} className="rounded-lg bg-white/85 p-4 shadow-soft transition hover:-translate-y-1" href={`/dreams/${dream.slug}`}>
                <p className="text-xs font-black tracking-[0.18em] text-mintnight">No.{index + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-plum">{dream.keyword}の夢</h3>
                <p className="mt-2 text-sm leading-6 text-plum/70">{dream.meaning}</p>
              </Link>
            )
        )}
      </div>
    </section>
  );
}

export function DreamKanaIndex() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <ListFilter size={18} className="text-mintnight" aria-hidden />
        <h2 className="text-xl font-bold text-plum">あいうえお索引</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {dreamKanaGroups.map((group) => {
          const items = group.dreamSlugs.map((slug) => dreams.find((dream) => dream.slug === slug)).filter(Boolean);
          return (
            <div key={group.slug} className="rounded-lg bg-white/85 p-4 shadow-soft">
              <h3 className="text-lg font-bold text-plum">{kanaLabels[group.slug] ?? group.label}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map(
                  (dream) =>
                    dream && (
                      <Link key={dream.slug} className="rounded-full bg-paper px-3 py-1 text-xs font-bold text-plum/75" href={`/dreams/${dream.slug}`}>
                        {dream.keyword}
                      </Link>
                    )
                )}
              </div>
            </div>
          );
        })}
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
      <h2 className="mt-2 text-2xl font-bold">300件以上の夢キーワードを収録</h2>
      <p className="mt-2 text-sm leading-7 text-white/80">
        動物、恋愛、人、場所、物、行動、色、スポーツなどのカテゴリから、夢の意味を前向きに読み解けます。
      </p>
      <Link className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-plum" href="/dreams">
        夢占い辞典を見る
      </Link>
    </section>
  );
}
