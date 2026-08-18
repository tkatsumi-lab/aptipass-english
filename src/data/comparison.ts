/**
 * Prototype comparison preview. Only qualitative, well-known positioning
 * is used — no prices or other unverified figures.
 */
export type ComparisonRow = {
  label: string;
  values: Record<"nativecamp" | "cambly" | "dmm-eikaiwa", string>;
};

export const comparisonServices = [
  { id: "nativecamp", name: "NativeCamp" },
  { id: "cambly", name: "Cambly" },
  { id: "dmm-eikaiwa", name: "DMM英会話" },
] as const;

export const comparisonRows: ComparisonRow[] = [
  {
    label: "レッスンの受け方",
    values: {
      nativecamp: "予約不要で毎日受講できるスタイル",
      cambly: "ネイティブ講師とすぐに話せるスタイル",
      "dmm-eikaiwa": "多国籍の講師から選んで予約するスタイル",
    },
  },
  {
    label: "講師の特徴",
    values: {
      nativecamp: "ネイティブ・バイリンガル中心",
      cambly: "講師は全員ネイティブスピーカー",
      "dmm-eikaiwa": "世界120カ国以上の講師陣",
    },
  },
  {
    label: "こんな人におすすめ",
    values: {
      nativecamp: "とにかく話す回数を増やしたい人",
      cambly: "ネイティブと直接話したい人",
      "dmm-eikaiwa": "講師のバリエーションを重視したい人",
    },
  },
];
