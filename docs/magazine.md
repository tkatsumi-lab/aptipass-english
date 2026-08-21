# AptiPass MAGAZINE — Editorial Production System

AptiPass MAGAZINE is an Editorial Brand inside AptiPass English, not a
page or a single feed. It bundles 3 **independent** editorial series —
each owns its own ISSUE numbering and is never merged into a cross-series
"latest/back issues" list:

```
AptiPass English
|
+-- Service search / comparison (the site's primary task)
|
+-- AptiPass MAGAZINE (Editorial Hub — /columns)
     |
     +-- 英語コラム    "じっくり読む。"   long-form, quiet, contemplative
     +-- 英語のなぜ？  "知ると面白い。"   WHY? → DISCOVERY, adult trivia
     +-- 1分英語        "ひとつ覚える。"  one phrase, brisk pacing
```

Do not restructure this into a single ordered list — see `src/data/columns.ts`
(`getColumnsBySeries`, `seriesInfo`, `SERIES_NAMES`) for the data model this
document describes.

## Presentation model: shared system, per-series lever

Every series shares the same content model (`ColumnBlock` union: heading /
paragraph / question / example / insight / keyMessage / englishDisplay /
table) and the same components (`ColumnHero`, `ColumnBody`). Nothing in
those components branches on an article's slug or title — only on
`column.series`, via `seriesInfo[series]` (`src/data/columns.ts`) and
`SERIES_ACCENTS` (`src/lib/seriesAccent.ts`). Adding a 4th series means
adding one `seriesInfo` entry (+ a small presentation branch in
`ColumnHero.tsx` if it needs its own accent/kicker/density, the same way
英語のなぜ？'s "WHY?" kicker and 1分英語's compact density were added) —
every article already tagged with that series picks it up automatically.

## Editorial Illustration

An Editorial Illustration is not a decorative eye-catch. It's an optional
editorial element that makes an article's idea visually graspable —
"the reader gets the point before reading the explanation." Rules that
apply to every series:

- **Not required per article.** An editor decides case by case whether an
  article needs one.
- **1 per article, typically.** 英語コラム may use up to ~2 for a genuinely
  long piece; the other two series should stay at 1 or 0.
- **Never stock photography.** No handshake/business-suit stock photos, no
  generic AI-3D renders, no decorative filler.
- **Data-driven, never per-slug.** An article gets an illustration by
  setting `Column.illustration` (see `ColumnIllustration` in
  `src/data/columns.ts`); `ColumnHero` and the article page render it (or
  don't) purely off that field's presence — no `if (slug === ...)`
  anywhere in the render path.

### Per-series illustration direction

| Series | Purpose | Direction | Frequency |
|---|---|---|---|
| 英語コラム | Support the mood/culture/nuance of the piece | A little poetic, a little grown-up; generous whitespace, editorial line art | Only when a specific article calls for it |
| 英語のなぜ？ | Visualize the "why" itself | Typographic, conceptual diagrams, a small dose of humor — help the reader *see* the discovery | Comparatively frequent — it's the series' natural fit |
| 1分英語 | Make the one point land in a glance | Simple visual explanation: before/after, a contrast, a diagram readable in seconds | As needed — never at the cost of the "1 minute" promise |

### Technical shape

```ts
illustration?: {
  src: string;      // public/images/magazine/... — no external hosts
  alt: string;       // describes the image itself, not an SEO keyword dump
  width: number;      // real pixel dimensions — next/image needs these to reserve
  height: number;      // layout space and avoid CLS
  placement?: "hero" | "inline"; // default "hero"
  caption?: string;    // optional — omit when the image speaks for itself
}
```

- Assets live under `public/images/magazine/`.
- `placement: "hero"` (the default) renders inside `ColumnHero`: on
  desktop, title+subtitle share the row with the illustration in a
  roughly 58/42 split (an Editorial Feature Layout, not a giant blog
  eyecatch above the title); on mobile it stacks title → subtitle →
  illustration.
- `placement: "inline"` renders once, near the top of the article body
  (`src/app/columns/[slug]/page.tsx`). This is wired but not yet used by
  any article — extend it deliberately (e.g. into a repeatable block type)
  if a future article genuinely needs more than one in-body image, rather
  than forcing multiple images through today's single optional field.
- Every image uses `next/image` with explicit `width`/`height` (CLS-safe,
  responsive, no manual `<img>`), `alt` is required by the type, and
  nothing about it triggers a network request beyond the static asset
  itself — no client-side fetching, no external image host.

## Article production flow

1. **Draft.** An editor (human or ChatGPT-drafted) writes the manuscript.
2. **Tag it.** Mark each beat with one of the editorial block tags:
   `[本文]` `[見出し]` `[問題]` `[例文]` `[ポイント]` `[キーメッセージ]`
   `[見せる英語]`. These are an authoring convention only — they map onto
   the existing `paragraph` / `heading` / `question` / `example` /
   `insight` / `keyMessage` / `englishDisplay` block types 1:1; no new
   type is ever introduced for a tag.
3. **Decide on illustration.** None, or `hero` / `inline` — per the
   direction table above.
4. **If illustrating, produce the artwork** as a static image file (PNG/
   SVG/etc.), following the per-series direction.
5. **Place the asset** under `public/images/magazine/`.
6. **Register the article** in `src/data/columns.ts`: a new `Column`
   object (series/issueNumber/body/... per the existing shape) plus an
   `illustration` field if step 3 called for one.
7. **Render.** No component code changes are needed for a normal article —
   `ColumnHero`/`ColumnBody`/the Hub/the homepage section all read the new
   `Column` automatically.
8. **Verify locally**: `npm run lint`, `npx tsc --noEmit`, `npm run build`,
   then check the new URL (and a couple of existing ones, to confirm
   nothing else moved) on both a desktop and a mobile viewport.
9. **Commit and push.**
10. **Deploy separately**, batched with other changes at a deliberate time
    — never as an automatic side effect of an article addition.
