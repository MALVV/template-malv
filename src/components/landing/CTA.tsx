"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ArrowRight, Sparkles, Zap, CheckCircle2 } from "lucide-react";

const benefits = [
  "Production-ready code",
  "Full authentication",
  "Type-safe database",
  "Modern stack",
];

export function CTA() {
  return (
    <motion.section
      className="border-t-2 border-border pt-10 -mx-6 px-6"
      variants={fadeUp}
    >
      <div className="border-2 border-border bg-background px-6 py-10 md:px-12 md:py-14 lg:px-16">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Content */}
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-foreground" />
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
                  Get started
                </p>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
                Ready to turn this layout into your product?
              </h2>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Connect Supabase, wire your Prisma models and start shipping a
                real SaaS from a calm, minimal foundation. Everything you need
                to launch faster.
              </p>

              {/* Benefits List */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-start">
              <motion.div
                className="w-full sm:w-auto lg:w-full"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href="/auth"
                  className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-foreground bg-foreground text-background text-sm font-semibold uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-all w-full"
                >
                  Get started
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                className="w-full sm:w-auto lg:w-full"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-border text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:border-foreground transition-all w-full"
                >
                  <Zap className="h-4 w-4" />
                  Explore demo
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Additional Info */}
          <motion.div
            className="mt-8 pt-8 border-t-2 border-border flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 border border-foreground rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 border border-foreground rounded-full" />
              <span>Open source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 border border-foreground rounded-full" />
              <span>MIT License</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

