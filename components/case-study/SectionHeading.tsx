import { Reveal } from "@/components/motion/Reveal";

// A repeated case-study pattern: a small pink eyebrow label above a large
// heading and body copy (used for Context, Problem, My Approach, Takeaways,
// and Final Solution sections). Appears more than twice, so it's a shared
// component per ARCHITECTURE.md's component boundary rule.
const REVEAL_STAGGER_MS = 80;

type SectionHeadingProps = {
  eyebrow: string;
  heading: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  // Eyebrow text color. Defaults to Faircado pink; other case studies pass
  // their own brand token (eco.mio: "text-eco-mio-blue-500").
  accentClass?: string;
  // Reveal the label, heading and body one after another on scroll.
  reveal?: boolean;
};

export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  className = "",
  accentClass = "text-faircado-pink-500",
  reveal = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-8 ${align === "center" ? "items-center text-center" : "items-start"} ${className}`}
    >
      <Reveal as="p" preset="text" disabled={!reveal} stagger={REVEAL_STAGGER_MS} index={0} className={`font-manrope font-extrabold text-[16px] leading-[20px] tracking-[0.48px] uppercase ${accentClass}`}>
        {eyebrow}
      </Reveal>
      <div className="flex flex-col gap-4 w-full">
        <Reveal as="h2" preset="text" disabled={!reveal} stagger={REVEAL_STAGGER_MS} index={1} className="font-manrope font-bold text-[32px] leading-[1.2] tracking-[-1px] text-portfolio-grey-900 sm:text-[40px] sm:leading-[48px]">
          {heading}
        </Reveal>
        {body ? (
          <Reveal preset="text" disabled={!reveal} stagger={REVEAL_STAGGER_MS} index={2} className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
            {body}
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
