import type { CSSProperties } from "react";

type Props = {
  slug?: string;
  reversed?: boolean;
  compact?: boolean;
};

type TarotArt = {
  file: string;
  roman: string;
  label: string;
  accent: string;
};

const tarotArt: Record<string, TarotArt> = {
  fool: { file: "RWS_Tarot_00_Fool.jpg", roman: "0", label: "THE FOOL", accent: "#f4c95d" },
  magician: { file: "RWS_Tarot_01_Magician.jpg", roman: "I", label: "THE MAGICIAN", accent: "#a855f7" },
  "high-priestess": { file: "RWS_Tarot_02_High_Priestess.jpg", roman: "II", label: "THE HIGH PRIESTESS", accent: "#7dd3fc" },
  empress: { file: "RWS_Tarot_03_Empress.jpg", roman: "III", label: "THE EMPRESS", accent: "#f472b6" },
  emperor: { file: "RWS_Tarot_04_Emperor.jpg", roman: "IV", label: "THE EMPEROR", accent: "#f59e0b" },
  hierophant: { file: "RWS_Tarot_05_Hierophant.jpg", roman: "V", label: "THE HIEROPHANT", accent: "#34d399" },
  lovers: { file: "RWS_Tarot_06_Lovers.jpg", roman: "VI", label: "THE LOVERS", accent: "#fb7185" },
  chariot: { file: "RWS_Tarot_07_Chariot.jpg", roman: "VII", label: "THE CHARIOT", accent: "#60a5fa" },
  strength: { file: "RWS_Tarot_08_Strength.jpg", roman: "VIII", label: "STRENGTH", accent: "#f4c95d" },
  hermit: { file: "RWS_Tarot_09_Hermit.jpg", roman: "IX", label: "THE HERMIT", accent: "#c084fc" },
  "wheel-of-fortune": { file: "RWS_Tarot_10_Wheel_of_Fortune.jpg", roman: "X", label: "WHEEL OF FORTUNE", accent: "#f4c95d" },
  justice: { file: "RWS_Tarot_11_Justice.jpg", roman: "XI", label: "JUSTICE", accent: "#38bdf8" },
  "hanged-man": { file: "RWS_Tarot_12_Hanged_Man.jpg", roman: "XII", label: "THE HANGED MAN", accent: "#a78bfa" },
  death: { file: "RWS_Tarot_13_Death.jpg", roman: "XIII", label: "DEATH", accent: "#94a3b8" },
  temperance: { file: "RWS_Tarot_14_Temperance.jpg", roman: "XIV", label: "TEMPERANCE", accent: "#2dd4bf" },
  devil: { file: "RWS_Tarot_15_Devil.jpg", roman: "XV", label: "THE DEVIL", accent: "#f472b6" },
  tower: { file: "RWS_Tarot_16_Tower.jpg", roman: "XVI", label: "THE TOWER", accent: "#fb7185" },
  star: { file: "RWS_Tarot_17_Star.jpg", roman: "XVII", label: "THE STAR", accent: "#7dd3fc" },
  moon: { file: "RWS_Tarot_18_Moon.jpg", roman: "XVIII", label: "THE MOON", accent: "#c084fc" },
  sun: { file: "RWS_Tarot_19_Sun.jpg", roman: "XIX", label: "THE SUN", accent: "#f4c95d" },
  judgement: { file: "RWS_Tarot_20_Judgement.jpg", roman: "XX", label: "JUDGEMENT", accent: "#f59e0b" },
  world: { file: "RWS_Tarot_21_World.jpg", roman: "XXI", label: "THE WORLD", accent: "#34d399" }
};

function getImageUrl(file: string) {
  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=520`;
}

export function TarotCardArt({ slug = "fool", reversed = false, compact = false }: Props) {
  const art = tarotArt[slug] ?? tarotArt.fool;

  return (
    <div
      className={`tarot-card-art ${compact ? "is-compact" : ""} ${reversed ? "is-reversed" : ""}`}
      style={
        {
          "--tarot-image": `url("${getImageUrl(art.file)}")`,
          "--tarot-accent": art.accent
        } as CSSProperties & Record<"--tarot-image" | "--tarot-accent", string>
      }
      aria-hidden
    >
      <span className="tarot-art-roman">{art.roman}</span>
      <span className="tarot-art-label">{art.label}</span>
    </div>
  );
}
