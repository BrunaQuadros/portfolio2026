import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentCaseStudies } from "@/content/projects/caseStudyOrder";
import type { SectionNavItem } from "@/content/projects/types";

type CaseStudyTimelineNavProps = {
  sections: SectionNavItem[];
  currentId: string;
  /** True once the visitor has scrolled down: the timeline grows into view. */
  isRevealed: boolean;
  /** Background class for the dots and line already read (the case study's brand color). */
  accentBgClass: string;
  /** This case study's slug, used to find the previous and next ones. */
  slug: string;
};

const REVEAL_MOTION = "duration-300 ease-out motion-reduce:transition-none";
const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-pink-500";

// Each column is a small slot for its dot or arrow, and widens to fit its name
// while the timeline is hovered or reached with the keyboard.
const COLUMN_OPEN = "w-6 group-hover:w-[112px] group-has-[:focus-visible]:w-[112px]";
const ARROW_OPEN = "w-7 group-hover:w-16 group-has-[:focus-visible]:w-16";

// The name under a dot or arrow, hidden until the timeline opens. -mt-2 pulls
// it up close under its dot.
const LABEL =
  "block h-0 overflow-hidden whitespace-nowrap opacity-0 transition-[height,opacity,margin] duration-300 ease-out motion-reduce:transition-none group-hover:-mt-2 group-hover:h-7 group-hover:opacity-100 group-has-[:focus-visible]:-mt-2 group-has-[:focus-visible]:h-7 group-has-[:focus-visible]:opacity-100";

// The dot under the pointer (or keyboard focus) grows and turns near-black, so
// it's clear which section a click will jump to.
const DOT_HOVER =
  "group-hover/dot:size-3 group-hover/dot:bg-portfolio-grey-900 group-focus-visible/dot:size-3 group-focus-visible/dot:bg-portfolio-grey-900";

// Staggers the pop-in. A dynamic per-item value, so it can't be a class.
function revealDelay(isRevealed: boolean, index: number): CSSProperties | undefined {
  return isRevealed ? { transitionDelay: `${index * 40}ms` } : undefined;
}

type CaseStudyArrowLinkProps = {
  direction: "previous" | "next";
  caseStudy: { name: string; href: string };
  isRevealed: boolean;
  delay: CSSProperties | undefined;
};

// The arrow at either end of the timeline, leading to another case study.
function CaseStudyArrowLink({ direction, caseStudy, isRevealed, delay }: CaseStudyArrowLinkProps) {
  const Icon = direction === "previous" ? ArrowLeft : ArrowRight;
  const label = direction === "previous" ? "Previous" : "Next";

  return (
    <Link
      href={caseStudy.href}
      aria-label={`${label} case study: ${caseStudy.name}`}
      className={`flex shrink-0 flex-col items-center rounded-case-md font-manrope text-xs text-portfolio-grey-900 transition-[width] ${REVEAL_MOTION} ${FOCUS_RING} ${
        isRevealed ? ARROW_OPEN : "w-0"
      }`}
    >
      <span aria-hidden="true" className="flex h-9 w-full items-center justify-center">
        <span style={delay} className={`transition-[scale] ${REVEAL_MOTION} ${isRevealed ? "scale-100" : "scale-0"}`}>
          <Icon className="size-3.5" />
        </span>
      </span>
      <span aria-hidden="true" className={LABEL}>
        {label}
      </span>
    </Link>
  );
}

// A small floating timeline at the bottom centre of the window, one dot per
// section with an arrow to the previous and next case study at its ends, from
// xl (1280px) up. It appears once the visitor scrolls: the columns widen from
// the centre while dots and line segments pop in from left to right. The names
// stay in the page for screen readers and only become visible on hover or
// keyboard focus (has-[:focus-visible], so a mouse click doesn't leave it open).
export function CaseStudyTimelineNav({ sections, currentId, isRevealed, accentBgClass, slug }: CaseStudyTimelineNavProps) {
  const currentIndex = sections.findIndex(({ id }) => id === currentId);
  const { previous, next } = getAdjacentCaseStudies(slug);

  return (
    <nav
      data-case-study-section-nav
      aria-label="Case study navigation"
      className={`group fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 items-start rounded-full bg-white px-3 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] transition-[opacity,visibility] xl:flex ${REVEAL_MOTION} ${
        isRevealed ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <CaseStudyArrowLink direction="previous" caseStudy={previous} isRevealed={isRevealed} delay={revealDelay(isRevealed, 0)} />
      <ol className="flex">
        {sections.map(({ id, label }, index) => {
          const isCurrent = index === currentIndex;
          const isRead = index < currentIndex;
          const stagger = revealDelay(isRevealed, index + 1);

          return (
            <li key={id} className={`transition-[width] ${REVEAL_MOTION} ${isRevealed ? COLUMN_OPEN : "w-0"}`}>
              <a
                href={`#${id}`}
                aria-current={isCurrent ? "location" : undefined}
                className={`group/dot flex w-full flex-col items-center rounded-case-md font-manrope text-xs ${FOCUS_RING}`}
              >
                <span aria-hidden="true" className="relative flex h-9 w-full items-center justify-center">
                  {index < sections.length - 1 ? (
                    <span
                      style={stagger}
                      className={`pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-full origin-left -translate-y-1/2 transition-[scale] ${REVEAL_MOTION} ${
                        isRevealed ? "scale-x-100" : "scale-x-0"
                      } ${isRead ? accentBgClass : "bg-portfolio-grey-200"}`}
                    />
                  ) : null}
                  <span
                    style={stagger}
                    className={`relative z-10 transition-[scale] ${REVEAL_MOTION} ${isRevealed ? "scale-100" : "scale-0"}`}
                  >
                    <span
                      className={`block rounded-full transition-[width,height,background-color] duration-150 ease-out motion-reduce:transition-none ${DOT_HOVER} ${
                        isCurrent ? `size-2.5 ${accentBgClass}` : `size-1.5 ${isRead ? accentBgClass : "bg-portfolio-grey-400"}`
                      }`}
                    />
                  </span>
                </span>
                <span
                  className={`${LABEL} group-hover/dot:text-portfolio-grey-900 group-focus-visible/dot:text-portfolio-grey-900 ${
                    isCurrent ? "font-bold text-portfolio-grey-900" : "text-portfolio-grey-600"
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      <CaseStudyArrowLink direction="next" caseStudy={next} isRevealed={isRevealed} delay={revealDelay(isRevealed, sections.length + 1)} />
    </nav>
  );
}
