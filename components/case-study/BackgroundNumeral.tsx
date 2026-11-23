// Big pale 01 / 02 / 03 drawn behind a column (Faircado Takeaways, eco.mio
// My process). The numeral SVG is used as a mask and filled with the
// portfolio-grey-50 token, so it follows light and dark mode instead of the
// #f7f7f7 baked into the file. Same 369 x 252 shape as the SVG.
// Decorative: hidden from screen readers. Position and width come from the
// caller through className.

// Written out in full so Tailwind can find each class.
const MASKS = {
  1: "mask-[url(/images/case-studies/faircado/takeaways-number-01.svg)]",
  2: "mask-[url(/images/case-studies/faircado/takeaways-number-02.svg)]",
  3: "mask-[url(/images/case-studies/faircado/takeaways-number-03.svg)]",
} as const;

export function BackgroundNumeral({ number, className = "" }: { number: 1 | 2 | 3; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block aspect-[369/252] bg-portfolio-grey-50 mask-contain mask-no-repeat ${MASKS[number]} ${className}`}
    />
  );
}
