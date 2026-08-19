import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { buildWebSiteJsonLd } from "@/lib/seo";

// AptiPass English's own GA4 property (separate from aptipass.com's).
// NEXT_PUBLIC_GA_MEASUREMENT_ID comes from .env.production — see
// src/lib/analytics.ts for why this is a build-time value, not a Workers
// runtime binding, and why committing that file is intentional (a GA4
// Measurement ID isn't a secret). The `if (GA_MEASUREMENT_ID)` guard is
// kept so the site still builds/runs correctly if it's ever unset.
//
// strategy="beforeInteractive" (not the docs' default "afterInteractive")
// is deliberate: afterInteractive scripts are injected client-side only,
// after hydration — they never appear as a literal <script> tag in the
// server-rendered HTML at all. That makes real event delivery depend on
// hydration completing with no errors, which isn't verifiable by
// inspecting HTML and was traced as the actual cause of GA4 showing zero
// traffic despite the Measurement ID being present in the page source.
// beforeInteractive is injected directly into <head> from the server —
// see https://nextjs.org/docs/app/api-reference/components/script — so
// the tag loads independently of hydration succeeding.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Cloudflare Web Analytics (separate, independent measurement system from
// GA4 above — its own beacon endpoint, no shared dataLayer/gtag, so there
// is no double-counting risk between the two). Same beforeInteractive +
// root-layout placement as GA4, for the same reason: this must appear as
// a literal <script> tag in the server-rendered HTML to be verifiable and
// to not depend on hydration completing. NEXT_PUBLIC_CF_BEACON_TOKEN is a
// build-time value baked into the static HTML — see .env.production.
//
// Loads on every route rendered under this root layout, including
// /admin/affiliate: excluding it would require either broadening
// middleware.ts's matcher (currently scoped to /admin/:path* only) to
// inject a pathname header, or restructuring the whole app into route
// groups — both are site-wide changes disproportionate to excluding one
// internal page from analytics. GA4 already has this same characteristic
// today, so this doesn't introduce a new gap.
const CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://english.aptipass.com"),
  title: "英語学習サービスを比較・探す | AptiPass English",
  description:
    "オンライン英会話、AI英会話、英語学習アプリなどを目的や特徴から比較できる英語学習サービス情報サイト。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="beforeInteractive"
            />
            <Script id="ga-init" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        {CF_BEACON_TOKEN && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="beforeInteractive"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        )}
        <JsonLd data={buildWebSiteJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-blue-700 focus:shadow-lg"
        >
          メインコンテンツへスキップ
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
