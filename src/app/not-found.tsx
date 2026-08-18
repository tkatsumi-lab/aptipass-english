import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="text-4xl" aria-hidden="true">
        🔍
      </span>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
        ページが見つかりませんでした
      </h1>
      <p className="mt-3 text-sm text-slate-500 sm:text-base">
        お探しのページは移動または削除された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
      >
        トップページへ戻る
      </Link>
    </section>
  );
}
