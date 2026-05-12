import { siteConfig } from "@/lib/site";

type AdSlotProps = {
  placement: "article-top" | "article-middle" | "article-bottom" | "sidebar" | "result-bottom";
  label?: string;
};

const labels: Record<AdSlotProps["placement"], string> = {
  "article-top": "記事上部広告",
  "article-middle": "記事中広告",
  "article-bottom": "記事下広告",
  sidebar: "サイドバー広告",
  "result-bottom": "結果ページ下部広告"
};

export function AdSlot({ placement, label = labels[placement] }: AdSlotProps) {
  return (
    <aside
      className="rounded-lg border border-dashed border-plum/20 bg-white/70 p-4 text-center text-sm text-plum/70"
      data-ad-client={siteConfig.adsenseClient}
      data-ad-placement={placement}
      aria-label={label}
    >
      <div className="mb-1 text-xs font-bold tracking-[0.18em] text-plum/50">広告</div>
      <div>{label}</div>
      <div className="mt-1 text-xs">Google AdSense プレースホルダー</div>
    </aside>
  );
}
