import Image from "next/image";
import { Search, X } from "lucide-react";
import { TagPill } from "./TagPill";
import type {
  AnnotatedImage,
  BeforeAfterPair,
  BeforeAfterPin,
  SearchChip,
  SolutionBlock as SolutionBlockType,
} from "@/content/projects/types";

const IMG = "/images/case-studies/faircado";

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

// A small circular close-up of the same image, connected by a black line to
// the spot it's zooming in on — e.g. the shirt logo callout on the model
// training mockup. Reuses the source image itself for the close-up crop
// (scaled up and translated so the target point lands centered in the
// circle) instead of a separate cropped asset.
function ImageBadge({ src, badge }: { src: string; badge: NonNullable<AnnotatedImage["badge"]> }) {
  const frameWidth = 250;
  const frameHeight = 541;
  const badgeSize = 91;
  const ringSize = 32;
  const zoomedWidth = frameWidth * badge.zoom;
  const zoomedHeight = frameHeight * badge.zoom;
  const translateX = badgeSize / 2 - (badge.pointLeft / 100) * zoomedWidth;
  const translateY = badgeSize / 2 - (badge.pointTop / 100) * zoomedHeight;

  // Shorten the line's start so it touches the ring's edge instead of
  // running into its center — offset the start point by the ring's
  // radius, in real pixels, along the line's direction toward the badge.
  const pointPx = { x: (badge.pointLeft / 100) * frameWidth, y: (badge.pointTop / 100) * frameHeight };
  const badgePx = { x: (badge.badgeLeft / 100) * frameWidth, y: (badge.badgeTop / 100) * frameHeight };
  const dx = badgePx.x - pointPx.x;
  const dy = badgePx.y - pointPx.y;
  const dist = Math.hypot(dx, dy);
  const lineStartPx = {
    x: pointPx.x + (dx / dist) * (ringSize / 2),
    y: pointPx.y + (dy / dist) * (ringSize / 2),
  };
  const lineStartLeft = (lineStartPx.x / frameWidth) * 100;
  const lineStartTop = (lineStartPx.y / frameHeight) * 100;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {/* Transparent loupe ring circling the logo, instead of a small
          filled dot — matches the "circle the detail, don't cover it"
          reference. */}
      <span
        className="absolute rounded-full border-2 border-portfolio-grey-900"
        style={{
          width: ringSize,
          height: ringSize,
          top: `${badge.pointTop}%`,
          left: `${badge.pointLeft}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <svg className="absolute inset-0 size-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line
          x1={lineStartLeft}
          y1={lineStartTop}
          x2={badge.badgeLeft}
          y2={badge.badgeTop}
          stroke="#121212"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        className="absolute overflow-hidden rounded-full border-2 border-portfolio-grey-900 bg-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]"
        style={{
          width: badgeSize,
          height: badgeSize,
          top: `${badge.badgeTop}%`,
          left: `${badge.badgeLeft}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {badge.zoomedSrc ? (
          <Image src={badge.zoomedSrc} alt="" fill className="object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- fixed pixel
          // crop of the same source image, not a responsive content image
          <img
            src={src}
            alt=""
            style={{
              position: "absolute",
              width: zoomedWidth,
              height: zoomedHeight,
              left: translateX,
              top: translateY,
              maxWidth: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}

function ScreenshotFrame({ image, priority = false }: { image: AnnotatedImage; priority?: boolean }) {
  return (
    <figure className="flex w-[220px] flex-col items-center gap-3 sm:w-[250px]">
      <div className="relative aspect-[250/541] w-full overflow-visible">
        {image.video ? (
          <>
            <video
              src={image.video.src}
              poster={image.video.poster}
              className="absolute inset-0 size-full rounded-case-xl object-cover shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]"
              autoPlay
              muted
              loop
              playsInline
              aria-label={image.alt}
            />
            {image.video.overlayFrame ? (
              // Static PNG has a transparent center (Figma export), so the UI chrome
              // (status bar, button) sits over the looping video underneath it.
              <Image src={image.src} alt="" aria-hidden="true" fill className="absolute inset-0 object-cover" priority={priority} />
            ) : null}
          </>
        ) : (
          <Image src={image.src} alt={image.alt} fill className="rounded-case-xl object-cover shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]" priority={priority} />
        )}
        {image.badge ? <ImageBadge src={image.src} badge={image.badge} /> : null}
        {image.overlayTag ? (
          <img
            src={`${IMG}/tag-find-similar.png`}
            alt=""
            aria-hidden="true"
            className="absolute z-10 h-auto w-[168px]"
            style={{ top: `${image.overlayTag.top}%`, left: `${image.overlayTag.left}%`, transform: "translate(-50%, -50%)" }}
          />
        ) : null}
        {image.overlayTip ? (
          <img
            src={`${IMG}/${image.overlayTip.icon === "fire" ? "badge_almosttaken" : "badge_popular"}.png`}
            alt=""
            aria-hidden="true"
            className="absolute z-10 h-auto w-[280px] max-w-none"
            style={{ top: `${image.overlayTip.top}%`, left: "50%", transform: "translate(-50%, -50%)" }}
          />
        ) : null}
      </div>
      {image.caption ? (
        <figcaption className="font-manrope text-[14px] leading-[20px] tracking-[0.48px] text-portfolio-grey-600 text-center">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// The three "example search chip" mockups in Accuracy block 1's sidebar —
// a tiny illustrated search bar row, not a real interactive search input.
function SearchChipRow({ chip }: { chip: SearchChip }) {
  return (
    <div className="flex h-10 w-full items-center gap-3 rounded-lg bg-white px-3 py-1 shadow-[0px_7px_10px_0px_rgba(0,0,0,0.12)]">
      <Search className="size-[17px] shrink-0 text-portfolio-grey-600" aria-hidden="true" />
      <div className="relative size-[26px] shrink-0 overflow-hidden rounded-[4px]">
        <Image src={chip.thumbnail} alt="" aria-hidden="true" fill className="object-cover" />
      </div>
      <span className="flex-1 truncate font-manrope text-[14px] text-portfolio-grey-600">{chip.text}</span>
      <X className="size-[17px] shrink-0 text-portfolio-grey-600" aria-hidden="true" />
    </div>
  );
}

// A small "peek" card flanking Momentum block 1's two mockups — a cropped
// product card (mimicking a results-grid tile) with a big corner badge,
// hinting at the urgency badges appearing throughout the results feed.
// Desktop only: at narrower widths there isn't room for it beside the
// two full-size mockups.
function PeekCard({ image, badgeIcon }: { image: string; badgeIcon: string }) {
  return (
    <div className="relative hidden h-[299px] w-[226px] shrink-0 overflow-hidden rounded-case-xl lg:block" aria-hidden="true">
      <div className="absolute left-[30px] top-[30px] w-[160px] drop-shadow-[0px_8px_12px_rgba(0,0,0,0.12)]">
        <div className="relative flex h-[195px] w-full flex-col items-end justify-between rounded-case-md border-[0.5px] border-portfolio-grey-200 p-2">
          <div className="absolute inset-0 overflow-hidden rounded-case-md bg-portfolio-grey-50">
            <Image src={image} alt="" fill className="object-contain p-0.5" />
          </div>
          <div className="relative flex w-full items-start justify-end">
            <span className="flex size-8 items-center justify-center rounded-full border-[0.5px] border-portfolio-grey-200 bg-portfolio-grey-50 shadow-[1px_1px_2px_0px_rgba(155,157,155,0.2)]">
              <img src={`${IMG}/icon-heart.svg`} alt="" className="size-[18px]" />
            </span>
          </div>
          <img src={`${IMG}/icon-similar-items-btn.svg`} alt="" className="relative size-8" />
        </div>
        <img
          src={badgeIcon}
          alt=""
          className="absolute -left-1.5 -top-1.5 size-[50px] drop-shadow-[0px_2px_19px_rgba(217,217,217,0.2)]"
        />
      </div>
    </div>
  );
}

// A numbered pin pointing at a spot on a screenshot: a black connector
// line running from the anchor point to a shared right-aligned column,
// where the numbered badge sits — so pins pointing at different depths
// in the screenshot have different line lengths but their badges all
// line up on the right, matching the Figma "Number" callout. The number
// is decorative (aria-hidden) — its meaning is carried by the sr-only
// annotation list rendered alongside each image.
function Pin({ number, top, left }: { number: number; top: number; left: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-10 h-px"
      style={{ top: `calc(${top}% + 13px)`, left: `${left}%`, right: "-52px" }}
    >
      <span className="absolute inset-0 bg-portfolio-grey-900" />
      <span className="absolute right-0 top-1/2 flex size-7 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-faircado-pink-400 font-manrope text-[14px] font-bold text-portfolio-grey-900">
        {number}
      </span>
    </div>
  );
}

function BeforeAfterImage({
  image,
  caption,
  pins,
}: {
  image: AnnotatedImage;
  caption: string;
  pins: (BeforeAfterPin & { number: number })[];
}) {
  return (
    <figure className="flex w-[220px] shrink-0 flex-col items-center gap-3 mr-16 sm:w-[250px]">
      <div className="relative aspect-[250/541] w-full overflow-visible rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
        <Image src={image.src} alt={image.alt} fill className="rounded-case-xl object-cover" />
        {pins.map((pin) => (
          <Pin key={pin.number} number={pin.number} top={pin.top} left={pin.left} />
        ))}
      </div>
      <figcaption className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.48px] text-portfolio-grey-600 text-center uppercase">
        {caption}
      </figcaption>
      {pins.length ? (
        <ol className="sr-only">
          {pins.map((pin) => (
            <li key={pin.number}>{pin.label}</li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}

function BeforeAfterFrame({ pair }: { pair: BeforeAfterPair }) {
  const numberedPins = (pair.pins ?? []).map((pin, i) => ({ ...pin, number: i + 1 }));
  const beforePins = numberedPins.filter((pin) => pin.showOn === "before" || pin.showOn === "both");
  const afterPins = numberedPins.filter((pin) => pin.showOn === "after" || pin.showOn === "both");

  return (
    <div className="flex flex-wrap items-start justify-center gap-10">
      <BeforeAfterImage image={pair.before} caption="Before" pins={beforePins} />
      <BeforeAfterImage image={pair.after} caption="After" pins={afterPins} />
    </div>
  );
}

export function SolutionSection({ number, title, tagIcon, tag, blocks }: SolutionSectionProps) {
  return (
    <section className="flex w-full flex-col items-center gap-7" aria-labelledby={`solution-${title.toLowerCase()}`}>
      <h3
        id={`solution-${title.toLowerCase()}`}
        className="font-[family-name:var(--font-inter-display)] font-bold leading-[1.1] tracking-[-2px] text-portfolio-grey-50 text-center"
      >
        {/* A third of the title's size (matches Figma), baseline-aligned
            with it by default since both are inline text in the same h3. */}
        <span className="text-[5vw] sm:text-[2.67vw] md:text-[2.33rem] text-faircado-green-400">{number}</span>
        <span className="text-[calc(15vw+40px)] sm:text-[calc(8vw+40px)] md:text-[152px]">{title}</span>
      </h3>
      <div className="flex w-full flex-col items-center gap-20">
        {/* Every block's gray panel is full-bleed, matching the hero video
            panel's width — the same width as the first (Awareness intro)
            panel, instead of being inset by the section's own padding. */}
        {blocks.map((block, i) => (
          <div key={i} className="-mx-6 w-[calc(100%+3rem)] sm:-mx-10 sm:w-[calc(100%+5rem)]">
            <div className="relative flex w-full flex-col items-center gap-15 rounded-case-3xl bg-portfolio-grey-50 px-10 py-15">
              <div className="absolute left-10 top-10">
                <TagPill icon={tagIcon} label={tag} />
              </div>
              {/* pt-6: the card's own 60px top padding plus this 24px lines
                  this heading's top edge up with the tag pill's bottom edge
                  (pill sits at top-10/40px and is 44px tall: 40+44=84,
                  60+24=84). */}
              <p className="max-w-[500px] pt-6 text-center font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
                {block.heading}
              </p>
              {block.beforeAfter ? (
                <BeforeAfterFrame pair={block.beforeAfter} />
              ) : block.sidebarChips ? (
                <div className="flex flex-wrap items-center justify-center gap-10">
                  {/* Empty spacer balances the sidebar on the other side, so
                      the mockups stay visually centered in the card. */}
                  <div className="hidden w-[223px] shrink-0 lg:block" aria-hidden="true" />
                  <div className="flex flex-wrap items-start justify-center gap-[72px]">
                    {block.images.map((image, imgIndex) => (
                      <ScreenshotFrame key={imgIndex} image={image} priority={i === 0 && imgIndex === 0} />
                    ))}
                  </div>
                  <div className="flex w-[223px] shrink-0 flex-col gap-6">
                    {block.sidebarChips.map((chip, chipIndex) => (
                      <SearchChipRow key={chipIndex} chip={chip} />
                    ))}
                  </div>
                </div>
              ) : block.peekCards ? (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <PeekCard image={block.peekCards[0].image} badgeIcon={block.peekCards[0].badgeIcon} />
                  <img
                    src={`${IMG}/momentum-arrow-right.svg`}
                    alt=""
                    aria-hidden="true"
                    className="hidden w-[50px] shrink-0 lg:block"
                  />
                  <div className="flex flex-wrap items-start justify-center gap-12">
                    {block.images.map((image, imgIndex) => (
                      <ScreenshotFrame key={imgIndex} image={image} priority={i === 0 && imgIndex === 0} />
                    ))}
                  </div>
                  <img
                    src={`${IMG}/momentum-arrow-left.svg`}
                    alt=""
                    aria-hidden="true"
                    className="hidden w-[50px] shrink-0 lg:block"
                  />
                  <PeekCard image={block.peekCards[1].image} badgeIcon={block.peekCards[1].badgeIcon} />
                </div>
              ) : block.connectWithArrow ? (
                <div className="flex flex-wrap items-center justify-center">
                  <ScreenshotFrame image={block.images[0]} priority={i === 0} />
                  <img
                    src={`${IMG}/find-similar-arrow.svg`}
                    alt=""
                    aria-hidden="true"
                    className="hidden w-[100px] shrink-0 sm:block"
                  />
                  <ScreenshotFrame image={block.images[1]} />
                </div>
              ) : (
                <div className="flex flex-wrap items-start justify-center gap-10">
                  {block.images.map((image, imgIndex) => (
                    <ScreenshotFrame key={imgIndex} image={image} priority={i === 0 && imgIndex === 0} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
