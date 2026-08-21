import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { columns } from "@/data/columns";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/columns";

export const metadata: Metadata = buildMetadata({
  title: "英語コラム | AptiPass English",
  description:
    "英語の「なぜ？」を、会話するように読み解く読み物コンテンツ。日常のふとした疑問から、英語と日本語の面白い違いを紹介します。",
  path: PATH,
});

export default function ColumnsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "英語コラム", path: PATH }]} />
      <JsonLd
        data={buildItemListJsonLd(
          "英語コラム一覧",
          columns.map((c) => ({ name: c.title, path: `/columns/${c.slug}` })),
        )}
      />

      {/* Masthead — same "AptiPass MAGAZINE" identity as the article Hero, so the
          list page reads as the magazine's own back-issue archive, not a blog index. */}
      <div className="bg-gradient-to-b from-indigo-50/70 via-white to-white">
        <div className="mx-auto max-w-3xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-indigo-500 uppercase">
            AptiPass MAGAZINE
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            英語コラム
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
            日常のふとした「あれ、英語で何て言うんだっけ？」から出発して、英語と日本語の面白い違いをじっくり読み解きます。
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
          {columns.map((column) => (
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
                    <span>ISSUE {String(column.issueNumber).padStart(3, "0")}</span>
                  </div>
                  <h2 className="mt-2 font-serif text-xl font-bold text-slate-900 group-hover:text-indigo-700 sm:text-2xl">
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
      </section>
    </>
  );
}
