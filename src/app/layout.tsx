// src/app/layout.tsx

import "@/app/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/sections/Footer";

// 1. Import your new provider
import AuthProvider from "./providers"; // Add this line

const inter = Inter({ subsets: ["latin"] });

// ... (your metadata) ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />

      <body className={inter.className}>
        {/* 2. Wrap everything in AuthProvider */}
        <AuthProvider> 
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Footer />
          </ThemeProvider>
        </AuthProvider> 
      </body>
    </html>
  );
}