import { GiantTitle } from "./GiantTitle";

// The heading block of one step inside a multi-step section (eco.mio's "My
// process": 01. Audit, 02. Align, 03. Scope): the same giant grey numbered
// word as the solution sections, then an h3 and an optional body, all
// centred under it. Repeats once per step, so it's a shared component.
type StepHeadingProps = {
  number: string;
  title: string;
  heading: string;
  body?: React.ReactNode;
  // Color of the small number, the case study's brand token.
  numberClass: string;
  // Smaller giant word for long titles (see GiantTitle).
  long?: boolean;
};

export function StepHeading({ number, title, heading, body, numberClass, long = false }: StepHeadingProps) {
  return (
    // overflow-x-hidden + items-center: GiantTitle crops evenly at the
    // phone edges instead of scrolling the page.
    <div className="flex w-full flex-col items-center gap-7 overflow-x-hidden">
      <GiantTitle id={`step-${title.toLowerCase()}`} number={number} title={title} numberClass={numberClass} long={long} />
      <div className="flex max-w-[640px] flex-col items-center gap-4 text-center">
        <p className="font-manrope font-bold text-[28px] leading-[1.2] tracking-[-1px] text-portfolio-grey-900 sm:text-[32px]">
          {heading}
        </p>
        {body ? (
          <div className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
            {body}
          </div>
        ) : null}
      </div>
    </div>
  );
}
