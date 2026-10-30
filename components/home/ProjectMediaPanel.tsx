import Image from "next/image";
import type { ProjectCardMedia } from "@/content/home";
import { AutoPlayVideo } from "@/components/media/AutoPlayVideo";

// Media block for a homepage project card: one brand-colored panel with a
// screenshot (still image or autoplaying video) that runs off one edge.
// Sized to the same footprint as the two phone mockups in ProjectMediaPhones
// (528 x 541 on desktop, same aspect ratio below lg) so every card lines up.
// Lifts on hover of the surrounding card, like the phones.
type ProjectMediaPanelProps = Omit<Extract<ProjectCardMedia, { kind: "panel" }>, "kind">;

// Where the screenshot window sits inside the panel. Desktop values are in
// px, below lg the same proportions in % of the panel.
const screenPlacement = {
  // 48px from the top and 64px from each side (spacing steps already used
  // across the Faircado case study: p-12 / p-16), cropped at the bottom.
  bottom: "left-[12%] top-[9%] h-full w-[76%] lg:left-16 lg:top-12 lg:w-[400px]",
  // 64px from the left, centered vertically, 602px wide so it runs off the
  // right edge (Figma eco.mio card). Height follows the 16:10 recording.
  right: "left-[12%] top-1/2 aspect-[1920/1200] w-[114%] -translate-y-1/2 lg:left-16 lg:w-[602px]",
};

export function ProjectMediaPanel({ screen, crop, backgroundClass }: ProjectMediaPanelProps) {
  return (
    <div
      className={`relative aspect-[528/541] w-full shrink-0 self-center overflow-hidden rounded-case-mobile transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none sm:rounded-case-2xl lg:h-[541px] lg:w-[528px] ${backgroundClass}`}
    >
      {/* The screenshot keeps its own rounded corners so it reads as a
          framed browser window. */}
      <div className={`absolute overflow-hidden rounded-case-lg ${screenPlacement[crop]}`}>
        {screen.type === "video" ? (
          <AutoPlayVideo
            src={screen.src}
            alt={screen.alt}
            className="absolute inset-0 size-full object-cover object-left-top"
          />
        ) : (
          <Image src={screen.src} alt={screen.alt} fill sizes="380px" className="object-cover object-top" />
        )}
      </div>
    </div>
  );
}
