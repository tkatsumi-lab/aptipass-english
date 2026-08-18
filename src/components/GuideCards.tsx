import Link from "next/link";
import { guides } from "@/data/guides";

export default function GuideCards() {
  return (
    <section id="guide" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          3分で分かる英語学習ガイド
        </h2>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          長い記事を読まなくても、要点だけサクッと確認できます。
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.id}>
            <Link
              href={`/guides/${guide.slug}`}
              className="flex h-full items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 text-lg"
                aria-hidden="true"
              >
                {guide.emoji}
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900 sm:text-base">
                  {guide.title}
                </span>
                <span className="mt-1 block text-xs text-slate-500 sm:text-sm">
                  {guide.teaser}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                  続きを読む
                  <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
