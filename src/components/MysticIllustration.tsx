type IllustrationVariant =
  | "today"
  | "tarot"
  | "omikuji"
  | "dream"
  | "diagnosis"
  | "sports"
  | "articles"
  | "monthly"
  | "birthday"
  | "result"
  | "default";

type Props = {
  variant?: IllustrationVariant;
  compact?: boolean;
};

const variantConfig: Record<IllustrationVariant, { symbol: string; accent: string; label: string }> = {
  today: { symbol: "sun", accent: "#f4c95d", label: "今日" },
  tarot: { symbol: "card", accent: "#a855f7", label: "Tarot" },
  omikuji: { symbol: "paper", accent: "#f472b6", label: "運" },
  dream: { symbol: "moon", accent: "#7dd3fc", label: "夢" },
  diagnosis: { symbol: "crystal", accent: "#c084fc", label: "診断" },
  sports: { symbol: "ball", accent: "#34d399", label: "勝負" },
  articles: { symbol: "book", accent: "#f59e0b", label: "記事" },
  monthly: { symbol: "calendar", accent: "#fb7185", label: "月" },
  birthday: { symbol: "star", accent: "#f4c95d", label: "誕生日" },
  result: { symbol: "spark", accent: "#f4c95d", label: "結果" },
  default: { symbol: "spark", accent: "#a855f7", label: "UG" }
};

function SymbolShape({ symbol, accent, label }: { symbol: string; accent: string; label: string }) {
  if (symbol === "card") {
    return (
      <>
        <rect x="39" y="25" width="42" height="62" rx="8" fill="white" opacity="0.94" />
        <rect x="45" y="32" width="30" height="48" rx="5" fill={accent} opacity="0.22" />
        <path d="M60 38l6 14 14 6-14 6-6 14-6-14-14-6 14-6 6-14z" fill={accent} />
      </>
    );
  }

  if (symbol === "paper") {
    return (
      <>
        <rect x="35" y="24" width="50" height="70" rx="7" fill="white" opacity="0.95" />
        <path d="M43 38h34M43 52h34M43 66h24" stroke={accent} strokeWidth="4" strokeLinecap="round" />
        <text x="60" y="86" textAnchor="middle" fontSize="13" fontWeight="900" fill="#4b235f">
          {label}
        </text>
      </>
    );
  }

  if (symbol === "moon") {
    return (
      <>
        <path d="M68 29c-20 7-27 33-12 49 10 11 27 13 39 4-8 18-32 25-50 13-19-12-24-38-11-57 8-12 21-18 34-9z" fill="white" opacity="0.95" />
        <circle cx="36" cy="34" r="4" fill={accent} />
        <circle cx="85" cy="42" r="3" fill={accent} />
        <circle cx="90" cy="76" r="5" fill={accent} opacity="0.8" />
      </>
    );
  }

  if (symbol === "crystal") {
    return (
      <>
        <path d="M60 22l28 24-10 44H42L32 46 60 22z" fill="white" opacity="0.94" />
        <path d="M60 22v68M32 46h56M43 90l17-44 18 44" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    );
  }

  if (symbol === "ball") {
    return (
      <>
        <circle cx="60" cy="58" r="34" fill="white" opacity="0.95" />
        <path d="M32 58h56M60 24c12 9 18 20 18 34s-6 25-18 34M60 24C48 33 42 44 42 58s6 25 18 34" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" />
      </>
    );
  }

  if (symbol === "book") {
    return (
      <>
        <path d="M28 30h30c8 0 12 4 12 12v48H40c-7 0-12-4-12-10V30z" fill="white" opacity="0.95" />
        <path d="M70 42c0-8 4-12 12-12h10v60H70V42zM42 45h16M42 58h16M42 71h14" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      </>
    );
  }

  if (symbol === "calendar") {
    return (
      <>
        <rect x="31" y="29" width="58" height="60" rx="9" fill="white" opacity="0.95" />
        <path d="M31 45h58M45 25v12M75 25v12" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        <text x="60" y="73" textAnchor="middle" fontSize="22" fontWeight="900" fill="#4b235f">
          {label}
        </text>
      </>
    );
  }

  if (symbol === "sun") {
    return (
      <>
        <circle cx="60" cy="58" r="24" fill="white" opacity="0.95" />
        <path d="M60 20v13M60 83v13M22 58h13M85 58h13M34 32l9 9M77 75l9 9M86 32l-9 9M43 75l-9 9" stroke={accent} strokeWidth="5" strokeLinecap="round" />
      </>
    );
  }

  return (
    <>
      <path d="M60 24l8 24 24 8-24 8-8 24-8-24-24-8 24-8 8-24z" fill="white" opacity="0.95" />
      <circle cx="84" cy="36" r="5" fill={accent} />
      <circle cx="33" cy="78" r="4" fill={accent} opacity="0.8" />
    </>
  );
}

export function MysticIllustration({ variant = "default", compact = false }: Props) {
  const config = variantConfig[variant];
  return (
    <div className={`mystic-illustration ${compact ? "is-compact" : ""}`} aria-hidden>
      <svg viewBox="0 0 120 120" role="img">
        <defs>
          <radialGradient id={`glow-${variant}`} cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor={config.accent} stopOpacity="0.42" />
            <stop offset="100%" stopColor="#4b235f" stopOpacity="0.08" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="54" fill={`url(#glow-${variant})`} />
        <circle cx="60" cy="60" r="43" fill="#fff8f2" opacity="0.24" />
        <SymbolShape symbol={config.symbol} accent={config.accent} label={config.label} />
      </svg>
    </div>
  );
}
