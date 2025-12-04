"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function Header() {
  return (
    <motion.header
      className="flex items-center justify-between gap-4 border-b-2 border-border pb-6"
      variants={fadeIn}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="h-8 w-8 border-2 border-foreground rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <span className="text-base font-medium uppercase tracking-[0.3em] text-foreground">
          DaVincii
        </span>
      </div>
      <nav className="flex items-center gap-6 text-base">
        <motion.div variants={fadeIn}>
          <Link
            href="/demo"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Demo
          </Link>
        </motion.div>
        <motion.div variants={fadeIn}>
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
        </motion.div>
        <motion.div variants={fadeIn}>
          <Link
            href="/auth"
            className="px-4 py-2 border-2 border-foreground text-sm font-medium uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            Sign in
          </Link>
        </motion.div>
      </nav>
    </motion.header>
  );
}

