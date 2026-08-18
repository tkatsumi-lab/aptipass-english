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

The `DecisionCTA` component is a placeholder (`href="#"`) on every
major page. It intentionally does not link to a guessed
`aptipass.com` URL — wire it up once the real Decision Engine endpoint
for AptiPass English is confirmed.
