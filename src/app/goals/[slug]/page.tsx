import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryBadge from "@/components/CategoryBadge";
import DecisionCTA from "@/components/DecisionCTA";
import JsonLd from "@/components/JsonLd";
import ServiceCard from "@/components/ServiceCard";
import { getCategory } from "@/data/categories";
import { comparePairs } from "@/data/comparePairs";
import { getGoalBySlug, getServicesForGoal, goals } from "@/data/goals";
import { getGuideBySlug } from "@/data/guides";
import { isGoalIndexable } from "@/lib/content";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return goals.map((goal) => ({ slug: goal.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const goal = getGoalBySlug(slug);
  if (!goal) return {};

  return buildMetadata({
    title: `${goal.label}人向けの英語学習サービスの選び方 | AptiPass English`,
    description: goal.description,
    path: `/goals/${goal.slug}`,
    index: isGoalIndexable(goal),
  });
}

export default async function GoalPage({ params }: Props) {
  const { slug } = await params;
  const goal = getGoalBySlug(slug);
  if (!goal) notFound();

  const relatedServices = getServicesForGoal(goal);
  const relatedServiceIds = new Set(relatedServices.map((s) => s.id));
  const relatedComparePairs = comparePairs.filter((pair) =>
    pair.serviceIds.every((id) => relatedServiceIds.has(id)),
  );
  const relatedGuides = goal.relatedGuideIds
    .map((guideId) => getGuideBySlug(guideId))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const breadcrumbItems = [{ name: goal.label, path: `/goals/${goal.slug}` }];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      {relatedServices.length > 0 && (
        <JsonLd
          data={buildItemListJsonLd(
            `${goal.label}人向けのサービス`,
            relatedServices.map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
          )}
        />
      )}

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <span className="text-3xl" aria-hidden="true">
          {goal.emoji}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          {goal.label}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {goal.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {goal.relatedCategoryIds.length > 0 ? (
            goal.relatedCategoryIds.map((categoryId) => (
              <CategoryBadge key={categoryId} category={getCategory(categoryId)} linked />
            ))
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
              カテゴリ横断
            </span>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            この目的で重要な比較ポイント
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {goal.comparisonAxes.map((axis) => (
              <li
                key={axis}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
              >
                {axis}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">該当サービス</h2>
          {relatedServices.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <ServiceCard key={service.id} service={service} compact={relatedServices.length > 6} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              現在この目的に合うサービスの掲載がありません。今後追加予定です。
            </p>
          )}
        </div>

        {relatedComparePairs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">関連比較</h2>
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
