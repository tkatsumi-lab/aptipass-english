"use client";

import { resolveCta } from "@/lib/ctaResolver";
import { track, AnalyticsEvent } from "@/lib/analytics";
import type { Service } from "@/data/services";
import type { Category } from "@/data/categories";

type ServiceCtaLinkProps = {
  service: Service;
  primaryCategory: Category;
};

export default function ServiceCtaLink({ service, primaryCategory }: ServiceCtaLinkProps) {
  const cta = resolveCta(service);
  if (!cta) return null;

  function handleClick() {
    if (!cta) return;
    track(AnalyticsEvent.SERVICE_CTA_CLICK, { service_id: service.id, cta_type: cta.type });
    track(
      cta.type === "affiliate" ? AnalyticsEvent.AFFILIATE_CTA_CLICK : AnalyticsEvent.OFFICIAL_CTA_CLICK,
      { service_id: service.id },
    );
  }

  return (
    <div className="mt-6">
      <a
        href={cta.url}
        target="_blank"
        rel={cta.rel}
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 ${primaryCategory.gradient}`}
      >
        {cta.type === "affiliate" ? cta.label : "公式サイトを見る"}
        <span aria-hidden="true">↗</span>
      </a>

      {cta.type === "affiliate" && (
        <>
          <p className="mt-2 text-xs text-slate-400">
            このリンクには広告（アフィリエイトリンク）が含まれます。詳しくは
            <a href="/advertising-policy" className="underline hover:text-slate-600">
              広告・Affiliateについて
            </a>
            をご覧ください。
          </p>
          {cta.trackingPixelUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- ASP conversion pixel, must be a plain <img>
            <img
              src={cta.trackingPixelUrl}
              alt=""
              width={1}
              height={1}
              aria-hidden="true"
              className="hidden"
            />
          )}
        </>
      )}
    </div>
  );
}
