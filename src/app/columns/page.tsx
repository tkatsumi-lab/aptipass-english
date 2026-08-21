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

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 ring-1 ring-rose-200">
          英語コラム
        </span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          英語の「なぜ？」を、会話するように読む
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          日常のふとした「あれ、英語で何て言うんだっけ？」から出発して、英語と日本語の面白い違いをじっくり読み解きます。
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((column) => (
            <li key={column.id}>
              <Link
                href={`/columns/${column.slug}`}
                prefetch={false}
                className="flex h-full flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-xl"
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
      </section>
    </>
  );
}
