"use client";

import { LineChart, MessageCircle, Twitter } from "lucide-react";
import { useMemo } from "react";

type Props = {
  title: string;
  text: string;
  url?: string;
};

export function makeShareText(title: string, text: string) {
  return `${title}\n${text}\n#UranaiGarden #今日の運勢`;
}

export function ShareButtons({ title, text, url }: Props) {
  const shareUrl = useMemo(() => {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }, [url]);
  const shareText = makeShareText(title, text);

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="flex flex-wrap gap-2">
      <a className="btn-primary" href={xUrl} target="_blank" rel="noopener noreferrer">
        <Twitter size={16} aria-hidden />
        Xでシェア
      </a>
      <a className="btn-secondary" href={lineUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={16} aria-hidden />
        LINEで送る
      </a>
      <button
        className="btn-secondary"
        type="button"
        onClick={() => navigator.clipboard?.writeText(`${shareText}\n${shareUrl}`)}
      >
        <LineChart size={16} aria-hidden />
        文言コピー
      </button>
    </div>
  );
}
