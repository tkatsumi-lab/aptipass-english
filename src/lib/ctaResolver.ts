import type { HTMLAttributeReferrerPolicy } from "react";
import { getLiveProgram } from "@/data/affiliateRegistry";
import type { Service } from "@/data/services";

export type ResolvedCta = {
  type: "affiliate" | "official";
  url: string;
  label: string;
  rel: string;
  /** A8-style 1x1 conversion pixel to render alongside an affiliate link, if required. */
  trackingPixelUrl: string | null;
  /** Some ASPs (e.g. AccessTrade) specify this on their ad tag — see AffiliateProgram.referrerPolicy. */
  referrerPolicy: HTMLAttributeReferrerPolicy | null;
};

/**
 * Service -> outbound CTA, in one place. Affiliate Registry status is
 * checked first; if (and only if) there's a Program marked
 * `affiliateImplemented` with a real URL, that's used — a Program that's
 * merely APPROVED (or any other pre-live status) never leaks into the
 * live CTA. Otherwise this always falls back to the service's own
 * official URL. Nothing here reads ranking, "featured" status, or any
 * other User Fit signal — availability of an affiliate link never
 * changes whether/how a service is recommended, only where its own CTA
 * points.
 */
export function resolveCta(service: Service): ResolvedCta | null {
  const program = getLiveProgram(service.id);

  if (program && program.affiliateUrl) {
    return {
      type: "affiliate",
      url: program.affiliateUrl,
      label: program.linkText ?? `${service.name}の公式サイトを見る`,
      rel: "sponsored nofollow noopener",
      trackingPixelUrl: program.trackingPixelUrl,
      referrerPolicy: program.referrerPolicy ?? null,
    };
  }

  if (service.officialUrl) {
    return {
      type: "official",
      url: service.officialUrl,
      label: "公式サイトを見る",
      rel: "noopener noreferrer",
      trackingPixelUrl: null,
      referrerPolicy: null,
    };
  }

  return null;
}
