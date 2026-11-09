import { useEffect, useState } from "react";
import type { SectionNavItem } from "@/content/projects/types";

// How far down the screen a section's top must reach to count as "the one
// being read": 35% of the window height.
const ACTIVE_LINE = 0.35;

// Finds the section being read: the last one whose top has passed the line.
function findCurrentSection(sections: SectionNavItem[]) {
  const line = window.innerHeight * ACTIVE_LINE;
  let current = sections[0].id;
  for (const { id } of sections) {
    const element = document.getElementById(id);
    if (element && element.getBoundingClientRect().top <= line) current = id;
  }
  return current;
}

// True once the first section's top has passed the line, right after the hero.
function hasReachedFirstSection(sections: SectionNavItem[]) {
  const first = document.getElementById(sections[0].id);
  return first !== null && first.getBoundingClientRect().top <= window.innerHeight * ACTIVE_LINE;
}

// Follows the page's scroll position for the case study section navs: which
// section is being read, and whether the hero has been left behind.
export function useCaseStudyScroll(sections: SectionNavItem[]) {
  const [currentId, setCurrentId] = useState(sections[0].id);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setCurrentId(findCurrentSection(sections));
        setIsPastHero(hasReachedFirstSection(sections));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  return { currentId, isPastHero };
}
