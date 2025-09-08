// app/page.tsx
import Header from "@/components/Header";
import OnboardingHero from "@/components/OnboardingHero";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <OnboardingHero />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
