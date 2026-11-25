import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";

import { IlgHero } from "@/components/ilg/IlgHero";

// Invest Like a Girl's headline font, loaded only on this page.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
  weight: "600",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Invest Like a Girl | Bruna Todeschini de Quadros",
  description: "Hero concept for Invest Like a Girl, financial education by women, for women.",
  robots: { index: false, follow: false },
};

export default function IlgPage() {
  return (
    <main className={`${sourceSerif.variable} min-h-screen bg-ilg-ink`}>
      <IlgHero />
    </main>
  );
}
