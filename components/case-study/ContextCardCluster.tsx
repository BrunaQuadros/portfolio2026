import Image from "next/image";
import { ImagePlaceholder } from "./ImagePlaceholder";

// The three overlapping, slightly tilted cards beside a case study's Context
// text: black and white by default, full color and a little bigger on hover.
// First built inline on the Faircado page; moved here unchanged when eco.mio
// reused it. Exactly three cards: [0] sits behind, low and centred, [1] top
// left, [2] top right. A card without a `src` renders a grey placeholder in
// the same slot until its screenshot is exported.
type ContextCardClusterProps = {
  cards: { src?: string; alt: string }[];
};

// Tightly overlapping cluster (article card behind, tucked under the two stat
// cards). Positions and rotations match the exact Figma values.
const SLOTS = [
  { position: { left: "20%", top: "42%", width: "40%", aspectRatio: "1 / 1", zIndex: 1 }, rotate: "-1.72deg" },
  { position: { left: "6%", top: "4%", width: "44%", aspectRatio: "1 / 1", zIndex: 2 }, rotate: "2.31deg" },
  { position: { left: "46%", top: "10%", width: "42%", aspectRatio: "1 / 1", zIndex: 3 }, rotate: "-3.58deg" },
];

export function ContextCardCluster({ cards }: ContextCardClusterProps) {
  return (
    // Below sm the cluster box is 18% wider than the column, pulled out with
    // negative side margins so the three cards (which only fill ~82% of the
    // box's width, sitting slightly left of its centre) read bigger and land
    // centred on the screen. The margins are uneven on purpose to correct
    // that off-centre cluster. The cards also end at ~82% of the box's
    // height, so the negative bottom margin trims that empty band before the
    // next section.
    <div className="relative -ml-[6%] -mr-[12%] -mb-8 w-[118%] aspect-[399/373] max-w-none shrink-0 sm:mx-auto sm:mb-0 sm:w-full sm:max-w-[475px]">
      {cards.slice(0, 3).map((card, i) => (
        <div
          key={i}
          className="absolute transition-transform duration-300 ease-out hover:z-30 hover:scale-[1.08]"
          // Radius and shadow are applied here in CSS since these are plain
          // flat photos (no chrome/shadow baked in), per the design system's
          // Shadow/L token. The rotation is a wrapper around this div (below)
          // so the hover scale above doesn't fight with it for the single
          // `transform` property.
          style={SLOTS[i].position}
        >
          <div className="relative size-full" style={{ transform: `rotate(${SLOTS[i].rotate})` }}>
            {/* Black and white by default; hovering the card (the whole
                absolutely-positioned wrapper above, which this image fills)
                reveals full color. A CSS filter, not a second image file, so
                there's only one asset per card to keep track of. */}
            {card.src ? (
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className="rounded-[20px] object-cover shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] grayscale transition-[filter] duration-300 ease-out hover:grayscale-0"
              />
            ) : (
              <ImagePlaceholder
                label={card.alt}
                className="absolute inset-0 rounded-[20px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
