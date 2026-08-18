import { categories, type Category } from "@/data/categories";
import { goals, getServicesForGoal, type Goal } from "@/data/goals";
import {
  getServicesByCategory,
  type LearningStyle,
  type TeacherType,
  type PlatformType,
  type PricingModel,
  type TrialAvailability,
} from "@/data/services";

export const learningStyleLabels: Record<NonNullable<LearningStyle>, string> = {
  lesson: "講師とのレッスン型",
  "ai-practice": "AIとの練習型",
  "self-study": "自主学習型",
};

export const teacherTypeLabels: Record<NonNullable<TeacherType>, string> = {
  native: "ネイティブ講師",
  "native-bilingual": "ネイティブ・バイリンガル講師",
  multinational: "多国籍の講師陣",
  filipino: "フィリピン人講師",
  japanese: "日本人講師",
  ai: "AI",
  none: "講師なし（自習型）",
};

export const platformTypeLabels: Record<PlatformType, string> = {
  app: "アプリ",
  web: "Web",
  "video-call": "ビデオ通話",
};

export const pricingModelLabels: Record<NonNullable<PricingModel>, string> = {
  free: "無料",
  freemium: "無料プランあり（フリーミアム）",
  subscription: "月額サブスクリプション",
  one_time: "コース買い切り型",
};

export const trialAvailabilityLabels: Record<TrialAvailability, string> = {
  yes: "無料体験あり",
  no: "無料体験なし",
  unknown: "無料体験の有無は未確認",
};

/**
 * A category/goal hub is only indexed once it has real services to show.
 * This keeps thin, empty hubs out of the sitemap and search results while
 * still letting the page exist (200, not 404) so the site's full taxonomy
 * stays navigable as more services are added.
 */
export function isCategoryIndexable(category: Category): boolean {
  return getServicesByCategory(category.id).length > 0;
}

export function isGoalIndexable(goal: Goal): boolean {
  return getServicesForGoal(goal).length > 0;
}

export function getIndexableCategories(): Category[] {
  return categories.filter(isCategoryIndexable);
}

export function getIndexableGoals(): Goal[] {
  return goals.filter(isGoalIndexable);
}
