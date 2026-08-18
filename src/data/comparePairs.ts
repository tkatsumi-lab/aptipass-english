/**
 * Full /compare/[slug] pages. Condition-based only — no winner is
 * declared. Every axis reuses facts already recorded on the services
 * themselves (see services.ts); nothing new is introduced here. Only
 * pairs with a genuinely distinct user decision behind them are built —
 * not every combination of registered services.
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
        label: "ネイティブ講師の利用条件",
        a: "追加料金のオプションが必要",
        b: "追加料金なしで標準プランに含まれる",
      },
    ],
    aFitsIf: ["レッスン回数を増やして毎日話したい", "講師の国籍にこだわらない"],
    bFitsIf: ["ネイティブ講師との会話にこだわりたい", "予約なしですぐ話し始めたい"],
  },
  {
    slug: "nativecamp-vs-dmm-eikaiwa",
    serviceIds: ["nativecamp", "dmm-eikaiwa"],
    summary:
      "どちらも大手のレッスン提供型オンライン英会話ですが、レッスンの受け方と講師構成の考え方が異なります。",
    axes: [
      {
        label: "レッスンの受け方",
        a: "予約不要で毎日受講できるスタイル",
        b: "多国籍講師から選んで予約するスタイル",
      },
      {
        label: "講師の特徴",
        a: "ネイティブ・バイリンガル中心",
        b: "世界125カ国以上の講師陣",
      },
      {
        label: "ビジネス対応",
        a: "標準プランはビジネス特化ではない",
        b: "ビジネス英会話コースあり",
      },
    ],
    aFitsIf: ["レッスン回数を増やして毎日話したい", "予約の手間を減らしたい"],
    bFitsIf: ["幅広い国籍の講師から選びたい", "ビジネス英語コースも使いたい"],
  },
  {
    slug: "dmm-eikaiwa-vs-rarejob",
    serviceIds: ["dmm-eikaiwa", "rarejob"],
    summary: "世界の講師と話すDMM英会話と、厳選採用・法人実績のレアジョブ英会話。講師選定の考え方が異なります。",
    axes: [
      {
        label: "講師の特徴",
        a: "世界125カ国以上の講師陣",
        b: "採用率の低い厳選講師",
      },
      {
        label: "ビジネス対応",
        a: "ビジネス英会話コースあり",
        b: "法人導入実績3,400社以上",
      },
    ],
    aFitsIf: ["講師の国籍バリエーションを重視したい"],
    bFitsIf: ["講師の採用基準の厳しさを重視したい", "法人導入実績の裏付けを重視したい"],
  },
  {
    slug: "speak-vs-elsa-speak",
    serviceIds: ["speak", "elsa-speak"],
    summary:
      "どちらもAIを使ったスピーキング系アプリですが、狙いが異なります。Speakは会話練習、ELSA Speakは発音矯正が中心です。",
    axes: [
      {
        label: "練習の中心",
        a: "AI相手にスピーキング練習",
        b: "AIによる発音分析",
      },
      {
        label: "フィードバック",
        a: "発音・表現のフィードバック",
        b: "発音スコアを可視化",
      },
      {
        label: "対応プラットフォーム",
        a: "アプリのみ",
        b: "アプリ・Web",
      },
    ],
    aFitsIf: ["会話のキャッチボールを練習したい人"],
    bFitsIf: ["発音そのものを数値で確認して直したい人"],
  },
  {
    slug: "progrit-vs-toraiz",
    serviceIds: ["progrit", "toraiz"],
    summary: "どちらも英語コーチングですが、プログラム期間とレッスンの有無が異なります。",
    axes: [
      {
        label: "プログラム期間",
        a: "短期集中プログラム",
        b: "12ヶ月の長期プログラム",
      },
      {
        label: "レッスンの有無",
        a: "学習法設計中心（レッスン提供なし）",
        b: "専属ネイティブコーチとのレッスンあり",
      },
      {
        label: "対象",
        a: "AI英会話も併用できる",
        b: "受講生の約78%がビジネスパーソン",
      },
    ],
    aFitsIf: ["短期間で学習習慣を立て直したい人"],
    bFitsIf: ["時間をかけてじっくり本質的な力をつけたい人", "ネイティブとのレッスンも欲しい人"],
  },
];

export function getComparePairBySlug(slug: string): ComparePair | undefined {
  return comparePairs.find((c) => c.slug === slug);
}
