import type { CategoryId } from "./categories";
import { getServicesByCategory, services, type Service } from "./services";

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
  /**
   * Categories this goal draws its candidate services from. An empty array
   * means the goal is cross-cutting (drawn from every category) and relies
   * entirely on its `filter` in `goalFilters` below.
   */
  relatedCategoryIds: CategoryId[];
  relatedGuideIds: string[];
};

export const goals: Goal[] = [
  {
    id: "speaking-improvement",
    slug: "speaking-improvement",
    label: "とにかく話せるようになりたい",
    emoji: "💬",
    description: "話す回数と、話しやすさのどちらを優先するかで選び方が変わります。",
    comparisonAxes: ["話す頻度", "講師の種類", "予約のしやすさ"],
    relatedCategoryIds: ["online", "ai"],
    relatedGuideIds: ["online-vs-ai", "daily-practice", "choosing-online-eikaiwa"],
  },
  {
    id: "business-english",
    slug: "business-english",
    label: "仕事で英語を使いたい",
    emoji: "💼",
    description: "日常会話力よりも、実務で使う場面に合わせた教材やサポートが重要になります。",
    comparisonAxes: ["ビジネス教材の有無", "講師の実務経験", "学習の柔軟性"],
    relatedCategoryIds: ["business"],
    relatedGuideIds: ["choosing-coaching"],
  },
  {
    id: "toeic",
    slug: "toeic",
    label: "TOEICスコアを上げたい",
    emoji: "📈",
    description: "会話力よりも、出題傾向への対応と学習ペースの管理がポイントです。",
    comparisonAxes: ["出題傾向への対応", "学習ペース管理のしやすさ", "スコア目標別の教材有無"],
    relatedCategoryIds: ["toeic"],
    relatedGuideIds: ["choosing-exam-service"],
  },
  {
    id: "eiken",
    slug: "eiken",
    label: "英検対策をしたい",
    emoji: "🎓",
    description: "TOEICとは出題形式が異なるため、英検の級・二次試験対策に対応しているかを確認します。",
    comparisonAxes: ["英検対応級", "二次試験（面接）対策の有無", "学習ペース管理のしやすさ"],
    relatedCategoryIds: ["toeic"],
    relatedGuideIds: ["choosing-exam-service"],
  },
  {
    id: "fix-pronunciation",
    slug: "pronunciation",
    label: "発音を直したい",
    emoji: "🎤",
    description: "発音を客観的に確認できるか、フィードバックがすぐ得られるかが鍵になります。",
    comparisonAxes: ["発音診断の精度", "フィードバックの速さ", "練習のしやすさ"],
    relatedCategoryIds: ["pronunciation", "ai"],
    relatedGuideIds: ["pronunciation-apps"],
  },
  {
    id: "practice-alone-ai",
    slug: "ai-practice",
    label: "AIで一人で練習したい",
    emoji: "🤖",
    description: "人と話す前に、AI相手で気兼ねなく練習量を確保したい人向けの選び方です。",
    comparisonAxes: ["AIの応答の自然さ", "一人で続けやすいか", "人との会話への移行しやすさ"],
    relatedCategoryIds: ["ai"],
    relatedGuideIds: ["online-vs-ai", "choosing-ai-eikaiwa"],
  },
  {
    id: "talk-with-native",
    slug: "native-teacher",
    label: "ネイティブ講師と話したい",
    emoji: "🌍",
    description: "講師の国籍構成と、予約の取りやすさが選び方の分かれ目になります。",
    comparisonAxes: ["講師の国籍構成", "予約の取りやすさ", "会話中心か教材中心か"],
    relatedCategoryIds: ["online"],
    relatedGuideIds: ["native-teacher", "choosing-online-eikaiwa"],
  },
  {
    id: "kids-english",
    slug: "kids-english",
    label: "子どもに英語を習わせたい",
    emoji: "🧒",
    description: "子ども向けの教材・カリキュラムと、保護者のサポート体制が重要になります。",
    comparisonAxes: ["対象年齢", "子ども向け教材・カリキュラム", "保護者のサポート体制"],
    relatedCategoryIds: ["kids"],
    relatedGuideIds: [],
  },
  {
    id: "short-term-intensive",
    slug: "short-term-intensive",
    label: "短期間で伸ばしたい",
    emoji: "⏱️",
    description: "独学の継続が難しい人向けに、期間を区切って伴走してもらう選び方です。",
    comparisonAxes: ["プログラム期間", "学習管理の伴走度", "対象レベル"],
    relatedCategoryIds: ["coaching"],
    relatedGuideIds: ["choosing-coaching"],
  },
  {
    id: "self-study",
    slug: "self-study",
    label: "自主学習中心で進めたい",
    emoji: "📱",
    description: "決まった時間にレッスンを受けるのが難しい人向けに、アプリで自分のペースで進める選び方です。",
    comparisonAxes: ["学習コンテンツの範囲", "継続しやすい設計か", "アウトプット練習の有無"],
    relatedCategoryIds: ["apps"],
    relatedGuideIds: ["choosing-english-apps"],
  },
  {
    id: "beginner-friendly",
    slug: "beginner-friendly",
    label: "初心者から始めたい",
    emoji: "🌱",
    description: "いきなり外国人講師と話すのが不安な人向けに、始めやすさを重視した選び方です。",
    comparisonAxes: ["初心者向けの配慮", "日本語サポートの有無", "学習の始めやすさ"],
    relatedCategoryIds: ["apps", "kids", "ai"],
    relatedGuideIds: ["choosing-online-eikaiwa", "choosing-english-apps"],
  },
  {
    id: "budget-conscious",
    slug: "budget-conscious",
    label: "費用を抑えて試したい",
    emoji: "💰",
    description: "契約前に無料で試せるか、無料の範囲で使い続けられるかを軸に絞り込む選び方です。",
    comparisonAxes: ["無料体験の有無", "料金プランの形態", "無料範囲でできること"],
    relatedCategoryIds: [],
    relatedGuideIds: ["choosing-english-apps"],
  },
];

/**
 * A few goals describe a condition that cuts across categories (or narrows
 * a category further) rather than "belongs to category X". Those use a
 * predicate over already-evidenced Service fields instead of a new,
 * unverified boolean field on every service.
 */
const goalFilters: Record<string, (service: Service) => boolean> = {
  eiken: (s) => s.examSupport.includes("英検"),
  "native-teacher": (s) => s.teacherType === "native" || s.teacherType === "native-bilingual",
  "beginner-friendly": (s) => !s.notFor.some((reason) => reason.includes("初心者")),
  "budget-conscious": (s) =>
    s.pricingModel === "freemium" || s.pricingModel === "free" || s.trialAvailability === "yes",
};

export function getServicesForGoal(goal: Goal): Service[] {
  const seen = new Set<string>();
  const pool: Service[] = [];

  if (goal.relatedCategoryIds.length > 0) {
    for (const categoryId of goal.relatedCategoryIds) {
      for (const service of getServicesByCategory(categoryId)) {
        if (!seen.has(service.id)) {
          seen.add(service.id);
          pool.push(service);
        }
      }
    }
  } else {
    pool.push(...services);
  }

  const filter = goalFilters[goal.id];
  return filter ? pool.filter(filter) : pool;
}

export function getGoalBySlug(slug: string): Goal | undefined {
  return goals.find((g) => g.slug === slug);
}
