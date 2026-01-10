"use client";

import "../styles/globals.css";

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import { ThemeProvider, ThemeScript } from "@compass/ui";
import { ToastProvider, ToastViewport } from "../components/ui/Toast";

import { AuthProvider } from "../components/shell/Protected";
import { Shell } from "../components/shell/Shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Compass Admin",
  description: "Compass Digital Services admin portal."
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
            <AuthProvider>
              <Shell>{children}</Shell>
            </AuthProvider>
            <ToastViewport />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
