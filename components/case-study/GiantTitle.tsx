// The giant pale-grey word with a small accent number in front ("01.
// Awareness", "01. Automation", "01. Audit"). First built inside
// SolutionSection; moved here unchanged when eco.mio's My process steps
// reused it. The parent must centre it (items-center) and clip overflow
// (overflow-x-hidden): below sm the word is deliberately wider than the
// phone and gets cropped evenly at both edges (Mobile Rule 6).
type GiantTitleProps = {
  id: string;
  number: string;
  title: string;
  // Color of the small number. Defaults to Faircado green.
  numberClass?: string;
  // Smaller size for long words (eco.mio "Personalization",
  // "Decentralization"), so they fit the 1140px content width.
  long?: boolean;
};

export function GiantTitle({ id, number, title, numberClass = "text-faircado-green-400", long = false }: GiantTitleProps) {
  // Long words: still cropped a little at the phone edges below sm (Mobile
  // Rule 6), and fitted to the content width from sm up.
  const titleSize = long
    ? "text-[12vw] sm:text-[8vw] lg:text-[104px]"
    : "text-[19vw] sm:text-[7vw] md:text-[14vw] lg:text-[152px]";
  return (
    // Below sm the title is deliberately wider than the phone screen
    // (~110% of it for "Awareness"): w-max keeps it on one line at its
    // natural width, and because the parent centres its children and
    // clips overflow, the word is cropped evenly on both edges instead
    // of pushing the page into horizontal scroll. The number stacks
    // centred above the word there (flex-col), so it isn't the part
    // that gets cropped; from sm up both sit inline as on desktop.
    <h3
      id={id}
      className="flex w-max max-w-none flex-col items-center font-[family-name:var(--font-inter-display)] font-bold leading-[1.1] tracking-[-2px] text-portfolio-grey-50 text-center sm:block sm:w-auto"
    >
      {/* A third of the title's size (matches Figma), baseline-aligned
          with it by default since both are inline text in the same h3.
          Mobile/sm sizes are pure vw (no flat px addend) so they scale
          with the viewport. Below sm the title is intentionally oversized
          (19vw, see the h3 comment) and cropped at the screen edges. The fixed 152px only kicks in at lg:
          at md (768-1023px) it still overflowed the content width, so
          md scales with the viewport too (14vw = ~107px at 768px). */}
      {/* -mb-5 below sm pulls the stacked number 20px down into the word's
          line box, so it sits tight against (slightly overlapping) the
          word's cap height instead of floating above it. */}
      <span className={`-mb-5 text-[6.4vw] sm:mb-0 sm:text-[2.33vw] md:text-[3.4vw] lg:text-[2.33rem] ${numberClass}`}>{number}</span>
      <span className={titleSize}>{title}</span>
    </h3>
  );
}
