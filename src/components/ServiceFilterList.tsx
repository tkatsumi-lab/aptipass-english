"use client";

import { useMemo, useState } from "react";
import type { Category, CategoryId } from "@/data/categories";
import type { Service } from "@/data/services";
import ServiceCard from "./ServiceCard";

type ServiceFilterListProps = {
  services: Service[];
  categories: Category[];
};

export default function ServiceFilterList({ services, categories }: ServiceFilterListProps) {
  const [selected, setSelected] = useState<Set<CategoryId>>(new Set());
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((service) => {
      const matchesCategory =
        selected.size === 0 || service.categories.some((c) => selected.has(c));
      const matchesQuery =
        q === "" ||
        service.name.toLowerCase().includes(q) ||
        service.features.some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [services, selected, query]);

  function toggleCategory(id: CategoryId) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = selected.has(category.id);
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors ${
                active
                  ? `bg-gradient-to-r text-white ring-transparent ${category.gradient}`
                  : `${category.chipBg} ${category.chipText} ${category.chipRing} hover:brightness-95`
              }`}
            >
              <span aria-hidden="true">{category.emoji}</span>
              {category.name}
            </button>
          );
        })}
        {selected.size > 0 && (
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline"
          >
            絞り込みを解除
          </button>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="service-search" className="sr-only">
          サービス名・特徴で検索
        </label>
        <input
          id="service-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="サービス名・特徴で検索（例: ネイティブ、AI、TOEIC）"
          className="w-full max-w-md rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <p className="mt-4 text-xs text-slate-400" role="status">
        {filtered.length}件のサービスを表示中（全{services.length}件）
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
          条件に一致するサービスが見つかりませんでした。絞り込みを変更してお試しください。
        </p>
      )}
    </div>
  );
}
