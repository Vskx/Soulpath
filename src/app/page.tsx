import BibleQuotesSection from "@/components/BibleQuotesSection";
import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import dotenv from "dotenv";

export default function Home() {
  dotenv.config();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BibleQuotesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
