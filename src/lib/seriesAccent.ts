/**
 * AptiPass MAGAZINE's per-series accent palette. `Column.series` (a plain
 * string) maps to one of these tokens via `seriesInfo[series].accent` in
 * src/data/columns.ts — nothing in the UI branches on an article's slug or
 * title, only on which series it belongs to.
 *
 * Every class string below is written out in full (never built with
 * `` `text-${accent}-500` ``) because Tailwind's build-time scanner only
 * picks up literal class names that appear as text somewhere in the
 * source — a runtime-interpolated class name would silently produce no
 * CSS. The indigo entry is byte-for-byte what 英語コラム's Hero/ColumnBody
 * already hardcoded, so that series renders identically to before this
 * file existed.
 */
export type SeriesAccent = "indigo" | "amber" | "emerald";

export type SeriesAccentClasses = {
  /** Hairline rule background (heading dividers, englishDisplay's rule). */
  ruleBg: string;
  /** Left-border color for `example` blocks and similar dividers. */
  ruleBorder: string;
  /** Decorative quote-glyph / small mark color, one step deeper than the rule. */
  glyph: string;
  /** Small-caps kicker label color (insight's "Point", meta series name). */
  label: string;
  /** Muted variant for quieter kickers (masthead descriptor, englishDisplay context). */
  labelMuted: string;
  /** Big serif display text color (question / keyMessage headline copy). */
  display: string;
  /** CTA link color. */
  link: string;
  /** CTA hover color, as a `group-hover:` utility (for a Link that wraps other elements). */
  linkHover: string;
  /** CTA hover color, as a plain `hover:` utility (for a self-contained inline link). */
  linkHoverSelf: string;
};

export const SERIES_ACCENTS: Record<SeriesAccent, SeriesAccentClasses> = {
  indigo: {
    ruleBg: "bg-indigo-200",
    ruleBorder: "border-indigo-200",
    glyph: "text-indigo-300",
    label: "text-indigo-500",
    labelMuted: "text-indigo-400",
    display: "text-indigo-950",
    link: "text-indigo-600",
    linkHover: "group-hover:text-indigo-700",
    linkHoverSelf: "hover:text-indigo-700",
  },
  amber: {
    ruleBg: "bg-amber-200",
    ruleBorder: "border-amber-200",
    glyph: "text-amber-300",
    label: "text-amber-600",
    labelMuted: "text-amber-500",
    display: "text-amber-950",
    link: "text-amber-700",
    linkHover: "group-hover:text-amber-800",
    linkHoverSelf: "hover:text-amber-800",
  },
  emerald: {
    ruleBg: "bg-emerald-200",
    ruleBorder: "border-emerald-200",
    glyph: "text-emerald-300",
    label: "text-emerald-600",
    labelMuted: "text-emerald-500",
    display: "text-emerald-950",
    link: "text-emerald-600",
    linkHover: "group-hover:text-emerald-700",
    linkHoverSelf: "hover:text-emerald-700",
  },
};
