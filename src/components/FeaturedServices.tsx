import { getCategory } from "@/data/categories";
import { services } from "@/data/services";
import ServiceAvatar from "./ServiceAvatar";

export default function FeaturedServices() {
  return (
    <section id="featured" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          注目の英語学習サービス
        </h2>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          代表的なサービスをピックアップ。詳細は各サービスでご確認ください。
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const category = getCategory(service.categoryId);
          return (
            <li
              key={service.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <ServiceAvatar
                  categoryId={service.categoryId}
                  initials={service.initials}
                />
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {service.name}
                  </p>
                  <span
                    className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${category.chipBg} ${category.chipText} ${category.chipRing}`}
                  >
                    {category.name}
                  </span>
                </div>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                詳しく見る
                <span aria-hidden="true">→</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
