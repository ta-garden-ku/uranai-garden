export function hashText(input: string): number {
  return Array.from(input).reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 7);
}

export function pickBySeed<T>(items: readonly T[], seed: string): T {
  return items[hashText(seed) % items.length];
}

export function todayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function scoreFromSeed(seed: string, min = 68, max = 98): number {
  const spread = max - min + 1;
  return min + (hashText(seed) % spread);
}

export function zodiacFromDate(month: number, day: number) {
  const mmdd = month * 100 + day;
  if (mmdd >= 321 && mmdd <= 419) return "aries";
  if (mmdd >= 420 && mmdd <= 520) return "taurus";
  if (mmdd >= 521 && mmdd <= 621) return "gemini";
  if (mmdd >= 622 && mmdd <= 722) return "cancer";
  if (mmdd >= 723 && mmdd <= 822) return "leo";
  if (mmdd >= 823 && mmdd <= 922) return "virgo";
  if (mmdd >= 923 && mmdd <= 1023) return "libra";
  if (mmdd >= 1024 && mmdd <= 1122) return "scorpio";
  if (mmdd >= 1123 && mmdd <= 1221) return "sagittarius";
  if (mmdd >= 1222 || mmdd <= 119) return "capricorn";
  if (mmdd >= 120 && mmdd <= 218) return "aquarius";
  return "pisces";
}
