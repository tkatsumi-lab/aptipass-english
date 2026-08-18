import type { CategoryId } from "./categories";

/**
 * Prototype-only service listing. Tags describe general, well-known
 * positioning of each brand. No prices, review scores, user counts,
 * campaigns, or "No.1" claims are included since they are not verified.
 */
export type Service = {
  id: string;
  name: string;
  categoryId: CategoryId;
  initials: string;
  tags: string[];
};

export const services: Service[] = [
  {
    id: "nativecamp",
    name: "NativeCamp",
    categoryId: "online",
    initials: "NC",
    tags: [
      "レッスン回数を気にせず話せる環境",
      "ネイティブ・バイリンガル講師",
      "24時間受講可能",
    ],
  },
  {
    id: "cambly",
    name: "Cambly",
    categoryId: "online",
    initials: "CB",
    tags: [
      "講師は全員ネイティブスピーカー",
      "予約なしですぐレッスン",
      "日常英会話に強い",
    ],
  },
  {
    id: "dmm-eikaiwa",
    name: "DMM英会話",
    categoryId: "online",
    initials: "DM",
    tags: [
      "世界120カ国以上の講師陣",
      "オリジナル教材が豊富",
      "毎日レッスンのプランあり",
    ],
  },
  {
    id: "qqenglish",
    name: "QQEnglish",
    categoryId: "online",
    initials: "QQ",
    tags: [
      "フィリピン・セブ島の自社運営校",
      "カランメソッドに対応",
      "講師品質への取り組み",
    ],
  },
  {
    id: "speak",
    name: "Speak",
    categoryId: "ai",
    initials: "SP",
    tags: [
      "AI相手にスピーキング練習",
      "発音・表現のフィードバック",
      "アプリで気軽に練習",
    ],
  },
  {
    id: "elsa-speak",
    name: "ELSA Speak",
    categoryId: "pronunciation",
    initials: "ES",
    tags: [
      "AIによる発音分析",
      "自分のペースで練習",
      "発音スコアを可視化",
    ],
  },
];
