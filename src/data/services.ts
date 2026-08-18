import type { CategoryId } from "./categories";

export type LearningStyle = "lesson" | "ai-practice" | null;

export type TeacherType =
  | "native"
  | "native-bilingual"
  | "multinational"
  | "filipino"
  | "ai"
  | null;

export type PlatformType = "app" | "web" | "video-call";

export type AffiliateStatus = "none" | "pending" | "active" | "unavailable";

export type EvidenceStatus = "verified" | "unconfirmed";

/**
 * Prototype-scale but production-shaped service record.
 *
 * Facts that have not been checked in this session are left as
 * `null` / empty rather than guessed — see `evidenceStatus` and
 * `lastVerifiedAt`. No prices, review scores, user counts, campaigns,
 * or "No.1"-style claims are stored here; those require verified
 * sourcing this project does not yet have. Ranking and affiliate
 * status are intentionally kept out of this fact record — see
 * `affiliateStatus` docs in README for the separation rule.
 */
export type Service = {
  id: string;
  /** URL slug under /services/[slug] */
  slug: string;
  name: string;
  /** Short initials shown on the placeholder avatar (no external logos are used) */
  initials: string;
  shortDescription: string;
  /** A service can belong to more than one category. First entry is primary (used for badge/avatar color). */
  categories: CategoryId[];
  features: string[];
  bestFor: string[];
  notFor: string[];
  learningStyle: LearningStyle;
  teacherType: TeacherType;
  platformType: PlatformType[];
  officialUrl: string | null;
  affiliateUrl: string | null;
  affiliateStatus: AffiliateStatus;
  evidenceStatus: EvidenceStatus;
  /** ISO date the facts above were last checked, or null if unconfirmed */
  lastVerifiedAt: string | null;
};

export const services: Service[] = [
  {
    id: "nativecamp",
    slug: "nativecamp",
    name: "NativeCamp",
    initials: "NC",
    shortDescription:
      "レッスン回数を気にせず、毎日話す環境を作れるオンライン英会話。",
    categories: ["online"],
    features: [
      "レッスン回数を気にせず話せる環境",
      "ネイティブ・バイリンガル講師",
      "24時間受講可能",
    ],
    bestFor: ["レッスン回数を増やして毎日話したい人"],
    notFor: ["予約してじっくり講師を選びたい人"],
    learningStyle: "lesson",
    teacherType: "native-bilingual",
    platformType: ["app", "web", "video-call"],
    officialUrl: "https://nativecamp.net/",
    affiliateUrl: null,
    affiliateStatus: "none",
    evidenceStatus: "verified",
    lastVerifiedAt: "2026-08-18",
  },
  {
    id: "cambly",
    slug: "cambly",
    name: "Cambly",
    initials: "CB",
    shortDescription:
      "予約不要で、ネイティブ講師とすぐに話せるオンライン英会話。",
    categories: ["online"],
    features: [
      "講師は全員ネイティブスピーカー",
      "予約なしですぐレッスン",
      "日常英会話に強い",
    ],
    bestFor: ["予約なしでネイティブとすぐ話したい人"],
    notFor: ["費用を抑えてレッスン回数を増やしたい人"],
    learningStyle: "lesson",
    teacherType: "native",
    platformType: ["app", "web", "video-call"],
    officialUrl: "https://www.cambly.com/",
    affiliateUrl: null,
    affiliateStatus: "none",
    evidenceStatus: "verified",
    lastVerifiedAt: "2026-08-18",
  },
  {
    id: "dmm-eikaiwa",
    slug: "dmm-eikaiwa",
    name: "DMM英会話",
    initials: "DM",
    shortDescription:
      "世界120カ国以上の講師から選べる、教材も充実したオンライン英会話。",
    categories: ["online"],
    features: [
      "世界120カ国以上の講師陣",
      "オリジナル教材が豊富",
      "毎日レッスンのプランあり",
    ],
    bestFor: ["幅広い国籍の講師と話したい人"],
    notFor: ["特定の講師と長期的に固定して学びたい人"],
    learningStyle: "lesson",
    teacherType: "multinational",
    platformType: ["app", "web", "video-call"],
    officialUrl: "https://eikaiwa.dmm.com/",
    affiliateUrl: null,
    affiliateStatus: "none",
    evidenceStatus: "verified",
    lastVerifiedAt: "2026-08-18",
  },
  {
    id: "qqenglish",
    slug: "qqenglish",
    name: "QQEnglish",
    initials: "QQ",
    shortDescription:
      "フィリピン・セブ島の自社運営校で、講師の質にこだわるオンライン英会話。",
    categories: ["online"],
    features: [
      "フィリピン・セブ島の自社運営校",
      "カランメソッドに対応",
      "講師品質への取り組み",
    ],
    bestFor: ["講師の指導品質を重視したい人"],
    notFor: ["深夜・早朝など時間を選ばず受けたい人"],
    learningStyle: "lesson",
    teacherType: "filipino",
    platformType: ["app", "web", "video-call"],
    officialUrl: "https://www.qqeng.com/",
    affiliateUrl: null,
    affiliateStatus: "none",
    evidenceStatus: "verified",
    lastVerifiedAt: "2026-08-18",
  },
  {
    id: "speak",
    slug: "speak",
    name: "Speak",
    initials: "SP",
    shortDescription:
      "AIを相手に、実際に声を出して話す練習ができる語学学習アプリ。",
    categories: ["ai"],
    features: [
      "AI相手にスピーキング練習",
      "発音・表現のフィードバック",
      "アプリで気軽に練習",
    ],
    bestFor: ["人前で話す前にAIで練習しておきたい人"],
    notFor: ["人間の講師との会話を重視したい人"],
    learningStyle: "ai-practice",
    teacherType: "ai",
    platformType: ["app"],
    officialUrl: "https://www.speak.com/",
    affiliateUrl: null,
    affiliateStatus: "none",
    evidenceStatus: "verified",
    lastVerifiedAt: "2026-08-18",
  },
  {
    id: "elsa-speak",
    slug: "elsa-speak",
    name: "ELSA Speak",
    initials: "ES",
    shortDescription:
      "AIが発音を分析し、スコアで可視化しながら練習できる発音特化アプリ。",
    categories: ["ai", "pronunciation"],
    features: [
      "AIによる発音分析",
      "自分のペースで練習",
      "発音スコアを可視化",
    ],
    bestFor: ["発音を数値で確認しながら直したい人"],
    notFor: ["会話そのものの流暢さを伸ばしたい人"],
    learningStyle: "ai-practice",
    teacherType: "ai",
    platformType: ["app"],
    officialUrl: "https://elsaspeak.com/",
    affiliateUrl: null,
    affiliateStatus: "none",
    evidenceStatus: "verified",
    lastVerifiedAt: "2026-08-18",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(categoryId: CategoryId): Service[] {
  return services.filter((s) => s.categories.includes(categoryId));
}

export function getServicesByIds(ids: string[]): Service[] {
  return ids
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is Service => Boolean(s));
}
