/**
 * Full /compare/[slug] pages. Condition-based only — no winner is
 * declared. Every axis reuses facts already recorded on the services
 * themselves (see services.ts); nothing new is introduced here.
 */
export type ComparePair = {
  slug: string;
  serviceIds: [string, string];
  summary: string;
  axes: {
    label: string;
    a: string;
    b: string;
  }[];
  /** Conditions under which the first service tends to fit better */
  aFitsIf: string[];
  /** Conditions under which the second service tends to fit better */
  bFitsIf: string[];
};

export const comparePairs: ComparePair[] = [
  {
    slug: "nativecamp-vs-cambly",
    serviceIds: ["nativecamp", "cambly"],
    summary:
      "どちらも「毎日話す」を意識できるオンライン英会話ですが、レッスンの受け方と講師の構成が異なります。",
    axes: [
      {
        label: "レッスンの受け方",
        a: "予約不要で毎日受講できるスタイル",
        b: "ネイティブ講師とすぐに話せるスタイル",
      },
      {
        label: "講師の特徴",
        a: "ネイティブ・バイリンガル中心",
        b: "講師は全員ネイティブスピーカー",
      },
      {
        label: "受講できる時間帯",
        a: "24時間受講可能",
        b: "予約なしですぐレッスン",
      },
    ],
    aFitsIf: [
      "レッスン回数を増やして毎日話したい",
      "講師の国籍にこだわらない",
    ],
    bFitsIf: [
      "ネイティブ講師との会話にこだわりたい",
      "予約なしですぐ話し始めたい",
    ],
  },
];

export function getComparePairBySlug(slug: string): ComparePair | undefined {
  return comparePairs.find((c) => c.slug === slug);
}
