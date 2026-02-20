import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const interTight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DaVincii",
    template: "%s | DaVincii",
  },
  description:
    "Plantilla minimalista para landing con Next.js, Tailwind CSS y auth opcional (Supabase).",
  openGraph: {
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${interTight.className} h-full`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

