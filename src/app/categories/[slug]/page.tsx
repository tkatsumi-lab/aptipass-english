import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DecisionCTA from "@/components/DecisionCTA";
import JsonLd from "@/components/JsonLd";
import ServiceCard from "@/components/ServiceCard";
import { categories, getCategoryBySlug } from "@/data/categories";
import { comparePairs } from "@/data/comparePairs";
import { goals } from "@/data/goals";
import { guides } from "@/data/guides";
import { getServicesByCategory } from "@/data/services";
import { isCategoryIndexable } from "@/lib/content";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return buildMetadata({
    title: `${category.name}を比較する | AptiPass English`,
    description: `${category.shortDescription}。${category.name}のサービスを比較・検討できます。`,
    path: `/categories/${category.slug}`,
    index: isCategoryIndexable(category),
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const relatedServices = getServicesByCategory(category.id);
  const relatedGoals = goals.filter((goal) =>
    goal.relatedCategoryIds.includes(category.id),
  );
  const relatedServiceIds = new Set(relatedServices.map((s) => s.id));
  const relatedComparePairs = comparePairs.filter((pair) =>
    pair.serviceIds.every((id) => relatedServiceIds.has(id)),
  );
  const relatedGuides = guides.filter((guide) =>
    guide.relatedLinks.some(
      (link) => link.type === "category" && link.slug === category.slug,
    ),
  );

  const breadcrumbItems = [{ name: category.name, path: `/categories/${category.slug}` }];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      {relatedServices.length > 0 && (
        <JsonLd
          data={buildItemListJsonLd(
            `${category.name}のサービス`,
            relatedServices.map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
          )}
        />
      )}

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${category.gradient}`}
          aria-hidden="true"
        >
          {category.emoji}
        </span>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
          {category.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
          {category.shortDescription}
        </p>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            このカテゴリで重要な比較ポイント
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {category.comparisonPoints.map((point) => (
              <li
                key={point}
                className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${category.chipBg} ${category.chipText} ${category.chipRing}`}
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">該当サービス</h2>
          {relatedServices.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              現在このカテゴリに掲載中のサービスはありません。今後追加予定です。
            </p>
          )}
        </div>

        {relatedGoals.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">
              目的別ショートカット
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {relatedGoals.map((goal) => (
                <li key={goal.id}>
                  <Link
                    href={`/goals/${goal.slug}`}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
                  >
                    {goal.emoji} {goal.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedComparePairs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">おすすめ比較</h2>
            <ul className="mt-3 space-y-2">
              {relatedComparePairs.map((pair) => (
                <li key={pair.slug}>
                  <Link
                    href={`/compare/${pair.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {pair.slug.replace("-vs-", " vs ")}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedGuides.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">関連ガイド</h2>
            <ul className="mt-3 space-y-2">
              {relatedGuides.map((guide) => (
                <li key={guide.id}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {guide.emoji} {guide.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <DecisionCTA />
    </>
  );
}
