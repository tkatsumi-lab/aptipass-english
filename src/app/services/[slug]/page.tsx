import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryBadge from "@/components/CategoryBadge";
import DecisionCTA from "@/components/DecisionCTA";
import ServiceAvatar from "@/components/ServiceAvatar";
import ServiceCtaLink from "@/components/ServiceCtaLink";
import ServiceViewTracker from "@/components/ServiceViewTracker";
import { getCategory } from "@/data/categories";
import { comparePairs } from "@/data/comparePairs";
import { getServicesForGoal, goals } from "@/data/goals";
import { getServiceBySlug, getServicesByCategory, services } from "@/data/services";
import {
  learningStyleLabels,
  platformTypeLabels,
  pricingModelLabels,
  teacherTypeLabels,
  trialAvailabilityLabels,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.name}の特徴と向いている人 | AptiPass English`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const primaryCategory = getCategory(service.categories[0]);
  const relatedServices = getServicesByCategory(service.categories[0]).filter(
    (s) => s.id !== service.id,
  );
  const relatedComparePairs = comparePairs.filter((pair) =>
    pair.serviceIds.includes(service.id),
  );
  const relatedGoals = goals.filter((goal) =>
    getServicesForGoal(goal).some((s) => s.id === service.id),
  );

  const breadcrumbItems = [
    { name: primaryCategory.name, path: `/categories/${primaryCategory.slug}` },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ServiceViewTracker serviceId={service.id} />

      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="flex items-start gap-4">
          <ServiceAvatar categoryId={service.categories[0]} initials={service.initials} size="md" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {service.name}
            </h1>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {service.categories.map((categoryId) => (
                <CategoryBadge key={categoryId} category={getCategory(categoryId)} linked />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          {service.shortDescription}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
            >
              {feature}
            </li>
          ))}
        </ul>

        <ServiceCtaLink service={service} primaryCategory={primaryCategory} />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:col-span-2">
            <h2 className="text-sm font-semibold text-slate-900">基本情報</h2>
            <dl className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              {service.learningStyle && (
                <div>
                  <dt className="text-xs text-slate-400">学び方</dt>
                  <dd className="text-slate-700">
                    {learningStyleLabels[service.learningStyle]}
                  </dd>
                </div>
              )}
              {service.teacherType && (
                <div>
                  <dt className="text-xs text-slate-400">講師</dt>
                  <dd className="text-slate-700">
                    {teacherTypeLabels[service.teacherType]}
                  </dd>
                </div>
              )}
              {service.platformType.length > 0 && (
                <div>
                  <dt className="text-xs text-slate-400">利用方法</dt>
                  <dd className="text-slate-700">
                    {service.platformType.map((p) => platformTypeLabels[p]).join(" / ")}
                  </dd>
                </div>
              )}
              {service.pricingModel && (
                <div>
                  <dt className="text-xs text-slate-400">料金体系</dt>
                  <dd className="text-slate-700">{pricingModelLabels[service.pricingModel]}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-slate-400">無料体験</dt>
                <dd className="text-slate-700">{trialAvailabilityLabels[service.trialAvailability]}</dd>
              </div>
              {service.examSupport.length > 0 && (
                <div>
                  <dt className="text-xs text-slate-400">対応資格・試験</dt>
                  <dd className="text-slate-700">{service.examSupport.join(" / ")}</dd>
                </div>
              )}
            </dl>
            <p className="mt-3 text-xs text-slate-400">
              具体的な料金は変更されることがあるため、最新情報は公式サイトでご確認ください。
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
            <h2 className="text-sm font-semibold text-emerald-800">
              向いている人
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-emerald-900">
              {service.bestFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5">
            <h2 className="text-sm font-semibold text-orange-800">
              向いていない可能性がある人
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-orange-900">
              {service.notFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">・</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {relatedServices.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">
              他サービスとの違い
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedServices.map((related) => (
                <li key={related.id}>
                  <Link
                    href={`/services/${related.slug}`}
                    prefetch={false}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <ServiceAvatar
                      categoryId={related.categories[0]}
                      initials={related.initials}
                      size="sm"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {related.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {related.features[0]}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedComparePairs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">関連比較</h2>
            <ul className="mt-3 space-y-2">
              {relatedComparePairs.map((pair) => (
                <li key={pair.slug}>
                  <Link
                    href={`/compare/${pair.slug}`}
                    prefetch={false}
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

        {relatedGoals.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">関連する目的</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {relatedGoals.map((goal) => (
                <li key={goal.id}>
                  <Link
                    href={`/goals/${goal.slug}`}
                    prefetch={false}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
                  >
                    {goal.emoji} {goal.label}
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
