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
      "ビジネス英語や試験対策など、目的がはっきりしている場合は、講師の国籍よりも教材の内容や指導方針を先に確認する方が失敗しにくくなります。英語にまだ不安がある場合は、日本人講師が全員在籍するサービスから始めるという選択肢もあります。",
    ],
    relatedLinks: [
      { type: "goal", slug: "native-teacher", label: "ネイティブ講師と話したい" },
      { type: "category", slug: "online-eikaiwa", label: "オンライン英会話カテゴリ" },
      { type: "service", slug: "cambly", label: "Cambly" },
      { type: "service", slug: "world-talk", label: "ワールドトーク" },
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
      "発音そのものを数値で確認しながら直したい場合と、シャドーイングのように聞こえた音をそのまま口に出す練習をしたい場合とでは、向いているサービスのタイプが変わってきます。",
    ],
    relatedLinks: [
      { type: "goal", slug: "pronunciation", label: "発音を直したい" },
      { type: "category", slug: "pronunciation", label: "発音・スピーキングカテゴリ" },
      { type: "service", slug: "elsa-speak", label: "ELSA Speak" },
      { type: "service", slug: "boldvoice", label: "BoldVoice" },
    ],
  },
  {
    id: "choosing-online-eikaiwa",
    slug: "choosing-online-eikaiwa",
    title: "オンライン英会話の選び方",
    teaser: "講師の種類・受講スタイル・対象で比較すると迷いにくくなります。",
    emoji: "🗣️",
    body: [
      "オンライン英会話は数が多く似て見えますが、比較軸を絞ると選びやすくなります。まず講師の種類（ネイティブ／フィリピン人／多国籍／日本人）で、話したい相手が変わります。次に受講スタイルで、予約制か、回数を気にせず話せる受け放題型かによって続けやすさが変わります。",
      "家族でシェアして使いたいか、ビジネス用途に特化したいか、子ども向けかといった対象の違いも重要な軸です。料金の安さだけで選ぶと、講師のタイプや受講スタイルが自分に合わず続かないことがあります。",
    ],
    relatedLinks: [
      { type: "category", slug: "online-eikaiwa", label: "オンライン英会話カテゴリ" },
      { type: "goal", slug: "native-teacher", label: "ネイティブ講師と話したい" },
      { type: "goal", slug: "beginner-friendly", label: "初心者から始めたい" },
      { type: "compare", slug: "nativecamp-vs-dmm-eikaiwa", label: "NativeCamp vs DMM英会話" },
    ],
  },
  {
    id: "choosing-ai-eikaiwa",
    slug: "choosing-ai-eikaiwa",
    title: "AI英会話の選び方",
    teaser: "AIとの会話形式とフィードバックの中身で向き不向きが分かれます。",
    emoji: "🤖",
    body: [
      "AI英会話は「AIが自由に会話に応じるタイプ」と「決まったシナリオに沿って練習するタイプ」に分かれます。自由度が高いほど実践的ですが、何を話せばいいか迷いやすく、シナリオ型は初心者でも取り組みやすい傾向があります。",
      "発音・文法・表現のどれをフィードバックしてくれるかも、AI英会話ごとに違います。人との会話の練習台として使いたいのか、AIとの練習自体を継続したいのかを先に決めておくと選びやすくなります。",
    ],
    relatedLinks: [
      { type: "category", slug: "ai-english", label: "AI英会話カテゴリ" },
      { type: "goal", slug: "ai-practice", label: "AIで一人で練習したい" },
      { type: "service", slug: "speak", label: "Speak" },
      { type: "service", slug: "speakbuddy", label: "AI英会話スピークバディ" },
    ],
  },
  {
    id: "choosing-english-apps",
    slug: "choosing-english-apps",
    title: "英語学習アプリの選び方",
    teaser: "「何を伸ばしたいか」で選ぶべきアプリはまったく変わります。",
    emoji: "📱",
    body: [
      "英語学習アプリは「単語」「リスニング」「シャドーイング」「試験対策」など、得意分野がアプリごとにはっきり分かれています。総合的にカバーするアプリもあれば、単語だけ、発音だけに特化したアプリもあります。",
      "無料でどこまで使えるかも継続のしやすさに直結します。まずは自分が伸ばしたい力を1つに絞り、それに強いアプリから試すのがおすすめです。",
    ],
    relatedLinks: [
      { type: "category", slug: "english-apps", label: "英語学習アプリカテゴリ" },
      { type: "goal", slug: "self-study", label: "自主学習中心で進めたい" },
      { type: "goal", slug: "budget-conscious", label: "費用を抑えて試したい" },
    ],
  },
  {
    id: "choosing-coaching",
    slug: "choosing-coaching",
    title: "英語コーチングの選び方",
    teaser: "「レッスンを受ける」のではなく「学習法を設計してもらう」サービスです。",
    emoji: "🎯",
    body: [
      "英語コーチングは、講師と英会話を練習する場ではなく、専属コンサルタントが学習計画を設計し、日々の学習に伴走してくれるサービスです。多くは数ヶ月単位のプログラムで、買い切り型の料金体系が中心です。",
      "比較する際は、プログラム期間（短期集中か長期か）、コンサルティング中心かトレーニングも含むか、対象がビジネスパーソン中心かどうかを確認すると選びやすくなります。料金が高額になりやすいため、無料カウンセリングで内容を確認してから判断するのが一般的です。",
    ],
    relatedLinks: [
      { type: "category", slug: "english-coaching", label: "英語コーチングカテゴリ" },
      { type: "goal", slug: "short-term-intensive", label: "短期間で伸ばしたい" },
      { type: "goal", slug: "business-english", label: "仕事で英語を使いたい" },
      { type: "compare", slug: "progrit-vs-toraiz", label: "PROGRIT vs トライズ" },
    ],
  },
  {
    id: "choosing-exam-service",
    slug: "choosing-exam-service",
    title: "TOEIC・英検対策サービスの選び方",
    teaser: "TOEICと英検では対策すべきポイントが異なります。",
    emoji: "📝",
    body: [
      "TOEICはリスニング・リーディングのスコア形式で、出題傾向に沿った問題演習とペース管理が中心になります。一方、英検は級ごとの合否判定に加えて二次試験（面接）があるため、スピーキング対策に対応しているかを確認する必要があります。",
      "総合英語学習アプリの中にTOEIC・英検コースがある場合と、試験対策に特化したサービスがある場合があります。スコアや合格実績を急いで伸ばしたい場合は、AIによる出題傾向分析など専用機能があるサービスが向いています。",
    ],
    relatedLinks: [
      { type: "category", slug: "toeic-exam", label: "TOEIC・試験対策カテゴリ" },
      { type: "goal", slug: "toeic", label: "TOEICスコアを上げたい" },
      { type: "goal", slug: "eiken", label: "英検対策をしたい" },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
