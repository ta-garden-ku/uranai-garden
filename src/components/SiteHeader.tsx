import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link className="flex items-center gap-2" href="/">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-plum text-honey">
            <Sparkles size={18} aria-hidden />
          </span>
          <span>
            <span className="block text-base font-black text-plum">{siteConfig.name}</span>
            <span className="block text-[11px] font-bold tracking-[0.16em] text-plum/50">ENTERTAINMENT</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="メインナビゲーション">
          {mainNav.map((item) => (
            <Link key={item.href} className="rounded-full px-3 py-2 text-sm font-bold text-plum/75 hover:bg-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn-primary hidden sm:inline-flex" href="/today">
          今日の運勢
        </Link>
      </div>
      <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 md:hidden" aria-label="スマホナビゲーション">
        {mainNav.map((item) => (
          <Link key={item.href} className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-bold text-plum/75" href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="relative h-1 overflow-hidden">
        <Image src="/images/hero-garden.png" alt="" fill sizes="100vw" className="object-cover opacity-80" priority />
      </div>
    </header>
  );
}
