import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { guides } from "@/data/guides";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/guides";

export const metadata: Metadata = buildMetadata({
  title: "英語学習ガイド一覧 | AptiPass English",
  description:
    "サービスを選ぶ前に知っておきたいことを、3分で読める短さで解説するガイド一覧です。",
  path: PATH,
});

export default function GuidesPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "英語学習ガイド", path: PATH }]} />
      <JsonLd
        data={buildItemListJsonLd(
          "英語学習ガイド一覧",
          guides.map((g) => ({ name: g.title, path: `/guides/${g.slug}` })),
        )}
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          英語学習ガイド
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          サービスを選ぶ前に知っておきたいことを、3分で読める短さで解説します。
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.id}>
              <Link
                href={`/guides/${guide.slug}`}
                className="flex h-full items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 text-lg"
                  aria-hidden="true"
                >
                  {guide.emoji}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900 sm:text-base">
                    {guide.title}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500 sm:text-sm">
                    {guide.teaser}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
