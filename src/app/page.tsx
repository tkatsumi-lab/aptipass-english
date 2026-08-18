import CategoryGrid from "@/components/CategoryGrid";
import ComparisonPreview from "@/components/ComparisonPreview";
import DecisionCTA from "@/components/DecisionCTA";
import FeaturedServices from "@/components/FeaturedServices";
import Footer from "@/components/Footer";
import GuideCards from "@/components/GuideCards";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PurposeSection from "@/components/PurposeSection";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-blue-700 focus:shadow-lg"
      >
        メインコンテンツへスキップ
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <CategoryGrid />
        <PurposeSection />
        <FeaturedServices />
        <ComparisonPreview />
        <DecisionCTA />
        <GuideCards />
      </main>
      <Footer />
    </div>
  );
}
