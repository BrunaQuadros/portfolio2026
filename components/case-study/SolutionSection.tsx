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
  // Computed once per badge position (desktop, and mobile when the content
  // gives a separate one), since the line direction depends on it.
  const lineFor = (pos: { badgeTop: number; badgeLeft: number }) => {
    const pointPx = { x: (badge.pointLeft / 100) * frameWidth, y: (badge.pointTop / 100) * frameHeight };
    const badgePx = { x: (pos.badgeLeft / 100) * frameWidth, y: (pos.badgeTop / 100) * frameHeight };
    const dx = badgePx.x - pointPx.x;
    const dy = badgePx.y - pointPx.y;
    const dist = Math.hypot(dx, dy);
    return {
      x1: ((pointPx.x + (dx / dist) * (ringSize / 2)) / frameWidth) * 100,
      y1: ((pointPx.y + (dy / dist) * (ringSize / 2)) / frameHeight) * 100,
      x2: pos.badgeLeft,
      y2: pos.badgeTop,
    };
  };
  const desktop = { badgeTop: badge.badgeTop, badgeLeft: badge.badgeLeft };
  const mobile = badge.mobileBadge ?? desktop;
  const desktopLine = lineFor(desktop);
  const mobileLine = lineFor(mobile);

  // The badge circle and its line are positioned through CSS variables so
  // the mobile and desktop positions can be swapped with a breakpoint
  // class instead of rendering two badges.
  const positionVars = {
    "--badge-top": `${desktop.badgeTop}%`,
    "--badge-left": `${desktop.badgeLeft}%`,
    "--badge-top-mobile": `${mobile.badgeTop}%`,
    "--badge-left-mobile": `${mobile.badgeLeft}%`,
  } as React.CSSProperties;

  const zoomedCrop = badge.zoomedSrc ? (
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
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" style={positionVars}>
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
        <line className="lg:hidden" x1={mobileLine.x1} y1={mobileLine.y1} x2={mobileLine.x2} y2={mobileLine.y2} stroke="#121212" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <line className="hidden lg:block" x1={desktopLine.x1} y1={desktopLine.y1} x2={desktopLine.x2} y2={desktopLine.y2} stroke="#121212" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div
        className="absolute top-(--badge-top-mobile) left-(--badge-left-mobile) overflow-hidden rounded-full border-2 border-portfolio-grey-900 bg-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] lg:top-(--badge-top) lg:left-(--badge-left)"
        style={{ width: badgeSize, height: badgeSize, transform: "translate(-50%, -50%)" }}
      >
        {zoomedCrop}
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
            // 280px is sized for the 250px desktop phone; below sm the phone is
            // 190px, so the badge scales by the same ratio (213px) instead of
            // spilling over the neighbouring phone in the scroll strip.
            className="absolute z-10 h-auto w-[213px] max-w-none sm:w-[280px]"
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
// Drawn at its desktop size (226x299); the mobile scroll strip wraps it in
// a scaled box (see MobileScrollStrip) so it shrinks with the 190px phones.
function PeekCard({ image, badgeIcon }: { image: string; badgeIcon: string }) {
  return (
    <div className="relative h-[299px] w-[226px] shrink-0 overflow-hidden rounded-case-xl" aria-hidden="true">
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

// A PeekCard shrunk for the mobile strip: 0.76 is the 190/250 ratio the
// phones use, so the card keeps its proportion next to them. The wrapper is
// sized to the scaled result (172x227) so the flex gap measures from the
// visible edge, not the unscaled box; self-center lines it up with the
// middle of the phones like on desktop.
function ScaledPeekCard({ card }: { card: { image: string; badgeIcon: string } }) {
  return (
    <div className="h-[227px] w-[172px] shrink-0 snap-start self-center">
      <div className="origin-top-left scale-[0.76]">
        <PeekCard image={card.image} badgeIcon={card.badgeIcon} />
      </div>
    </div>
  );
}

// The little connector arrows between a peek card and its phone, as their
// own (non-snapping) slide in the strip. Same SVGs as desktop, scaled with
// the peek cards; the negative side margins pull the 40px strip gap in on
// both sides so the arrow reads as a connector, not a separate item.
function StripArrow({ direction }: { direction: "left" | "right" }) {
  // The scaled peek card leaves ~28px (right card) / ~23px (left card) of
  // empty box beside its visible card, so each arrow is nudged toward its
  // peek card to sit centred between the visible card and the phone.
  const centering = direction === "right" ? "-left-[14px]" : "left-[11px]";
  return (
    <img
      src={`${IMG}/momentum-arrow-${direction}.svg`}
      alt=""
      aria-hidden="true"
      className={`relative -mx-6 w-[38px] shrink-0 self-center ${centering}`}
    />
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
      className={`scrollbar-hide -mx-6 -mt-8 -mb-14 flex snap-x snap-mandatory gap-10 self-stretch overflow-x-auto pt-8 pb-14 sm:-mx-10 lg:hidden ${sidePadding}`}
    >
      {block.beforeAfter ? (
        // -mr-4 cancels 16px of the strip's 40px gap: the before/after
        // figures already carry a 64px right margin for the numbered
        // pins, and their spacing is an approved exception that stays as
        // it was (24px gap + 64px pin room).
        <>
          <div className="-mr-4 shrink-0 snap-start">
            <BeforeAfterImage
              image={block.beforeAfter.before}
              caption="Before"
              pins={numberedPins.filter((pin) => pin.showOn === "before" || pin.showOn === "both")}
            />
          </div>
          <div className="-mr-4 shrink-0 snap-start">
            <BeforeAfterImage
              image={block.beforeAfter.after}
              caption="After"
              pins={numberedPins.filter((pin) => pin.showOn === "after" || pin.showOn === "both")}
            />
          </div>
        </>
      ) : (
        <>
          {block.peekCards ? (
            <>
              <ScaledPeekCard card={block.peekCards[0]} />
              <StripArrow direction="right" />
            </>
          ) : null}
          {block.images.map((image, imgIndex) => (
            <div key={imgIndex} className="shrink-0 snap-start">
              <ScreenshotFrame image={image} priority={priority && imgIndex === 0} />
            </div>
          ))}
          {block.peekCards ? (
            <>
              <StripArrow direction="left" />
              <ScaledPeekCard card={block.peekCards[1]} />
            </>
          ) : null}
        </>
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
      {/* Below sm the title is deliberately wider than the phone screen
          (~110% of it for "Awareness"): w-max keeps it on one line at its
          natural width, and because the section centres its children and
          clips overflow, the word is cropped evenly on both edges instead
          of pushing the page into horizontal scroll. The number stacks
          centred above the word there (flex-col), so it isn't the part
          that gets cropped; from sm up both sit inline as on desktop. */}
      <h3
        id={`solution-${title.toLowerCase()}`}
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
        <span className="-mb-5 text-[6.4vw] sm:mb-0 sm:text-[2.33vw] md:text-[3.4vw] lg:text-[2.33rem] text-faircado-green-400">{number}</span>
        <span className="text-[19vw] sm:text-[7vw] md:text-[14vw] lg:text-[152px]">{title}</span>
      </h3>
      <div className="flex w-full flex-col items-center gap-6 sm:gap-20">
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
            <div className="relative flex w-full flex-col items-center gap-15 rounded-case-mobile bg-portfolio-grey-50 px-6 pb-15 pt-10 sm:rounded-case-3xl sm:px-10">
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
                  wrap; between lg and xl they still wrap. The chips row is
                  also shifted 40px left (-translate-x-10) so the chips keep
                  some air from the card's right edge. */}
              {block.beforeAfter ? (
                <div className="hidden lg:block">
                  <BeforeAfterFrame pair={block.beforeAfter} />
                </div>
              ) : block.sidebarChips ? (
                <div className="hidden -translate-x-10 flex-wrap items-center justify-center gap-10 lg:flex xl:-mx-10 xl:flex-nowrap">
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
                  {/* The PeekCard box is 226px but its visible card spans
                      30-190px, leaving 36px of empty box on the arrow side.
                      Nudging each arrow toward the peek card (without
                      changing layout) centres it between the visible card
                      edge and the phone. */}
                  <img
                    src={`${IMG}/momentum-arrow-right.svg`}
                    alt=""
                    aria-hidden="true"
                    className="relative -left-[18px] hidden w-[50px] shrink-0 lg:block"
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
                    className="relative left-[15px] hidden w-[50px] shrink-0 lg:block"
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
