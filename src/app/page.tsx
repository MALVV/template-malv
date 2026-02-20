"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/landing";
import { HomeLoader } from "@/components/ui/home-loader";

const Metrics = dynamic(() => import("@/components/landing").then((m) => m.Metrics), { ssr: true });
const ProductDemo = dynamic(() => import("@/components/landing").then((m) => m.ProductDemo), { ssr: true });
const CTA = dynamic(() => import("@/components/landing").then((m) => m.CTA), { ssr: true });
const Footer = dynamic(() => import("@/components/landing").then((m) => m.Footer), { ssr: true });

/**
 * Página principal: hero + secciones de landing.
 * Supabase es opcional; sin variables de entorno el sitio funciona solo como landing.
 */
export default function Home() {
  return (
    <HomeLoader>
      <main className="bg-background text-foreground">
        <HeroSection />
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

