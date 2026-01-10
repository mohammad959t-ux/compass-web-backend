import "../styles/globals.css";

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import { ThemeProvider, ThemeScript } from "@compass/ui";
import { ToastProvider, ToastViewport } from "../components/ui/Toast";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Compass Digital Services",
  description: "Premium digital services for bold brands."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-body`}>
        <ThemeProvider>
          <ToastProvider>
            <div className="min-h-screen bg-bg">
              <Header />
              <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col gap-20 px-6 pb-20 pt-12">
                {children}
              </main>
              <Footer />
            </div>
            <ToastViewport />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
