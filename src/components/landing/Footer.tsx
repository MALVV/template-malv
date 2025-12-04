"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function Footer() {
  return (
    <motion.footer
      className="border-t-2 border-border pt-6 mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground -mx-6 px-6"
      variants={fadeIn}
    >
      <p>© {new Date().getFullYear()} DaVincii. Minimal by design.</p>
      <div className="flex gap-4">
        <Link
          href="#"
          className="hover:text-foreground transition-colors uppercase tracking-[0.25em]"
        >
          Changelog
        </Link>
        <Link
          href="#"
          className="hover:text-foreground transition-colors uppercase tracking-[0.25em]"
        >
          Docs
        </Link>
        <Link
          href="#"
          className="hover:text-foreground transition-colors uppercase tracking-[0.25em]"
        >
          Support
        </Link>
      </div>
    </motion.footer>
  );
}

