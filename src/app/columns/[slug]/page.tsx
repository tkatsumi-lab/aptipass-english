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

      <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 ring-1 ring-rose-200">
          <span aria-hidden="true">{column.emoji}</span>
          英語コラム
        </span>

        <h1 className="mt-4 text-2xl font-bold text-balance text-slate-900 sm:text-3xl">
          {column.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
          {column.subtitle}
        </p>

        <ColumnBody blocks={column.body} />

        {/* Editor's closing note — visually separate from the main narrative body. */}
        <div className="mt-12 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-100 sm:p-8">
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
            AptiPass English 編集部より
          </p>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {column.editorNote.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Soft, non-affiliate internal link — deliberately not a service CTA. */}
        <div className="mt-6 flex flex-col items-start gap-2 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">英会話を実際に練習してみたい人へ</p>
          <Link
            href={`/categories/${column.relatedCategorySlug}`}
            prefetch={false}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {column.relatedCategoryLabel}を見てみる
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </>
  );
}
