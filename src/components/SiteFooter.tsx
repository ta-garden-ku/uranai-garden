import Link from "next/link";
import { entertainmentNotice, mainNav, siteConfig } from "@/lib/site";

const policyLinks = [
  { href: "/about", label: "運営者情報" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/ads-affiliate-policy", label: "広告・アフィリエイトポリシー" }
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/70 bg-plum text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-black">{siteConfig.name}</h2>
          <p className="mt-3 text-sm leading-7 text-white/75">{entertainmentNotice}</p>
        </div>
        <div>
          <h3 className="font-bold text-honey">コンテンツ</h3>
          <div className="mt-3 grid gap-2 text-sm">
            {mainNav.map((item) => (
              <Link key={item.href} className="text-white/75 hover:text-white" href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-honey">ポリシー</h3>
          <div className="mt-3 grid gap-2 text-sm">
            {policyLinks.map((item) => (
              <Link key={item.href} className="text-white/75 hover:text-white" href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/55">
        © 2026 {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
