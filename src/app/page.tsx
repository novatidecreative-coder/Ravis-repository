import { Hero } from "@/components/Hero";
import { QuoteSection } from "@/components/QuoteSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MapSection } from "@/components/MapSection";
import { TrustSection } from "@/components/TrustSection";
import { FAQSection } from "@/components/FAQSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuoteSection />
      <ServicesSection />
      <WhyChooseSection />
      <BeforeAfterSection />
      <GallerySection />
      <TestimonialsSection />
      <MapSection />
      <TrustSection />
      <FAQSection />
    </>
  );
}
