export function hashText(input: string): number {
  return Array.from(input).reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 7);
}

export function pickBySeed<T>(items: readonly T[], seed: string): T {
  return items[hashText(seed) % items.length];
}

export function todayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function scoreFromSeed(seed: string, min = 68, max = 98): number {
  const spread = max - min + 1;
  return min + (hashText(seed) % spread);
}

export function zodiacFromDate(month: number, day: number) {
  const mmdd = month * 100 + day;
  if (mmdd >= 321 && mmdd <= 419) return "aries";
  if (mmdd >= 420 && mmdd <= 520) return "taurus";
  if (mmdd >= 521 && mmdd <= 621) return "gemini";
  if (mmdd >= 622 && mmdd <= 722) return "cancer";
  if (mmdd >= 723 && mmdd <= 822) return "leo";
  if (mmdd >= 823 && mmdd <= 922) return "virgo";
  if (mmdd >= 923 && mmdd <= 1023) return "libra";
  if (mmdd >= 1024 && mmdd <= 1122) return "scorpio";
  if (mmdd >= 1123 && mmdd <= 1221) return "sagittarius";
  if (mmdd >= 1222 || mmdd <= 119) return "capricorn";
  if (mmdd >= 120 && mmdd <= 218) return "aquarius";
  return "pisces";
}

export type GeneratedDailyFortune = {
  sign: string;
  rank: number;
  score: number;
  total: string;
  love: string;
  work: string;
  money: string;
  wellness: string;
  luckyColor: string;
  luckyItem: string;
  message: string;
};

const totalMessages = [
  "今日は小さな選択が流れを明るくします。迷ったら、気持ちが軽くなる方を選んでみて。",
  "周りとの会話からヒントが届きそうです。急がず、受け取った言葉を自分のペースで整えて。",
  "整えるほど運気が上がる日です。予定、持ち物、気持ちのどれか一つをすっきりさせましょう。",
  "新しい視点が入りやすい日。いつもと違う道や情報に触れると、前向きな発見がありそう。",
  "静かな集中が味方になります。大きく動くより、今できる一手を丁寧に積み重ねて。",
  "人とのつながりに温かさが戻る日。短い連絡やあいさつが、思った以上に良い流れを作ります。"
] as const;

const loveMessages = [
  "相手を決めつけず、やわらかく聞く姿勢が魅力になります。",
  "素直な一言が届きやすい日。重くならない言葉で気持ちを添えて。",
  "距離感を大切にすると安心して関われます。返事を急がなくても大丈夫。",
  "共通の好きなものが会話のきっかけに。小さな話題を大切に。"
] as const;

const workMessages = [
  "優先順位を一つ決めると進みやすくなります。完璧より着手を大切に。",
  "確認作業にツキがあります。短いメモが後で自分を助けます。",
  "周囲に相談すると視界が広がります。抱え込みすぎないで。",
  "集中できる時間帯を短く確保すると、思った以上に進みます。"
] as const;

const moneyMessages = [
  "買い物は一呼吸置いてから。長く使えるかを基準にすると満足度が上がります。",
  "予算を見える化すると安心です。投資や大きな判断は情報整理を優先して。",
  "小さな節約が楽しみに変わる日。無理なく続く形を選んで。",
  "欲しいものリストを見直すと、本当に必要なものが見えてきます。"
] as const;

const wellnessMessages = [
  "深呼吸や軽いストレッチで気分を整えて。医療的な不安は専門家へ相談を。",
  "休憩を予定に入れると、午後の集中力が戻りやすくなります。",
  "温かい飲み物や短い散歩が気分転換に。無理のないリズムを大切に。",
  "画面から少し離れる時間を作ると、心の余白が戻ってきます。"
] as const;

const colors = [
  "ローズピンク",
  "ラベンダー",
  "サンゴールド",
  "ミントグリーン",
  "パールブルー",
  "シルバー",
  "ワインレッド",
  "ターコイズ",
  "ミルキーホワイト",
  "オリーブグリーン",
  "コーラルピンク",
  "チャコールグレー"
] as const;

const items = [
  "手帳",
  "細字ペン",
  "ハンドクリーム",
  "小さな花",
  "イヤホン",
  "香りのミスト",
  "クリアポーチ",
  "ミラー",
  "水筒",
  "付箋",
  "お気に入りのアクセサリー",
  "やわらかいハンカチ"
] as const;

const messages = [
  "今日の一歩は、未来の自分への小さなギフトです。",
  "焦らず整えるほど、あなたらしい流れが戻ってきます。",
  "やさしい選択が、今日の運を静かに育てます。",
  "自分に向ける言葉を少しだけ柔らかくしてみて。",
  "小さな余白が、うれしい偶然の入口になります。",
  "比べるより、今の自分に合うペースを大切に。"
] as const;

export function buildDailyFortunes(signSlugs: readonly string[], dateKey = todayKey()): GeneratedDailyFortune[] {
  const fortunes = signSlugs.map((sign) => {
    const seed = `${dateKey}-${sign}`;
    return {
      sign,
      rank: 0,
      score: scoreFromSeed(`${seed}-score`, 66, 99),
      total: pickBySeed(totalMessages, `${seed}-total`),
      love: pickBySeed(loveMessages, `${seed}-love`),
      work: pickBySeed(workMessages, `${seed}-work`),
      money: pickBySeed(moneyMessages, `${seed}-money`),
      wellness: pickBySeed(wellnessMessages, `${seed}-wellness`),
      luckyColor: pickBySeed(colors, `${seed}-color`),
      luckyItem: pickBySeed(items, `${seed}-item`),
      message: pickBySeed(messages, `${seed}-message`)
    };
  });

  return fortunes
    .sort((a, b) => b.score - a.score)
    .map((fortune, index) => ({ ...fortune, rank: index + 1 }));
}
