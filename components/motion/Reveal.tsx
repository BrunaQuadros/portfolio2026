"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";

// The same curve as the Tailwind token `ease-out-soft`.
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;

const REDUCED_FADE_SECONDS = 0.2;

// Same width as Tailwind's `lg:` breakpoint.
const LG_MEDIA_QUERY = "(min-width: 1024px)";

type RevealPreset = "text" | "media" | "card" | "sticker" | "list" | "cta";

// Where each preset starts from, how long it takes, its default gap between
// siblings (in ms), and when it fires.
const PRESETS = {
  text: { from: { opacity: 0, y: 64 }, seconds: 0.6, stagger: 0, viewport: { amount: 0.15 } },
  // Fires when the top of the element reaches two thirds down the screen.
  media: { from: { opacity: 0, y: 150 }, seconds: 0.8, stagger: 0, viewport: { margin: "0px 0px -33% 0px" } },
  card: { from: { opacity: 1, y: 256 }, seconds: 0.8, stagger: 100, viewport: {} },
  sticker: { from: { opacity: 0, y: 100 }, seconds: 0.6, stagger: 0, viewport: {} },
  list: { from: { opacity: 0, x: -16 }, seconds: 0.4, stagger: 60, viewport: {} },
  cta: { from: { opacity: 0, scale: 0.95 }, seconds: 0.5, stagger: 0, viewport: {} },
} as const satisfies Record<RevealPreset, object>;

// `Reveal` replaces an element rather than wrapping it, so a page keeps its
// layout: pass the classes and style that element already had.
const ELEMENTS = { div: motion.div, span: motion.span, p: motion.p, h2: motion.h2, figure: motion.figure };

type RevealProps = {
  preset: RevealPreset;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: keyof typeof ELEMENTS;
  // Extra wait before starting, in ms.
  delay?: number;
  // Replaces `delay` from the lg breakpoint up, for a sequence that only
  // exists when the elements sit side by side (eco.mio Scope cards).
  lgDelay?: number;
  // Also fade in from opacity 0, so a delayed card stays hidden while it waits.
  fadeIn?: boolean;
  // Play when the nearest Reveal around it plays, instead of watching the
  // screen itself (`delay` then counts from that moment). For a detail
  // inside a card, like the eco.mio Scope arrow.
  followParent?: boolean;
  // Position among its siblings. It waits `index` x `stagger` ms.
  index?: number;
  // Gap between siblings in ms, replacing the preset's own.
  stagger?: number;
  // Replace the preset's starting offset.
  x?: number;
  y?: number;
  // For cards in a horizontal strip: cards past the right edge of the screen
  // on load just stay visible, so they don't reveal mid-swipe.
  skipIfOffscreen?: boolean;
  // Renders a plain element, for shared components on pages without reveals.
  disabled?: boolean;
  "aria-hidden"?: "true";
};

// One-time reveal on scroll. Only opacity and transform are animated.
export function Reveal({ disabled = false, as = "div", className, style, children, ...animation }: RevealProps) {
  if (disabled) {
    const Plain = as;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }
  return (
    <AnimatedReveal as={as} className={className} style={style} {...animation}>
      {children}
    </AnimatedReveal>
  );
}

function AnimatedReveal({
  "aria-hidden": ariaHidden,
  preset,
  children,
  className,
  style,
  as = "div",
  delay = 0,
  lgDelay,
  fadeIn = false,
  followParent = false,
  index = 0,
  stagger,
  x,
  y,
  skipIfOffscreen = false,
}: Omit<RevealProps, "disabled">) {
  const settings = PRESETS[preset];
  const prefersReducedMotion = useReducedMotion();
  const elementRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const isLg = useIsLg(lgDelay !== undefined);

  useEffect(() => {
    const element = elementRef.current;
    if (skipIfOffscreen && element && element.getBoundingClientRect().left >= window.innerWidth) {
      controls.set("shown");
    }
  }, [skipIfOffscreen, controls]);

  const offsets = {
    ...settings.from,
    ...(fadeIn ? { opacity: 0 } : {}),
    ...(x === undefined ? {} : { x }),
    ...(y === undefined ? {} : { y }),
  };
  const baseDelay = isLg && lgDelay !== undefined ? lgDelay : delay;
  const waitMs = baseDelay + index * (stagger ?? settings.stagger);
  // Every value the starting point moves has to come back to its resting value.
  const resting = { opacity: 1, ...("x" in offsets ? { x: 0 } : {}), ...("y" in offsets ? { y: 0 } : {}), ...("scale" in offsets ? { scale: 1 } : {}) };

  // Reduced motion names x, y and scale too, so Motion clears the offset the
  // server already sent in the page's first paint.
  const noMovement = { x: 0, y: 0, scale: 1 };
  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0, ...noMovement }, shown: { opacity: 1, ...noMovement } }
    : { hidden: offsets, shown: resting };
  const transition = prefersReducedMotion
    ? { duration: REDUCED_FADE_SECONDS }
    : { duration: settings.seconds, ease: EASE_OUT_SOFT, delay: waitMs / 1000 };

  const Element = ELEMENTS[as] as typeof motion.div;

  // A follower only gets its variants and timing; Motion passes the parent's
  // "hidden" and "shown" down to it.
  const trigger = followParent
    ? {}
    : { initial: "hidden", animate: controls, whileInView: "shown", viewport: { once: true, ...settings.viewport } };

  return (
    <Element
      ref={elementRef}
      data-reveal=""
      aria-hidden={ariaHidden}
      className={className}
      style={style}
      variants={variants}
      {...trigger}
      transition={transition}
      // The server can't know a visitor's reduced-motion setting, so their
      // first paint can differ from the page sent. Motion corrects it on load.
      suppressHydrationWarning
    >
      {children}
    </Element>
  );
}

// Whether the screen is at least as wide as `lg:`. Only listens when asked,
// and starts false so the server and the first paint agree.
function useIsLg(enabled: boolean) {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const query = window.matchMedia(LG_MEDIA_QUERY);
    const update = () => setIsLg(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [enabled]);

  return isLg;
}

// Add once per page: if JavaScript is off, everything shows in its final state.
export function RevealNoScript() {
  return (
    <noscript>
      <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
    </noscript>
  );
}
