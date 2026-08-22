import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ColumnBody from "@/components/ColumnBody";
import ColumnHero from "@/components/ColumnHero";
import JsonLd from "@/components/JsonLd";
import { columns, getColumnBySlug, getSeriesAnchorId, seriesInfo } from "@/data/columns";
import { SERIES_ACCENTS } from "@/lib/seriesAccent";
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

  const presentation = seriesInfo[column.series];
  const a = SERIES_ACCENTS[presentation.accent];

  // /columns is AptiPass MAGAZINE's Editorial Hub over 3 independent
  // series, not a "英語コラム list" — so every article's breadcrumb trail
  // points at the Hub under the brand name, not one series' name.
  const breadcrumbItems = [
    { name: "AptiPass MAGAZINE", path: "/columns" },
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

      <ColumnHero column={column} />

      <article className="mx-auto max-w-2xl px-4 pb-10 sm:px-6">
        <ColumnBody blocks={column.body} accent={presentation.accent} density={presentation.density} />

        {column.illustration?.placement === "inline" && (
          <div className="mt-10">
            <Image
              src={column.illustration.src}
              alt={column.illustration.alt}
              width={column.illustration.width}
              height={column.illustration.height}
              className="h-auto w-full max-w-sm"
            />
            {column.illustration.caption && (
              <p className="mt-2 text-xs text-slate-400">{column.illustration.caption}</p>
            )}
          </div>
        )}

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
            className={`font-semibold ${a.link} ${a.linkHoverSelf}`}
          >
            {column.relatedCategoryLabel}を見てみる
            <span aria-hidden="true">→</span>
          </Link>
        </p>

        {/* Back to this series' section on the Hub, and to the Hub itself — no dedicated per-series URL, just an anchor on /columns. */}
        <p className="mt-3 text-sm text-slate-500">
          <Link
            href={`/columns#${getSeriesAnchorId(column.series)}`}
            prefetch={false}
            className={`font-semibold ${a.link} ${a.linkHoverSelf}`}
          >
            {column.series}の記事一覧へ
            <span aria-hidden="true">→</span>
          </Link>
        </p>
        <p className="mt-3 text-sm text-slate-500">
          <Link href="/columns" prefetch={false} className={`font-semibold ${a.link} ${a.linkHoverSelf}`}>
            AptiPass MAGAZINEへ戻る
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </article>
    </>
  );
}
