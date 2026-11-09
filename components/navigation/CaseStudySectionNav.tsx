"use client";

import { CaseStudyTickNav } from "@/components/navigation/CaseStudyTickNav";
import { CaseStudyTimelineNav } from "@/components/navigation/CaseStudyTimelineNav";
import { useCaseStudyScroll } from "@/lib/useCaseStudyScroll";
import type { SectionNavItem } from "@/content/projects/types";

type CaseStudySectionNavProps = {
  sections: SectionNavItem[];
  /** Text class for the "Contents" title (the case study's brand color). */
  accentTextClass: string;
  /** Background class for the timeline's dots and line (the same brand color). */
  accentBgClass: string;
  /** This case study's slug, used by the timeline's previous and next arrows. */
  slug: string;
  /** "ticks" is the column of dashes on the left (live); "timeline" (floating bottom bar) and "sidebar" (left-hand panel) are kept as alternatives. */
  variant?: "ticks" | "timeline" | "sidebar";
  /** Everything on the page after the hero. */
  children: React.ReactNode;
};

// Two-column case study body: a sticky list of sections on the left, the
// content on the right. Only from xl (1280px) up; below that the nav is hidden
// and the content renders exactly as if this wrapper weren't here.
//
// The two columns together are exactly as wide as the hero panel (1140px): 200
// for the nav, 24 of gap, 916 for the content. The content was designed for
// 1140px, so it is zoomed to 916 / 1140 = 0.8035, which shrinks it evenly and
// keeps every card's approved composition. -mx-10 cancels the 40px side padding
// each section carries, so the content's edges land on the hero's edge.
//
// --case-text-inset (60px, the padding of the My Role box) is the one left line
// that all text and headings in the content share from xl up.
//
// The ticks and timeline variants have no side column, so the content stays at
// full size, on the same 1220px container as the hero.
export function CaseStudySectionNav({
  sections,
  accentTextClass,
  accentBgClass,
  slug,
  variant = "ticks",
  children,
}: CaseStudySectionNavProps) {
  const { currentId, isPastHero } = useCaseStudyScroll(sections);

  if (variant !== "sidebar") {
    return (
      <>
        {variant === "ticks" ? (
          <CaseStudyTickNav
            sections={sections}
            currentId={currentId}
            isRevealed={isPastHero}
            accentBgClass={accentBgClass}
          />
        ) : (
          <CaseStudyTimelineNav
            sections={sections}
            currentId={currentId}
            // The timeline stays hidden through the hero and Overview.
            isRevealed={currentId !== sections[0].id}
            accentBgClass={accentBgClass}
            slug={slug}
          />
        )}
        <div className="flex min-w-0 flex-col gap-24 sm:gap-32 xl:mx-auto xl:w-full xl:max-w-[1220px] xl:[--case-text-inset:60px]">
          {children}
        </div>
      </>
    );
  }

  return (
    <div className="xl:mx-auto xl:grid xl:w-full xl:max-w-[1220px] xl:grid-cols-[200px_minmax(0,1fr)] xl:gap-6 xl:px-10">
      <aside className="hidden xl:block">
        <nav
          data-case-study-section-nav
          aria-label="Case study sections"
          // Hugs its content and, once stuck, sits in the middle of the window:
          // 15rem is half the panel's height with nine sections. max() and
          // max-h keep it fully reachable in a very short window.
          className="sticky top-[max(2rem,calc(50dvh-15rem))] max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-case-xl bg-portfolio-grey-50 py-8 pl-8 pr-4"
        >
          <p className={`mb-2 font-manrope text-[14px] font-extrabold uppercase leading-[20px] tracking-[0.48px] ${accentTextClass}`}>
            Contents
          </p>
          <ul className="flex flex-col gap-2">
            {sections.map(({ id, label }) => {
              const isCurrent = id === currentId;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isCurrent ? "location" : undefined}
                    className={`flex h-9 items-center rounded-case-md font-manrope text-[15px] leading-[24px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-pink-500 ${
                      isCurrent
                        ? "font-bold text-portfolio-grey-900"
                        : "text-portfolio-grey-600 hover:text-portfolio-grey-900"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <div className="flex min-w-0 flex-col gap-24 sm:gap-32 xl:col-start-2 xl:-mx-10 xl:[zoom:0.8035] xl:[--case-text-inset:60px]">{children}</div>
    </div>
  );
}
