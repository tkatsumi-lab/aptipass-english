#!/usr/bin/env node
/**
 * Site audit: crawls the site from a few seed pages and checks the things
 * that are easy to silently regress as content grows — duplicate metadata,
 * canonical host correctness, sitemap/crawl consistency, broken internal
 * links, and orphan pages.
 *
 * Usage:
 *   node scripts/site-audit.mjs                        # audits http://localhost:3000
 *   node scripts/site-audit.mjs https://english.aptipass.com
 *   SITE_URL=https://english.aptipass.com node scripts/site-audit.mjs
 *
 * Exits non-zero if any check fails, so it can be wired into CI later.
 */

const BASE = process.argv[2] || process.env.SITE_URL || "http://localhost:3000";
const EXPECTED_CANONICAL_HOST = new URL(BASE).hostname === "localhost" ? null : new URL(BASE).hostname;
const SEEDS = ["/", "/services", "/compare", "/guides", "/about", "/editorial-policy", "/advertising-policy", "/privacy", "/contact"];

const visited = new Map();
const linkedFrom = new Map();
const queue = [...SEEDS];

function normalize(href, base) {
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  let url;
  try {
    url = new URL(href, base);
  } catch {
    return null;
  }
  if (url.hostname !== new URL(BASE).hostname) return null; // external, not our concern here
  let path = url.pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.startsWith("/_next")) return null;
  return path;
}

while (queue.length > 0) {
  const path = queue.shift();
  if (visited.has(path)) continue;

  const res = await fetch(BASE + path, { redirect: "manual" });
  const html = res.status === 200 ? await res.text() : "";

  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const descMatch = html.match(/name="description" content="([^"]*)"/);
  const canonicalMatches = [...html.matchAll(/rel="canonical" href="([^"]*)"/g)];
  const h1Count = (html.match(/<h1[ >]/g) || []).length;
  const robotsMatch = html.match(/name="robots" content="([^"]*)"/);

  visited.set(path, {
    status: res.status,
    title: titleMatch?.[1] ?? null,
    description: descMatch?.[1] ?? null,
    canonicals: canonicalMatches.map((m) => m[1]),
    h1Count,
    noindex: !!(robotsMatch && robotsMatch[1].includes("noindex")),
  });

  if (res.status !== 200) continue;

  const seen = new Set();
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const p = normalize(m[1], BASE + path);
    if (!p || seen.has(p)) continue;
    seen.add(p);
    if (!linkedFrom.has(p)) linkedFrom.set(p, new Set());
    linkedFrom.get(p).add(path);
    if (!visited.has(p) && !queue.includes(p)) queue.push(p);
  }
}

let failures = 0;
function report(label, items, formatter = (x) => x) {
  const n = items.length;
  console.log(`${n === 0 ? "OK" : "FAIL"}  ${label}: ${n}`);
  if (n > 0) {
    failures += n;
    for (const item of items) console.log(`   - ${formatter(item)}`);
  }
}

const pages = [...visited.entries()];
const htmlPages = pages.filter(([p]) => !p.startsWith("/favicon"));
const okPages = htmlPages.filter(([, v]) => v.status === 200);
const indexablePages = okPages.filter(([, v]) => !v.noindex);

console.log(`Site audit: ${BASE}`);
console.log(`Crawled ${pages.length} URLs (${okPages.length} pages, ${indexablePages.length} indexable)\n`);

report(
  "Broken internal links (non-200)",
  htmlPages.filter(([, v]) => v.status !== 200),
  ([p, v]) => `${v.status} ${p} (linked from: ${[...(linkedFrom.get(p) || [])].slice(0, 3).join(", ")})`,
);

const titleCounts = new Map();
for (const [p, v] of okPages) {
  if (!v.title) continue;
  (titleCounts.get(v.title) ?? titleCounts.set(v.title, []).get(v.title)).push(p);
}
report(
  "Duplicate titles",
  [...titleCounts.entries()].filter(([, ps]) => ps.length > 1),
  ([t, ps]) => `"${t}" -> ${ps.join(", ")}`,
);

const descCounts = new Map();
for (const [p, v] of okPages) {
  if (!v.description) continue;
  (descCounts.get(v.description) ?? descCounts.set(v.description, []).get(v.description)).push(p);
}
report(
  "Duplicate descriptions",
  [...descCounts.entries()].filter(([, ps]) => ps.length > 1),
  ([d, ps]) => `"${d.slice(0, 40)}..." -> ${ps.join(", ")}`,
);

report(
  "Missing title/description",
  okPages.filter(([, v]) => !v.title || !v.description),
  ([p]) => p,
);

report(
  "Missing canonical",
  okPages.filter(([, v]) => v.canonicals.length === 0),
  ([p]) => p,
);

report(
  "Multiple canonical tags on one page",
  okPages.filter(([, v]) => v.canonicals.length > 1),
  ([p, v]) => `${p} -> ${v.canonicals.join(" | ")}`,
);

if (EXPECTED_CANONICAL_HOST) {
  report(
    `Canonical not pointing to https://${EXPECTED_CANONICAL_HOST}`,
    okPages.filter(([, v]) => v.canonicals.length > 0 && !v.canonicals.every((c) => c.startsWith(`https://${EXPECTED_CANONICAL_HOST}`))),
    ([p, v]) => `${p} -> ${v.canonicals.join(" | ")}`,
  );
}

report(
  "H1 count != 1",
  okPages.filter(([, v]) => v.h1Count !== 1),
  ([p, v]) => `${p} -> h1=${v.h1Count}`,
);

// Sitemap consistency
try {
  const sitemapRes = await fetch(BASE + "/sitemap.xml");
  if (sitemapRes.ok) {
    const sitemapXml = await sitemapRes.text();
    const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => {
      const u = new URL(m[1]);
      let p = u.pathname;
      if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
      return p === "" ? "/" : p;
    });
    const sitemapSet = new Set(sitemapUrls);
    const indexableSet = new Set(indexablePages.map(([p]) => p));

    report(
      "In sitemap but not a discovered indexable page (extra)",
      [...sitemapSet].filter((p) => !indexableSet.has(p)),
      (p) => p,
    );
    report(
      "Discovered indexable page missing from sitemap",
      [...indexableSet].filter((p) => !sitemapSet.has(p)),
      (p) => p,
    );
    const dupCounts = new Map();
    for (const u of sitemapUrls) dupCounts.set(u, (dupCounts.get(u) ?? 0) + 1);
    report(
      "Duplicate URLs within sitemap.xml",
      [...dupCounts.entries()].filter(([, c]) => c > 1),
      ([u, c]) => `${u} (x${c})`,
    );
  } else {
    console.log(`FAIL  sitemap.xml did not return 200 (got ${sitemapRes.status})`);
    failures++;
  }
} catch (e) {
  console.log(`FAIL  Could not fetch/parse sitemap.xml: ${e}`);
  failures++;
}

// Orphan pages: any page in sitemap that the crawler never reached via links
// from the seeds is implicitly caught by the "missing from sitemap" check
// above combined with the fact the crawler only knows about linked pages.

console.log(`\n${failures === 0 ? "PASS" : "FAIL"} — ${failures} issue(s) found`);
process.exit(failures === 0 ? 0 : 1);
