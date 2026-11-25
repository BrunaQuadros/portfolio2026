"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, stagger, useAnimate } from "motion/react";

import { FloatingElement, ParallaxFloating } from "@/components/ilg/ParallaxFloating";
import {
  ILG_COPY,
  ILG_CTA_HREF,
  ILG_PHOTOS,
  ILG_SITE,
  type IlgLocale,
} from "@/content/ilg";

// Full-screen Invest Like a Girl hero. On load "ser quem você quiser" is
// typed in, with every photo lit. Hovering a photo dims the others, grows
// that one and types its word; leaving types the opening phrase back.
// No automatic carousel: words only change on hover.

const TYPE_MS = 55; // per letter typed
const ERASE_MS = 18; // per letter erased
const GAP_MS = 250; // empty beat between two words
const START_MS = 600; // first letter waits for the headline to fade in
const LOCALE_KEY = "ilg-hero-locale";

export function IlgHero() {
  const [scope, animate] = useAnimate();
  const [locale, setLocaleState] = useState<IlgLocale>("pt");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [started, setStarted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState("");
  const [clearing, setClearing] = useState(false);

  const copy = ILG_COPY[locale];
  const target = hovered !== null ? ILG_PHOTOS[hovered].word[locale] : copy.opening;

  const setLocale = (next: IlgLocale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_KEY, next);
  };

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_KEY);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    const timer = window.setTimeout(() => {
      if (saved === "pt" || saved === "en") setLocaleState(saved);
      sync();
      setStarted(true);
    }, START_MS);
    query.addEventListener("change", sync);
    return () => {
      window.clearTimeout(timer);
      query.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    animate(
      ".ilg-photo",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.1, { startDelay: 0.6 }) }
    );
  }, [animate]);

  // Typewriter: erase what is typed letter by letter, a short empty beat,
  // then type the target letter by letter.
  useEffect(() => {
    if (!started || reducedMotion) return;
    let timer: number | undefined;
    if (clearing) {
      timer =
        displayed.length > 0
          ? window.setTimeout(() => setDisplayed((d) => d.slice(0, -1)), ERASE_MS)
          : window.setTimeout(() => setClearing(false), GAP_MS);
    } else if (displayed !== target) {
      timer = target.startsWith(displayed)
        ? window.setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_MS)
        : window.setTimeout(() => setClearing(true), 0);
    }
    return () => window.clearTimeout(timer);
  }, [started, reducedMotion, clearing, displayed, target]);

  const typed = reducedMotion ? copy.opening : displayed;

  return (
    <section
      ref={scope}
      lang={locale === "en" ? "en" : "pt-BR"}
      className="relative flex h-dvh min-h-[640px] w-full items-center justify-center overflow-hidden bg-ilg-ink font-display"
    >
      <a
        href={ILG_SITE}
        className="absolute left-1/2 top-5 z-[60] -translate-x-1/2 sm:top-7"
        aria-label={copy.home}
      >
        <Image
          src="/images/ilg/logo-horizontal.png"
          alt="Invest Like a Girl"
          width={200}
          height={49}
          preload
          className="h-10 w-auto brightness-0 invert sm:h-12"
        />
      </a>

      <motion.div
        className="z-50 flex max-w-4xl flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 0.1 }}
      >
        <h1 className="font-ilg-serif text-4xl font-semibold italic leading-[1.1] text-ilg-paper sm:text-5xl md:text-7xl">
          {/* Screen readers get one stable sentence. */}
          <span className="sr-only">
            {[copy.lead, copy.pre, copy.opening].filter(Boolean).join(" ")}
          </span>
          <span aria-hidden="true" className="block text-balance">
            {copy.lead}
          </span>
          {/* Two lines reserved below md so the subtitle never jumps; clipped
              only top and bottom so the slanted caret is never cut. */}
          <span
            aria-hidden="true"
            className="relative flex h-[2.3em] items-center justify-center overflow-y-clip md:h-[1.15em]"
          >
            <span className="block text-balance md:whitespace-nowrap">
              {copy.pre && <>{copy.pre} </>}
              <span className="text-ilg-pink">{typed}</span>
              <motion.span
                className="ml-[0.06em] inline-block h-[0.85em] w-[0.05em] -skew-x-12 translate-y-[0.1em] bg-ilg-pink"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              />
            </span>
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-ilg-paper/80 sm:text-lg md:text-xl">
          {copy.body.split("\n").map((line, i) => (
            <span key={line}>
              {i > 0 && <br className="hidden sm:block" />}
              {i > 0 && " "}
              {line}
            </span>
          ))}
        </p>
        <div className="mt-9">
          <a
            href={ILG_CTA_HREF}
            className="inline-flex items-center gap-2 rounded-lg bg-ilg-berry px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-ilg-berry-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ilg-pink"
          >
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </motion.div>

      <div
        role="group"
        aria-label="Idioma / Language"
        className="absolute bottom-6 left-1/2 z-[60] flex -translate-x-1/2 rounded-full border border-ilg-paper/30 bg-ilg-ink/80 p-1 text-xs font-medium tracking-[0.08em] backdrop-blur-sm"
      >
        {(["pt", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={`rounded-full px-3.5 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-ilg-pink ${
              locale === l ? "bg-ilg-paper text-ilg-ink" : "text-ilg-paper/70 hover:text-ilg-paper"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <ParallaxFloating sensitivity={-1} className="overflow-hidden" paused={hovered !== null}>
        {ILG_PHOTOS.map((photo, i) => {
          const lit = hovered === null || hovered === i;
          return (
            <FloatingElement
              key={photo.src}
              depth={photo.depth}
              className={`${photo.pos} ${hovered === i ? "z-10" : "z-0"}`}
            >
              {/* outer: intro fade + grow; inner: dim, so the two never fight */}
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`ilg-photo relative h-auto overflow-hidden rounded-xl opacity-0 transition-transform duration-700 ease-out ${
                  hovered === i ? "scale-[1.08]" : "scale-100"
                } ${photo.size}`}
              >
                <div
                  className={`absolute inset-0 transition-[filter] duration-700 ease-out ${
                    lit ? "brightness-100 grayscale-0" : "brightness-[0.3] grayscale"
                  }`}
                >
                  <Image src={photo.src} alt="" fill sizes={`${photo.width}px`} className="object-cover" />
                </div>
              </div>
            </FloatingElement>
          );
        })}
      </ParallaxFloating>
    </section>
  );
}
