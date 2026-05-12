import { PolicyPage } from "@/components/PolicyPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "プライバシーポリシー｜Uranai Garden",
  description: "Cookie、アクセス解析、広告配信、個人情報の取り扱いについて。",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <PolicyPage
      kicker="PRIVACY"
      title="プライバシーポリシー"
      description="Uranai Gardenにおける個人情報、Cookie、アクセス解析、広告配信の取り扱いです。"
      sections={[
        { heading: "個人情報の利用目的", body: "お問い合わせ時に入力された情報は、回答や必要な連絡のために利用します。目的外利用は行いません。" },
        { heading: "Cookieの利用", body: "利便性向上、アクセス解析、広告配信のためCookieを利用する場合があります。ブラウザ設定によりCookieを無効化できます。" },
        { heading: "アクセス解析", body: "Google Analytics等のアクセス解析ツールを利用する場合があります。取得されるデータは匿名化された統計情報として扱います。" },
        { heading: "広告配信", body: "Google AdSense等の広告サービスを利用する場合があります。広告配信事業者がCookieを使用し、ユーザーの興味に応じた広告を表示することがあります。" },
        { heading: "お問い合わせ", body: "個人情報の確認、修正、削除のご依頼はお問い合わせページからご連絡ください。" }
      ]}
    />
  );
}
