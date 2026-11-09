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

// Follows the page's scroll position for the case study section navs: which
// section is being read.
export function useCaseStudyScroll(sections: SectionNavItem[]) {
  const [currentId, setCurrentId] = useState(sections[0].id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCurrentId(findCurrentSection(sections)));
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

  return currentId;
}
