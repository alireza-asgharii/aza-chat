import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", fallback: ['system-ui', 'arial'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-[1500px] mx-auto px-3 ">
            <Header />
            <main className="min-h-[90vh]">{children}</main>
          </div>
          <Toaster />
          <Sonner position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
