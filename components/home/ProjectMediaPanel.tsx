import Image from "next/image";

// Media block for a homepage project card: one brand-colored panel with a
// screenshot inset at the top and cropped at the bottom. Sized to the same
// footprint as the two phone mockups in ProjectMediaPhones (528 x 541 on
// desktop, same aspect ratio below lg) so every card lines up. Lifts on
// hover of the surrounding card, like the phones.
type ProjectMediaPanelProps = {
  image: { src: string; alt: string };
  // Tailwind background class using a color token from globals.css.
  backgroundClass: string;
};

export function ProjectMediaPanel({ image, backgroundClass }: ProjectMediaPanelProps) {
  return (
    <div
      className={`relative aspect-[528/541] w-full shrink-0 self-center overflow-hidden rounded-case-mobile transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none sm:rounded-case-2xl lg:h-[541px] lg:w-[528px] ${backgroundClass}`}
    >
      {/* The screenshot sits 48px from the top and 64px from each side on
          desktop (spacing steps already used across the Faircado case
          study: p-12 / p-16), scaled proportionally below lg. It keeps its
          own rounded corners so it reads as a framed browser window. */}
      <div className="absolute left-[12%] top-[9%] h-full w-[76%] overflow-hidden rounded-case-lg lg:left-16 lg:top-12 lg:w-[400px]">
        <Image src={image.src} alt={image.alt} fill sizes="380px" className="object-cover object-top" />
      </div>
    </div>
  );
}
