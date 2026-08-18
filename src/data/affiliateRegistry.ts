/**
 * Central Affiliate Registry. This is the ONLY place affiliate URLs are
 * allowed to live — never hardcode an affiliate/ASP URL into a Service
 * record or a page. `src/lib/ctaResolver.ts` reads this registry to decide
 * what a service's outbound CTA should point to.
 *
 * Registering a Service in `services.ts` never implies an affiliate
 * relationship. A program is only added here when it has been verified by
 * the site operator (not guessed or assumed from a sister project's own
 * account) — see each entry's `notes`.
 */
export type AffiliateProviderStatus =
  | "AFFILIATED"
  | "PENDING"
  | "AVAILABLE_NOT_APPLIED"
  | "NOT_FOUND"
  | "UNKNOWN";

export type AffiliateProgram = {
  /** Matches Service.id in services.ts. A program is scoped to one exact
   * service/product — not to a brand in general (see QQキッズ note below). */
  serviceId: string;
  provider: string;
  programName: string;
  status: AffiliateProviderStatus;
  /** Real outbound tracking URL. Only set once a program is human-verified as approved. */
  destinationUrl: string | null;
  /** 1x1 conversion tracking pixel required by some ASPs (e.g. A8.net). */
  trackingPixelUrl: string | null;
  /** Approved ad creative text, when the ASP provides one. */
  linkText: string | null;
  lastVerifiedAt: string | null;
  notes: string;
};

export const affiliateRegistry: AffiliateProgram[] = [
  {
    serviceId: "qq-kids",
    provider: "A8",
    programName: "【QQキッズ】こども専用オンライン英会話",
    status: "AFFILIATED",
    destinationUrl: "https://px.a8.net/svt/ejp?a8mat=4BA8P9+YJ7EQ+4HHM+66H9E",
    trackingPixelUrl: "https://www14.a8.net/0.gif?a8mat=4BA8P9+YJ7EQ+4HHM+66H9E",
    linkText: "【QQキッズ】こども専用オンライン英会話",
    lastVerifiedAt: "2026-08-18",
    notes:
      "運営者からA8.netの公式広告素材（テキストリンク＋計測用1x1ピクセル）を提供された、Human Verified Fact。この programName の対象は「QQキッズ」（4歳〜中学生向けの子ども専門サービス、Service ID: qq-kids）のみであり、成人向け一般サービス「QQEnglish」（Service ID: qqenglish）には適用しない。両者はAptiPass English内でも別Serviceとして登録されている。",
  },
];

export function getAffiliateProgram(serviceId: string): AffiliateProgram | undefined {
  return affiliateRegistry.find((p) => p.serviceId === serviceId && p.status === "AFFILIATED");
}
