/* Minimal email/password sign in using Supabase client-side.
 * This keeps the UI very bare and black & white by design.
 */

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = password === confirmPassword || mode === "sign-in";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validation for sign-up
    if (mode === "sign-up") {
      if (!isPasswordValid) {
        setError("Password does not meet requirements.");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
    }

    try {
      if (mode === "sign-in") {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        if (data.session) {
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        // Get the base URL for redirect
        const redirectTo = `${window.location.origin}/auth/confirm`;
        
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectTo,
          },
        });
        if (signUpError) throw signUpError;
        if (data.session) {
          router.push("/dashboard");
          router.refresh();
        } else {
          setSuccess(
            "Account created! Please check your email and click the confirmation link to activate your account."
          );
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
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
            {mode === "sign-in" ? "Sign in" : "Create account"}
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {mode === "sign-in"
              ? "Everything is black and white here. No distractions, only access."
              : "Join DaVincii and start building your product today."}
          </motion.p>
        </header>

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
            />
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-sm font-medium uppercase tracking-[0.25em] text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                className="w-full border-2 border-border bg-background px-4 py-3 pr-12 text-base outline-none focus:border-foreground transition-colors"
                placeholder={mode === "sign-up" ? "At least 8 characters" : "Enter your password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Confirm Password Field (only for sign-up) */}
          {mode === "sign-up" && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="text-sm font-medium uppercase tracking-[0.25em] text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError(null);
                  }}
                  className={`w-full border-2 bg-background px-4 py-3 pr-12 text-base outline-none transition-colors ${
                    confirmPassword && !passwordsMatch
                      ? "border-destructive"
                      : "border-border focus:border-foreground"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </motion.div>
          )}

          {/* Password Requirements (only for sign-up) */}
          {mode === "sign-up" && password && (
            <motion.div
              className="space-y-2 border-2 border-border p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Password requirements
              </p>
              <div className="space-y-1.5">
                {Object.entries(passwordRequirements).map(([key, isValid]) => (
                  <div key={key} className="flex items-center gap-2 text-xs">
                    {isValid ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-foreground" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span
                      className={isValid ? "text-foreground" : "text-muted-foreground"}
                    >
                      {key === "minLength" && "At least 8 characters"}
                      {key === "hasUpperCase" && "One uppercase letter"}
                      {key === "hasLowerCase" && "One lowercase letter"}
                      {key === "hasNumber" && "One number"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              className="border-2 border-border bg-background p-4 flex items-start gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">{success}</p>
            </motion.div>
          )}

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
            disabled={loading || (mode === "sign-up" && (!isPasswordValid || !passwordsMatch))}
            className="w-full mt-2 border-2 border-foreground bg-foreground text-background text-sm font-medium uppercase tracking-[0.25em] py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background hover:text-foreground transition-colors"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading
              ? "Please wait..."
              : mode === "sign-in"
              ? "Enter dashboard"
              : "Create account"}
          </motion.button>
        </form>

        <motion.button
          type="button"
          onClick={() => {
            setMode((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"));
            setError(null);
            setSuccess(null);
            setPassword("");
            setConfirmPassword("");
          }}
          className="w-full text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {mode === "sign-in"
            ? "No account yet? Create one instead."
            : "Already have an account? Sign in instead."}
        </motion.button>
      </motion.div>
    </main>
  );
}


