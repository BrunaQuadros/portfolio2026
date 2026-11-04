import { TagPill } from "./TagPill";

// The heading block of one step inside a multi-step section (eco.mio's "My
// process": 1. Audit, 2. Align, 3. Scope): the step's name in the same tag
// pill the case study uses everywhere else (no new label style), an h3 one
// size below the section's h2, and an optional body. Repeats once per step,
// so it's a shared component.
type StepHeadingProps = {
  label: string;
  heading: string;
  body?: React.ReactNode;
  className?: string;
};

export function StepHeading({ label, heading, body, className = "" }: StepHeadingProps) {
  return (
    <div className={`flex flex-col items-start gap-4 ${className}`}>
      <TagPill label={label} />
      <h3 className="font-manrope font-bold text-[28px] leading-[1.2] tracking-[-1px] text-portfolio-grey-900 sm:text-[32px]">
        {heading}
      </h3>
      {body ? (
        <div className="max-w-[640px] font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
          {body}
        </div>
      ) : null}
    </div>
  );
}
