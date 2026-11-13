import { home } from "@/content/home";
import { getAdjacentCaseStudies, nextProjectHeading } from "@/content/projects/caseStudyOrder";
import { ProjectCard } from "@/components/home/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";

// Closing block of every case study: a centered "Next Project" heading and the
// next case study's homepage card (same ProjectCard, same content from
// content/home.ts), so the two never drift apart. The order comes from
// caseStudyOrder.ts and loops back to the first case study at the end.
export function NextProjectSection({ slug }: { slug: string }) {
  const { next } = getAdjacentCaseStudies(slug);
  const card = home.projects.find((project) => project.href === next.href);

  // No homepage card for the next case study yet: show nothing rather than a
  // broken block.
  if (!card) return null;

  return (
    // Same width rules as the homepage card list: 16px gutters on phones,
    // full width up to 1220px from sm: up.
    <section
      aria-labelledby="next-project-heading"
      className="mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-16 sm:px-0"
    >
      <Reveal preset="text">
        {/* Same type as the case study section headings (SectionHeading). */}
        <h2
          id="next-project-heading"
          className="text-center font-manrope text-[32px] font-bold leading-[1.2] tracking-[-1px] text-portfolio-grey-900 sm:text-[40px] sm:leading-[48px]"
        >
          {nextProjectHeading}
        </h2>
      </Reveal>
      <Reveal preset="card">
        <ProjectCard {...card} />
      </Reveal>
    </section>
  );
}
