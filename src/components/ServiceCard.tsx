import Link from "next/link";
import { getCategory } from "@/data/categories";
import type { Service } from "@/data/services";
import ServiceAvatar from "./ServiceAvatar";
import CategoryBadge from "./CategoryBadge";

type ServiceCardProps = {
  service: Service;
  /** Denser layout for pages that can list many services (category/goal hubs) */
  compact?: boolean;
};

export default function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const primaryCategory = getCategory(service.categories[0]);

  if (compact) {
    return (
      <li className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
        <ServiceAvatar categoryId={service.categories[0]} initials={service.initials} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{service.name}</p>
          <p className="truncate text-xs text-slate-500">{service.features[0]}</p>
        </div>
        <Link
          href={`/services/${service.slug}`}
          prefetch={false}
          className={`shrink-0 text-xs font-semibold ${primaryCategory.chipText} hover:opacity-80`}
        >
          詳細
          <span aria-hidden="true">→</span>
        </Link>
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <ServiceAvatar categoryId={service.categories[0]} initials={service.initials} />
        <div>
          <p className="text-base font-semibold text-slate-900">
            {service.name}
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {service.categories.map((categoryId) => (
              <CategoryBadge key={categoryId} category={getCategory(categoryId)} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600">{service.shortDescription}</p>

      <ul className="flex flex-wrap gap-1.5">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
          >
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={`/services/${service.slug}`}
        prefetch={false}
        className={`mt-auto inline-flex items-center gap-1 text-sm font-semibold ${primaryCategory.chipText} hover:opacity-80`}
      >
        詳しく見る
        <span aria-hidden="true">→</span>
      </Link>
    </li>
  );
}
