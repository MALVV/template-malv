"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Clock, Code, Palette, Zap, Users, Shield } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    label: "Time to first dashboard",
    value: "1 day",
    description: "From repo clone to a usable admin surface.",
  },
  {
    icon: Code,
    label: "Lines you remove",
    value: "80%",
    description: "Focused starter instead of a bloated UI kit.",
  },
  {
    icon: Palette,
    label: "Color palette",
    value: "2",
    description: "Black and white. Your brand comes later.",
  },
  {
    icon: Zap,
    label: "Performance score",
    value: "98",
    description: "Optimized for speed and efficiency.",
  },
  {
    icon: Users,
    label: "Developer experience",
    value: "10/10",
    description: "Built with modern tooling and best practices.",
  },
  {
    icon: Shield,
    label: "Security ready",
    value: "100%",
    description: "Authentication and data protection included.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Metrics() {
  return (
    <motion.section
      className="pt-10 space-y-8"
      variants={fadeUp}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Metrics
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Built for modern product teams.
          </h2>
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
          Replace these sample numbers with your own KPIs. DaVincii keeps
          the framing neutral so your data is the only color.
        </p>
      </div>
      
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              className="border-2 border-border px-6 py-6 flex flex-col gap-3 hover:border-foreground transition-colors"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
                  {metric.label}
                </p>
              </div>
              <p className="text-4xl md:text-5xl font-semibold tracking-tight">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

