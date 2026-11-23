import type { TextSegment } from "@/content/home";

// Large statement paragraph on the homepage (Figma "Subtitle" style: Manrope
// medium 40px / 60px, with some words in bold). 24px on phones, 40px from sm:.
export function StatementParagraph({ segments }: { segments: TextSegment[] }) {
  return (
    <p className="mx-auto w-full max-w-5xl font-manrope text-2xl font-medium leading-[1.5] tracking-[-0.03em] text-portfolio-grey-900 sm:text-[40px]">
      {segments.map((segment, index) =>
        segment.bold ? (
          <strong key={index} className="font-bold">
            {segment.text}
          </strong>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}
