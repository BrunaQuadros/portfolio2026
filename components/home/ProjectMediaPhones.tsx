import Image from "next/image";
import { HoverPlayVideo } from "@/components/media/HoverPlayVideo";

// Media block for a homepage project card: two phone mockups side by side,
// a still image and a video frozen until the card is hovered. Phones use the
// two approved sizes from DESIGN.md (250 x 541 on desktop, 190 x 411 below
// lg). Below lg they sit in the mobile horizontal scroll strip (40px gap,
// breaks out of the card padding so the second phone peeks in).
type ProjectMediaPhonesProps = {
  image: { src: string; alt: string };
  video: { src: string; alt: string; startAt: number };
};

export function ProjectMediaPhones({ image, video }: ProjectMediaPhonesProps) {
  // Hover: the phones lift 4px while the card panel darkens one grey step.
  // Skipped for visitors who prefer reduced motion.
  const phoneClasses =
    "relative h-[411px] w-[190px] shrink-0 snap-start overflow-hidden rounded-case-xl transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none lg:h-[541px] lg:w-[250px]";

  return (
    <div className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-10 overflow-x-auto px-6 scroll-pl-6 sm:-mx-10 sm:px-10 sm:scroll-pl-10 lg:mx-0 lg:items-center lg:gap-7 lg:overflow-visible lg:px-0">
      <div className={phoneClasses}>
        <Image src={image.src} alt={image.alt} fill sizes="250px" className="object-cover" />
      </div>
      <div className={phoneClasses}>
        <HoverPlayVideo
          src={video.src}
          alt={video.alt}
          startAt={video.startAt}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
}
