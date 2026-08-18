/**
 * Analytics Foundation. No analytics provider is wired up yet — this file
 * defines the event vocabulary and a safe no-op `track()` so instrumentation
 * can be added throughout the app now, before any provider ID exists.
 *
 * Wiring a real provider later means only touching this file: push events
 * into `window.dataLayer` (GA4/GTM-compatible) when
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (see `src/app/layout.tsx`, which
 * only renders the gtag.js script tag when that env var exists — no ID is
 * hardcoded or guessed here). Until that env var is set in the deployment
 * environment, `track()` is a harmless no-op.
 */
export const AnalyticsEvent = {
  SERVICE_VIEW: "service_view",
  SERVICE_CTA_CLICK: "service_cta_click",
  AFFILIATE_CTA_CLICK: "affiliate_cta_click",
  OFFICIAL_CTA_CLICK: "official_cta_click",
  COMPARE_SERVICE_CLICK: "compare_service_click",
  DECISION_CTA_CLICK: "decision_cta_click",
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEventName, params: Record<string, string> = {}): void {
  if (typeof window === "undefined") return;
  if (!window.dataLayer) return; // no provider configured — safe no-op
  window.dataLayer.push({ event, ...params });
}
