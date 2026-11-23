import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope, Inter, Hanken_Grotesk, Caveat } from "next/font/google";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Case study body/heading font (Manrope) and display font for large numbered
// section labels (Inter), matching the Figma source for the Faircado case study.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const interDisplay = Inter({
  variable: "--font-inter-display",
  subsets: ["latin"],
});

// Diegetic app-UI font (matches the real Faircado app's typeface) for
// mockup elements that reproduce actual in-app copy — e.g. the Momentum
// urgency tip callouts — instead of the portfolio's own Manrope voice.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

// Handwritten annotations drawn over a diagram (eco.mio's "2h" / "3h"
// bottleneck times on the process diagram hover).
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  // Browser tab title for the homepage (case studies set their own).
  title: "Bruna Todeschini de Quadros | Product Designer",
  // Shown in search results; based on the homepage hero sentence.
  description: "Product designer with a background in consumer apps and B2B SaaS.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Runs before the first paint: applies the saved theme, or the visitor's
// system setting if they never used the toggle (components/navigation/ThemeToggle.tsx).
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Case study section links glide (app/globals.css); this makes moving to
      // another page still jump straight to its top.
      data-scroll-behavior="smooth"
      // The theme script adds the "dark" class before React loads.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${interDisplay.variable} ${hankenGrotesk.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
