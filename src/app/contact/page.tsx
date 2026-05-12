import { Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "お問い合わせ｜Uranai Garden",
  description: "Uranai Gardenへのお問い合わせ、広告掲載、記事修正依頼はこちらから。",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main className="page-shell space-y-6">
      <PageHero kicker="CONTACT" title="お問い合わせ" description="ご意見、広告掲載、記事内容の確認依頼などはこちらからお送りください。" />
      <section className="soft-card">
        <div className="flex items-center gap-2 text-mintnight">
          <Mail size={20} aria-hidden />
          <h2 className="text-xl font-bold">お問い合わせフォーム</h2>
        </div>
        <p className="mt-3 leading-8 text-plum/75">
          MVPでは外部フォーム連携前のプレースホルダーです。Vercelデプロイ後、Googleフォーム、Formspree、microCMSフォームなどに差し替えてください。
        </p>
        <div className="mt-5 grid gap-3">
          <input className="rounded-lg border border-plum/15 px-4 py-3" placeholder="お名前" />
          <input className="rounded-lg border border-plum/15 px-4 py-3" placeholder="メールアドレス" />
          <textarea className="min-h-36 rounded-lg border border-plum/15 px-4 py-3" placeholder="お問い合わせ内容" />
          <button className="btn-primary w-full sm:w-auto" type="button">
            送信する
          </button>
        </div>
      </section>
    </main>
  );
}
