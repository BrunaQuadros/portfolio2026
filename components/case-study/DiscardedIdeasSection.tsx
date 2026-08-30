import Image from "next/image";
import { TagPill } from "./TagPill";
import { SectionHeading } from "./SectionHeading";
import type { DiscardedIdea } from "@/content/projects/types";

// Section 7: "Some of the many 'NOs'" — a closing side note listing ideas
// that were tried and dropped for each front (Awareness/Accuracy/Momentum).
// Same tag + screenshot + caption shape as the solution sections' cards, but
// simpler (no badges/pins/overlays), so it's its own lightweight component
// rather than reusing SolutionSection's internals.
type DiscardedIdeasSectionProps = {
  eyebrow: string;
  heading: string;
  bodyLead: string;
  bodyAccent1: string;
  bodyMid: string;
  bodyAccent2: string;
  items: DiscardedIdea[];
};

export function DiscardedIdeasSection({
  eyebrow,
  heading,
  bodyLead,
  bodyAccent1,
  bodyMid,
  bodyAccent2,
  items,
}: DiscardedIdeasSectionProps) {
  return (
    <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-16 px-6 sm:px-10">
      <div
        className="w-full lg:max-w-[592px]"
        // Same text-container alignment trick used by Context, Problem, My
        // Approach, and Insight, so this heading's left edge lines up with
        // theirs.
        style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}
      >
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          body={
            <p>
              {bodyLead}
              <span className="font-bold">{bodyAccent1}</span>
              {bodyMid}
              <span className="font-bold">{bodyAccent2}</span>
            </p>
          }
        />
      </div>
      <div className="flex flex-wrap items-start justify-center gap-x-[160px] gap-y-16">
        {items.map((item, i) => (
          <div key={i} className="flex w-[220px] flex-col items-start gap-12 sm:w-[250px]">
            <TagPill icon={item.tagIcon} label={item.tag} />
            <figure className="flex w-full flex-col items-center gap-3">
              <div className="relative aspect-[250/541] w-full overflow-hidden rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                <Image src={item.image.src} alt={item.image.alt} fill className="object-cover" />
              </div>
              <figcaption className="flex flex-col gap-1 text-center">
                <p className="font-manrope font-bold text-[14px] leading-[20px] text-portfolio-grey-600">
                  {item.captionTitle}
                </p>
                <p className="font-manrope text-[14px] leading-[20px] text-portfolio-grey-600">
                  {item.captionBody}
                </p>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
