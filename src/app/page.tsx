"use client";

import {
  HeroSection,
  Metrics,
  ProductDemo,
  CTA,
  Footer,
} from "@/components/landing";
import { HomeLoader } from "@/components/ui/home-loader";

/**
 * Home Page Component
 * 
 * Main landing page that displays the hero section and additional content sections.
 * Uses a clean, minimal black and white design.
 */
export default function Home() {
  return (
    <HomeLoader>
      <main className="bg-background text-foreground">
        <HeroSection />

        {/* Rest of the content */}
        <section className="px-6 py-12 space-y-16 border border-border bg-card">
          <Metrics />
          <ProductDemo />
          <CTA />
          <Footer />
        </section>
      </main>
    </HomeLoader>
  );
}

