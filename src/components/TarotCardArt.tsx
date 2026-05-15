type Props = {
  slug?: string;
  reversed?: boolean;
};

const tarotArt: Record<string, { label: string; symbol: "sun" | "moon" | "star" | "tower" | "heart" | "wheel" | "cup" | "crown" | "mountain"; accent: string }> = {
  fool: { label: "旅", symbol: "mountain", accent: "#f4c95d" },
  magician: { label: "創", symbol: "star", accent: "#a855f7" },
  "high-priestess": { label: "静", symbol: "moon", accent: "#7dd3fc" },
  empress: { label: "育", symbol: "heart", accent: "#f472b6" },
  emperor: { label: "軸", symbol: "crown", accent: "#f59e0b" },
  hierophant: { label: "学", symbol: "cup", accent: "#34d399" },
  lovers: { label: "縁", symbol: "heart", accent: "#fb7185" },
  chariot: { label: "進", symbol: "wheel", accent: "#60a5fa" },
  strength: { label: "力", symbol: "sun", accent: "#f4c95d" },
  hermit: { label: "灯", symbol: "star", accent: "#c084fc" },
  "wheel-of-fortune": { label: "巡", symbol: "wheel", accent: "#f4c95d" },
  justice: { label: "衡", symbol: "crown", accent: "#38bdf8" },
  "hanged-man": { label: "待", symbol: "moon", accent: "#a78bfa" },
  death: { label: "新", symbol: "mountain", accent: "#94a3b8" },
  temperance: { label: "和", symbol: "cup", accent: "#2dd4bf" },
  devil: { label: "欲", symbol: "tower", accent: "#f472b6" },
  tower: { label: "変", symbol: "tower", accent: "#fb7185" },
  star: { label: "希", symbol: "star", accent: "#7dd3fc" },
  moon: { label: "夢", symbol: "moon", accent: "#c084fc" },
  sun: { label: "陽", symbol: "sun", accent: "#f4c95d" },
  judgement: { label: "呼", symbol: "crown", accent: "#f59e0b" },
  world: { label: "完", symbol: "wheel", accent: "#34d399" }
};

function Shape({ symbol, accent }: { symbol: string; accent: string }) {
  if (symbol === "sun") return <circle cx="50" cy="48" r="18" fill={accent} />;
  if (symbol === "moon") return <path d="M61 24c-18 8-22 31-8 44 9 9 23 10 33 3-8 17-30 22-46 10-17-13-18-39-3-53 7-6 16-9 24-4z" fill={accent} />;
  if (symbol === "star") return <path d="M50 20l7 20 21 7-21 7-7 20-7-20-21-7 21-7 7-20z" fill={accent} />;
  if (symbol === "tower") return <path d="M35 28h30l-5 54H40L35 28zM33 28l8-14 8 14M57 28l8-14 8 14" fill={accent} />;
  if (symbol === "heart") return <path d="M50 78S20 58 24 38c3-14 19-16 26-4 7-12 23-10 26 4 4 20-26 40-26 40z" fill={accent} />;
  if (symbol === "wheel") return <><circle cx="50" cy="50" r="28" fill="none" stroke={accent} strokeWidth="8" /><path d="M50 22v56M22 50h56M31 31l38 38M69 31L31 69" stroke={accent} strokeWidth="5" strokeLinecap="round" /></>;
  if (symbol === "cup") return <path d="M30 28h40v18c0 14-9 24-20 24S30 60 30 46V28zM40 78h20" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />;
  if (symbol === "crown") return <path d="M22 66l8-34 15 22 15-28 15 28 15-22 8 34H22z" fill={accent} />;
  return <path d="M18 76l22-34 14 20 10-14 18 28H18z" fill={accent} />;
}

export function TarotCardArt({ slug = "fool", reversed = false }: Props) {
  const art = tarotArt[slug] ?? tarotArt.fool;
  return (
    <svg className={`tarot-card-art ${reversed ? "is-reversed" : ""}`} viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="44" fill="#fff8f2" opacity="0.9" />
      <circle cx="50" cy="50" r="34" fill={art.accent} opacity="0.12" />
      <Shape symbol={art.symbol} accent={art.accent} />
      <text x="50" y="93" textAnchor="middle" fontSize="13" fontWeight="900" fill="#4b235f">
        {art.label}
      </text>
    </svg>
  );
}
