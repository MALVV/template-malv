"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function Hero() {
  return (
    <div className="w-full grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-center">
      <motion.div className="space-y-6" variants={fadeUp}>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
          Minimal black &amp; white starter for modern SaaS products.
        </h1>
        <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          DaVincii is a launchpad for software products that value clarity
          over color. Ship a polished marketing site and a working
          dashboard in days, not weeks.
        </p>
        <motion.div
          className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.25em]"
          variants={fadeUp}
        >
          <span className="px-4 py-2 border-2 border-border">
            Next.js · Supabase · Prisma
          </span>
          <span className="px-4 py-2 border-2 border-border">
            Tailwind · shadcn/ui
          </span>
        </motion.div>
        <motion.div
          className="flex flex-wrap items-center gap-4 pt-2"
          variants={fadeUp}
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href="/auth"
              className="px-6 py-3 border-2 border-foreground bg-foreground text-background text-sm font-medium uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-colors"
            >
              Start now
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href="/demo"
              className="px-6 py-3 border-2 border-border text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              View demo
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 text-sm text-muted-foreground border-l-2 border-border pl-6 md:pl-8"
        variants={fadeUp}
      >
        <p className="uppercase tracking-[0.3em] text-xs font-medium">
          Product overview
        </p>
        <p>
          DaVincii is a monochrome canvas for your SaaS: opinionated
          layout, strong typography and a dashboard skeleton ready for
          real data.
        </p>
        <p>
          Use it as a starting point for analytics tools, admin panels,
          internal dashboards or client projects.
        </p>
      </motion.div>
    </div>
  );
}

