import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { columnsSortedByDate, formatIssueNumber, seriesInfo } from "@/data/columns";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/columns";

export const metadata: Metadata = buildMetadata({
  title: "英語コラム | AptiPass English",
  description:
    "英語の「なぜ？」を、会話するように読み解く読み物コンテンツ。日常のふとした疑問から、英語と日本語の面白い違いを紹介します。",
  path: PATH,
});

export default function ColumnsPage() {
  const [latest, ...backIssues] = columnsSortedByDate;
  // Only 1 series today, but this stays correct once 英語のなぜ？ / 1分英語
  // start publishing — the header switches to the generic magazine name
  // instead of a page rewrite.
  const seriesNames = [...new Set(columnsSortedByDate.map((c) => c.series))];
  const heading = seriesNames.length === 1 ? seriesNames[0] : "AptiPass MAGAZINE";
  const description =
    (seriesNames.length === 1 && seriesInfo[seriesNames[0]]?.description) ||
    "英語にまつわる読み物を、AptiPass Englishの編集部がじっくりお届けします。";

  return (
    <>
      <Breadcrumb items={[{ name: "コラム", path: PATH }]} />
      <JsonLd
        data={buildItemListJsonLd(
          "英語コラム一覧",
          columnsSortedByDate.map((c) => ({ name: c.title, path: `/columns/${c.slug}` })),
        )}
      />

      {/* Masthead — same "AptiPass MAGAZINE" identity as the article Hero, so the
          list page reads as the magazine's own back-issue archive, not a blog index. */}
      <div className="bg-gradient-to-b from-indigo-50/70 via-white to-white">
        <div className="mx-auto max-w-3xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-indigo-500 uppercase">
            AptiPass MAGAZINE
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight break-keep text-slate-900 sm:text-4xl">
            {heading} バックナンバー
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">{description}</p>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        {latest && (
          <div className={backIssues.length > 0 ? "border-b border-slate-100 pb-10" : ""}>
            <p className="mt-6 text-[11px] font-semibold tracking-[0.2em] text-indigo-500 uppercase">
              Latest Issue
            </p>
            <Link href={`/columns/${latest.slug}`} prefetch={false} className="group mt-4 block">
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
                <span>{latest.series}</span>
                <span aria-hidden="true" className="text-slate-300">
                  /
                </span>
                <span>ISSUE {formatIssueNumber(latest.issueNumber)}</span>
                <span aria-hidden="true" className="text-slate-300">
                  /
                </span>
                <span>{latest.readingTimeMinutes} MIN READ</span>
              </div>
              <h2 className="mt-3 max-w-2xl font-serif text-2xl leading-snug font-bold break-keep text-slate-900 group-hover:text-indigo-700 sm:text-3xl">
                {latest.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-500 sm:text-base">{latest.teaser}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                続きを読む
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        )}

        {backIssues.length > 0 && (
          <div>
            <p className="mt-10 text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
              Back Issues
            </p>
            <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
              {backIssues.map((column) => (
                <li key={column.id}>
                  <Link
                    href={`/columns/${column.slug}`}
                    prefetch={false}
                    className="group flex flex-col gap-3 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <div className="sm:max-w-xl">
                      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] text-indigo-500 uppercase">
                        <span>{column.series}</span>
                        <span aria-hidden="true" className="text-indigo-200">
                          /
                        </span>
                        <span>ISSUE {formatIssueNumber(column.issueNumber)}</span>
                      </div>
                      <h2 className="mt-2 font-serif text-xl font-bold break-keep text-slate-900 group-hover:text-indigo-700 sm:text-2xl">
                        {column.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500">{column.teaser}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 text-xs sm:flex-col sm:items-end sm:gap-2">
                      <span className="text-slate-400">{column.readingTimeMinutes} MIN READ</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-indigo-600">
                        続きを読む
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
