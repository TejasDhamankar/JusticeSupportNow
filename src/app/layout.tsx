// src/app/layout.tsx

import "@/app/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/sections/Footer";

// --- MODIFICATION 1: Import the Next.js Script component ---
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Justice Support Now | Free Legal Case Evaluation & Mass Tort Assistance",
  description: "Justice Support Now connects individuals affected by harmful products, corporate negligence, and environmental hazards with trusted legal teams. Get your free case review today and explore active mass tort and class action cases.",
  icons: {
    icon: `/JUSticeCrop(3).png?v=2`,
    apple: `/apple-touch-icon.png?v=2`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* TrustedForm visitor script. It will populate the hidden input field with the TrustedForm certificate URL. */}
        <Script
          id="trustedform-visitor-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var tf = document.createElement('script');
                tf.type = 'text/javascript'; tf.async = true;
                tf.src = 'https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(tf, s);
              })();
            `,
          }}
        />
      </head>
      
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