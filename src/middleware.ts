import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Gates every /admin/* route behind HTTP Basic Auth. This is the only
 * dynamic (non-prerendered) part of the site, and the only place
 * ADMIN_USERNAME / ADMIN_PASSWORD are read — set them as real Cloudflare
 * Worker secrets in production (`wrangler secret put ADMIN_USERNAME` /
 * `wrangler secret put ADMIN_PASSWORD`) and in `.dev.vars` (gitignored)
 * for local testing. Never hardcode a value here.
 *
 * Fails closed: if the secrets aren't configured at all, every /admin/*
 * request gets a 503 rather than being let through unauthenticated.
 *
 * `wrangler.jsonc`'s `assets.run_worker_first` includes `/admin/*` so
 * these requests always reach this middleware instead of potentially
 * being served directly from Workers Static Assets.
 */
export async function middleware(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  // ADMIN_USERNAME/ADMIN_PASSWORD are secrets, not `vars` in wrangler.jsonc,
  // so `wrangler types` has no way to know about them — cast rather than
  // widen the shared CloudflareEnv interface for two admin-only secrets.
  const secrets = env as unknown as Record<string, string | undefined>;
  const expectedUser = secrets.ADMIN_USERNAME;
  const expectedPass = secrets.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return new NextResponse("Admin console is not configured.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const encoded = authHeader.slice("Basic ".length);
    try {
      const decoded = atob(encoded);
      const separator = decoded.indexOf(":");
      const user = separator === -1 ? decoded : decoded.slice(0, separator);
      const pass = separator === -1 ? "" : decoded.slice(separator + 1);
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    } catch {
      // Malformed header — fall through to 401 below.
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="AptiPass English Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
