import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";

import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oscar Decloquement",
  description:
    "Je suis un développeur full-stack qui aime découvrir de nouvelles technologies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "antialiased bg-primary text-primary width-full"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navigation />
          <div
            className={
              "px-6 md:px-6 pt-16 pb-24 md:pt-20 md:pb-44 max-w-[700px] mx-auto"
            }
          >
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
