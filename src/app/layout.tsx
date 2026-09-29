import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Estimation MXL | Expert en estimation après sinistre",
    template: "%s | Estimation MXL",
  },
  description:
    "Estimations précises et détaillées après sinistre, en ébénisterie, en construction et en rénovation. Rapport précis garanti.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr-CA"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full scroll-pt-20 motion-safe:scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-black">{children}</body>
    </html>
  );
}
