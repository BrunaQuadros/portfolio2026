import Image from "next/image";
import { TagPill } from "./TagPill";
import type { AnnotatedImage, BeforeAfterPair, SolutionBlock as SolutionBlockType } from "@/content/projects/types";

// One of the three big numbered solution sections (01/ Awareness, 02/
// Accuracy, 03/ Momentum). Each contains one or more rounded "onboarding"
// style cards with a tag, heading, and mobile screenshots. Repeats 3 times
// with the same visual shape, so it's a shared component; the giant
// background number reproduces the Figma effect with plain Tailwind
// (a large light-grey heading) instead of absolute pixel placement.
type SolutionSectionProps = {
  number: string;
  title: string;
  tagIcon: string;
  tag: string;
  blocks: SolutionBlockType[];
};

function ScreenshotFrame({ image, priority = false }: { image: AnnotatedImage; priority?: boolean }) {
  return (
    <figure className="flex w-[220px] flex-col items-center gap-3 sm:w-[250px]">
      <div className="relative aspect-[250/541] w-full overflow-hidden rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
        {image.video ? (
          <>
            <video
              src={image.video.src}
              className="absolute inset-0 size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-label={image.alt}
            />
            {/* Static PNG has a transparent center (Figma export), so the UI chrome
                (status bar, button) sits over the looping video underneath it. */}
            <Image src={image.src} alt="" aria-hidden="true" fill className="absolute inset-0 object-cover" priority={priority} />
          </>
        ) : (
          <Image src={image.src} alt={image.alt} fill className="object-cover" priority={priority} />
        )}
      </div>
      {image.caption ? (
        <figcaption className="font-manrope text-[14px] leading-[20px] tracking-[0.48px] text-portfolio-grey-600 text-center">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function BeforeAfterFrame({ pair }: { pair: BeforeAfterPair }) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-10">
      <figure className="flex w-[220px] flex-col items-center gap-3 sm:w-[250px]">
        <div className="relative aspect-[250/541] w-full overflow-hidden rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
          <Image src={pair.before.src} alt={pair.before.alt} fill className="object-cover" />
        </div>
        <figcaption className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.48px] text-portfolio-grey-600 text-center uppercase">
          Before
        </figcaption>
      </figure>
      <figure className="flex w-[220px] flex-col items-center gap-3 sm:w-[250px]">
        <div className="relative aspect-[250/541] w-full overflow-hidden rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
          <Image src={pair.after.src} alt={pair.after.alt} fill className="object-cover" />
        </div>
        <figcaption className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.48px] text-portfolio-grey-600 text-center uppercase">
          After
        </figcaption>
      </figure>
      {pair.annotations?.length ? (
        <ol className="flex w-full max-w-[250px] flex-col gap-2">
          {pair.annotations.map((annotation, i) => (
            <li key={i} className="flex items-start gap-3 font-manrope text-[16px] leading-[26px] text-portfolio-grey-900">
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-faircado-pink-400 text-[14px] font-bold text-portfolio-grey-900"
              >
                {i + 1}
              </span>
              {annotation}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export function SolutionSection({ number, title, tagIcon, tag, blocks }: SolutionSectionProps) {
  return (
    <section className="flex w-full flex-col items-center gap-7" aria-labelledby={`solution-${title.toLowerCase()}`}>
      <h3
        id={`solution-${title.toLowerCase()}`}
        className="font-[family-name:var(--font-inter-display)] font-bold text-[15vw] leading-[1.1] tracking-[-2px] text-portfolio-grey-50 sm:text-[8vw] md:text-[7rem] text-center"
      >
        <span className="text-faircado-green-400">{number}</span>
        {title}
      </h3>
      <div className="flex w-full flex-col items-center gap-20">
        {blocks.map((block, i) => (
          <div
            key={i}
            className="relative flex w-full flex-col items-center gap-15 rounded-case-3xl bg-portfolio-grey-50 px-6 py-15 sm:px-16"
          >
            <div className="absolute left-6 top-6 sm:left-10 sm:top-10">
              <TagPill icon={tagIcon} label={tag} />
            </div>
            <p className="max-w-[500px] pt-14 text-center font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
              {block.heading}
            </p>
            {block.beforeAfter ? (
              <BeforeAfterFrame pair={block.beforeAfter} />
            ) : (
              <div className="flex flex-wrap items-start justify-center gap-10">
                {block.images.map((image, imgIndex) => (
                  <ScreenshotFrame key={imgIndex} image={image} priority={i === 0 && imgIndex === 0} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
