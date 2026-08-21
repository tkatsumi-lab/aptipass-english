import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ColumnBody from "@/components/ColumnBody";
import JsonLd from "@/components/JsonLd";
import { columns, getColumnBySlug } from "@/data/columns";
import { buildArticleJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return columns.map((column) => ({ slug: column.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const column = getColumnBySlug(slug);
  if (!column) return {};

  return buildMetadata({
    title: `${column.seoTitle} | AptiPass English`,
    description: column.seoDescription,
    path: `/columns/${column.slug}`,
  });
}

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const column = getColumnBySlug(slug);
  if (!column) notFound();

  const breadcrumbItems = [
    { name: "英語コラム", path: "/columns" },
    { name: column.title, path: `/columns/${column.slug}` },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <JsonLd
        data={buildArticleJsonLd({
          headline: column.title,
          description: column.seoDescription,
          path: `/columns/${column.slug}`,
          datePublished: column.publishedAt,
          dateModified: column.publishedAt,
        })}
      />

      {/* Magazine cover — a distinct "paper" band for the issue's masthead + title,
          the same "give this section its own background" device DecisionCTA already
          uses elsewhere on the site, just tuned quiet/warm instead of dark/bold. */}
      <div className="bg-gradient-to-b from-indigo-50/70 via-white to-white">
        <div className="mx-auto max-w-2xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-[0.18em] text-indigo-500 uppercase">
            <span>AptiPass MAGAZINE</span>
            <span aria-hidden="true" className="text-indigo-200">
              /
            </span>
            <span>{column.series}</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <span>ISSUE {String(column.issueNumber).padStart(3, "0")}</span>
            <span aria-hidden="true">・</span>
            <span>{column.readingTimeMinutes} MIN READ</span>
          </div>
          <h1 className="mt-6 text-balance font-serif text-3xl leading-[1.3] font-bold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.25]">
            {column.title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
            {column.subtitle}
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-2xl px-4 pb-10 sm:px-6">
        <ColumnBody blocks={column.body} />

        {/* Editor's closing note — a quiet postscript, not another boxed card. */}
        <div className="mt-16 border-t border-slate-100 pt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            AptiPass English 編集部より
          </p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {column.editorNote.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Soft, non-affiliate internal link — inline text, not a CTA box. */}
        <p className="mt-8 text-sm text-slate-500">
          英会話を実際に練習してみたい人へ —{" "}
          <Link
            href={`/categories/${column.relatedCategorySlug}`}
            prefetch={false}
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            {column.relatedCategoryLabel}を見てみる
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </article>
    </>
  );
}
