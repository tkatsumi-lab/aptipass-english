export type CategoryId =
  | "online"
  | "ai"
  | "apps"
  | "toeic"
  | "business"
  | "coaching"
  | "kids"
  | "pronunciation";

export type Category = {
  id: CategoryId;
  /** URL slug under /categories/[slug] */
  slug: string;
  name: string;
  shortDescription: string;
  emoji: string;
  /** Tailwind gradient classes used for card headers / avatars */
  gradient: string;
  /** Light badge background */
  chipBg: string;
  /** Badge text color */
  chipText: string;
  /** Badge ring color */
  chipRing: string;
  /** Comparison points that matter within this category (evidence-based, not ranked) */
  comparisonPoints: string[];
  /** Other categories a user exploring this one often also considers */
  relatedCategoryIds: CategoryId[];
};

export const categories: Category[] = [
  {
    id: "online",
    slug: "online-eikaiwa",
    name: "オンライン英会話",
    shortDescription: "講師と話しながら実践的に鍛える",
    emoji: "🗣️",
    gradient: "from-sky-500 to-blue-600",
    chipBg: "bg-blue-50",
    chipText: "text-blue-700",
    chipRing: "ring-blue-200",
    comparisonPoints: [
      "レッスンの受け方(予約制か即時か)",
      "講師の国籍・種類",
      "受講できる時間帯",
    ],
    relatedCategoryIds: ["ai", "business", "coaching"],
  },
  {
    id: "ai",
    slug: "ai-english",
    name: "AI英会話",
    shortDescription: "AI相手に気兼ねなく練習",
    emoji: "🤖",
    gradient: "from-violet-500 to-purple-600",
    chipBg: "bg-violet-50",
    chipText: "text-violet-700",
    chipRing: "ring-violet-200",
    comparisonPoints: [
      "AIとの会話の自然さ",
      "フィードバックの内容",
      "人との会話への移行しやすさ",
    ],
    relatedCategoryIds: ["online", "pronunciation"],
  },
  {
    id: "apps",
    slug: "english-apps",
    name: "英語学習アプリ",
    shortDescription: "スキマ時間でコツコツ継続",
    emoji: "📱",
    gradient: "from-emerald-500 to-green-600",
    chipBg: "bg-emerald-50",
    chipText: "text-emerald-700",
    chipRing: "ring-emerald-200",
    comparisonPoints: [
      "学習コンテンツの範囲",
      "継続しやすい設計か",
      "アウトプット練習の有無",
    ],
    relatedCategoryIds: ["ai", "toeic"],
  },
  {
    id: "toeic",
    slug: "toeic-exam",
    name: "TOEIC・試験対策",
    shortDescription: "スコアという結果にこだわる",
    emoji: "📝",
    gradient: "from-amber-500 to-orange-600",
    chipBg: "bg-orange-50",
    chipText: "text-orange-700",
    chipRing: "ring-orange-200",
    comparisonPoints: [
      "出題傾向への対応",
      "学習ペース管理のしやすさ",
      "スコア目標別の教材有無",
    ],
    relatedCategoryIds: ["apps", "business"],
  },
  {
    id: "business",
    slug: "business-english",
    name: "ビジネス英語",
    shortDescription: "仕事で通用する英語力を",
    emoji: "💼",
    gradient: "from-slate-700 to-blue-950",
    chipBg: "bg-slate-100",
    chipText: "text-slate-700",
    chipRing: "ring-slate-300",
    comparisonPoints: [
      "ビジネス向け教材の有無",
      "講師の実務経験",
      "学習の柔軟性",
    ],
    relatedCategoryIds: ["online", "coaching"],
  },
  {
    id: "coaching",
    slug: "english-coaching",
    name: "英語コーチング",
    shortDescription: "学習計画ごと伴走してもらう",
    emoji: "🎯",
    gradient: "from-teal-500 to-cyan-600",
    chipBg: "bg-teal-50",
    chipText: "text-teal-700",
    chipRing: "ring-teal-200",
    comparisonPoints: [
      "学習計画のカスタマイズ度",
      "サポート頻度",
      "対象とする学習期間",
    ],
    relatedCategoryIds: ["business", "online"],
  },
  {
    id: "kids",
    slug: "kids-english",
    name: "子ども英語",
    shortDescription: "楽しみながら英語に触れる",
    emoji: "🧒",
    gradient: "from-pink-500 to-amber-400",
    chipBg: "bg-pink-50",
    chipText: "text-pink-700",
    chipRing: "ring-pink-200",
    comparisonPoints: [
      "対象年齢",
      "子ども向け教材・カリキュラム",
      "保護者のサポート体制",
    ],
    relatedCategoryIds: ["online", "apps"],
  },
  {
    id: "pronunciation",
    slug: "pronunciation",
    name: "発音・スピーキング",
    shortDescription: "話す力そのものを磨く",
    emoji: "🎤",
    gradient: "from-fuchsia-500 to-pink-500",
    chipBg: "bg-fuchsia-50",
    chipText: "text-fuchsia-700",
    chipRing: "ring-fuchsia-200",
    comparisonPoints: [
      "発音診断の精度",
      "フィードバックの速さ",
      "練習のしやすさ",
    ],
    relatedCategoryIds: ["ai", "online"],
  },
];

export function getCategory(id: CategoryId): Category {
  const category = categories.find((c) => c.id === id);
  if (!category) {
    throw new Error(`Unknown category id: ${id}`);
  }
  return category;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
