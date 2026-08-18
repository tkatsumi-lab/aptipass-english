import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import ServiceAvatar from "@/components/ServiceAvatar";
import { comparePairs } from "@/data/comparePairs";
import { getServicesByIds } from "@/data/services";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/compare";

export const metadata: Metadata = buildMetadata({
  title: "英語学習サービスの比較一覧 | AptiPass English",
  description:
    "英語学習サービスを2つ並べて比較できるページの一覧です。どちらが優れているかではなく、それぞれが向く条件を紹介します。",
  path: PATH,
});

export default function ComparePage() {
  return (
    <>
      <Breadcrumb items={[{ name: "比較", path: PATH }]} />
      <JsonLd
        data={buildItemListJsonLd(
          "英語学習サービスの比較",
          comparePairs.map((pair) => ({
            name: pair.slug.replace("-vs-", " vs "),
            path: `/compare/${pair.slug}`,
          })),
        )}
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">比較</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          サービスを2つ並べて比較できます。優劣ではなく、それぞれが向く条件を紹介します。
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {comparePairs.map((pair) => {
            const [a, b] = getServicesByIds(pair.serviceIds);
            return (
              <li key={pair.slug}>
                <Link
                  href={`/compare/${pair.slug}`}
                  className="flex h-full flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    {a && <ServiceAvatar categoryId={a.categories[0]} initials={a.initials} />}
                    <span className="text-sm font-bold text-slate-400">VS</span>
                    {b && <ServiceAvatar categoryId={b.categories[0]} initials={b.initials} />}
                    <p className="text-base font-semibold text-slate-900">
                      {a?.name} vs {b?.name}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600">{pair.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    比較を見る
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
