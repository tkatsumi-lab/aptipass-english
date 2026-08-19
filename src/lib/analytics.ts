/**
 * Analytics Foundation, wired to AptiPass English's own GA4 property
 * (gtag.js, loaded directly — no GTM container, no other analytics
 * library). This is a separate GA4 property from aptipass.com's; nothing
 * here touches that project's code or measurement.
 *
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` (see `.env.production` and
 * `src/app/layout.tsx`) is a build-time value — this whole site is static
 * (`next build`/`opennextjs-cloudflare build`), so it is baked into the
 * prerendered HTML, not read at Workers request time. It is not a secret:
 * a GA4 Measurement ID is inherently public (visible in every page's
 * source), so committing `.env.production` is intentional, not an
 * oversight.
 *
 * `track()` calls `window.gtag('event', name, params)` — the same
 * function the inline gtag.js snippet in layout.tsx defines on `window`.
 * This is deliberately NOT a plain `dataLayer.push({event, ...})`: that
 * GTM-container convention is not what bare gtag.js (no GTM container on
 * this page) listens for, so events pushed that way would silently never
 * reach GA4. If `window.gtag` doesn't exist (ID unset, script blocked,
 * or not yet loaded), this is a harmless no-op.
 *
 * GA4 Enhanced Measurement (scroll, outbound click, site search, video
 * engagement, file download, form interaction, and automatic SPA
 * page_view via History API changes) is untouched by this file — it's
 * gtag.js's own built-in behavior once the base snippet runs, and none of
 * these custom events share a name with it. Notably, clicking an
 * affiliate/official CTA also fires GA4's own generic `click` (outbound)
 * event from Enhanced Measurement; that's expected and is a distinct
 * event name from `affiliate_cta_click`/`official_cta_click` below, so
 * the two never merge or get confused in reports — the custom event adds
 * business-specific detail (service_id, cta_type) Enhanced Measurement's
 * generic click doesn't carry.
 *
 * Only page-level view events that already have a live page to attach to
 * are implemented (`service_view`). The same one-line pattern
 * (`ServiceViewTracker`) extends directly to `category_view` / `goal_view`
 * / `compare_view` / `guide_view` when those are actually wanted — not
 * added now to avoid touching pages this task doesn't need to touch.
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
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEventName, params: Record<string, string> = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return; // gtag.js not loaded — safe no-op
  window.gtag("event", event, params);
}
