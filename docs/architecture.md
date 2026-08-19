# AptiPass English — Site Architecture

This document records the Information Architecture and content rules
established in Phase 0.3 ("Production UX/SEO Foundation") and extended
in Phase 0.4 ("Full Service Universe Expansion"). Treat it as the
source of truth when adding pages or data — don't restructure the IA
without updating this file. See also `docs/market-coverage.md` for the
service research log (what's registered, rejected, or still a gap).

## Site Architecture

```
/                         Home (Hero → Category → Goal → Featured Services →
                           Comparison → Decision CTA → Guide)
/services                 Service list (client-side category + keyword filter)
/services/[slug]          Service detail
/categories/[slug]        Category hub (no bare /categories index — reached via Home)
/goals/[slug]              Goal hub (no bare /goals index — reached via Home)
/compare                  Compare index
/compare/[slug]           Compare detail (2 services, condition-based, no winner)
/guides                   Guide list
/guides/[slug]             Guide detail (short, 3-minute read)
/about                    Operator info, research/inclusion/ranking/affiliate policy
```

Every dynamic route uses `generateStaticParams` + `dynamicParams = false`,
so an unknown slug is a real 404, not an empty 200 page.

A category or goal page renders even when it currently has zero matching
services (honest "not listed yet" state) — see `isCategoryIndexable` /
`isGoalIndexable` in `src/lib/content.ts`. Those thin pages are kept out
of the sitemap and marked `noindex, follow` until they have at least one
real service, so the full taxonomy stays navigable without polluting
search results with empty hubs. As of Phase 0.4, all 8 categories and
all 12 goals have at least one registered service, so this state is
currently unused in practice — it stays in place for when new,
still-empty categories/goals get added.

## Service Discovery UX

`/services` renders `ServiceFilterList` (`src/components/ServiceFilterList.tsx`,
a client component): category chip toggles (OR logic) + a keyword text
input, both filtering the already-fetched service array in the browser.
No query params are used and no filter-combination URLs are generated —
this keeps `/services` a single indexable URL rather than spawning an
indexable "page per filter" problem. Category/Goal hub pages that list
more than 6 services render `ServiceCard` in `compact` mode to avoid a
long single-column scroll on mobile.

## URL Rules

- Lowercase, hyphen-separated, no query params, no dates/numbers.
- `/services/[slug]` uses the service's own slug (e.g. `nativecamp`).
- `/categories/[slug]` and `/goals/[slug]` use stable English slugs
  (e.g. `online-eikaiwa`, `business-english`) — independent of the
  Japanese display name so URLs don't change if copy changes.
- `/compare/[slug]` uses `a-vs-b` (e.g. `nativecamp-vs-cambly`).
- Do not create filter/query-param URLs (e.g. `?category=...`) as
  indexable pages. If a filter UI is added later, keep it client-side
  or `noindex` it.

## SEO Rules

- Every page sets its own unique `title`, `description`, and
  `alternates.canonical` via `buildMetadata()` in `src/lib/seo.ts`.
- `canonical` is always an `english.aptipass.com` self-URL. Never point
  it at `aptipass.com`.
- `metadataBase` (root layout) stays `https://english.aptipass.com`.
- Structured data is limited to what the content actually supports:
  `WebSite` (site-wide, in the root layout), `BreadcrumbList` (via the
  `Breadcrumb` component — don't also emit it manually on a page, it's
  already included), `ItemList` (service/guide/compare listings), and
  `Article` (Guide detail pages only). Never add `Review`,
  `AggregateRating`, `FAQPage`, or price/offer schema without verified
  source data.
- `robots.ts` and `sitemap.ts` are data-driven (`src/app/sitemap.ts`
  reads from `src/data/*` + `getIndexableCategories/Goals`). When you
  add a service/category/goal/guide/compare entry, the sitemap picks it
  up automatically — don't hand-list URLs.
- One `<h1>` per page. Section headings are `<h2>`/`<h3>`, chosen for
  meaning, not visual size.

## Service Data Model (`src/data/services.ts`)

Production-shaped but prototype-scale. Key rule: **unconfirmed facts
are `null`/empty, never guessed.** No price, review score, user count,
campaign, or "No.1"-style claim is stored anywhere in this model —
those require a live, dated primary-source check this project doesn't
maintain. `pricingModel` and `trialAvailability` are deliberately coarse
categories (subscription/freemium/... , yes/no/unknown) rather than
numbers, so the UI never has to display — or silently go stale on — an
exact yen figure.

`evidenceStatus` is a 3-tier system:
- `verified` — confirmed directly against a primary source (official
  site/app store) this session, or reused from AptiPass Decision
  Engine's Service Intelligence, which itself cites a primary-source
  check.
- `partial` — the official URL is confirmed, but supporting facts leaned
  on third-party aggregator/review content rather than a direct
  primary-source read.
- `unconfirmed` — not checked; fields stay `null`/empty.

`lastVerifiedAt` records when a fact was last checked/reused, per
`docs/market-coverage.md`'s sourcing notes.

`categories` is an array (a service can belong to more than one
category); the first entry is the "primary" category used for avatar
color / badge emphasis. `examSupport` records specific exams
(`"TOEIC"`, `"英検"`, ...) only where evidenced — used by the `eiken`
goal filter (see below).

## Category / Goal Model

- Categories (`src/data/categories.ts`) are "what" a service is
  (オンライン英会話, AI英会話, ...). Goals (`src/data/goals.ts`) are
  "what the user wants" (とにかく話せるようになりたい, ...). Keep
  these separate — don't collapse Goals into Categories.
- A Goal's related services are **computed**, not hand-listed:
  `getServicesForGoal()` unions the services of its
  `relatedCategoryIds`. Adding a service to a category automatically
  surfaces it on every Goal that references that category.
- A few goals describe a condition that cuts across categories rather
  than "belongs to category X" (`eiken`, `native-teacher`,
  `beginner-friendly`, `budget-conscious`). Those are handled by
  `goalFilters` in `goals.ts` — a predicate over already-evidenced
  `Service` fields (`examSupport`, `teacherType`, `notFor` text,
  `pricingModel`/`trialAvailability`). `budget-conscious` has an empty
  `relatedCategoryIds` on purpose, meaning "cross-cutting — draw the
  candidate pool from every service, then filter."  Don't add a new
  unverified boolean field just to power one goal filter — check
  whether an existing field can express it first.
- Both models carry `comparisonPoints` / `comparisonAxes` — the axes
  that matter for that category/goal — used to drive the "重要な比較
  ポイント" block instead of prose.

## Affiliate Separation Rule

`affiliateStatus` (`none | pending | active | unavailable`) and
`affiliateUrl` live on the Service record, but **nothing in this
codebase sorts or filters services by affiliate status.** Listing order
is always the natural data order. When affiliate links are connected
later:

- Only render an affiliate CTA when `affiliateUrl` is non-null (see
  `services/[slug]/page.tsx`) — never fall back to a fake/placeholder
  affiliate link.
- Do not let `affiliateStatus` influence which services appear first,
  which are "featured", or comparison outcomes. This mirrors the
  AptiPass Decision Engine doctrine: monetization is decided after user
  fit, never before.
- This rule is stated to end users on `/about` (`affiliate-policy` /
  `inclusion-policy` sections). If this rule ever changes, `/about` must
  be updated in the same change — don't let the code and the public
  policy statement drift apart.

## Decision Engine Handoff

`DecisionCTA` links to `https://aptipass.com/english-learning/find-your-english-learning-method`
(Phase 0.5). This was found by reading `ai-decision-engine`'s own
generated-content route list (`src/lib/content/generated/registry.ts`,
`(public)/[category]/[slug]` routing) read-only, then confirmed live
with a plain `curl` — not guessed. If this URL ever 404s, don't
substitute a guessed replacement; re-derive it the same way (read-only)
or fall back to `href="#"` and flag it.

## Affiliate Registry & CTA Resolver

`src/data/affiliateRegistry.ts` is the **only** place an affiliate
(ASP) URL is allowed to appear. `src/lib/ctaResolver.ts` reads it and
decides a service's outbound CTA: an `AFFILIATED` program with a real
`destinationUrl` wins, otherwise it always falls back to the service's
`officialUrl`. Registering a `Service` never implies an affiliate
relationship — a program is added only once verified by the site
operator (see each entry's `notes`).

A program is scoped to one exact `serviceId`, not a brand. E.g. the
A8 program for QQキッズ (`qq-kids`) does **not** apply to QQEnglish
(`qqenglish`) even though the same company runs both — they're
different Service records for a reason. When adding a new affiliate
program, double-check which exact Service the ad creative is actually
for before wiring it up.

`src/components/ServiceCtaLink.tsx` renders the resolved CTA, the
`rel="sponsored nofollow noopener"` attribute, the required disclosure
line, and (for A8) the 1x1 tracking pixel — all three only when the
resolved type is `"affiliate"`. Don't render any of those for an
official-only CTA.

## Analytics (GA4)

Live: AptiPass English has its own GA4 property, `G-UEQ9L0P5NN`,
separate from aptipass.com's. gtag.js is loaded directly in
`src/app/layout.tsx` (`next/script`, `strategy="afterInteractive"`,
Google's own base snippet — no GTM container, no `@next/third-parties`
or other added dependency).

`NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in `.env.production`
(**intentionally committed** — a GA4 Measurement ID isn't a secret,
it's visible in every page's HTML source anyway). This is a
**build-time** value: the whole site is static
(`next build`/`opennextjs-cloudflare build`), so it's baked into the
prerendered HTML rather than read per-request by the Worker — a
`vars` entry in `wrangler.jsonc` would *not* work for this. If the ID
ever needs to change, edit `.env.production` and redeploy; don't add a
Workers runtime binding for it.

`src/lib/analytics.ts` defines the event vocabulary (`service_view`,
`service_cta_click`, `affiliate_cta_click`, `official_cta_click`,
`compare_service_click`, `decision_cta_click`) and `track()`, which
calls `window.gtag('event', name, params)` — **not**
`dataLayer.push({event, ...})` (that's the GTM-container convention;
bare gtag.js on this page doesn't listen for it). `track()` no-ops
safely if `window.gtag` isn't defined.

GA4 Enhanced Measurement (scroll, outbound click, site search, video
engagement, file download, form interaction, and automatic SPA
`page_view` via History API changes) is left at its default — nothing
here sets `send_page_view: false` or otherwise touches it. Do not add
a manual `page_view` call on route change; Enhanced Measurement's own
History-based tracking already covers Next.js App Router navigation,
and adding a second mechanism would double-count. An affiliate/official
CTA click also fires GA4's generic `click` (outbound) event from
Enhanced Measurement alongside the custom `affiliate_cta_click`/
`official_cta_click` — that's expected, and the two never merge since
they're different event names.

Only `service_view` is wired to a live page. The same
`ServiceViewTracker` one-line pattern extends directly to
`category_view`/`goal_view`/`compare_view`/`guide_view` if those are
ever wanted — don't add them speculatively.

## Cloudflare Caching — read before touching `open-next.config.ts`

This site is 100% static (`dynamicParams = false` + a complete
`generateStaticParams` on every dynamic route — see Site Architecture
above). `open-next.config.ts` therefore uses
`staticAssetsIncrementalCache` (serves prerendered pages straight from
Workers Static Assets, no R2/KV binding) with `enableCacheInterception:
true`.

**This is not optional.** Without an incremental cache configured at
all, every `generateStaticParams` route (`/services/[slug]`,
`/categories/[slug]`, `/goals/[slug]`, `/compare/[slug]`,
`/guides/[slug]` — the large majority of the site) returns a silent
404 under the real Workers runtime (`wrangler dev` / `preview` /
production), even though `npm run dev` and `npm run build` both look
completely fine. This was caught in Phase 0.5 by actually curling
dynamic routes through `opennextjs-cloudflare preview` — checking only
`npm run dev`/`npm run build` does **not** catch this class of bug.
Also note the cache only takes effect once populated: `preview` and
`deploy` both call `populateCache` automatically (copies
`.open-next/cache` → `.open-next/assets/cdn-cgi/_next_cache`), but a
bare `opennextjs-cloudflare build` does not — always verify through
`preview`, not just `build`, before deploying.

If this project ever needs real ISR/on-demand revalidation, switch to
`r2IncrementalCache` (see the OpenNext Cloudflare caching docs) — but
that's a deliberate architecture change, not a drop-in swap.

## Site Audit Script

`scripts/site-audit.mjs` (`npm run audit` for localhost, `npm run
audit:prod` for `https://english.aptipass.com`) crawls the site from
its main entry points and checks the regressions that are easy to miss
as content grows: duplicate title/description, missing/wrong-host
canonical, H1 count, broken internal links, and sitemap↔crawl
consistency (pages missing from the sitemap, stale/extra sitemap
entries, duplicate sitemap URLs). It exits non-zero on any failure.
Run it after any change that touches routing, metadata, or the
service/category/goal/compare/guide data — and definitely before
deploying a batch of new content.
