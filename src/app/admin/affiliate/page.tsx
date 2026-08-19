import type { Metadata } from "next";
import AffiliateConsole from "@/components/admin/AffiliateConsole";
import { affiliatePrograms } from "@/data/affiliateRegistry";
import { buildAdminAffiliateRows, buildAdminAffiliateSummary } from "@/lib/adminAffiliateView";

// Never statically prerendered — this must always be handled live by the
// Worker (which runs src/middleware.ts's Basic Auth check) rather than
// producing a static HTML file that Workers Static Assets could serve
// directly. See wrangler.jsonc's assets.run_worker_first for the second
// layer of the same guarantee.
export const dynamic = "force-dynamic";

// Deliberately not using buildMetadata() from @/lib/seo: this page must
// never carry a canonical pointing at english.aptipass.com, must never be
// indexable under any circumstance, and isn't part of the public IA.
export const metadata: Metadata = {
  title: "Affiliate Management Console",
  description: "Internal admin tool. Not part of the public site.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminAffiliatePage() {
  const rows = buildAdminAffiliateRows();
  const summary = buildAdminAffiliateSummary(rows);
  const registryJson = JSON.stringify(affiliatePrograms, null, 2);

  return (
    <div className="min-h-full bg-slate-50">
      <AffiliateConsole rows={rows} summary={summary} registryJson={registryJson} />
    </div>
  );
}
