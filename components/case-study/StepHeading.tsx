// The heading block of one step inside a multi-step section (eco.mio's "My
// process": 1. Audit, 2. Align, 3. Scope): a small numbered label in the
// case study's accent color, an h3 one size below the section's h2, and an
// optional body. Repeats once per step, so it's a shared component.
type StepHeadingProps = {
  label: string;
  heading: string;
  body?: React.ReactNode;
  // Label color, the case study's brand token (eco.mio: "text-eco-mio-blue-500").
  accentClass: string;
  className?: string;
};

export function StepHeading({ label, heading, body, accentClass, className = "" }: StepHeadingProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className={`font-manrope font-bold text-[16px] leading-[20px] ${accentClass}`}>{label}</p>
      <h3 className="font-manrope font-bold text-[28px] leading-[1.2] tracking-[-1px] text-portfolio-grey-900 sm:text-[32px]">
        {heading}
      </h3>
      {body ? (
        <div className="mt-2 max-w-[640px] font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
          {body}
        </div>
      ) : null}
    </div>
  );
}
