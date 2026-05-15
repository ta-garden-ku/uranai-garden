import type { SportsProfile } from "@/lib/sports";

type Props = {
  sport: Pick<SportsProfile, "scene" | "accent" | "secondary" | "shortName">;
  compact?: boolean;
};

function Scene({ scene, accent, secondary }: Pick<SportsProfile, "scene" | "accent" | "secondary">) {
  if (scene === "baseball") {
    return (
      <>
        <circle cx="66" cy="58" r="26" fill="#fff8f2" stroke={accent} strokeWidth="7" />
        <path d="M51 41c8 8 8 26 0 34M81 41c-8 8-8 26 0 34" stroke={secondary} strokeWidth="4" strokeLinecap="round" />
        <path d="M35 91l51-62" stroke={accent} strokeWidth="8" strokeLinecap="round" />
      </>
    );
  }
  if (scene === "soccer") {
    return (
      <>
        <circle cx="62" cy="59" r="30" fill="#fff8f2" stroke={accent} strokeWidth="7" />
        <path d="M62 36l15 11-6 18H53l-6-18 15-11zM47 47l-15-1M77 47l16-1M53 65l-10 14M71 65l10 14" stroke={secondary} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    );
  }
  if (scene === "basketball") {
    return (
      <>
        <circle cx="64" cy="59" r="31" fill={accent} />
        <path d="M33 59h62M64 28c12 9 18 19 18 31s-6 22-18 31M64 28C52 37 46 47 46 59s6 22 18 31" stroke="#fff8f2" strokeWidth="5" fill="none" strokeLinecap="round" />
      </>
    );
  }
  if (scene === "running") {
    return (
      <>
        <circle cx="68" cy="30" r="12" fill={accent} />
        <path d="M60 45l-17 21 24 8 18 22M66 52l20 12M54 73L36 96" stroke={secondary} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M23 104h75" stroke={accent} strokeWidth="5" strokeLinecap="round" />
      </>
    );
  }
  if (scene === "tennis") {
    return (
      <>
        <ellipse cx="55" cy="53" rx="24" ry="34" fill="none" stroke={accent} strokeWidth="7" transform="rotate(-28 55 53)" />
        <path d="M65 80l24 27M41 35l25 41M29 58l53-25" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
        <circle cx="86" cy="31" r="8" fill={accent} />
      </>
    );
  }
  if (scene === "golf") {
    return (
      <>
        <path d="M44 26v78" stroke={accent} strokeWidth="7" strokeLinecap="round" />
        <path d="M45 29c23-10 35 10 54 0v33c-19 10-31-10-54 0V29z" fill={secondary} />
        <circle cx="74" cy="93" r="7" fill="#fff8f2" stroke={accent} strokeWidth="4" />
        <path d="M27 104h76" stroke={accent} strokeWidth="5" strokeLinecap="round" />
      </>
    );
  }
  if (scene === "volleyball") {
    return (
      <>
        <circle cx="62" cy="58" r="30" fill="#fff8f2" stroke={accent} strokeWidth="7" />
        <path d="M44 36c16 10 22 24 18 52M62 28c-10 16-10 33 0 60M82 40c-14 1-30 7-48 20" stroke={secondary} strokeWidth="5" fill="none" strokeLinecap="round" />
      </>
    );
  }
  return (
    <>
      <ellipse cx="64" cy="58" rx="22" ry="35" fill={accent} transform="rotate(-24 64 58)" />
      <path d="M48 31c17 14 27 30 31 55M34 55c16-3 36-12 59-28" stroke="#fff8f2" strokeWidth="5" strokeLinecap="round" />
      <path d="M25 98h76" stroke={secondary} strokeWidth="6" strokeLinecap="round" />
    </>
  );
}

export function SportsIllustration({ sport, compact = false }: Props) {
  return (
    <div className={`sports-illustration ${compact ? "is-compact" : ""}`} aria-hidden>
      <svg viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="58" fill={sport.accent} opacity="0.12" />
        <circle cx="64" cy="64" r="45" fill="#fff8f2" opacity="0.42" />
        <path className="sports-orbit-line" d="M20 68c18-38 70-48 92-10" stroke={sport.secondary} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
        <Scene scene={sport.scene} accent={sport.accent} secondary={sport.secondary} />
      </svg>
    </div>
  );
}
