import "@/app/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/sections/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Justice Support Now | Free Legal Case Evaluation & Mass Tort Assistance",
  description: "Justice Support Now connects individuals affected by harmful products, corporate negligence, and environmental hazards with trusted legal teams. Get your free case review today and explore active mass tort and class action cases.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
