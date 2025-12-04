"use client";

import { motion } from "framer-motion";
import { containerVariants } from "@/lib/animations";
import { Header } from "./Header";
import { Hero } from "./Hero";

/**
 * HeroSection Component
 * 
 * Full-screen hero section that displays the main value proposition.
 * Includes header navigation and centered hero content.
 * 
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 */
export function HeroSection() {
  return (
    <section className="h-screen flex flex-col border border-border bg-card">
      <motion.div
        className="w-full h-full px-6 pt-6 pb-12 flex flex-col gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Header />
        <div className="flex-1 flex items-center">
          <Hero />
        </div>
      </motion.div>
    </section>
  );
}

