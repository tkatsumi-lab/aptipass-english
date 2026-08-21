import Link from "next/link";
import { columns } from "@/data/columns";

/**
 * Homepage entry point for the "英語コラム" editorial section. Deliberately
 * placed last on the homepage (see src/app/page.tsx) — this is a discovery
 * hook, not the site's primary task (finding/comparing a service), so it
 * shouldn't compete with CategoryGrid/PurposeSection/FeaturedServices for
 * attention above the fold.
 */
export default function ColumnCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 ring-1 ring-rose-200">
          英語コラム
        </span>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          英語の「なぜ？」を、会話するように読む
        </h2>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          サービス選びの合間に、英語がちょっと面白くなる読み物です。
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((column) => (
          <li key={column.id}>
            <Link
              href={`/columns/${column.slug}`}
              prefetch={false}
              className="flex h-full flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-lg"
                aria-hidden="true"
              >
                {column.emoji}
              </span>
              <span className="block text-sm font-semibold text-slate-900 sm:text-base">
                {column.title}
              </span>
              <span className="block text-xs text-slate-500 sm:text-sm">{column.teaser}</span>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
                続きを読む
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <Link
          href="/columns"
          prefetch={false}
          className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:text-rose-700"
        >
          英語コラムをもっと読む
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
