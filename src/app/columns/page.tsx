import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { formatIssueNumber, getColumnsBySeries, SERIES_NAMES, seriesInfo } from "@/data/columns";
import { SERIES_ACCENTS } from "@/lib/seriesAccent";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/columns";

export const metadata: Metadata = buildMetadata({
  title: "AptiPass MAGAZINE | AptiPass English",
  description:
    "英語コラム・英語のなぜ？・1分英語。AptiPass Englishが届ける3つの読み物シリーズ — じっくり読む、疑問を楽しむ、ひとつ覚える。",
  path: PATH,
});

/**
 * AptiPass MAGAZINE's Editorial Hub — not a single feed. 英語コラム /
 * 英語のなぜ？ / 1分英語 are 3 independent series, each with its own
 * ISSUE numbering (see docs/architecture.md-style reasoning in
 * src/data/columns.ts), so this page never merges them into one
 * cross-series "latest/back issues" list. It shows each series' own
 * latest issue as an entry point; per-series back-issue archives are a
 * later addition (see SERIES_NAMES/getColumnsBySeries — the data already
 * supports it).
 *
 * Sized with decreasing visual weight in `SERIES_NAMES` order (英語コラム
 * largest, 1分英語 most compact) so the 3 entries read as a rhythm, not 3
 * identical cards — while every entry shares the same shape (tagline →
 * series name → description → LATEST → CTA), so it still reads as one
 * magazine rather than 3 unrelated sites.
 */
export default function ColumnsPage() {
  const entries = SERIES_NAMES.map((series) => ({
    series,
    presentation: seriesInfo[series],
    latest: getColumnsBySeries(series)[0],
  })).filter((entry) => entry.latest);

  return (
    <>
      <Breadcrumb items={[{ name: "AptiPass MAGAZINE", path: PATH }]} />
      <JsonLd
        data={buildItemListJsonLd(
          "AptiPass MAGAZINE",
          entries.map((entry) => ({
            name: entry.latest!.title,
            path: `/columns/${entry.latest!.slug}`,
          })),
        )}
      />

      <div className="bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto max-w-3xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
            AptiPass MAGAZINE
          </p>
          <h1 className="mt-3 text-balance break-keep font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            英語を、ちょっと面白く。
          </h1>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">Language &amp; Culture from AptiPass English</p>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        {entries.map((entry, index) => {
          const { series, presentation, latest } = entry;
          if (!latest) return null;
          const a = SERIES_ACCENTS[presentation.accent];
          const nameSize =
            index === 0 ? "text-3xl sm:text-4xl" : index === 1 ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl";
          const titleSize = index === 0 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";

          return (
            <div
              key={series}
              className={index === 0 ? "" : "mt-14 border-t border-slate-100 pt-14 sm:mt-16 sm:pt-16"}
            >
              <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${a.label}`}>
                {presentation.tagline}
              </p>
              <h2 className={`mt-1 font-serif font-bold tracking-tight break-keep text-slate-900 ${nameSize}`}>
                {series}
              </h2>
              <p className="mt-2 max-w-md text-sm text-slate-500">{presentation.description}</p>

              <Link href={`/columns/${latest.slug}`} prefetch={false} className="group mt-6 block">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
                  <span>Latest</span>
                  <span aria-hidden="true" className="text-slate-300">
                    /
                  </span>
                  <span>ISSUE {formatIssueNumber(latest.issueNumber)}</span>
                  <span aria-hidden="true" className="text-slate-300">
                    /
                  </span>
                  <span>{latest.readingTimeMinutes} MIN READ</span>
                </div>
                <p
                  className={`mt-2 max-w-xl font-serif leading-snug font-bold break-keep text-slate-900 ${a.linkHover} ${titleSize}`}
                >
                  {latest.title}
                </p>
                <span className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${a.link}`}>
                  {presentation.ctaLabel}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
}
