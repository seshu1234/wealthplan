import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { GlobalSidekick } from "@/components/ai/GlobalSidekick";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WealthPlan | US Finance Calculators",
  description: "Free, accurate financial calculators designed for the US tax system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <GlobalSidekick />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
