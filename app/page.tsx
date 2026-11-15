import Image from "next/image";
import { home } from "@/content/home";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ProjectCard } from "@/components/home/ProjectCard";

// Portrait swap animation (inspired by emanuelserbanoiu.com), triggered by
// hovering the portrait itself (the frame is a `group`):
// - the original photo stays in place
// - on hover, the new photo slides in from the right and covers it, landing
//   with a slight springy overshoot ("Settle" curve, DESIGN.md "Motion")
// - on leave, it slides back out to the right
// Under reduced motion there is no movement, the new photo just fades in.
const SWAP_TRANSITION =
  "transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:translate-x-0 motion-reduce:duration-150 motion-reduce:ease-out";
const HOVER_PHOTO_SHOWN =
  "translate-x-full opacity-0 motion-safe:opacity-100 group-hover:translate-x-0 group-hover:opacity-100";

// Inline emoji/portrait inside the hero sentence. Sized in em so they scale
// with the heading at every breakpoint (same approach as the Faircado hero
// star, see DESIGN.md "Inline heading icons").
function HeroInlineImage({
  src,
  alt,
  sizeClass,
  rounded = false,
  hoverSrc,
}: {
  src: string;
  alt: string;
  sizeClass: string;
  rounded?: boolean;
  // Optional second photo that slides in when the portrait is hovered (see SWAP_TRANSITION).
  hoverSrc?: string;
}) {
  const shape = `size-full object-cover ${rounded ? "rounded-full" : ""}`;
  return (
    <span
      // Both portraits are cut-outs, so the frame supplies the grey background.
      // overflow-hidden + the round shape clip the sliding photo to the circle.
      className={`relative mx-[0.1em] inline-block ${sizeClass} align-[-0.3em] ${hoverSrc ? "group overflow-hidden bg-portfolio-grey-100" : ""} ${rounded ? "rounded-full" : ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        className={shape}
      />
      {hoverSrc && (
        <Image
          src={hoverSrc}
          alt=""
          aria-hidden
          width={160}
          height={160}
          className={`absolute inset-0 bg-portfolio-grey-100 ${SWAP_TRANSITION} ${HOVER_PHOTO_SHOWN} ${shape}`}
        />
      )}
    </span>
  );
}

export default function Home() {
  const { header, hero, projects } = home;

  return (
    <div className="flex flex-1 flex-col bg-white">
      <SiteHeader {...header} />

      <main className="mx-auto flex w-full max-w-[1220px] flex-col gap-24 px-4 pb-32 pt-24 sm:px-10 lg:gap-[106px] lg:pt-[255px]">
        {/* Hero sentence. One h1 with inline images; desktop line breaks
            give three lines (after "charismatic" and "across"), phones wrap naturally.
            From lg: the size is 5.7vw capped at text-hero (70px, same as the case
            study titles), so small laptops shrink it instead of breaking a line.
            Left-aligned with the text inside the project cards below: the cards
            pad their copy 24px (phones), 0 net from sm: (40px padding minus the
            40px breakout) and 40px net from lg: (80px minus 40px). */}
        <h1 className="w-full px-6 sm:px-0 lg:pl-10 font-manrope text-[11vw] font-semibold leading-[1.4] tracking-[-0.04em] text-portfolio-grey-900 sm:text-[7vw] lg:text-[length:min(5.7vw,var(--text-hero))]">
          {hero.greeting}{" "}
          <HeroInlineImage src={hero.portrait.src} alt={hero.portrait.alt} hoverSrc={hero.portrait.hoverSrc} sizeClass="size-[1.35em]" rounded />{" "}
          {hero.intro}
          <br className="hidden lg:inline" />{" "}
          <span className="text-portfolio-pink-500">{hero.accent}</span> {hero.across}
          <br className="hidden lg:inline" />{" "}
          {hero.rest}
        </h1>

        {/* Full-bleed container (DESIGN.md "Layout Containers"): breaks out of
            the section padding from sm: up so the panel reaches 1220px. Cards
            are spaced like case study sections (96px, 128px from sm:). */}
        <section
          aria-label="Selected work"
          className="flex flex-col gap-24 sm:gap-32 sm:-mx-10 sm:w-[calc(100%+5rem)]"
        >
          {projects.map((project) => (
            <ProjectCard key={project.href} {...project} />
          ))}
        </section>
      </main>
    </div>
  );
}
