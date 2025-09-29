// app/page.tsx
import Header from "@/components/Header";
import OnboardingHero from "@/components/OnboardingHero";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import FeaturesGrid from "@/components/FeaturesGrid";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <Header />
      <AuthModal />
      <main>
        <OnboardingHero />
        <HowItWorks />
        <section id="features">
        <FeaturesGrid />
      </section>
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
