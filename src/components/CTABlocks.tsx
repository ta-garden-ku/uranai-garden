import Link from "next/link";
import { Bell, Mail, RefreshCcw } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function TodayReturnCta() {
  return (
    <section className="rounded-lg bg-plum p-5 text-white shadow-soft">
      <div className="flex items-center gap-2 text-sm font-bold text-honey">
        <RefreshCcw size={17} aria-hidden />
        毎日更新
      </div>
      <h2 className="mt-2 text-2xl font-bold">明日も今日の運勢をチェック</h2>
      <p className="mt-2 text-white/80">
        12星座の運勢、ラッキーカラー、ラッキーアイテムを日付ベースで楽しめます。
      </p>
      <Link className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-plum" href="/today">
        今日の運勢へ
      </Link>
    </section>
  );
}

export function SubscribeCta() {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <a className="rounded-lg bg-white/85 p-5 shadow-soft" href={siteConfig.lineCtaUrl}>
        <div className="flex items-center gap-2 text-sm font-bold text-mintnight">
          <Bell size={17} aria-hidden />
          LINE登録
        </div>
        <h2 className="mt-2 text-xl font-bold text-plum">毎朝の運勢を受け取る</h2>
        <p className="mt-2 text-sm text-plum/70">今日の運勢や週末の開運コラムを届けるCTA枠です。</p>
      </a>
      <a className="rounded-lg bg-white/85 p-5 shadow-soft" href={siteConfig.emailCtaUrl}>
        <div className="flex items-center gap-2 text-sm font-bold text-mintnight">
          <Mail size={17} aria-hidden />
          メール登録
        </div>
        <h2 className="mt-2 text-xl font-bold text-plum">新着記事をまとめて読む</h2>
        <p className="mt-2 text-sm text-plum/70">比較記事やランキング更新を案内するメールCTA枠です。</p>
      </a>
    </section>
  );
}
