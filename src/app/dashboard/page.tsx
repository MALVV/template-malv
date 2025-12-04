"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Activity,
  Users,
  Settings,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

function DashboardContent() {
  const { user, signOut } = useAuth();
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const metrics = [
    {
      label: "Total Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      description: "From last month",
    },
    {
      label: "Active Sessions",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      description: "Currently online",
    },
    {
      label: "Revenue",
      value: "$45.2K",
      change: "-3.1%",
      trend: "down",
      description: "This month",
    },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "+0.5%",
      trend: "up",
      description: "Overall average",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New user registered",
      user: "john.doe@example.com",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      action: "Payment processed",
      user: "sarah.smith@example.com",
      time: "15 minutes ago",
      status: "success",
    },
    {
      id: 3,
      action: "Failed login attempt",
      user: "unknown@example.com",
      time: "1 hour ago",
      status: "warning",
    },
    {
      id: 4,
      action: "Profile updated",
      user: "mike.johnson@example.com",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 5,
      action: "Subscription renewed",
      user: "emma.wilson@example.com",
      time: "3 hours ago",
      status: "success",
    },
  ];

  return (
    <main className="h-screen bg-background text-foreground flex overflow-hidden">
      <aside className="hidden md:flex w-72 border-r-2 border-border flex-col justify-between py-8 px-6">
        <div className="space-y-8">
          <Link
            href="/"
            className="text-lg font-semibold uppercase tracking-[0.3em] text-foreground hover:text-muted-foreground transition-colors"
          >
            DaVincii
          </Link>
          <nav className="space-y-1">
            <p className="uppercase tracking-[0.25em] text-muted-foreground mb-4 text-xs font-medium px-3">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 border-2 transition-colors font-medium text-sm ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="border-t-2 border-border pt-6 space-y-2">
          <div className="text-xs text-muted-foreground space-y-1 px-3">
            <p>Signed in as</p>
            <p className="font-medium text-foreground text-sm">
              {user?.email ?? "Loading..."}
            </p>
          </div>
          <button
            onClick={signOut}
            className="block w-full text-left px-3 py-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      <section className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-8 py-6 border-b-2 border-border">
          <div>
            <h1 className="text-2xl font-semibold uppercase tracking-[0.3em]">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Welcome back. Here's what's happening with your platform today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 border-2 border-border">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="border-2 border-border p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                      {metric.label}
                    </p>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-3xl font-semibold">{metric.value}</p>
                    <span
                      className={`text-xs font-medium flex items-center gap-1 ${
                        metric.trend === "up"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Activity */}
              <div className="lg:col-span-2 border-2 border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold uppercase tracking-[0.25em]">
                      Recent Activity
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Latest events and actions
                    </p>
                  </div>
                  <button className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 pb-4 border-b-2 border-border last:border-0 last:pb-0"
                    >
                      <div
                        className={`mt-1 ${
                          activity.status === "success"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {activity.status === "success" ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground mb-1">
                          {activity.user}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <div className="border-2 border-border p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] mb-4">
                    System Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        API Status
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-foreground" />
                        <span className="text-sm font-medium">Operational</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Database
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-foreground" />
                        <span className="text-sm font-medium">Healthy</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Uptime
                      </span>
                      <span className="text-sm font-medium">99.9%</span>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-border p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 border-2 border-transparent hover:border-border transition-colors text-sm font-medium">
                      Create new user
                    </button>
                    <button className="w-full text-left px-3 py-2 border-2 border-transparent hover:border-border transition-colors text-sm font-medium">
                      Generate report
                    </button>
                    <button className="w-full text-left px-3 py-2 border-2 border-transparent hover:border-border transition-colors text-sm font-medium">
                      View analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}


