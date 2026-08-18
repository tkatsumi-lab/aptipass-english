import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// This site is fully static: every route uses generateStaticParams with
// dynamicParams = false (see docs/architecture.md), so there is no ISR/
// revalidation to support. staticAssetsIncrementalCache serves prerendered
// pages straight from Workers Static Assets — no R2/KV binding needed.
// Without this, dynamic ([slug]) routes 404 in the Workers runtime because
// the default cache has nothing to read from (see docs/architecture.md's
// "Cloudflare caching" note).
export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
	enableCacheInterception: true,
});
