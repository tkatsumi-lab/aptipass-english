import type { CategoryId } from "./categories";
import { getServicesByCategory, type Service } from "./services";

export type Goal = {
  id: string;
  /** URL slug under /goals/[slug] */
  slug: string;
  label: string;
  emoji: string;
  /** Short framing of what matters for this goal, shown at the top of the goal page */
  description: string;
  /** Comparison axes that matter for users with this goal */
  comparisonAxes: string[];
  relatedCategoryIds: CategoryId[];
  relatedGuideIds: string[];
};

export const goals: Goal[] = [
  {
    id: "speaking-improvement",
    slug: "speaking-improvement",
    label: "とにかく話せるようになりたい",
    emoji: "💬",
    description:
      "話す回数と、話しやすさのどちらを優先するかで選び方が変わります。",
    comparisonAxes: ["話す頻度", "講師の種類", "予約のしやすさ"],
    relatedCategoryIds: ["online", "ai"],
    relatedGuideIds: ["online-vs-ai", "daily-practice"],
  },
  {
    id: "business-english",
    slug: "business-english",
    label: "仕事で英語を使いたい",
    emoji: "💼",
    description:
      "日常会話力よりも、実務で使う場面に合わせた教材やサポートが重要になります。",
    comparisonAxes: ["ビジネス教材の有無", "講師の実務経験", "学習の柔軟性"],
    relatedCategoryIds: ["business"],
    relatedGuideIds: ["native-teacher"],
  },
  {
    id: "toeic",
    slug: "toeic",
    label: "TOEICスコアを上げたい",
    emoji: "📈",
    description:
      "会話力よりも、出題傾向への対応と学習ペースの管理がポイントです。",
    comparisonAxes: [
      "出題傾向への対応",
      "学習ペース管理のしやすさ",
      "スコア目標別の教材有無",
    ],
    relatedCategoryIds: ["toeic"],
    relatedGuideIds: [],
  },
  {
    id: "fix-pronunciation",
    slug: "pronunciation",
    label: "発音を直したい",
    emoji: "🎤",
    description:
      "発音を客観的に確認できるか、フィードバックがすぐ得られるかが鍵になります。",
    comparisonAxes: [
      "発音診断の精度",
      "フィードバックの速さ",
      "練習のしやすさ",
    ],
    relatedCategoryIds: ["pronunciation", "ai"],
    relatedGuideIds: ["pronunciation-apps"],
  },
  {
    id: "practice-alone-ai",
    slug: "ai-practice",
    label: "AIで一人で練習したい",
    emoji: "🤖",
    description:
      "人と話す前に、AI相手で気兼ねなく練習量を確保したい人向けの選び方です。",
    comparisonAxes: [
      "AIの応答の自然さ",
      "一人で続けやすいか",
      "人との会話への移行しやすさ",
    ],
    relatedCategoryIds: ["ai"],
    relatedGuideIds: ["online-vs-ai", "pronunciation-apps"],
  },
  {
    id: "talk-with-native",
    slug: "native-teacher",
    label: "ネイティブ講師と話したい",
    emoji: "🌍",
    description:
      "講師の国籍構成と、予約の取りやすさが選び方の分かれ目になります。",
    comparisonAxes: [
      "講師の国籍構成",
      "予約の取りやすさ",
      "会話中心か教材中心か",
    ],
    relatedCategoryIds: ["online"],
    relatedGuideIds: ["native-teacher", "daily-practice"],
  },
  {
    id: "kids-english",
    slug: "kids-english",
    label: "子どもに英語を習わせたい",
    emoji: "🧒",
    description:
      "子ども向けの教材・カリキュラムと、保護者のサポート体制が重要になります。",
    comparisonAxes: [
      "対象年齢",
      "子ども向け教材・カリキュラム",
      "保護者のサポート体制",
    ],
    relatedCategoryIds: ["kids"],
    relatedGuideIds: [],
  },
];

export function getGoalBySlug(slug: string): Goal | undefined {
  return goals.find((g) => g.slug === slug);
}

export function getServicesForGoal(goal: Goal): Service[] {
  const seen = new Set<string>();
  const result: Service[] = [];
  for (const categoryId of goal.relatedCategoryIds) {
    for (const service of getServicesByCategory(categoryId)) {
      if (!seen.has(service.id)) {
        seen.add(service.id);
        result.push(service);
      }
    }
  }
  return result;
}
