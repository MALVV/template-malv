"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { LayoutDashboard, BarChart3, Users, Activity, ArrowRight } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Clean layout",
    description: "Organized structure for complex data visualization.",
  },
  {
    icon: BarChart3,
    title: "Real-time metrics",
    description: "Live data updates with minimal visual noise.",
  },
  {
    icon: Users,
    title: "User management",
    description: "Built-in authentication and user controls.",
  },
  {
    icon: Activity,
    title: "Activity tracking",
    description: "Monitor events and actions in real-time.",
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
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function ProductDemo() {
  return (
    <motion.section
      className="border-t-2 border-border pt-10 space-y-8 -mx-6 px-6"
      variants={fadeUp}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Product demo
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Preview the dashboard experience.
          </h2>
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
          A stripped-down preview of how your product could look with real
          users, metrics and activity flowing through DaVincii.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Dashboard Mockup */}
        <motion.div
          className="border-2 border-border bg-background p-6 md:p-8 flex flex-col gap-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between pb-4 border-b-2 border-border">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 border-2 border-foreground rounded-full" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium">
                Dashboard Preview
              </span>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Live demo
            </span>
          </div>

          {/* Mock Dashboard Content */}
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-32 bg-foreground mb-2" />
                <div className="h-3 w-48 bg-muted-foreground/30" />
              </div>
              <div className="h-8 w-24 border-2 border-border" />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-2 border-border p-4 space-y-2">
                  <div className="h-2 w-16 bg-muted-foreground/20" />
                  <div className="h-6 w-20 bg-foreground" />
                  <div className="h-2 w-full bg-muted-foreground/10" />
                </div>
              ))}
            </div>

            {/* Activity Section */}
            <div className="border-2 border-border p-4 space-y-3 pt-4">
              <div className="h-2 w-24 bg-muted-foreground/20" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-2 w-2 border-2 border-foreground rounded-full" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-full bg-foreground/80" />
                    <div className="h-2 w-3/4 bg-muted-foreground/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Key features
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="border-2 border-border p-4 hover:border-foreground transition-colors"
                    variants={itemVariants}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            className="border-2 border-border p-6 space-y-4"
            variants={itemVariants}
          >
            <p className="text-sm font-medium uppercase tracking-[0.25em]">
              Ready to explore?
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              See the full dashboard experience with real data, authentication
              flows, and interactive components.
            </p>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] border-2 border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
              >
                View dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

