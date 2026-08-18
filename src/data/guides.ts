export type RelatedLink = {
  type: "category" | "goal" | "service" | "compare";
  slug: string;
  label: string;
};

export type Guide = {
  id: string;
  /** URL slug under /guides/[slug] */
  slug: string;
  title: string;
  teaser: string;
  emoji: string;
  /** Short paragraphs — this is a "3-minute read", not a long-form article */
  body: string[];
  relatedLinks: RelatedLink[];
};

export const guides: Guide[] = [
  {
    id: "online-vs-ai",
    slug: "online-vs-ai",
    title: "オンライン英会話とAI英会話の違い",
    teaser: "話す相手が人かAIか。それぞれの向き・不向きを整理します。",
    emoji: "🆚",
    body: [
      "オンライン英会話は人の講師と話すため、雑談や予定外の展開にも柔軟に対応してもらえるのが特徴です。一方でAI英会話は、時間や気分を気にせず何度でも話しかけられる手軽さがあります。",
      "「まず場数を踏みたい」「間違えることに慣れたい」という段階ではAI英会話、「実際の会話の流れに慣れたい」という段階ではオンライン英会話が候補になりやすい、という違いで考えると選びやすくなります。",
      "どちらか一方を選ぶ必要はなく、AIで練習してから人と話す、という組み合わせ方もあります。",
    ],
    relatedLinks: [
      { type: "category", slug: "online-eikaiwa", label: "オンライン英会話カテゴリ" },
      { type: "category", slug: "ai-english", label: "AI英会話カテゴリ" },
      { type: "goal", slug: "ai-practice", label: "AIで一人で練習したい" },
      { type: "compare", slug: "nativecamp-vs-cambly", label: "NativeCamp vs Cambly" },
    ],
  },
  {
    id: "daily-practice",
    slug: "daily-practice",
    title: "毎日話したい人は何を比較する？",
    teaser: "レッスン頻度や受講スタイルを軸に選び方を紹介します。",
    emoji: "📅",
    body: [
      "「毎日話したい」という目的では、料金プランよりも先に、レッスンの受け方そのものを比較するのがおすすめです。予約が必要か、回数の制限があるか、好きな時間に受けられるかによって、続けやすさが大きく変わります。",
      "たとえば予約不要で毎日受講できるスタイルのサービスは、隙間時間に短時間ずつ話す使い方に向いています。反対に、講師をじっくり選んで固定したい場合は、予約制のサービスの方が合うこともあります。",
    ],
    relatedLinks: [
      { type: "goal", slug: "speaking-improvement", label: "とにかく話せるようになりたい" },
      { type: "service", slug: "nativecamp", label: "NativeCamp" },
      { type: "service", slug: "cambly", label: "Cambly" },
      { type: "compare", slug: "nativecamp-vs-cambly", label: "NativeCamp vs Cambly" },
    ],
  },
  {
    id: "native-teacher",
    slug: "native-teacher",
    title: "ネイティブ講師は必要？",
    teaser: "目的によって講師の国籍より大事なポイントがあります。",
    emoji: "🌍",
    body: [
      "「ネイティブ講師」は分かりやすい基準ですが、目的によっては講師の国籍よりも重要な要素があります。日常会話の自然な言い回しに触れたいならネイティブ講師が向いていますし、幅広い話題や価値観に触れたいなら多国籍の講師陣も選択肢になります。",
      "ビジネス英語や試験対策など、目的がはっきりしている場合は、講師の国籍よりも教材の内容や指導方針を先に確認する方が失敗しにくくなります。",
    ],
    relatedLinks: [
      { type: "goal", slug: "native-teacher", label: "ネイティブ講師と話したい" },
      { type: "category", slug: "online-eikaiwa", label: "オンライン英会話カテゴリ" },
      { type: "service", slug: "cambly", label: "Cambly" },
    ],
  },
  {
    id: "pronunciation-apps",
    slug: "pronunciation-apps",
    title: "発音アプリは何が違う？",
    teaser: "AI診断の仕組みや練習スタイルの違いを比較します。",
    emoji: "🎧",
    body: [
      "発音特化のアプリは、AIが発音を分析してスコアやフィードバックを返してくれる点が共通しています。違いが出やすいのは、フィードバックの粒度と、会話練習までカバーしているかどうかです。",
      "発音そのものを数値で確認しながら直したい場合と、会話の中で自然に発音も鍛えたい場合とでは、向いているアプリのタイプが変わってきます。",
    ],
    relatedLinks: [
      { type: "goal", slug: "pronunciation", label: "発音を直したい" },
      { type: "category", slug: "pronunciation", label: "発音・スピーキングカテゴリ" },
      { type: "service", slug: "elsa-speak", label: "ELSA Speak" },
      { type: "service", slug: "speak", label: "Speak" },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
