import { TagPill } from "./TagPill";

// One of the three "how might we" problem cards (Awareness / Match accuracy /
// Momentum). Repeats 3 times on the page, so it's a shared component.
type ProblemCardProps = {
  tag: string;
  tagIcon: string;
  heading: string;
  headingAccent?: string;
  headingTail?: string;
  body: string;
};

export function ProblemCard({ tag, tagIcon, heading, headingAccent, headingTail, body }: ProblemCardProps) {
  return (
    <div className="flex flex-1 flex-col items-start justify-between gap-8 rounded-[40px] bg-portfolio-grey-50 p-10 min-w-[260px]">
      <TagPill icon={tagIcon} label={tag} />
      <div className="flex flex-col gap-3">
        <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
          {heading}
          {headingAccent ? <span className="text-faircado-green-500">{headingAccent}</span> : null}
          {headingTail}
        </p>
        <p className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
          {body}
        </p>
      </div>
    </div>
  );
}
