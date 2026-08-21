import Image from "next/image";
import { formatIssueNumber, seriesInfo, type Column } from "@/data/columns";
import { SERIES_ACCENTS } from "@/lib/seriesAccent";

type ColumnHeroProps = {
  column: Column;
};

/**
 * The magazine-cover Hero, shared shape across every series (masthead name,
 * descriptor, rule, issue meta, title, subtitle) with per-series accent
 * color, descriptor copy, meta ordering, and padding density — switched on
 * `column.series` (never on slug/title), sourced from `seriesInfo`. This is
 * the one place series presentation earns its own JSX branch per series;
 * everything else (ColumnBody, /columns, homepage) stays fully data-driven
 * off `seriesInfo` with no series-specific markup of its own.
 *
 * `column.illustration` (optional — see ColumnIllustration in
 * src/data/columns.ts) is the other data-driven switch here: when a
 * `placement: "hero"` (or unset) illustration exists, title+subtitle share
 * the row with it in a ~58/42 Editorial Feature Layout on desktop, stacked
 * title → subtitle → illustration on mobile. With no illustration — every
 * article today except one — the Hero renders exactly as it always has,
 * at the narrower single-column width. Nothing here checks a slug.
 */
export default function ColumnHero({ column }: ColumnHeroProps) {
  const presentation = seriesInfo[column.series];
  const a = SERIES_ACCENTS[presentation.accent];
  const compact = presentation.density === "compact";
  const heroIllustration =
    column.illustration && column.illustration.placement !== "inline" ? column.illustration : undefined;

  const wash =
    presentation.accent === "amber"
      ? "bg-gradient-to-b from-amber-50/70 via-white to-white"
      : presentation.accent === "emerald"
        ? "bg-gradient-to-b from-emerald-50/70 via-white to-white"
        : "bg-gradient-to-b from-indigo-50/70 via-white to-white";

  const metaItems = (
    <>
      <span>ISSUE {formatIssueNumber(column.issueNumber)}</span>
      <span aria-hidden="true" className="text-slate-300">
        /
      </span>
      <span>{column.readingTimeMinutes} MIN READ</span>
    </>
  );

  const titleBlock = (
    <div>
      <h1 className="text-balance break-keep font-serif text-3xl leading-[1.3] font-bold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.25]">
        {column.title}
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">{column.subtitle}</p>
    </div>
  );

  return (
    <div className={wash}>
      <div
        className={`mx-auto px-4 sm:px-6 ${compact ? "pt-10 pb-5 sm:pt-12" : "pt-12 pb-6 sm:pt-16"} ${
          heroIllustration ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        <p className="text-sm font-bold tracking-[0.28em] text-slate-900 uppercase sm:text-base">
          AptiPass MAGAZINE
        </p>
        <p className={`mt-1 text-[10px] font-medium tracking-[0.35em] uppercase sm:text-[11px] ${a.labelMuted}`}>
          {presentation.mastheadDescriptor}
        </p>

        <div aria-hidden="true" className={`mt-5 h-px w-12 ${a.ruleBg}`} />

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          {presentation.accent === "amber" && (
            <>
              <span className={a.label}>WHY?</span>
              <span aria-hidden="true" className="text-slate-300">
                /
              </span>
            </>
          )}
          {presentation.density === "compact" ? (
            <>
              <span>{column.readingTimeMinutes} MIN READ</span>
              <span aria-hidden="true" className="text-slate-300">
                /
              </span>
              <span>ISSUE {formatIssueNumber(column.issueNumber)}</span>
            </>
          ) : (
            metaItems
          )}
          <span aria-hidden="true" className="text-slate-300">
            /
          </span>
          <span className={a.label}>{column.series}</span>
        </div>

        {heroIllustration ? (
          <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
            <div className="sm:w-[58%]">{titleBlock}</div>
            <div className="sm:w-[42%]">
              <Image
                src={heroIllustration.src}
                alt={heroIllustration.alt}
                width={heroIllustration.width}
                height={heroIllustration.height}
                sizes="(min-width: 640px) 42vw, 100vw"
                className="h-auto w-full"
                priority
              />
              {heroIllustration.caption && (
                <p className="mt-2 text-xs text-slate-400">{heroIllustration.caption}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6">{titleBlock}</div>
        )}
      </div>
    </div>
  );
}
