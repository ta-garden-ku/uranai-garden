import { hashText, pickBySeed, scoreFromSeed, todayKey } from "@/lib/fortune";

export type SportsProfile = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  scene: "baseball" | "soccer" | "basketball" | "running" | "tennis" | "golf" | "volleyball" | "rugby";
  accent: string;
  secondary: string;
  luckyAction: string;
  luckyItem: string;
  message: string;
  preGame: string[];
};

export const sportsProfiles: SportsProfile[] = [
  {
    slug: "baseball",
    name: "野球占い",
    shortName: "野球",
    description: "攻める日か、守りを固める日か。集中力、チームワーク、勝負前の気分を占います。",
    scene: "baseball",
    accent: "#f59e0b",
    secondary: "#7dd3fc",
    luckyAction: "最初の一球を大切にする気持ちで、今日の予定をひとつ丁寧に始める",
    luckyItem: "キャップ",
    message: "今日は派手な一発より、確実な積み重ねが流れを作ります。",
    preGame: ["深呼吸を3回する", "応援する選手をひとり決める", "最初のチャンスを前向きに見る"]
  },
  {
    slug: "soccer",
    name: "サッカー占い",
    shortName: "サッカー",
    description: "視野の広さ、パスのタイミング、チャンスを見つける力を占います。",
    scene: "soccer",
    accent: "#34d399",
    secondary: "#f4c95d",
    luckyAction: "周りの動きをよく見て、先回りのひと言を添える",
    luckyItem: "スニーカー",
    message: "一人で突破しようとせず、良いパスを出すほど運が巡ります。",
    preGame: ["今日の注目ポイントを1つ決める", "前半は流れを見る", "声に出して応援する"]
  },
  {
    slug: "basketball",
    name: "バスケ占い",
    shortName: "バスケ",
    description: "テンポ、切り替え、ここぞという場面の決断力を占います。",
    scene: "basketball",
    accent: "#fb923c",
    secondary: "#a855f7",
    luckyAction: "短い時間で区切って、集中と休憩をリズムよく入れる",
    luckyItem: "スポーツタオル",
    message: "流れが速い日ほど、慌てず足元を整えるとシュートが決まります。",
    preGame: ["最初の5分を大事に見る", "流れが悪い時も切り替える", "推し選手の良いプレーを探す"]
  },
  {
    slug: "running",
    name: "ランニング占い",
    shortName: "ランニング",
    description: "自分のペース、継続力、気分の切り替えを占います。",
    scene: "running",
    accent: "#60a5fa",
    secondary: "#f472b6",
    luckyAction: "5分だけ外の空気を吸って、気持ちをリセットする",
    luckyItem: "水筒",
    message: "比べるより、自分に合うペースを守ることが今日の開運です。",
    preGame: ["最初から飛ばしすぎない", "姿勢を整える", "終わった後の楽しみを決める"]
  },
  {
    slug: "tennis",
    name: "テニス占い",
    shortName: "テニス",
    description: "受ける力、返す力、会話や判断のラリー運を占います。",
    scene: "tennis",
    accent: "#bef264",
    secondary: "#38bdf8",
    luckyAction: "返事を急がず、相手の言葉を一度受け止めてから返す",
    luckyItem: "リストバンド",
    message: "きれいに打ち返すより、続ける意識が良い関係を育てます。",
    preGame: ["焦らず1ポイントずつ見る", "流れが変わる瞬間を楽しむ", "姿勢を少し正す"]
  },
  {
    slug: "golf",
    name: "ゴルフ占い",
    shortName: "ゴルフ",
    description: "落ち着き、段取り、遠い目標を小さく狙う計画運を占います。",
    scene: "golf",
    accent: "#22c55e",
    secondary: "#f4c95d",
    luckyAction: "今日の目標をひとつに絞り、余白を持って進める",
    luckyItem: "ポロシャツ",
    message: "遠くを狙う日ほど、目の前の一打を丁寧に。",
    preGame: ["力を抜く", "天気や流れを読む", "小さな成功を拾う"]
  },
  {
    slug: "volleyball",
    name: "バレー占い",
    shortName: "バレー",
    description: "つなぐ力、声かけ、チーム全体の流れを占います。",
    scene: "volleyball",
    accent: "#f472b6",
    secondary: "#7dd3fc",
    luckyAction: "ありがとうを早めに伝えて、チームの空気を軽くする",
    luckyItem: "ヘアバンド",
    message: "今日は拾ってつなぐ姿勢が、思わぬチャンスを呼び込みます。",
    preGame: ["声を出して応援する", "つなぎのプレーを見る", "最後まで流れを信じる"]
  },
  {
    slug: "rugby",
    name: "ラグビー占い",
    shortName: "ラグビー",
    description: "突破力、支え合い、粘り強く前へ進む運を占います。",
    scene: "rugby",
    accent: "#a855f7",
    secondary: "#f59e0b",
    luckyAction: "一人で抱えず、支えてくれる人に短く相談する",
    luckyItem: "厚手のタオル",
    message: "少しずつ前に進む気持ちが、今日の流れを力強くします。",
    preGame: ["粘り強いプレーに注目する", "チーム全体を見る", "最後の数分まで楽しむ"]
  }
];

export const proTeamGroups = [
  {
    label: "プロ野球 12球団",
    teams: [
      "読売ジャイアンツ",
      "阪神タイガース",
      "中日ドラゴンズ",
      "横浜DeNAベイスターズ",
      "広島東洋カープ",
      "東京ヤクルトスワローズ",
      "福岡ソフトバンクホークス",
      "北海道日本ハムファイターズ",
      "千葉ロッテマリーンズ",
      "東北楽天ゴールデンイーグルス",
      "オリックス・バファローズ",
      "埼玉西武ライオンズ"
    ]
  },
  {
    label: "Jリーグ・WEリーグ・Bリーグなど",
    teams: ["浦和レッズ", "鹿島アントラーズ", "横浜F・マリノス", "川崎フロンターレ", "ヴィッセル神戸", "ガンバ大阪", "千葉ジェッツ", "宇都宮ブレックス", "琉球ゴールデンキングス"]
  }
] as const;

const moods = ["攻めの姿勢", "守りの安定", "切り替え", "チームワーク", "集中力", "粘り強さ"] as const;
const colors = ["ゴールド", "スカイブルー", "ミントグリーン", "ローズピンク", "ネイビー", "ホワイト", "オレンジ"] as const;
const chants = [
  "最初の流れを大切に",
  "焦らずひとつずつ",
  "声を出すほど運が巡る",
  "最後まで目を離さない",
  "好きなチームを信じて楽しむ"
] as const;

export function getSportsProfile(slug: string) {
  return sportsProfiles.find((sport) => sport.slug === slug);
}

export function buildSportsDailyFortune(sportSlug: string, teamName = "応援チーム", date = todayKey()) {
  const seed = `${date}-${sportSlug}-${teamName}`;
  return {
    score: scoreFromSeed(`${seed}-score`, 64, 99),
    attack: scoreFromSeed(`${seed}-attack`, 58, 98),
    defense: scoreFromSeed(`${seed}-defense`, 58, 98),
    teamwork: scoreFromSeed(`${seed}-teamwork`, 58, 98),
    mood: pickBySeed(moods, `${seed}-mood`),
    luckyColor: pickBySeed(colors, `${seed}-color`),
    chant: pickBySeed(chants, `${seed}-chant`),
    seedNumber: hashText(seed) % 1000
  };
}
