import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "運営者情報｜Uranai Garden",
  description: "Uranai Gardenの運営方針、コンテンツ制作方針、広告・PRへの考え方をまとめています。",
  path: "/about"
});

const sections = [
  {
    heading: "Uranai Gardenについて",
    body: "Uranai Gardenは、今日の運勢、星座占い、タロット、夢占い、診断、おみくじをスマホで気軽に楽しめるエンタメ占いサイトです。占いを人生の答えとして押しつけるのではなく、毎日の気分を整えたり、自分の気持ちを見つめたりする小さなきっかけとして使える場所を目指しています。"
  },
  {
    heading: "コンテンツ制作方針",
    body: "各ページでは、読者が不安になりすぎない表現を大切にしています。恋愛、仕事、金運、健康運を扱う場合も、医療・投資・法律・人生の重大な判断を断定的に助言しない方針です。健康運は休憩や生活リズムの見直し、金運は買い物や予算感の確認など、日常の小さなヒントとして表現しています。"
  },
  {
    heading: "占い結果の扱い方",
    body: "占い結果はエンタメ目的です。良い結果は前向きな後押しとして、控えめな結果は丁寧に過ごすための合図として受け取れるようにしています。深刻な悩みや専門性の高い判断については、占いだけで決めず、必要に応じて信頼できる人や専門家へ相談してください。"
  },
  {
    heading: "広告・PRについて",
    body: "サイト運営のため、Google AdSenseやアフィリエイト広告を掲載する場合があります。広告やPRを掲載する場合は、読者に分かるように表示し、効果を保証する表現や不安を煽る表現を避けます。紹介する商品やサービスは、占い・診断・夢占いの文脈と自然につながるものを中心に選びます。"
  },
  {
    heading: "お問い合わせ",
    body: "掲載内容の確認、広告掲載、その他のお問い合わせは、お問い合わせページからご連絡ください。内容を確認し、必要に応じて修正や追記を行います。"
  }
] as const;

export default function AboutPage() {
  return (
    <main className="page-shell space-y-8">
      <PageHero
        kicker="ABOUT"
        title="運営者情報"
        description="Uranai Gardenの目的、制作方針、広告・PRへの考え方をまとめています。"
      />
      <section className="grid gap-4">
        {sections.map((section) => (
          <article key={section.heading} className="soft-card">
            <h2 className="text-2xl font-bold text-plum">{section.heading}</h2>
            <p className="mt-3 leading-8 text-plum/78">{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
