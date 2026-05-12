import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { entertainmentNotice } from "@/lib/site";
import { ShareButtons } from "@/components/ShareButtons";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function ResultCard({ title, subtitle, children }: Props) {
  return (
    <section className="overflow-hidden rounded-lg border border-white/80 bg-white/90 shadow-soft">
      <div className="bg-gradient-to-r from-plum via-orchid to-roseglow p-5 text-white">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Sparkles size={18} aria-hidden />
          SNSシェア用 結果カード
        </div>
        <h2 className="mt-2 text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-white/85">{subtitle}</p>
      </div>
      <div className="space-y-4 p-5">
        {children}
        <p className="rounded-lg bg-paper p-3 text-xs text-plum/65">{entertainmentNotice}</p>
        <ShareButtons title={title} text={subtitle} />
      </div>
    </section>
  );
}
