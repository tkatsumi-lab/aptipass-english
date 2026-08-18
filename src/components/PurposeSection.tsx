import Link from "next/link";
import { getCategory } from "@/data/categories";
import { goals } from "@/data/goals";

export default function PurposeSection() {
  return (
    <section id="purpose" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            目的から探す
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            「なりたい姿」から、合いそうなカテゴリが見つかります。
          </p>
        </div>

        <ul className="mt-10 flex snap-x gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-4">
          {goals.map((goal) => {
            const category = getCategory(goal.relatedCategoryIds[0]);
            return (
              <li key={goal.id} className="min-w-[240px] snap-start sm:min-w-0">
                <Link
                  href={`/goals/${goal.slug}`}
                  className="flex h-full flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {goal.emoji}
                  </span>
                  <span className="text-sm font-semibold leading-snug text-slate-900">
                    {goal.label}
                  </span>
                  <span
                    className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${category.chipBg} ${category.chipText} ${category.chipRing}`}
                  >
                    {category.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
