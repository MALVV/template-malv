"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Confirming your email...");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Check if there's an error in the URL
        const errorParam = searchParams.get("error");
        if (errorParam) {
          setStatus("error");
          setMessage("The confirmation link is invalid or has expired.");
          return;
        }

        // Check URL hash for tokens (Supabase redirects with hash fragments)
        if (window.location.hash) {
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
          );
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");

          if (accessToken && refreshToken) {
            // Set session from hash params
            const { data, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (sessionError) throw sessionError;

            // Check if email is confirmed
            if (data.session?.user) {
              setStatus("success");
              setMessage(
                `Welcome! Your email ${data.session.user.email} has been confirmed successfully.`
              );

              // Redirect to dashboard after a short delay
              setTimeout(() => {
                router.push("/dashboard");
                router.refresh();
              }, 2500);
              return;
            }
          }
        }

        // Check query parameters for token_hash
        const tokenHash = searchParams.get("token_hash");
        const token = searchParams.get("token");
        const type = searchParams.get("type");

        if (tokenHash) {
          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: (type as any) || "email",
          });

          if (verifyError) throw verifyError;

          if (data.user) {
            setStatus("success");
            setMessage(
              `Welcome! Your email ${data.user.email} has been confirmed successfully.`
            );

            setTimeout(() => {
              router.push("/dashboard");
              router.refresh();
            }, 2500);
            return;
          }
        } else if (token) {
          // Token-based verification requires email
          // Try to extract email from URL or use exchangeCodeForSession instead
          const email = searchParams.get("email");
          
          if (!email) {
            // If no email in params, try to use the token with exchangeCodeForSession
            // This handles the case where Supabase redirects with a code instead
            throw new Error("Email parameter is required for token verification. Please use the full confirmation link from your email.");
          }
          
          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token,
            type: (type as any) || "email",
            email: email,
          });

          if (verifyError) throw verifyError;

          if (data.user) {
            setStatus("success");
            setMessage(
              `Welcome! Your email ${data.user.email} has been confirmed successfully.`
            );

            setTimeout(() => {
              router.push("/dashboard");
              router.refresh();
            }, 2500);
            return;
          }
        }

        // If no tokens found, wait a bit and check session
        setTimeout(async () => {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session?.user) {
            setStatus("success");
            setMessage("Email confirmed successfully!");
            setTimeout(() => {
              router.push("/dashboard");
              router.refresh();
            }, 2000);
          } else {
            throw new Error("No valid confirmation token found in URL");
          }
        }, 1000);
      } catch (error: any) {
        console.error("Email confirmation error:", error);
        setStatus("error");
        setMessage(
          error.message?.includes("expired")
            ? "The confirmation link has expired. Please request a new one."
            : "Failed to confirm email. The link may be invalid or expired."
        );
      }
    };

    confirmEmail();
  }, [router, searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <motion.div
        className="w-full max-w-lg border-2 border-border bg-card px-8 py-12 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {status === "loading" && (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Loader2 className="h-12 w-12 text-muted-foreground" />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-xl font-semibold uppercase tracking-[0.3em]">
                Confirming email
              </h1>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="h-16 w-16 mx-auto text-foreground" />
            </motion.div>
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold uppercase tracking-[0.3em]">
                Email confirmed
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {message}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                Redirecting to your dashboard...
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/dashboard"
                className="inline-block px-8 py-3 border-2 border-foreground bg-foreground text-background text-sm font-medium uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-colors"
              >
                Go to dashboard
              </Link>
            </motion.div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <XCircle className="h-16 w-16 mx-auto text-destructive" />
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold uppercase tracking-[0.3em]">
                Confirmation failed
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {message}
              </p>
            </div>
            <div className="space-y-3 pt-4">
              <Link
                href="/auth"
                className="block w-full px-8 py-3 border-2 border-foreground bg-foreground text-background text-sm font-medium uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-colors text-center"
              >
                Back to sign in
              </Link>
              <p className="text-xs text-muted-foreground">
                Need help? Contact support or try signing up again.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <motion.div
            className="w-full max-w-lg border-2 border-border bg-card px-8 py-12 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Loader2 className="h-12 w-12 text-muted-foreground" />
              </motion.div>
              <div className="space-y-2">
                <h1 className="text-xl font-semibold uppercase tracking-[0.3em]">
                  Loading
                </h1>
                <p className="text-sm text-muted-foreground">
                  Preparing confirmation...
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}
