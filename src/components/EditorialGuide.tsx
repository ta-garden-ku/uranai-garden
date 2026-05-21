type GuideVariant = "home" | "today" | "tarot" | "dreams";

const guides: Record<
  GuideVariant,
  {
    kicker: string;
    title: string;
    body: string;
    points: string[];
  }
> = {
  home: {
    kicker: "GUIDE",
    title: "Uranai Gardenの使い方",
    body: "Uranai Gardenは、毎日の気分を少し整えるためのエンタメ占いサイトです。占い結果を断定的な答えとして扱うのではなく、自分の気持ちを見つめたり、今日の行動を少し軽く決めたりするためのヒントとして読めるように設計しています。",
    points: [
      "今日の運勢、タロット、夢占い、診断をスマホで短時間に楽しめます。",
      "医療、投資、法律、人生の重大な判断を占いだけで決める表現は避けています。",
      "関連記事や辞典ページを増やし、検索から来た人にも読みやすい入口を用意しています。"
    ]
  },
  today: {
    kicker: "HOW TO READ",
    title: "今日の運勢を前向きに読むコツ",
    body: "今日の運勢は、未来を決めつけるものではありません。良い結果は小さな後押しとして、控えめな結果は丁寧に過ごすための合図として受け取ると、毎日の習慣として楽しみやすくなります。",
    points: [
      "総合運だけでなく、恋愛運・仕事運・金運・健康運を分けて確認できます。",
      "健康運は医療助言ではなく、休憩や生活リズムを意識するヒントとして表現しています。",
      "金運は投資判断ではなく、買い物や予算感を見直すきっかけとして表現しています。"
    ]
  },
  tarot: {
    kicker: "TAROT GUIDE",
    title: "タロット1枚引きの楽しみ方",
    body: "タロット1枚引きは、今の気持ちを言葉にするためのセルフリフレクションとして楽しめます。カードの意味を絶対視せず、恋愛・仕事・人間関係で今日意識したいことを考える入口として使ってください。",
    points: [
      "大アルカナ22枚の正位置・逆位置を用意しています。",
      "カードごとの意味ページで、出たカードの読み方を詳しく確認できます。",
      "深刻な悩みは占いだけで決めず、必要に応じて信頼できる人や専門家に相談してください。"
    ]
  },
  dreams: {
    kicker: "DREAM GUIDE",
    title: "夢占い辞典の読み方",
    body: "夢占いは、夢に出てきたものから今の気持ちをやさしく振り返るための読み物です。夢の意味を怖がるためではなく、最近気になっていることや疲れを見つめるヒントとして使えるようにまとめています。",
    points: [
      "動物、自然、恋愛、学校・仕事などカテゴリ別に探せます。",
      "夢の意味は断定せず、気持ちの整理につながる表現を中心にしています。",
      "気になる夢から関連記事へ移動しやすいよう、内部リンクを整えています。"
    ]
  }
};

export function EditorialGuide({ variant }: { variant: GuideVariant }) {
  const guide = guides[variant];

  return (
    <section className="soft-card">
      <p className="kicker">{guide.kicker}</p>
      <h2 className="mt-2 text-2xl font-black text-plum">{guide.title}</h2>
      <p className="mt-3 leading-8 text-plum/78">{guide.body}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {guide.points.map((point) => (
          <div key={point} className="rounded-lg bg-paper p-4 text-sm leading-7 text-plum/75">
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}
