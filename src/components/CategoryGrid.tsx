import { categories } from "@/data/categories";

export default function CategoryGrid() {
  return (
    <section id="categories" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          カテゴリから探す
        </h2>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          気になる学び方から、サービスの候補を絞り込めます。
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href="#featured"
              className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-5"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-xl ${category.gradient}`}
                aria-hidden="true"
              >
                {category.emoji}
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900 sm:text-base">
                  {category.name}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500 sm:text-sm">
                  {category.description}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
