/**
 * 英語コラム (long-form editorial reads), distinct from `guides.ts`.
 *
 * Guides are intentionally short ("3-minute read", plain paragraphs — see
 * docs/architecture.md). Columns are the opposite: a long-form, narrative
 * "someone explaining something interesting to you" piece, with visual
 * rhythm (questions, EN/JA example pairs, callouts, tables) that a flat
 * paragraph list can't represent. Hence a separate content type and route
 * (`/columns`) rather than bolting this onto `guides`.
 *
 * `body` is a block array so future columns aren't limited to prose —
 * `ColumnBody` (the renderer) switches on `block.type`. Adding a second
 * column is just appending another `Column` object below; nothing about
 * the page/route code is column-count-specific.
 */

export type ColumnBlock =
  /** Section break within the article — a magazine-style divider, not just a bold subheading. */
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  /** A reader-facing rhetorical question or inner voice — shown large, as the reader's own thought. */
  | { type: "question"; text: string }
  /** A paired English sentence + Japanese translation — an editorial pull-quote, not a bordered card. */
  | { type: "example"; en: string; ja: string }
  /** A key realization/"aha" sentence — set apart by whitespace and a rule, not a filled box. */
  | { type: "insight"; text: string }
  /** A "1 Japanese phrase → N English phrases" comparison. `caption` is the editorial framing line shown above it. */
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  /**
   * A magazine "spread copy" moment — the article's thesis stated as one big
   * line, not another paragraph. `text` may contain `\n` for deliberate,
   * author-chosen line breaks (a poster headline, not flowing prose); an
   * optional `caption` sits underneath, visually much quieter (e.g. a
   * translation or a one-line gloss). Use sparingly — 1–3 per article.
   */
  | { type: "keyMessage"; text: string; caption?: string }
  /**
   * A single English sentence promoted to "the thing worth remembering,"
   * distinct from the routine `example` pairs. `en` may contain `\n` for a
   * deliberate line break; `context` is an optional small scene label above
   * it (e.g. "返信を待っている場面で"); `ja` is an optional gloss, kept
   * visibly weaker than the English.
   */
  | { type: "englishDisplay"; en: string; ja?: string; context?: string };

/**
 * `series`/`issueNumber`/`readingTimeMinutes` exist so a future editor
 * (ChatGPT drafts, Claude Code implements) only ever adds a new `Column`
 * object here — the Magazine cover/Hero, the /columns back-issue list, and
 * the homepage section all read these fields and update themselves. None
 * of that UI code branches on which article it's rendering.
 */
export type Column = {
  id: string;
  /** URL slug under /columns/[slug] */
  slug: string;
  /** e.g. "英語コラム" now; "英語のなぜ？" / "1分英語" are future series using the same Column shape. */
  series: string;
  /** "ISSUE 001" — per-series issue number, not a global article count. */
  issueNumber: number;
  readingTimeMinutes: number;
  title: string;
  subtitle: string;
  emoji: string;
  /** ISO date this column was published — used for JSON-LD datePublished/dateModified. */
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  /** One-line teaser used on card previews (/columns list, homepage). */
  teaser: string;
  body: ColumnBlock[];
  /** Closing "AptiPass English 編集部より" note — kept separate from `body` so it always renders as its own distinct block, regardless of how `body` grows. */
  editorNote: string[];
  /** Soft, non-affiliate internal link shown after the editor's note. */
  relatedCategorySlug: string;
  relatedCategoryLabel: string;
};

export const columns: Column[] = [
  {
    id: "yoroshiku-onegaishimasu-english",
    slug: "yoroshiku-onegaishimasu-english",
    series: "英語コラム",
    issueNumber: 1,
    readingTimeMinutes: 6,
    title: "なぜ英語では「よろしくお願いします」を一言で言えないのか？",
    subtitle: "「英語が出てこない」のには、ちゃんと理由があります",
    emoji: "🤔",
    publishedAt: "2026-08-21",
    seoTitle: "「よろしくお願いします」は英語で？直訳できない理由と場面別の自然な表現",
    seoDescription:
      "「よろしくお願いします」は英語で何と言う？Nice to meet youだけではない、初対面・仕事・依頼・メールで使える自然な表現を紹介。なぜ英語では一言に訳せないのかも、会話するように分かりやすく解説します。",
    teaser: "「よろしくお願いします」、英語で一言では言えません。その理由、考えたことありますか？",
    body: [
      { type: "paragraph", text: "「よろしくお願いします。」" },
      { type: "paragraph", text: "私たちが普段、何気なく使っている言葉ですよね。" },
      { type: "paragraph", text: "初めて会った人にも「よろしくお願いします」。" },
      { type: "paragraph", text: "仕事をお願いするときにも「よろしくお願いします」。" },
      { type: "paragraph", text: "メールの最後にも、よく書きます。" },
      { type: "paragraph", text: "新しい職場に入ったときも、これから一緒に何かを始める相手にも使いますよね。" },
      { type: "paragraph", text: "こうして考えてみると、「よろしくお願いします」って、かなり便利な言葉だと思いませんか？" },
      { type: "paragraph", text: "ところが、これを英語にしようとすると、急に困ることはありませんか？" },
      { type: "question", text: "「あれ……“よろしくお願いします”って、英語で何て言うんだろう？」" },
      { type: "paragraph", text: "Nice to meet you. かな。" },
      { type: "paragraph", text: "でも、仕事をお願いするときに Nice to meet you. はおかしいですよね。" },
      { type: "paragraph", text: "では、Thank you.？" },
      { type: "paragraph", text: "それもしっくりこない場面があります。" },
      { type: "paragraph", text: "実は、ここで英語が出てこないのには理由があります。" },
      {
        type: "insight",
        text: "英語には、日本語の「よろしくお願いします」とまったく同じように、いろいろな場面で使える万能な一言がないんです。",
      },
      {
        type: "paragraph",
        text: "では、英語を話す人たちは、私たちが「よろしくお願いします」と言っている場面で、いったい何と言っているのでしょうか？",
      },
      { type: "paragraph", text: "少し覗いてみましょう。" },
      { type: "paragraph", text: "そこには、英語と日本語の面白い違いがあります。" },

      {
        type: "keyMessage",
        text: "「よろしくお願いします」を\n英語に訳そうとするから、\n難しくなる。",
      },

      { type: "heading", text: "初めて会った人への「よろしくお願いします」" },
      { type: "paragraph", text: "まずは、一番分かりやすい場面から考えてみましょう。" },
      { type: "paragraph", text: "初対面の人に、" },
      { type: "question", text: "「はじめまして。○○です。よろしくお願いします」" },
      { type: "paragraph", text: "と言うことがありますよね。" },
      {
        type: "paragraph",
        text: "このときの「よろしくお願いします」で、私たちは何を伝えようとしているのでしょうか？",
      },
      { type: "paragraph", text: "何か仕事を頼んでいるわけではありません。" },
      { type: "paragraph", text: "「これから面倒を見てください」と言っているわけでもありません。" },
      { type: "paragraph", text: "相手に会えたことへの、好意的な気持ちを伝えています。" },
      { type: "paragraph", text: "そこで英語なら、" },
      { type: "example", en: "Nice to meet you.", ja: "お会いできてうれしいです。" },
      { type: "paragraph", text: "が自然です。" },
      { type: "paragraph", text: "でも、ここでちょっと面白いことがあります。" },
      { type: "paragraph", text: "Nice to meet you. の中には、「よろしく」という単語はどこにもありません。" },
      {
        type: "paragraph",
        text: "それなのに、日本語では「はじめまして。よろしくお願いします」にかなり近い場面で使えます。",
      },
      { type: "paragraph", text: "不思議ですよね。" },
      {
        type: "insight",
        text: "つまり私たちは、同じ場面に出会っても、日本語と英語で違う方法を使って気持ちを伝えているわけです。",
      },

      { type: "heading", text: "一緒に仕事をする人なら？" },
      { type: "paragraph", text: "では、場面を変えてみましょう。" },
      { type: "paragraph", text: "新しい会社に入ったとします。" },
      { type: "paragraph", text: "これから一緒に働く同僚に、" },
      { type: "question", text: "「これからよろしくお願いします」" },
      { type: "paragraph", text: "と言いたくなりますよね。" },
      { type: "paragraph", text: "ここで、" },
      { type: "paragraph", text: "Nice to meet you." },
      { type: "paragraph", text: "だけでも初対面の挨拶にはなります。" },
      {
        type: "paragraph",
        text: "でも、「これから一緒に仕事をしていく」という気持ちまで伝えたいなら、もっとぴったりの表現があります。",
      },
      {
        type: "example",
        en: "I'm looking forward to working with you.",
        ja: "一緒に仕事ができるのを楽しみにしています。",
      },
      { type: "paragraph", text: "あるいは、" },
      { type: "example", en: "I'm excited to work with you.", ja: "一緒に仕事をするのが楽しみです。" },
      { type: "paragraph", text: "という言い方もできます。" },
      { type: "paragraph", text: "日本語なら、どちらも「よろしくお願いします」で済ませられそうですよね。" },
      { type: "paragraph", text: "ところが英語では、" },
      { type: "paragraph", text: "「私は何を楽しみにしているのか」" },
      { type: "paragraph", text: "を具体的に言葉にしています。" },
      { type: "paragraph", text: "これが、今回の話の大きなポイントです。" },

      { type: "heading", text: "では、仕事をお願いするときは？" },
      { type: "paragraph", text: "今度はこんな場面です。" },
      { type: "paragraph", text: "同僚に資料の確認をお願いするとします。" },
      { type: "question", text: "「明日までに確認をお願いします。よろしくお願いします。」" },
      { type: "paragraph", text: "日本語なら、まったく違和感がありませんよね。" },
      { type: "paragraph", text: "では最後の「よろしくお願いします」を英語にすると……。" },
      { type: "paragraph", text: "また困ります。" },
      { type: "paragraph", text: "Nice to meet you. ではありません。" },
      { type: "paragraph", text: "I'm looking forward to working with you. でもありません。" },
      { type: "insight", text: "ここでは、そもそも「よろしく」を英訳しようとしない方が自然なんです。" },
      { type: "paragraph", text: "何をしてほしいのかを具体的に伝えたり、" },
      { type: "example", en: "Thanks for your help.", ja: "手伝ってくれてありがとう。" },
      { type: "example", en: "I appreciate your help.", ja: "ご協力に感謝します。" },
      { type: "paragraph", text: "のように、相手の協力への感謝を伝えたりします。" },
      {
        type: "paragraph",
        text: "依頼なら、Could you please ...? のように「何をしてほしいのか」を具体的に伝えることもできます。",
      },
      { type: "paragraph", text: "ここでも日本語との違いが見えてきました。" },
      {
        type: "insight",
        text: "日本語では「お願い」で締めるところを、英語では「具体的な依頼」や「感謝」として表すことがあるんですね。",
      },

      { type: "heading", text: "メールの最後の「よろしくお願いします」は？" },
      { type: "paragraph", text: "これも困った経験がある人は多いのではないでしょうか。" },
      { type: "paragraph", text: "メールを書き終えて、" },
      { type: "question", text: "「以上、よろしくお願いいたします。」" },
      { type: "paragraph", text: "さて、英語では何と書けばいいのでしょう。" },
      { type: "paragraph", text: "実はここでも、答えは一つではありません。" },
      {
        type: "englishDisplay",
        en: "I look forward to\nhearing from you.",
        ja: "ご連絡をお待ちしています。",
        context: "返信を待っている場面で",
      },
      { type: "paragraph", text: "相手の協力に感謝したいなら、" },
      { type: "paragraph", text: "Thank you for your help." },
      { type: "paragraph", text: "という形も考えられます。" },
      { type: "paragraph", text: "そして英語メールそのものを締める表現なら、" },
      { type: "paragraph", text: "Best regards," },
      { type: "paragraph", text: "Kind regards," },
      { type: "paragraph", text: "などがあります。" },
      { type: "paragraph", text: "つまり、" },
      {
        type: "question",
        text: "「メールの最後だから、とりあえず“よろしくお願いします”の英訳を書く」",
      },
      { type: "paragraph", text: "という発想ではないんです。" },
      { type: "paragraph", text: "ここでも、" },
      { type: "question", text: "「最後に相手へ何を伝えたいのか？」" },
      { type: "paragraph", text: "を考える必要があります。" },

      { type: "heading", text: "「よろしくお願いします」の正解を一つ覚えなくていい" },
      { type: "paragraph", text: "ここまで読むと、" },
      { type: "question", text: "「じゃあ結局、“よろしくお願いします”は英語で何て言えばいいの？」" },
      { type: "paragraph", text: "と思うかもしれません。" },
      { type: "paragraph", text: "答えは、" },
      { type: "insight", text: "一つに決めなくて大丈夫です。" },
      { type: "paragraph", text: "むしろ、一つに決めようとするから難しくなります。" },
      { type: "paragraph", text: "場面ごとに並べてみると、分かりやすくなります。" },
      {
        type: "table",
        caption: "「よろしくお願いします」という1つの言葉が、英語ではこう分かれます。",
        headers: ["こんなとき", "伝えたいこと", "英語の例"],
        rows: [
          ["初めて会った", "会えてうれしい", "Nice to meet you."],
          ["一緒に仕事を始める", "一緒に働くのが楽しみ", "I'm looking forward to working with you."],
          ["協力してもらう", "協力への感謝", "Thanks for your help."],
          ["助けてもらう", "感謝している", "I appreciate your help."],
          ["返信を待っている", "連絡を待っている", "I look forward to hearing from you."],
        ],
      },
      { type: "paragraph", text: "こうして並べると、何か気づきませんか？" },
      {
        type: "insight",
        text: "英語に「よろしくお願いします」がないというより、日本語の「よろしくお願いします」が、ものすごく多くの仕事を一人で引き受けているんです。",
      },
      { type: "paragraph", text: "初対面の挨拶も。" },
      { type: "paragraph", text: "これからの関係への期待も。" },
      { type: "paragraph", text: "お願いも。" },
      { type: "paragraph", text: "感謝も。" },
      { type: "paragraph", text: "場合によっては、メールの締めまで。" },
      { type: "paragraph", text: "たった一つの「よろしくお願いします」で処理できてしまいます。" },
      { type: "paragraph", text: "そう考えると、英語が不便なのではなく、" },
      { type: "paragraph", text: "日本語の「よろしくお願いします」が、ものすごく働き者なのかもしれません。" },

      { type: "heading", text: "英語が出てこないときは「日本語」を疑ってみる" },
      { type: "paragraph", text: "ここからが、今回いちばんお伝えしたいところです。" },
      { type: "paragraph", text: "英語を勉強していると、" },
      { type: "question", text: "「これ、英語で何て言うんだろう？」" },
      { type: "paragraph", text: "と考えることがありますよね。" },
      { type: "paragraph", text: "そして英語が出てこないと、" },
      { type: "question", text: "「まだ単語を知らないからだ」" },
      { type: "question", text: "「自分の英語力が足りないからだ」" },
      { type: "paragraph", text: "と思ってしまうことがあります。" },
      { type: "paragraph", text: "もちろん、本当に単語を知らない場合もあります。" },
      { type: "paragraph", text: "でも、必ずしもそれだけではありません。" },
      { type: "paragraph", text: "もしかすると、" },
      { type: "insight", text: "英語にする前の日本語そのものが、英語では一言にできないのかもしれません。" },
      { type: "paragraph", text: "「よろしくお願いします」は、その典型です。" },
      { type: "paragraph", text: "だから、英語が出てこなくなったときは、" },
      { type: "question", text: "「この日本語を英語にすると？」" },
      { type: "paragraph", text: "だけではなく、" },
      { type: "question", text: "「そもそも私は、相手に何を伝えたいんだろう？」" },
      { type: "paragraph", text: "と考えてみてください。" },
      { type: "paragraph", text: "例えば、" },
      { type: "paragraph", text: "「よろしくお願いします」" },
      { type: "paragraph", text: "↓" },
      { type: "paragraph", text: "「一緒に仕事ができるのが楽しみ」" },
      { type: "paragraph", text: "↓" },
      { type: "paragraph", text: "I'm looking forward to working with you." },
      { type: "paragraph", text: "こう考えればいいわけです。" },
      { type: "paragraph", text: "日本語を英単語に置き換えたわけではありません。" },
      { type: "insight", text: "自分の気持ちを英語にしたんです。" },

      {
        type: "keyMessage",
        text: "TRANSLATE THE SITUATION,\nNOT THE WORDS.",
        caption: "言葉ではなく、場面を訳す。",
      },

      { type: "heading", text: "「お疲れさま」だって、同じかもしれません" },
      { type: "paragraph", text: "実はこの考え方、「よろしくお願いします」だけの話ではありません。" },
      { type: "paragraph", text: "例えば、" },
      { type: "paragraph", text: "「お疲れさま」" },
      { type: "paragraph", text: "これも私たちはいろいろな場面で使いますよね。" },
      { type: "paragraph", text: "仕事を終えた同僚にも言います。" },
      { type: "paragraph", text: "会社ですれ違った人にも言います。" },
      { type: "paragraph", text: "先に帰る人にも言います。" },
      { type: "paragraph", text: "チャットの冒頭に「お疲れさまです」と書くこともあります。" },
      { type: "paragraph", text: "では、" },
      { type: "question", text: "「お疲れさま＝英語で○○」" },
      { type: "paragraph", text: "と一つに決められるでしょうか？" },
      { type: "paragraph", text: "なかなか難しそうですよね。" },
      { type: "paragraph", text: "「いただきます」" },
      { type: "paragraph", text: "「お世話になっています」" },
      { type: "paragraph", text: "「もったいない」" },
      { type: "paragraph", text: "こうした言葉も同じです。" },
      { type: "paragraph", text: "一対一で英語に置き換えようとすると、途端に難しくなります。" },
      { type: "paragraph", text: "でも、" },
      { type: "question", text: "「この場面で何を伝えているんだろう？」" },
      { type: "paragraph", text: "と考えると、英語が見つけやすくなることがあります。" },

      { type: "heading", text: "英語を学ぶ面白さは、こういうところにある" },
      { type: "paragraph", text: "英語の勉強というと、" },
      { type: "paragraph", text: "単語を覚える。" },
      { type: "paragraph", text: "文法を覚える。" },
      { type: "paragraph", text: "発音を練習する。" },
      { type: "paragraph", text: "そんなイメージが強いかもしれません。" },
      { type: "paragraph", text: "もちろん、それらは大切です。" },
      {
        type: "paragraph",
        text: "でも、英語を学んでいると、ときどき今日の「よろしくお願いします」のような言葉に出会います。",
      },
      { type: "paragraph", text: "日本語なら一言なのに、英語では一言にできない。" },
      { type: "paragraph", text: "逆に、英語では簡単に言えるのに、日本語にすると説明が長くなることもあります。" },
      { type: "paragraph", text: "そんなとき、" },
      { type: "question", text: "「覚えることがまた増えた……」" },
      { type: "paragraph", text: "と思うだけでは、ちょっともったいない気がします。" },
      { type: "paragraph", text: "なぜなら、その違いには、" },
      { type: "paragraph", text: "日本語を使う私たちと、英語を使う人たちが、物事をどう言葉にしているのか" },
      { type: "paragraph", text: "という違いが見えることがあるからです。" },
      { type: "paragraph", text: "言葉を一つ知ることで、その向こう側にある考え方まで少し見えてくる。" },
      { type: "insight", text: "これも、外国語を学ぶ面白さの一つではないでしょうか。" },

      { type: "heading", text: "今日から一つだけ試してみてください" },
      { type: "paragraph", text: "次に英語を話そうとして、" },
      { type: "question", text: "「あれ？これ、英語で何て言うんだろう？」" },
      { type: "paragraph", text: "と止まったとき。" },
      { type: "paragraph", text: "すぐに辞書を開く前に、一度だけこう考えてみてください。" },
      { type: "question", text: "「私は今、相手に何を伝えたいんだろう？」" },
      { type: "paragraph", text: "日本語を少し言い換えてみる。" },
      { type: "paragraph", text: "それから英語を考えてみる。" },
      { type: "paragraph", text: "それだけで、意外と簡単な英語が見つかるかもしれません。" },
      {
        type: "insight",
        text: "「よろしくお願いします」の英訳を一つ暗記するよりも、この考え方を覚えておく方が、ずっと多くの場面で役に立ちます。",
      },
      { type: "paragraph", text: "そしてもし今度、" },
      { type: "question", text: "「“よろしくお願いします”って英語で何て言うの？」" },
      { type: "paragraph", text: "と誰かに聞かれたら、" },
      { type: "paragraph", text: "こう答えてみてもいいかもしれません。" },
      { type: "question", text: "「どんな場面の“よろしくお願いします”？」" },
      { type: "paragraph", text: "その質問ができたら、もう今回の記事の答えは分かっています。" },
    ],
    editorNote: [
      "普段何気なく使っている日本語を、英語という別の言語から眺めてみる。",
      "すると、今まで気づかなかったことが見えてくることがあります。",
      "AptiPass Englishでは、単語やフレーズの「正解」を紹介するだけでなく、「なぜ、そうなるんだろう？」というところまで一緒に考えていきます。",
      "英語が少し分かる。そして、日本語のこともちょっと面白くなる。そんなコラムをお届けしていきます。",
    ],
    relatedCategorySlug: "online-eikaiwa",
    relatedCategoryLabel: "オンライン英会話",
  },
  {
    id: "why-is-i-capitalized",
    slug: "why-is-i-capitalized",
    series: "英語のなぜ？",
    issueNumber: 1,
    readingTimeMinutes: 4,
    title: "なぜ英語の「I」だけ、いつも大文字なの？",
    subtitle: "youも、heも、sheも小文字。なのに、なぜ「私」だけ大文字なのでしょう？",
    emoji: "🔠",
    // Same publish day as issue #1's yoroshiku article; a time component
    // (rather than a bare date) breaks the publishedAt tie so this newer
    // issue correctly sorts as LATEST ISSUE via columnsSortedByDate.
    publishedAt: "2026-08-21T18:00:00+09:00",
    seoTitle: "英語の「I」はなぜ大文字？youやheと違う理由をわかりやすく解説",
    seoDescription:
      "英語ではyouやhe、sheは小文字なのに、なぜ「私」を表すIだけ大文字なのでしょう？古英語からの変化や、一文字になったIが大文字で定着した理由を、英語の歴史と一緒にわかりやすく解説します。",
    teaser: "youもheもsheも小文字なのに、なぜ「I」だけ大文字なのか。理由を知ると、英語の見え方が少し変わります。",
    body: [
      { type: "paragraph", text: "英語の文章を見ていて、ちょっと不思議に思ったことはありませんか？" },
      { type: "paragraph", text: "you は小文字。" },
      { type: "paragraph", text: "he も小文字。" },
      { type: "paragraph", text: "she も小文字。" },
      { type: "paragraph", text: "ところが、自分のことを表す I だけは――" },
      { type: "paragraph", text: "なぜか、いつでも大文字です。" },

      { type: "question", text: "どうして「私」だけ、特別扱いなんでしょう？" },

      { type: "paragraph", text: "たとえば、" },
      { type: "example", en: "I like coffee.", ja: "私はコーヒーが好きです。" },
      { type: "paragraph", text: "文の最初だから大文字なのではありません。" },
      { type: "example", en: "My sister and I like coffee.", ja: "姉（妹）と私はコーヒーが好きです。" },
      { type: "paragraph", text: "文の途中に来ても、やっぱり I。" },
      { type: "paragraph", text: "小文字の i にはなりません。" },
      { type: "paragraph", text: "人の名前なら大文字になるのは分かります。" },
      { type: "paragraph", text: "Tokyo、Japan、John。" },
      { type: "paragraph", text: "でも I は名前ではなく、ただの代名詞です。" },
      { type: "paragraph", text: "それなのに、" },
      { type: "paragraph", text: "you は小文字で、" },
      { type: "paragraph", text: "he も she も小文字。" },
      { type: "paragraph", text: "なぜ I だけなのでしょう？" },

      {
        type: "keyMessage",
        text: "YOU は小文字。\nHE も小文字。\nSHE も小文字。\n\nなのに、\n\nI だけ大文字。",
      },

      { type: "heading", text: "昔から「I」だったわけではありません" },
      { type: "paragraph", text: "実は英語の「私」は、最初から I だったわけではありません。" },
      {
        type: "paragraph",
        text: "英語の祖先にあたる古英語では、「私」にあたる言葉として ic という形が使われていました。",
      },
      { type: "paragraph", text: "今の I より、ちゃんと言葉らしい形をしていますよね。" },
      { type: "paragraph", text: "ところが英語が長い年月をかけて変化していく中で、発音や綴りも変わっていきます。" },
      { type: "paragraph", text: "ic も次第に短くなり、やがて一文字の形へ近づいていきました。" },

      { type: "englishDisplay", en: "I", context: "たった一文字になった「私」" },

      { type: "paragraph", text: "ここで、ちょっと困ったことが起こります。" },
      {
        type: "paragraph",
        text: "一文字だけの小文字 i は、昔の手書きの文章ではとても目立ちにくかったのです。",
      },
      { type: "paragraph", text: "前後にたくさんの文字が並んでいると、小さな一本の線のように見えてしまいます。" },
      {
        type: "paragraph",
        text: "そこで、読みやすくするために I と大文字で書く習慣が広がっていった、と考えられています。",
      },

      {
        type: "insight",
        text: "I が大文字なのは、「私が一番偉いから」ではありません。一文字になってしまった「私」を、文章の中で読みやすくする必要があった――という歴史が関係しています。",
      },

      { type: "heading", text: "では、なぜ「a」は小文字なの？" },
      { type: "paragraph", text: "ここまで読むと、こんな疑問も出てきませんか？" },
      { type: "question", text: "一文字だから大文字なら、「a」はどうして小文字なの？" },
      { type: "paragraph", text: "いいところに気づきました。" },
      { type: "paragraph", text: "英語には I 以外にも、一文字だけで使われる言葉があります。" },
      { type: "paragraph", text: "たとえば、" },
      { type: "example", en: "I have a dog.", ja: "私は犬を飼っています。" },
      { type: "paragraph", text: "a も一文字ですよね。" },
      { type: "paragraph", text: "それでも A とは書きません。" },
      { type: "paragraph", text: "つまり、" },
      { type: "paragraph", text: "「一文字の単語はすべて大文字にする」" },
      { type: "paragraph", text: "という英語のルールがあるわけではありません。" },
      {
        type: "paragraph",
        text: "I の大文字化は、英語の歴史の中で生まれ、そのまま現代まで残った特殊な習慣なのです。",
      },

      {
        type: "keyMessage",
        text: "英語のルールには、\n\n誰かが最初から\nきれいに設計したものばかりが\nあるわけではありません。\n\n歴史の中で、そうなった。\n\nそんなルールもあります。",
      },

      { type: "heading", text: "英語は「完成品」ではない" },
      { type: "paragraph", text: "学校で英語を勉強していると、" },
      { type: "paragraph", text: "「これはこういうルールだから覚えましょう」" },
      { type: "paragraph", text: "と言われることが多いですよね。" },
      { type: "paragraph", text: "三単現のs。" },
      { type: "paragraph", text: "不規則動詞。" },
      { type: "paragraph", text: "冠詞のaとthe。" },
      { type: "paragraph", text: "そして、大文字の I。" },
      {
        type: "paragraph",
        text: "すると英語というものが、最初から誰かによってきっちり設計された巨大なルールブックのように感じられるかもしれません。",
      },
      { type: "paragraph", text: "でも、言葉はそんなふうにはできていません。" },
      { type: "paragraph", text: "人が何百年、何千年と使っているうちに、" },
      { type: "paragraph", text: "発音が変わったり、" },
      { type: "paragraph", text: "綴りが変わったり、" },
      { type: "paragraph", text: "便利な言い方が残ったり、" },
      { type: "paragraph", text: "昔の習慣だけが残ったりする。" },
      { type: "paragraph", text: "英語も、そうやって今の姿になりました。" },

      {
        type: "keyMessage",
        text: "英語には、\n\n「なぜそうなるの？」\n\nと聞いてみると、\n\n文法ではなく\n歴史が答えてくれることがあります。",
      },

      { type: "paragraph", text: "そう考えると、英語のルールを見る目が少し変わりませんか？" },
      { type: "paragraph", text: "「また変なルールを覚えなきゃ」" },
      { type: "paragraph", text: "ではなく、" },
      { type: "paragraph", text: "「なんでこんな形になったんだろう？」" },
      { type: "paragraph", text: "と考えてみる。" },
      {
        type: "paragraph",
        text: "すると、暗記していた英語が、少しだけ「人間が使ってきた言葉」に見えてきます。",
      },

      { type: "heading", text: "今日から「I」を見たら" },
      { type: "paragraph", text: "明日、英語の文章で I を見かけたら、ほんの一瞬だけ思い出してみてください。" },
      { type: "paragraph", text: "you でもなく、" },
      { type: "paragraph", text: "he でもなく、" },
      { type: "paragraph", text: "she でもなく、" },
      { type: "paragraph", text: "なぜか一人だけ大文字で立っている I。" },

      { type: "englishDisplay", en: "I", context: "英語の長い歴史が残した、一文字。" },

      { type: "paragraph", text: "たった一文字ですが、その形になるまでには長い時間が流れています。" },
      { type: "paragraph", text: "普段なら何も考えずに読み飛ばしてしまう一文字にも、ちゃんと物語があるんですね。" },

      {
        type: "insight",
        text: "英語の「なぜ？」を知ることは、ルールをもう一つ覚えることではありません。英語を見る角度を、ひとつ増やすこと。",
      },
    ],
    editorNote: [
      "英語を勉強していると、「そういうものだから」と覚えてしまうことがたくさんあります。",
      "でも、ときどき立ち止まって、「ところで、なんで？」と聞いてみると、英語は急に面白くなります。",
      "AptiPass MAGAZINE「英語のなぜ？」では、そんな素朴な疑問を一つずつ拾っていきます。",
      "次に英語を見たとき、今まで気にもしなかったところが少し気になってしまう。そんな連載にしていけたらと思っています。",
    ],
    relatedCategorySlug: "online-eikaiwa",
    relatedCategoryLabel: "オンライン英会話",
  },
  {
    id: "im-exciting-vs-im-excited",
    slug: "im-exciting-vs-im-excited",
    series: "1分英語",
    issueNumber: 1,
    readingTimeMinutes: 1,
    title: "「I’m exciting.」だと、なぜ変なの？",
    subtitle: "「ワクワクしています」と言いたいだけなのに、excitingを使うと意味が変わります。",
    emoji: "✨",
    // Same publish day as the other two issue #1s; a later same-day time
    // keeps it unambiguously newest in columnsSortedByDate.
    publishedAt: "2026-08-21T20:30:00+09:00",
    seoTitle: "「I’m exciting.」はなぜ間違い？excitingとexcitedの違いを1分で解説",
    seoDescription:
      "「ワクワクしています」をI’m exciting.と言うと、なぜ意味が変わるのでしょう？excitingとexcitedの違いを、I’m excited!を使った例文で1分でわかりやすく解説します。",
    teaser: "「I’m exciting.」と言うと、意味が変わってしまいます。1分でexcitedとの違いを確認しましょう。",
    body: [
      {
        type: "question",
        text: "「私はワクワクしています」\n英語なら、\nI’m exciting.\n……でよさそうじゃないですか？",
      },

      { type: "paragraph", text: "exciting は「ワクワクする」。" },
      { type: "paragraph", text: "学校でそう覚えた人も多いかもしれません。" },
      { type: "paragraph", text: "ところが、自分がワクワクしていると言いたいなら、普通はこうです。" },

      {
        type: "englishDisplay",
        en: "I’m excited.",
        ja: "私はワクワクしています。",
        context: "自分がワクワクしているならこちら",
      },

      { type: "paragraph", text: "では、" },
      { type: "paragraph", text: "I’m exciting." },
      { type: "paragraph", text: "と言うと、何が違うのでしょう？" },

      {
        type: "keyMessage",
        text: "excited は\n「ワクワクさせられている人」\n\nexciting は\n「人をワクワクさせるもの・人」",
      },

      { type: "paragraph", text: "たとえば、映画がとても面白くてワクワクするなら、" },
      { type: "example", en: "The movie is exciting.", ja: "その映画はワクワクする。" },
      { type: "paragraph", text: "その映画を観て、自分がワクワクしているなら、" },
      { type: "example", en: "I’m excited.", ja: "私はワクワクしている。" },

      { type: "paragraph", text: "つまり、" },
      { type: "paragraph", text: "I’m exciting." },
      { type: "paragraph", text: "だと、" },
      { type: "paragraph", text: "「私はワクワクしています」" },
      { type: "paragraph", text: "というより、" },
      { type: "paragraph", text: "「私は人をワクワクさせる人です」" },
      { type: "paragraph", text: "という意味に近づいてしまうんです。" },

      {
        type: "question",
        text: "自分で\n「私って、刺激的な人なんです」\nと言っている感じになるんですね。",
      },

      {
        type: "insight",
        text: "覚え方はシンプルです。\n気持ちを感じている人 → excited\nその気持ちを起こさせる側 → exciting",
      },

      { type: "heading", text: "これだけ覚えて帰りましょう" },

      {
        type: "englishDisplay",
        en: "I’m excited!",
        ja: "楽しみ！／ワクワクしてる！",
        context: "今日の1フレーズ",
      },

      { type: "paragraph", text: "旅行の前でも、イベントの前でも、新しいことを始めるときでも使えます。" },
      { type: "paragraph", text: "I’m exciting. ではなく、" },
      { type: "paragraph", text: "I’m excited!" },
      { type: "paragraph", text: "今日からここだけ、間違えなければOKです。" },

      {
        type: "keyMessage",
        text: "ONE MINUTE,\nONE ENGLISH.\n\n今日は、\n\nI’m excited!\n\nこれだけ。",
      },
    ],
    editorNote: [
      "英語は、一度にたくさん覚えなくても大丈夫です。",
      "「1分英語」では、1回につき1つだけ。",
      "読み終わったあとに、英語がひとつ頭に残る。",
      "そんな小さな英語の時間をお届けします。",
    ],
    relatedCategorySlug: "online-eikaiwa",
    relatedCategoryLabel: "オンライン英会話",
  },
];

export function getColumnBySlug(slug: string): Column | undefined {
  return columns.find((c) => c.slug === slug);
}

/** "ISSUE 001" padding, shared by every page that shows an issue number. */
export function formatIssueNumber(issueNumber: number): string {
  return String(issueNumber).padStart(3, "0");
}

/**
 * Newest-first across all series combined — the single ordering the
 * Magazine Issue System is built on. /columns and the homepage section both
 * read this instead of raw `columns`, so "latest issue" vs. "back issues"
 * stays correct as more series are interleaved, with no per-page logic to
 * update when a second or third series starts publishing.
 */
export const columnsSortedByDate: Column[] = [...columns].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

/**
 * Short identity for each series — enough to tell "the same magazine's
 * different serialization" apart without a per-series color scheme. Add an
 * entry here when 英語のなぜ？ / 1分英語 start publishing; no UI code needs
 * to change.
 */
export const seriesInfo: Record<string, { description: string }> = {
  英語コラム: {
    description: "日常のふとした「あれ、英語で何て言うんだっけ？」から出発して、英語と日本語の面白い違いを読み解く。",
  },
  "英語のなぜ？": {
    description:
      "英語の素朴な疑問を、「え、そうなの？」→「なんで？」→「なるほど！」という流れで解き明かす、テンポよく読める連載。",
  },
  "1分英語": {
    description: "1回につき、英語を1つだけ覚えて帰る。1分で読み切れる、いちばん短い連載。",
  },
};
