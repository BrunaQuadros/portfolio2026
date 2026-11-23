import Image from "next/image";
import type { ExperienceEntry } from "@/content/home";

// Work history on the homepage, newest first.
//
// From lg: (desktop), each row reads: dates on the left, a grey dot on a
// vertical line, an 88px logo tile, then the role with the company in grey.
// Below lg: the dates column, dots and line are hidden, the date moves above
// the role in small grey text, and the logo tile shrinks to 56px.
//
// The line is drawn per row: it starts at this row's dot and runs down one
// row height plus the 96px row gap (gap-24), so it ends on the next dot.
// The last row hides it.
export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ol aria-label="Work experience" className="flex flex-col gap-6 lg:mx-auto lg:gap-24">
      {entries.map((entry) => (
        <li key={entry.dates} className="group flex items-center gap-4 lg:gap-7">
          {/* Desktop dates column, right-aligned against the dot */}
          <p className="hidden w-48 shrink-0 text-right font-manrope text-3xl font-bold text-portfolio-grey-900 lg:block">
            {entry.dates}
          </p>

          {/* Dot and the line down to the next dot (decorative) */}
          {/* The column stretches to the row height so "100%" below means one row. */}
          <div aria-hidden className="relative hidden w-5 shrink-0 self-stretch lg:-ml-2 lg:block">
            <span className="absolute left-1/2 top-1/2 h-[calc(100%+6rem)] w-1 -translate-x-1/2 bg-portfolio-grey-400 group-last:hidden" />
            <span className="absolute left-0 top-1/2 size-5 -translate-y-1/2 rounded-full bg-portfolio-grey-400" />
          </div>

          {/* Logo tile: brand color behind the logo, positioned as in Figma */}
          <div
            className={`relative size-14 shrink-0 overflow-hidden rounded-case-md lg:size-22 ${entry.logo.tileClass}`}
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
            <p className="text-lg text-portfolio-grey-900 lg:text-3xl">{entry.role}</p>
            <p className="text-base text-portfolio-grey-600 lg:text-3xl">{entry.company}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
