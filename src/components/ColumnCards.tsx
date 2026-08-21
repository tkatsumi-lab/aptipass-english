import Link from "next/link";
import { columns } from "@/data/columns";

/**
 * Homepage entry point for AptiPass MAGAZINE. Deliberately placed last on
 * the homepage (see src/app/page.tsx) — this is a discovery hook, not the
 * site's primary task (finding/comparing a service), so it shouldn't
 * compete with CategoryGrid/PurposeSection/FeaturedServices for attention
 * above the fold.
 *
 * Reads `columns` directly, so it scales from 1 article to many without
 * code changes: the latest issue gets a featured teaser; any additional
 * issues (once they exist) list underneath it. Nothing here is specific
 * to the first column's content.
 */
export default function ColumnCards() {
  const [featured, ...rest] = columns;
  if (!featured) return null;

  return (
    <section className="bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-indigo-500 uppercase">
                AptiPass MAGAZINE
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                英語の「なぜ？」を、会話するように読む
              </h2>
            </div>
            <Link
              href="/columns"
              prefetch={false}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-500 hover:text-indigo-600"
            >
              コラムをすべて見る
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <Link href={`/columns/${featured.slug}`} prefetch={false} className="group mt-8 block">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] text-indigo-500 uppercase">
              <span>{featured.series}</span>
              <span aria-hidden="true" className="text-indigo-200">
                /
              </span>
              <span>ISSUE {String(featured.issueNumber).padStart(3, "0")}</span>
              <span aria-hidden="true" className="text-indigo-200">
                /
              </span>
              <span className="text-slate-400 normal-case">{featured.readingTimeMinutes} MIN READ</span>
            </div>
            <p className="mt-3 font-serif text-lg leading-snug font-bold text-slate-900 group-hover:text-indigo-700 sm:text-2xl">
              {featured.title}
            </p>
            <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">{featured.teaser}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
              続きを読む
              <span aria-hidden="true">→</span>
            </span>
          </Link>

          {rest.length > 0 && (
            <ul className="mt-8 divide-y divide-slate-100 border-t border-slate-100">
              {rest.map((column) => (
                <li key={column.id}>
                  <Link
                    href={`/columns/${column.slug}`}
                    prefetch={false}
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700">
                      {column.title}
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-indigo-400">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
