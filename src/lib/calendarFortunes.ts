import { pickBySeed, scoreFromSeed, zodiacFromDate } from "@/lib/fortune";
import { zodiacSigns } from "@/lib/content";

export type MonthlyFortune = {
  month: number;
  name: string;
  theme: string;
  description: string;
  love: string;
  work: string;
  money: string;
  wellness: string;
  luckyColor: string;
  luckyItem: string;
};

export type SeasonalFortune = {
  slug: string;
  name: string;
  months: string;
  theme: string;
  description: string;
  luckyAction: string;
  luckyItem: string;
};

const colors = ["ローズピンク", "ラベンダー", "ミントグリーン", "シャンパンゴールド", "スカイブルー", "アイボリー", "アメジスト", "コーラル"];
const items = ["小さな手帳", "お気に入りの香り", "白いハンカチ", "金色のペン", "読みかけの本", "クリアポーチ", "花のモチーフ", "丸いアクセサリー"];
const themes = ["整える", "始める", "深める", "広げる", "受け取る", "磨く", "見直す", "楽しむ"];

export const monthlyFortunes: MonthlyFortune[] = Array.from({ length: 12 }, (_, index) => {
  const month = index + 1;
  const seed = `month-${month}`;
  const theme = pickBySeed(themes, `${seed}-theme`);

  return {
    month,
    name: `${month}月の運勢`,
    theme,
    description: `${month}月は「${theme}」がテーマ。大きく急がず、毎日の小さな選択を丁寧に整えるほど、気持ちよく流れに乗れそうです。`,
    love: "相手の反応を決めつけず、言葉をひとつ足すと関係がやわらぎます。",
    work: "やることを小さく分けると集中しやすい時期。完璧より着手を大切に。",
    money: "買い物は比較してから選ぶと満足度が上がります。投資判断は専門情報も確認を。",
    wellness: "体調を断定せず、休む時間と気分転換を予定に入れると過ごしやすくなります。",
    luckyColor: pickBySeed(colors, `${seed}-color`),
    luckyItem: pickBySeed(items, `${seed}-item`)
  };
});

export const seasonalFortunes: SeasonalFortune[] = [
  {
    slug: "spring",
    name: "春の運勢",
    months: "3月・4月・5月",
    theme: "新しい縁を育てる",
    description: "春は出会いと再スタートの気配が強まる季節。軽い挨拶や小さな挑戦が、次の楽しみにつながります。",
    luckyAction: "朝の予定をひとつだけ書き出す",
    luckyItem: "明るい色の文房具"
  },
  {
    slug: "summer",
    name: "夏の運勢",
    months: "6月・7月・8月",
    theme: "心が動く方向へ進む",
    description: "夏は行動量が増えやすい季節。無理に予定を詰め込まず、楽しいと思えるものを選ぶと運気が整います。",
    luckyAction: "水分補給と休憩を意識する",
    luckyItem: "涼しげなアクセサリー"
  },
  {
    slug: "autumn",
    name: "秋の運勢",
    months: "9月・10月・11月",
    theme: "実りを受け取り、整える",
    description: "秋はこれまでの積み重ねが見えやすい季節。成果を急がず、残すものと手放すものを分けてみましょう。",
    luckyAction: "持ち物をひとつ整理する",
    luckyItem: "落ち着いた香り"
  },
  {
    slug: "winter",
    name: "冬の運勢",
    months: "12月・1月・2月",
    theme: "静かに力を蓄える",
    description: "冬は内側を整える季節。焦って結論を出すより、あたためたい願いや計画を見直す時間に向いています。",
    luckyAction: "温かい飲み物で一息つく",
    luckyItem: "やわらかい布小物"
  }
];

export function daysInMonth(month: number) {
  if (month === 2) return 29;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

export function getBirthdayFortune(month: number, day: number) {
  const signSlug = zodiacFromDate(month, day);
  const sign = zodiacSigns.find((item) => item.slug === signSlug) ?? zodiacSigns[0];
  const seed = `birthday-${month}-${day}`;

  return {
    month,
    day,
    sign,
    score: scoreFromSeed(seed, 70, 99),
    personality: pickBySeed(
      [
        "周りを明るくする柔らかさと、ここぞという時の芯の強さを持つタイプです。",
        "観察力があり、相手の小さな変化にも気づけるやさしいタイプです。",
        "好奇心が豊かで、新しい楽しみを見つけるのが上手なタイプです。",
        "落ち着いた判断ができ、信頼を少しずつ積み上げられるタイプです。"
      ],
      `${seed}-personality`
    ),
    love: pickBySeed(
      [
        "恋愛では、安心できる会話が魅力を引き出します。",
        "無理に合わせすぎず、自分のペースを伝えると関係が育ちます。",
        "小さな感謝を言葉にすると、距離が自然に近づきます。"
      ],
      `${seed}-love`
    ),
    luckyColor: pickBySeed(colors, `${seed}-color`),
    luckyItem: pickBySeed(items, `${seed}-item`)
  };
}
