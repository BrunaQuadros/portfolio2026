import Image from "next/image";
import type { ProjectCardMedia } from "@/content/home";
import { AutoPlayVideo } from "@/components/media/AutoPlayVideo";

// Media block for a homepage project card: one brand-colored panel with a
// screenshot (still image, or a video that starts once the card is scrolled
// into view) that runs off one edge.
// Sized to the same footprint as the two phone mockups in ProjectMediaPhones
// (528 x 541 on desktop, same aspect ratio below lg) so every card lines up.
// Lifts on hover of the surrounding card, like the phones.
type ProjectMediaPanelProps = Omit<Extract<ProjectCardMedia, { kind: "panel" }>, "kind">;

// Where the screenshot window sits inside the panel. Desktop values are in
// px, below lg the same proportions in % of the panel.
const screenPlacement = {
  // 48px from the top and 64px from each side (spacing steps already used
  // across the Faircado case study: p-12 / p-16), cropped at the bottom.
  // Rounded corners so it reads as a framed browser window.
  bottom: "left-[12%] top-[9%] h-full w-[76%] rounded-case-lg lg:left-16 lg:top-12 lg:w-[400px]",
  // Covers the whole panel, for recordings that bring their own background
  // and framing (eco.mio Demo Studio video).
  fill: "inset-0",
};

export function ProjectMediaPanel({ screen, crop, backgroundClass, bordered = false }: ProjectMediaPanelProps) {
  // Optional 1px grey stroke, using the "Borders on light cards" token.
  const borderClass = bordered ? "border border-portfolio-grey-200" : "";

  return (
    <div
      className={`relative aspect-[528/541] w-full shrink-0 self-center overflow-hidden rounded-case-mobile transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none sm:rounded-case-2xl lg:h-[541px] lg:w-[528px] ${backgroundClass} ${borderClass}`}
    >
      <div className={`absolute overflow-hidden ${screenPlacement[crop]}`}>
        {screen.type === "video" ? (
          // Waits on the first frame until most of it is on screen, then plays
          // from the start; rewinds once scrolled away so it restarts next time.
          <AutoPlayVideo
            src={screen.src}
            alt={screen.alt}
            startOnView
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <Image src={screen.src} alt={screen.alt} fill sizes="380px" className="object-cover object-top" />
        )}
      </div>
    </div>
  );
}
