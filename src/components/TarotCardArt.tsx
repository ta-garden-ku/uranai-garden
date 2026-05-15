type Props = {
  slug?: string;
  reversed?: boolean;
};

type TarotArt = {
  scene: string;
  label: string;
  accent: string;
  secondary: string;
};

const tarotArt: Record<string, TarotArt> = {
  fool: { scene: "traveler", label: "旅人", accent: "#f4c95d", secondary: "#7dd3fc" },
  magician: { scene: "magician", label: "魔法", accent: "#a855f7", secondary: "#f4c95d" },
  "high-priestess": { scene: "priestess", label: "直感", accent: "#7dd3fc", secondary: "#c084fc" },
  empress: { scene: "flower", label: "実り", accent: "#f472b6", secondary: "#34d399" },
  emperor: { scene: "crown", label: "王座", accent: "#f59e0b", secondary: "#a855f7" },
  hierophant: { scene: "temple", label: "導き", accent: "#34d399", secondary: "#f4c95d" },
  lovers: { scene: "heart", label: "縁", accent: "#fb7185", secondary: "#f4c95d" },
  chariot: { scene: "chariot", label: "前進", accent: "#60a5fa", secondary: "#f4c95d" },
  strength: { scene: "lion", label: "勇気", accent: "#f4c95d", secondary: "#f472b6" },
  hermit: { scene: "lantern", label: "灯り", accent: "#c084fc", secondary: "#f4c95d" },
  "wheel-of-fortune": { scene: "wheel", label: "巡り", accent: "#f4c95d", secondary: "#34d399" },
  justice: { scene: "scales", label: "調和", accent: "#38bdf8", secondary: "#f4c95d" },
  "hanged-man": { scene: "branch", label: "視点", accent: "#a78bfa", secondary: "#7dd3fc" },
  death: { scene: "butterfly", label: "再生", accent: "#94a3b8", secondary: "#f472b6" },
  temperance: { scene: "cups", label: "節制", accent: "#2dd4bf", secondary: "#f4c95d" },
  devil: { scene: "chains", label: "誘惑", accent: "#f472b6", secondary: "#4b235f" },
  tower: { scene: "tower", label: "変化", accent: "#fb7185", secondary: "#f4c95d" },
  star: { scene: "stars", label: "希望", accent: "#7dd3fc", secondary: "#f4c95d" },
  moon: { scene: "moon", label: "夢", accent: "#c084fc", secondary: "#7dd3fc" },
  sun: { scene: "sun", label: "太陽", accent: "#f4c95d", secondary: "#fb7185" },
  judgement: { scene: "trumpet", label: "目覚め", accent: "#f59e0b", secondary: "#7dd3fc" },
  world: { scene: "wreath", label: "完成", accent: "#34d399", secondary: "#f4c95d" }
};

function Sparkles({ accent }: { accent: string }) {
  return (
    <>
      <circle cx="27" cy="32" r="2.5" fill={accent} opacity="0.85" />
      <circle cx="94" cy="38" r="3" fill={accent} opacity="0.75" />
      <circle cx="31" cy="105" r="2" fill={accent} opacity="0.75" />
      <path d="M84 91l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8z" fill={accent} opacity="0.85" />
    </>
  );
}

function Scene({ art }: { art: TarotArt }) {
  const { scene, accent, secondary } = art;

  if (scene === "magician") {
    return (
      <>
        <path d="M60 18c12 0 22 9 22 20s-10 20-22 20-22-9-22-20 10-20 22-20z" fill="#fff8f2" />
        <path d="M49 33c6-8 16-8 22 0M50 43c7 6 14 6 20 0" stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M38 75h44l-6 28H44l-6-28z" fill="#fff8f2" stroke={accent} strokeWidth="4" strokeLinejoin="round" />
        <path d="M78 20L39 92" stroke={secondary} strokeWidth="6" strokeLinecap="round" />
        <path d="M49 18c7-8 15 8 22 0" stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M60 62l5 12 12 5-12 5-5 12-5-12-12-5 12-5 5-12z" fill={accent} />
      </>
    );
  }

  if (scene === "traveler") return <><path d="M26 104l24-38 13 18 10-13 22 33H26z" fill={accent} /><circle cx="46" cy="36" r="13" fill="#fff8f2" stroke={accent} strokeWidth="5" /><path d="M50 49l21 22M54 55l-18 20" stroke={secondary} strokeWidth="5" strokeLinecap="round" /></>;
  if (scene === "priestess") return <><path d="M34 100V32M86 100V32" stroke={accent} strokeWidth="9" strokeLinecap="round" /><path d="M60 25c-17 7-21 28-8 40 9 8 22 8 31 1-8 15-29 20-44 9-16-12-17-36-3-49 7-6 16-8 24-1z" fill={secondary} /><rect x="41" y="74" width="38" height="26" rx="5" fill="#fff8f2" stroke={accent} strokeWidth="4" /></>;
  if (scene === "flower") return <><circle cx="60" cy="64" r="12" fill={secondary} /><path d="M60 22c11 20 5 33 0 42-5-9-11-22 0-42zM25 58c20-11 33-5 42 0-9 5-22 11-42 0zM95 58c-20 11-33 5-42 0 9-5 22-11 42 0zM60 94c-11-20-5-33 0-42 5 9 11 22 0 42z" fill={accent} /><path d="M60 76v31" stroke={secondary} strokeWidth="6" strokeLinecap="round" /></>;
  if (scene === "crown") return <><path d="M25 83l9-44 18 26 11-36 15 36 18-26 9 44H25z" fill={accent} /><rect x="30" y="83" width="60" height="14" rx="5" fill="#fff8f2" stroke={secondary} strokeWidth="4" /></>;
  if (scene === "temple") return <><path d="M60 23l39 25H21l39-25z" fill={accent} /><path d="M32 50v48M50 50v48M70 50v48M88 50v48" stroke="#fff8f2" strokeWidth="8" strokeLinecap="round" /><path d="M25 100h70" stroke={secondary} strokeWidth="7" strokeLinecap="round" /></>;
  if (scene === "heart") return <><path d="M60 96S25 72 29 47c3-18 23-20 31-5 8-15 28-13 31 5 4 25-31 49-31 49z" fill={accent} /><path d="M42 60h36" stroke="#fff8f2" strokeWidth="6" strokeLinecap="round" /></>;
  if (scene === "chariot") return <><rect x="34" y="48" width="52" height="34" rx="8" fill={accent} /><circle cx="44" cy="88" r="8" fill={secondary} /><circle cx="76" cy="88" r="8" fill={secondary} /><path d="M43 48l17-22 17 22M25 68h70" stroke="#fff8f2" strokeWidth="5" strokeLinecap="round" fill="none" /></>;
  if (scene === "lion") return <><circle cx="60" cy="58" r="31" fill={accent} /><circle cx="60" cy="58" r="19" fill="#fff8f2" /><path d="M49 57h.1M71 57h.1M52 71c6 5 11 5 17 0" stroke="#4b235f" strokeWidth="5" strokeLinecap="round" /><path d="M40 30c8-10 16-9 20 0 4-9 12-10 20 0" stroke={secondary} strokeWidth="5" strokeLinecap="round" fill="none" /></>;
  if (scene === "lantern") return <><path d="M44 42h32l-6 45H50l-6-45z" fill="#fff8f2" stroke={accent} strokeWidth="5" /><circle cx="60" cy="65" r="12" fill={secondary} /><path d="M48 42c0-13 24-13 24 0M60 87v18" stroke={accent} strokeWidth="5" strokeLinecap="round" fill="none" /></>;
  if (scene === "wheel") return <><circle cx="60" cy="62" r="33" fill="none" stroke={accent} strokeWidth="9" /><path d="M60 29v66M27 62h66M37 39l46 46M83 39L37 85" stroke={secondary} strokeWidth="5" strokeLinecap="round" /></>;
  if (scene === "scales") return <><path d="M60 25v76M33 43h54" stroke={accent} strokeWidth="6" strokeLinecap="round" /><path d="M38 43l-14 27h28L38 43zM82 43L68 70h28L82 43z" fill="#fff8f2" stroke={secondary} strokeWidth="4" /><path d="M45 101h30" stroke={accent} strokeWidth="7" strokeLinecap="round" /></>;
  if (scene === "branch") return <><path d="M30 30h60M60 30v62" stroke={accent} strokeWidth="7" strokeLinecap="round" /><circle cx="60" cy="64" r="14" fill="#fff8f2" stroke={secondary} strokeWidth="5" /><path d="M46 96h28" stroke={secondary} strokeWidth="6" strokeLinecap="round" /></>;
  if (scene === "butterfly") return <><path d="M58 57C36 27 19 44 28 68c8 21 24 12 30-11zM62 57c22-30 39-13 30 11-8 21-24 12-30-11z" fill={accent} /><path d="M60 49v43" stroke={secondary} strokeWidth="6" strokeLinecap="round" /></>;
  if (scene === "cups") return <><path d="M32 34h28v15c0 12-6 21-14 21S32 61 32 49V34zM60 73l28-39v15c0 12-6 21-14 21-5 0-9-2-14-7" fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /><path d="M45 82h32" stroke={secondary} strokeWidth="6" strokeLinecap="round" /></>;
  if (scene === "chains") return <><path d="M35 44c-10 12-10 27 0 39M85 44c10 12 10 27 0 39" stroke={accent} strokeWidth="8" strokeLinecap="round" /><path d="M43 69h34" stroke={secondary} strokeWidth="7" strokeLinecap="round" /><path d="M60 30l8 20 20 8-20 8-8 20-8-20-20-8 20-8 8-20z" fill={accent} opacity="0.78" /></>;
  if (scene === "tower") return <><path d="M43 28h34l-7 72H50L43 28z" fill={accent} /><path d="M38 28l10-14 9 14M67 28l9-14 10 14" fill={secondary} /><path d="M74 19L59 48h18L52 89" stroke="#fff8f2" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>;
  if (scene === "stars") return <><path d="M60 20l8 22 23 8-23 8-8 22-8-22-23-8 23-8 8-22z" fill={accent} /><circle cx="30" cy="31" r="5" fill={secondary} /><circle cx="91" cy="72" r="6" fill={secondary} /><circle cx="40" cy="95" r="4" fill={secondary} /></>;
  if (scene === "moon") return <><path d="M71 24c-23 9-30 38-13 55 11 11 29 12 42 2-10 22-40 27-59 10-20-18-18-50 3-64 8-5 18-7 27-3z" fill={accent} /><path d="M30 95c11-13 49-13 60 0" stroke={secondary} strokeWidth="7" strokeLinecap="round" fill="none" /></>;
  if (scene === "sun") return <><circle cx="60" cy="58" r="25" fill={accent} /><path d="M60 17v17M60 82v17M19 58h17M84 58h17M31 29l12 12M77 75l12 12M89 29L77 41M43 75L31 87" stroke={secondary} strokeWidth="6" strokeLinecap="round" /></>;
  if (scene === "trumpet") return <><path d="M31 56l47-24v48L31 56z" fill={accent} /><path d="M28 48v16M78 32l15-10M78 80l15 10M45 72l-8 24" stroke={secondary} strokeWidth="6" strokeLinecap="round" /></>;
  return <><circle cx="60" cy="60" r="34" fill="none" stroke={accent} strokeWidth="9" /><path d="M37 60c9-19 37-19 46 0-9 19-37 19-46 0z" fill="#fff8f2" stroke={secondary} strokeWidth="5" /><path d="M60 35v50M35 60h50" stroke={accent} strokeWidth="5" strokeLinecap="round" /></>;
}

export function TarotCardArt({ slug = "fool", reversed = false }: Props) {
  const art = tarotArt[slug] ?? tarotArt.fool;
  return (
    <svg className={`tarot-card-art ${reversed ? "is-reversed" : ""}`} viewBox="0 0 120 132" aria-hidden>
      <defs>
        <radialGradient id={`tarot-art-glow-${slug}`} cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor={art.secondary} stopOpacity="0.28" />
          <stop offset="100%" stopColor={art.accent} stopOpacity="0.08" />
        </radialGradient>
      </defs>
      <rect x="8" y="8" width="104" height="116" rx="18" fill={`url(#tarot-art-glow-${slug})`} />
      <circle cx="60" cy="62" r="48" fill="#fff8f2" opacity="0.52" />
      <Sparkles accent={art.secondary} />
      <Scene art={art} />
      <rect x="31" y="107" width="58" height="17" rx="8.5" fill="#fff8f2" opacity="0.92" />
      <text x="60" y="120" textAnchor="middle" fontSize="12" fontWeight="900" fill="#4b235f">
        {art.label}
      </text>
    </svg>
  );
}
