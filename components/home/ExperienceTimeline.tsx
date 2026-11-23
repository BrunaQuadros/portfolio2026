"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ExperienceEntry } from "@/content/home";

// Work history on the homepage, newest first.
//
// From lg: (desktop), each row reads: dates on the left, a dot on a vertical
// line, a 52px logo tile (the height of the role and company lines together, 28px + 24px), then the role with the company in a lighter grey (portfolio-grey-500).
// Below lg: the dates column, dots and line are hidden, the date moves above
// the role in small grey text, and the logo tile is 56px.
//
// From lg: everything lines up at the top of the row, and the dot sits on
// the middle of the first line of the dates (top-3.5 = half the 28px line
// height of text-lg, the 18px used for the dates and the role).
//
// The line fills with scroll: each row draws its own piece of line, from its
// dot down to the next dot (one row height plus the 80px row gap, gap-20).
// The light track (portfolio-grey-100, the case study card hover grey) is
// always there; the black fill (portfolio-grey-900) grows over it as the
// middle of the screen passes, and each dot turns dark once the fill reaches
// it. The last row has no line.
export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  const listRef = useTimelineScrollFill();

  return (
    <ol ref={listRef} aria-label="Work experience" className="flex flex-col gap-6 lg:mx-auto lg:gap-20">
      {entries.map((entry) => (
        <li key={entry.dates} className="group flex items-center gap-4 lg:items-start">
          {/* Desktop dates column, right-aligned against the dot */}
          <p className="hidden w-40 shrink-0 text-right lg:mr-7 font-manrope text-lg font-bold text-portfolio-grey-900 lg:block">
            {entry.dates}
          </p>

          {/* Spacing from lg: 16px row gap (gap-4) plus 28px margins (mr-7)
              keeps the dot 40px from the dates and 44px from the logo,
              while the logo and the text stay 16px apart. */}
          {/* Dot and the line down to the next dot (decorative) */}
          {/* The column stretches to the row height so "100%" below means one row. */}
          <div aria-hidden className="relative hidden w-3 shrink-0 self-stretch lg:-ml-1 lg:mr-7 lg:block">
            {/* Track, with the scroll fill inside it. --line-fill (0 to 1) is set by the hook below. */}
            <span className="absolute left-1/2 top-3.5 h-[calc(100%+5rem)] w-0.75 -translate-x-1/2 overflow-hidden bg-portfolio-grey-100 group-last:hidden">
              <span
                data-timeline-fill
                className="block size-full origin-top scale-y-(--line-fill) bg-portfolio-grey-900"
              />
            </span>
            <span
              data-timeline-dot
              className="absolute left-0 top-3.5 size-3 -translate-y-1/2 rounded-full bg-portfolio-grey-100 transition-colors duration-300 ease-out data-[active=true]:bg-portfolio-grey-900 motion-reduce:transition-none"
            />
          </div>

          {/* Logo tile: brand color behind the logo, positioned as in Figma */}
          <div
            className={`relative size-14 shrink-0 overflow-hidden rounded-case-md lg:size-13 ${entry.logo.tileClass}`}
          >
            <Image
              src={entry.logo.src}
              alt=""
              width={176}
              height={176}
              className={`absolute max-w-none ${entry.logo.imageClass}`}
            />
          </div>

          <div className="flex min-w-0 flex-col font-manrope font-bold">
            {/* Mobile date, above the role */}
            <p className="text-sm text-portfolio-grey-600 lg:hidden">{entry.dates}</p>
            <p className="text-lg text-portfolio-grey-900">{entry.role}</p>
            <p className="text-base font-semibold text-portfolio-grey-500">{entry.company}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// Ties the line fill to the scroll position. The "reading point" is the
// middle of the screen: a line piece is empty while its top is below that
// point, full once its bottom has passed it, and in between in proportion.
// Values are written straight onto the elements (no React re-render per
// scroll frame), batched into one update per animation frame.
function useTimelineScrollFill() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const readingPoint = window.innerHeight / 2;

      list.querySelectorAll<HTMLElement>("[data-timeline-fill]").forEach((fill) => {
        const track = fill.parentElement!.getBoundingClientRect();
        const progress = (readingPoint - track.top) / track.height;
        const clamped = Math.min(1, Math.max(0, progress));
        fill.style.setProperty("--line-fill", String(clamped));
      });

      list.querySelectorAll<HTMLElement>("[data-timeline-dot]").forEach((dot) => {
        const box = dot.getBoundingClientRect();
        const dotCenter = box.top + box.height / 2;
        dot.dataset.active = String(dotCenter <= readingPoint);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return listRef;
}
