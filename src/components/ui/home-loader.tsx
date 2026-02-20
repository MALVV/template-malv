"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PageLoader } from "./page-loader";

interface HomeLoaderProps {
  children: React.ReactNode;
}

export function HomeLoader({ children }: HomeLoaderProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const isHomePage = pathname === "/";
    const timer = setTimeout(() => {
      if (isHomePage) {
        setIsLoading(true);
        setShowContent(false);
      } else {
        setIsLoading(false);
        setShowContent(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 200);
  };

  // Si no es la página home, mostrar contenido directamente
  if (pathname !== "/") {
    return <>{children}</>;
  }

  return (
    <>
      {isLoading && <PageLoader onComplete={handleLoaderComplete} />}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

