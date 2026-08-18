import type { Metadata } from "next";
import CategoryGrid from "@/components/CategoryGrid";
import ComparisonPreview from "@/components/ComparisonPreview";
import DecisionCTA from "@/components/DecisionCTA";
import FeaturedServices from "@/components/FeaturedServices";
import GuideCards from "@/components/GuideCards";
import Hero from "@/components/Hero";
import PurposeSection from "@/components/PurposeSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "英語学習サービスを比較・探す | AptiPass English",
  description:
    "オンライン英会話、AI英会話、英語学習アプリなどを目的や特徴から比較できる英語学習サービス情報サイト。",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <PurposeSection />
      <FeaturedServices />
      <ComparisonPreview />
      <DecisionCTA />
      <GuideCards />
    </>
  );
}
