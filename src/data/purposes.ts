import type { CategoryId } from "./categories";

export type Purpose = {
  id: string;
  label: string;
  emoji: string;
  categoryId: CategoryId;
};

export const purposes: Purpose[] = [
  {
    id: "speak-more",
    label: "とにかく話せるようになりたい",
    emoji: "💬",
    categoryId: "online",
  },
  {
    id: "work-english",
    label: "仕事で英語を使いたい",
    emoji: "💼",
    categoryId: "business",
  },
  {
    id: "toeic-score",
    label: "TOEICスコアを上げたい",
    emoji: "📈",
    categoryId: "toeic",
  },
  {
    id: "fix-pronunciation",
    label: "発音を直したい",
    emoji: "🎤",
    categoryId: "pronunciation",
  },
  {
    id: "practice-alone-ai",
    label: "AIで一人で練習したい",
    emoji: "🤖",
    categoryId: "ai",
  },
  {
    id: "talk-with-native",
    label: "ネイティブ講師と話したい",
    emoji: "🌍",
    categoryId: "online",
  },
  {
    id: "kids-english",
    label: "子どもに英語を習わせたい",
    emoji: "🧒",
    categoryId: "kids",
  },
];
