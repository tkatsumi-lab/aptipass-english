import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DecisionCTA from "@/components/DecisionCTA";
import JsonLd from "@/components/JsonLd";
import { getGuideBySlug, guides, type RelatedLink } from "@/data/guides";
import { buildArticleJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

const GUIDE_PUBLISHED_AT = "2026-08-18";

const relatedLinkPathPrefix: Record<RelatedLink["type"], string> = {
  category: "/categories",
  goal: "/goals",
  service: "/services",
  compare: "/compare",
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return buildMetadata({
    title: `${guide.title} | AptiPass English`,
    description: guide.teaser,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const breadcrumbItems = [{ name: guide.title, path: `/guides/${guide.slug}` }];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <JsonLd
        data={buildArticleJsonLd({
          headline: guide.title,
          description: guide.teaser,
          path: `/guides/${guide.slug}`,
          datePublished: GUIDE_PUBLISHED_AT,
          dateModified: GUIDE_PUBLISHED_AT,
        })}
      />

      <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <span className="text-3xl" aria-hidden="true">
          {guide.emoji}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          {guide.title}
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">{guide.teaser}</p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          {guide.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {guide.relatedLinks.length > 0 && (
          <div className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-900">関連ページ</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {guide.relatedLinks.map((link) => (
                <li key={`${link.type}-${link.slug}`}>
                  <Link
                    href={`${relatedLinkPathPrefix[link.type]}/${link.slug}`}
                    prefetch={false}
                    className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                  >
                    {link.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      <DecisionCTA />
    </>
  );
}
