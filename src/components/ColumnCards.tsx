import Link from "next/link";
import { formatIssueNumber, getColumnsBySeries, SERIES_NAMES, seriesInfo } from "@/data/columns";
import { SERIES_ACCENTS } from "@/lib/seriesAccent";

/**
 * Homepage discovery hook for AptiPass MAGAZINE — "AptiPass English has 3
 * reading series, not just service comparisons." Shows all 3 series as
 * independent entry points (each with its own tagline, latest issue, and
 * CTA), never as one merged "latest article" feed — matching the Hub at
 * /columns, which this section links to. Reads `getColumnsBySeries`, so a
 * 2nd/3rd article in any series just becomes that series' new latest here;
 * a 4th series only needs a `seriesInfo` entry (see src/data/columns.ts).
 */
export default function ColumnCards() {
  const entries = SERIES_NAMES.map((series) => ({
    series,
    presentation: seriesInfo[series],
    latest: getColumnsBySeries(series)[0],
  })).filter((entry) => entry.latest);

  if (entries.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
                AptiPass MAGAZINE
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                サービス比較だけじゃない、AptiPass Englishの読み物。
              </h2>
            </div>
            <Link
              href="/columns"
              prefetch={false}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-700"
            >
              AptiPass MAGAZINEをすべて見る
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0">
            {entries.map((entry, index) => {
              const { series, presentation, latest } = entry;
              if (!latest) return null;
              const a = SERIES_ACCENTS[presentation.accent];
              return (
                <Link
                  key={series}
                  href={`/columns/${latest.slug}`}
                  prefetch={false}
                  className={`group block ${index === 0 ? "" : "border-t border-slate-100 pt-5 sm:border-t-0 sm:pt-0"}`}
                >
                  <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${a.label}`}>
                    {presentation.tagline}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-bold break-keep text-slate-900">{series}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-[0.1em] text-slate-400">
                    {formatIssueNumber(latest.issueNumber)}
                  </p>
                  <p className={`mt-2 text-sm leading-snug font-semibold break-keep text-slate-700 ${a.linkHover}`}>
                    {latest.title}
                  </p>
                  <div className="mt-2 text-xs text-slate-400">{latest.readingTimeMinutes} MIN READ</div>
                  <span className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${a.link}`}>
                    {presentation.ctaLabel}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
