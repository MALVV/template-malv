"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Mail, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const redirectTo = `${window.location.origin}/auth/reset-password`;
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo,
        }
      );

      if (resetError) throw resetError;

      setSuccess(true);
      setEmail("");
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <motion.div
        className="w-full max-w-md border-2 border-border bg-card px-8 py-10 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="space-y-3">
          <motion.p
            className="text-xl font-semibold uppercase tracking-[0.3em] text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Reset password
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Enter your email address and we'll send you a link to reset your password.
          </motion.p>
        </header>

        {success ? (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="border-2 border-border bg-background p-6 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-12 w-12 text-foreground" />
              <div className="space-y-2">
                <p className="text-base font-medium text-foreground">
                  Check your email
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                </p>
              </div>
            </div>

            <Link
              href="/auth"
              className="block w-full text-center border-2 border-foreground bg-foreground text-background text-sm font-medium uppercase tracking-[0.25em] py-3 hover:bg-background hover:text-foreground transition-colors"
            >
              Back to sign in
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-sm font-medium uppercase tracking-[0.25em] text-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className="w-full border-2 border-border bg-background px-4 py-3 text-base outline-none focus:border-foreground transition-colors"
                placeholder="you@example.com"
                disabled={loading}
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="border-2 border-destructive bg-background p-4 flex items-start gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive leading-relaxed">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full mt-2 border-2 border-foreground bg-foreground text-background text-sm font-medium uppercase tracking-[0.25em] py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background hover:text-foreground transition-colors"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Sending..." : "Send reset link"}
            </motion.button>
          </form>
        )}

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/auth"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

