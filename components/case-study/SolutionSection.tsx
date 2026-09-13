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
    <figure className="flex w-[190px] flex-col items-center gap-3 sm:w-[250px]">
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
    <figure className="flex w-[190px] shrink-0 flex-col items-center gap-3 mr-16 sm:w-[250px]">
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

// Mobile (below lg) layout for one solution block: every phone in a
// horizontal scroll strip (one snap stop each), plus the search-chip
// examples as a last slide when the block has them. Same strip recipe as
// the Insight section (see docs/DESIGN.md, "Horizontal scroll strip"):
// breaks out of the card's side padding so the strip runs edge to edge
// of the card, scroll-pl keeps the first phone aligned with the card's
// content edge, and the vertical padding + matching negative margins give
// the phones' drop shadow room inside the scroll box.
function MobileScrollStrip({ block, priority }: { block: SolutionBlockType; priority: boolean }) {
  const numberedPins = (block.beforeAfter?.pins ?? []).map((pin, i) => ({ ...pin, number: i + 1 }));
  // The zoomed-logo badge on the model-training mockup hangs ~85px off the
  // phone's left edge, so a strip whose first phone carries a badge gets
  // extra left padding (and matching scroll padding) to keep it visible.
  const hasLeadingBadge = Boolean(block.images[0]?.badge);
  const sidePadding = hasLeadingBadge ? "pl-24 pr-6 scroll-pl-24 sm:pr-10" : "px-6 scroll-pl-6 sm:px-10 sm:scroll-pl-10";
  // self-stretch: the card centers its children (items-center), which
  // would otherwise shrink this strip to its content width and center it,
  // clipping both ends instead of scrolling.
  return (
    <div
      className={`scrollbar-hide -mx-6 -mt-8 -mb-14 flex snap-x snap-mandatory gap-6 self-stretch overflow-x-auto pt-8 pb-14 sm:-mx-10 lg:hidden ${sidePadding}`}
    >
      {block.beforeAfter ? (
        <>
          <div className="shrink-0 snap-start">
            <BeforeAfterImage
              image={block.beforeAfter.before}
              caption="Before"
              pins={numberedPins.filter((pin) => pin.showOn === "before" || pin.showOn === "both")}
            />
          </div>
          <div className="shrink-0 snap-start">
            <BeforeAfterImage
              image={block.beforeAfter.after}
              caption="After"
              pins={numberedPins.filter((pin) => pin.showOn === "after" || pin.showOn === "both")}
            />
          </div>
        </>
      ) : (
        block.images.map((image, imgIndex) => (
          <div key={imgIndex} className="shrink-0 snap-start">
            <ScreenshotFrame image={image} priority={priority && imgIndex === 0} />
          </div>
        ))
      )}
      {block.sidebarChips ? (
        <div className="flex w-[223px] shrink-0 snap-start flex-col justify-center gap-6">
          {block.sidebarChips.map((chip, chipIndex) => (
            <SearchChipRow key={chipIndex} chip={chip} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SolutionSection({ number, title, tagIcon, tag, blocks }: SolutionSectionProps) {
  return (
    <section className="flex w-full flex-col items-center gap-7 overflow-x-hidden" aria-labelledby={`solution-${title.toLowerCase()}`}>
      <h3
        id={`solution-${title.toLowerCase()}`}
        className="font-[family-name:var(--font-inter-display)] font-bold leading-[1.1] tracking-[-2px] text-portfolio-grey-50 text-center"
      >
        {/* A third of the title's size (matches Figma), baseline-aligned
            with it by default since both are inline text in the same h3.
            Mobile/sm sizes are pure vw (no flat px addend) so the longest
            title word ("Awareness") scales down with the viewport instead
            of overflowing it — the old `calc(15vw+40px)` stayed ~96px+ even
            on the narrowest phones. The fixed 152px only kicks in at lg:
            at md (768-1023px) it still overflowed the content width, so
            md scales with the viewport too (14vw = ~107px at 768px). */}
        <span className="text-[4vw] sm:text-[2.33vw] md:text-[3.4vw] lg:text-[2.33rem] text-faircado-green-400">{number}</span>
        <span className="text-[12vw] sm:text-[7vw] md:text-[14vw] lg:text-[152px]">{title}</span>
      </h3>
      <div className="flex w-full flex-col items-center gap-20">
        {/* Each block's gray panel simply sits inside the page's own
            px-6/sm:px-10 section padding (like the My Role/Impact box)
            instead of full-bleed breaking out of it — full-bleed left the
            panel edge-to-edge with no gutter at all on desktop windows
            narrower than the section's max-w. */}
        {blocks.map((block, i) => (
          <div key={i} className="w-full">
            {/* pt-10 (not py-15's usual top) so the heading's top edge lands
                exactly where the absolutely-positioned pill's top edge sits
                (top-10), instead of stacking below it. */}
            <div className="relative flex w-full flex-col items-center gap-15 rounded-case-3xl bg-portfolio-grey-50 px-6 pb-15 pt-10 sm:px-10">
              {/* Below lg the card is too narrow for the pill and the heading
                  to share a row, so the pill sits in flow above the heading,
                  centered like the heading. From lg up it's absolutely
                  positioned in the card's top-left corner, out of flow, as in
                  the Figma. */}
              <div className="self-center lg:absolute lg:left-10 lg:top-10 lg:self-auto">
                <TagPill icon={tagIcon} label={tag} />
              </div>
              {/* Centered across the card's full width, ignoring the pill's
                  width on desktop (where the pill is out of flow). The
                  negative top margin below lg tightens the pill-to-heading
                  gap from the card's 60px gap down to 24px. */}
              <p
                className="-mt-9 text-center font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px] lg:mt-0"
                style={{ maxWidth: block.headingMaxWidth ?? 500 }}
              >
                {block.heading}
              </p>
              <MobileScrollStrip block={block} priority={i === 0} />
              {/* Desktop (lg and up) layouts, one per block variant. The
                  chips row (spacer + two phones + chips column, ~1100px) and
                  the peek-card row (~1130px) are wider than the card's
                  1060px content box, so from xl up they run edge to edge
                  over the card's own side padding (xl:-mx-10) and never
                  wrap; between lg and xl they still wrap. */}
              {block.beforeAfter ? (
                <div className="hidden lg:block">
                  <BeforeAfterFrame pair={block.beforeAfter} />
                </div>
              ) : block.sidebarChips ? (
                <div className="hidden flex-wrap items-center justify-center gap-10 lg:flex xl:-mx-10 xl:flex-nowrap">
                  {/* Empty spacer balances the sidebar on the other side, so
                      the mockups stay visually centered in the card. */}
                  <div className="hidden w-[223px] shrink-0 lg:block" aria-hidden="true" />
                  <div className="flex flex-wrap items-start justify-center gap-[72px] xl:flex-nowrap">
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
                <div className="hidden flex-wrap items-center justify-center gap-2 lg:flex xl:-mx-10 xl:flex-nowrap">
                  <PeekCard image={block.peekCards[0].image} badgeIcon={block.peekCards[0].badgeIcon} />
                  <img
                    src={`${IMG}/momentum-arrow-right.svg`}
                    alt=""
                    aria-hidden="true"
                    className="hidden w-[50px] shrink-0 lg:block"
                  />
                  <div className="flex flex-wrap items-start justify-center gap-12 xl:flex-nowrap">
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
                <div className="hidden flex-wrap items-center justify-center lg:flex">
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
                <div className="hidden flex-wrap items-start justify-center gap-10 lg:flex">
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
