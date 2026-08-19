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
