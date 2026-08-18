export type Guide = {
  id: string;
  title: string;
  teaser: string;
  emoji: string;
};

export const guides: Guide[] = [
  {
    id: "online-vs-ai",
    title: "オンライン英会話とAI英会話の違い",
    teaser: "話す相手が人かAIか。それぞれの向き・不向きを整理します。",
    emoji: "🆚",
  },
  {
    id: "daily-practice",
    title: "毎日話したい人は何を比較する？",
    teaser: "レッスン頻度や受講スタイルを軸に選び方を紹介します。",
    emoji: "📅",
  },
  {
    id: "native-teacher",
    title: "ネイティブ講師は必要？",
    teaser: "目的によって講師の国籍より大事なポイントがあります。",
    emoji: "🌍",
  },
  {
    id: "pronunciation-apps",
    title: "発音アプリは何が違う？",
    teaser: "AI診断の仕組みや練習スタイルの違いを比較します。",
    emoji: "🎧",
  },
];
