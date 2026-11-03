// A repeated case-study pattern: a small pink eyebrow label above a large
// heading and body copy (used for Context, Problem, My Approach, Takeaways,
// and Final Solution sections). Appears more than twice, so it's a shared
// component per ARCHITECTURE.md's component boundary rule.
type SectionHeadingProps = {
  eyebrow: string;
  heading: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  // Eyebrow text color. Defaults to Faircado pink; other case studies pass
  // their own brand token (eco.mio: "text-eco-mio-blue-500").
  accentClass?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  className = "",
  accentClass = "text-faircado-pink-500",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-8 ${align === "center" ? "items-center text-center" : "items-start"} ${className}`}
    >
      <p className={`font-manrope font-extrabold text-[16px] leading-[20px] tracking-[0.48px] uppercase ${accentClass}`}>
        {eyebrow}
      </p>
      <div className="flex flex-col gap-4 w-full">
        <h2 className="font-manrope font-bold text-[32px] leading-[1.2] tracking-[-1px] text-portfolio-grey-900 sm:text-[40px] sm:leading-[48px]">
          {heading}
        </h2>
        {body ? (
          <div className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
            {body}
          </div>
        ) : null}
      </div>
    </div>
  );
}
