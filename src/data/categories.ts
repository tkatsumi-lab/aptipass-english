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
  name: string;
  description: string;
  emoji: string;
  /** Tailwind gradient classes used for card headers / avatars */
  gradient: string;
  /** Light badge background */
  chipBg: string;
  /** Badge text color */
  chipText: string;
  /** Badge ring color */
  chipRing: string;
};

export const categories: Category[] = [
  {
    id: "online",
    name: "オンライン英会話",
    description: "講師と話しながら実践的に鍛える",
    emoji: "🗣️",
    gradient: "from-sky-500 to-blue-600",
    chipBg: "bg-blue-50",
    chipText: "text-blue-700",
    chipRing: "ring-blue-200",
  },
  {
    id: "ai",
    name: "AI英会話",
    description: "AI相手に気兼ねなく練習",
    emoji: "🤖",
    gradient: "from-violet-500 to-purple-600",
    chipBg: "bg-violet-50",
    chipText: "text-violet-700",
    chipRing: "ring-violet-200",
  },
  {
    id: "apps",
    name: "英語学習アプリ",
    description: "スキマ時間でコツコツ継続",
    emoji: "📱",
    gradient: "from-emerald-500 to-green-600",
    chipBg: "bg-emerald-50",
    chipText: "text-emerald-700",
    chipRing: "ring-emerald-200",
  },
  {
    id: "toeic",
    name: "TOEIC・試験対策",
    description: "スコアという結果にこだわる",
    emoji: "📝",
    gradient: "from-amber-500 to-orange-600",
    chipBg: "bg-orange-50",
    chipText: "text-orange-700",
    chipRing: "ring-orange-200",
  },
  {
    id: "business",
    name: "ビジネス英語",
    description: "仕事で通用する英語力を",
    emoji: "💼",
    gradient: "from-slate-700 to-blue-950",
    chipBg: "bg-slate-100",
    chipText: "text-slate-700",
    chipRing: "ring-slate-300",
  },
  {
    id: "coaching",
    name: "英語コーチング",
    description: "学習計画ごと伴走してもらう",
    emoji: "🎯",
    gradient: "from-teal-500 to-cyan-600",
    chipBg: "bg-teal-50",
    chipText: "text-teal-700",
    chipRing: "ring-teal-200",
  },
  {
    id: "kids",
    name: "子ども英語",
    description: "楽しみながら英語に触れる",
    emoji: "🧒",
    gradient: "from-pink-500 to-amber-400",
    chipBg: "bg-pink-50",
    chipText: "text-pink-700",
    chipRing: "ring-pink-200",
  },
  {
    id: "pronunciation",
    name: "発音・スピーキング",
    description: "話す力そのものを磨く",
    emoji: "🎤",
    gradient: "from-fuchsia-500 to-pink-500",
    chipBg: "bg-fuchsia-50",
    chipText: "text-fuchsia-700",
    chipRing: "ring-fuchsia-200",
  },
];

export function getCategory(id: CategoryId): Category {
  const category = categories.find((c) => c.id === id);
  if (!category) {
    throw new Error(`Unknown category id: ${id}`);
  }
  return category;
}
