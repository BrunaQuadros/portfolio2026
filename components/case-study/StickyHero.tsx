"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// How many pixels of page scroll the recede takes, roughly 80% of the height
// of the hero text block. Raise it for a slower fade, lower it for a faster one.
const RECEDE_DISTANCE = 400;

// Where the text block ends up once the recede has finished.
const END_SCALE = 0.85;
const END_Y_DESKTOP = 60;
const END_Y_MOBILE = 36;

// Below Tailwind's `sm` breakpoint (640px) the text travels the shorter distance.
const MOBILE_QUERY = "(max-width: 639.98px)";

type StickyHeroProps = {
  // The hero text: logo, heading and intro paragraph.
  text: ReactNode;
  // The classes that sized the text block before it was wrapped here.
  textClassName: string;
  // The hero card that slides up over the text.
  children: ReactNode;
};

// Hero with a "sticky recede": the text pins to the top of the screen and
// fades away as the page scrolls, while the card slides up over it.
//
// It renders two siblings and no wrapper of its own, so it drops straight
// into the hero <section> without changing that section's layout. Only the
// card needs the higher layer: sticky text can't leave its parent section,
// so it never reaches the content further down the page.
export function StickyHero({ text, textClassName, children }: StickyHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const endY = useEndY();

  // Motion values update the element directly, so scrolling never re-renders React.
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, RECEDE_DISTANCE], [0, 1]);

  const scale = useTransform(progress, (p) => (prefersReducedMotion ? 1 : 1 + (END_SCALE - 1) * p));
  const y = useTransform(progress, (p) => (prefersReducedMotion ? 0 : endY * p));
  const opacity = useTransform(progress, (p) => 1 - p);
  // Only ask the browser for extra graphics memory while the effect is moving.
  const willChange = useTransform(progress, (p) => (p > 0 && p < 1 ? "transform, opacity" : "auto"));

  return (
    <>
      <motion.div
        className={`sticky top-0 z-1 origin-top ${textClassName}`}
        style={{ scale, y, opacity, willChange }}
      >
        {text}
      </motion.div>
      {/* The entrance is a CSS animation, not a motion/react one, so the card
          is never sent to the browser hidden. It stays visible without
          JavaScript and never flashes for reduced-motion visitors. */}
      <div className="relative z-2 w-full motion-safe:animate-hero-card-rise">{children}</div>
    </>
  );
}

// Reads the screen size once and again only when it crosses the breakpoint,
// not on scroll.
function useEndY() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile ? END_Y_MOBILE : END_Y_DESKTOP;
}
