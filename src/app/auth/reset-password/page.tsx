"use client";

import { FormEvent, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Lock, ArrowLeft, CheckCircle2, XCircle, Eye, EyeOff, Loader2 } from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  // Password validation
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    // Verificar si hay un token válido en la URL
    const checkToken = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const type = hashParams.get("type");

      // También verificar query params
      const tokenHash = searchParams.get("token_hash");
      const token = searchParams.get("token");

      if (accessToken || tokenHash || token) {
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
      }
    };

    checkToken();
  }, [searchParams]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

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

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");

      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (isValidToken === null) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="w-full max-w-md border-2 border-border bg-card px-8 py-10">
          <p className="text-sm text-muted-foreground text-center">Verifying...</p>
        </div>
      </main>
    );
  }

  if (isValidToken === false) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <motion.div
          className="w-full max-w-md border-2 border-border bg-card px-8 py-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="border-2 border-destructive bg-background p-6 flex flex-col items-center gap-4 text-center">
            <XCircle className="h-12 w-12 text-destructive" />
            <div className="space-y-2">
              <p className="text-base font-medium text-foreground">
                Invalid or expired link
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/auth/forgot-password"
              className="block w-full text-center border-2 border-foreground bg-foreground text-background text-sm font-medium uppercase tracking-[0.25em] py-3 hover:bg-background hover:text-foreground transition-colors"
            >
              Request new link
            </Link>
            <Link
              href="/auth"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </motion.div>
      </main>
    );
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
            Set new password
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Enter your new password below. Make sure it meets all the requirements.
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
                  Password updated
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your password has been successfully updated. Redirecting to dashboard...
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-sm font-medium uppercase tracking-[0.25em] text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4" />
                New Password
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
                  placeholder="At least 8 characters"
                  disabled={loading}
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

            {/* Confirm Password Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
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
                  disabled={loading}
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

            {/* Password Requirements */}
            {password && (
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
              disabled={loading || !isPasswordValid || !passwordsMatch}
              className="w-full mt-2 border-2 border-foreground bg-foreground text-background text-sm font-medium uppercase tracking-[0.25em] py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background hover:text-foreground transition-colors"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Updating..." : "Update password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <motion.div
            className="w-full max-w-md border-2 border-border bg-card px-8 py-10"
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
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          </motion.div>
        </main>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}

