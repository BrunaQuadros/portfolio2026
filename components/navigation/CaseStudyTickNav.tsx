import type { SectionNavItem } from "@/content/projects/types";

type CaseStudyTickNavProps = {
  sections: SectionNavItem[];
  currentId: string;
  /** True once the visitor has reached the first section, right after the hero. */
  isRevealed: boolean;
  /** Background class for the current section's tick (the case study's brand color). */
  accentBgClass: string;
};

const HIDE_ON_INTERACTION = "group-hover:opacity-0 group-has-[:focus-visible]:opacity-0";
const SHOW_ON_INTERACTION = "group-hover:opacity-100 group-has-[:focus-visible]:opacity-100";

// A column of small grey ticks fixed to the middle of the window's left edge,
// one per section, from xl (1280px) up. The current section's tick is longer
// and in the brand color. Hovering any tick (or reaching one with the keyboard) replaces
// every tick, in place, with its section name: just words, no panel, near-black
// so they stay readable over any section. The name under the pointer turns
// bold. Names stay in the page for screen readers throughout, and
// pointer-events-none stops the invisible ones from catching the mouse over the
// page content.
export function CaseStudyTickNav({ sections, currentId, isRevealed, accentBgClass }: CaseStudyTickNavProps) {
  return (
    <nav
      data-case-study-section-nav
      aria-label="Case study sections"
      className={`group fixed left-4 top-1/2 z-50 hidden w-8 -translate-y-1/2 transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none xl:block ${
        isRevealed ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <ol>
        {sections.map(({ id, label }, index) => {
          const isCurrent = id === currentId;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isCurrent ? "location" : undefined}
                className="group/tick relative flex h-6 w-full items-center rounded-case-md pl-3 font-manrope text-xs focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-portfolio-pink-500"
              >
                {/* The outer span draws the tick in from the left on reveal,
                    staggered per row (a dynamic value, so not a class). */}
                <span
                  aria-hidden="true"
                  style={isRevealed ? { transitionDelay: `${index * 40}ms` } : undefined}
                  className={`origin-left transition-[scale] duration-300 ease-out motion-reduce:transition-none ${
                    isRevealed ? "scale-x-100" : "scale-x-0"
                  }`}
                >
                  <span
                    className={`block h-[3px] rounded-full transition-[width,background-color,opacity] duration-150 ease-out motion-reduce:transition-none ${HIDE_ON_INTERACTION} ${
                      isCurrent ? `w-4 ${accentBgClass}` : "w-2 bg-portfolio-grey-600/60"
                    }`}
                  />
                </span>
                <span
                  className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-portfolio-grey-900 opacity-0 transition-opacity duration-150 ease-out group-hover:pointer-events-auto group-hover/tick:font-bold group-focus-visible/tick:font-bold motion-reduce:transition-none ${SHOW_ON_INTERACTION} ${
                    isCurrent ? "font-bold" : ""
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
