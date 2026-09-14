import Image from "next/image";
import { home } from "@/content/home";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ProjectCard } from "@/components/home/ProjectCard";

// Inline emoji/portrait inside the hero sentence. Sized in em so they scale
// with the heading at every breakpoint (same approach as the Faircado hero
// star, see DESIGN.md "Inline heading icons").
function HeroInlineImage({
  src,
  alt,
  sizeClass,
  rounded = false,
}: {
  src: string;
  alt: string;
  sizeClass: string;
  rounded?: boolean;
}) {
  return (
    <span className={`relative mx-[0.1em] inline-block ${sizeClass} align-[-0.3em]`}>
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        className={`size-full object-cover ${rounded ? "rounded-full" : ""}`}
      />
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
            reproduce the four-line Figma composition, phones wrap naturally. */}
        <h1 className="mx-auto w-full max-w-[993px] font-manrope text-[11vw] font-semibold leading-[1.4] tracking-[-0.04em] text-portfolio-grey-900 sm:text-[7vw] lg:text-hero">
          <HeroInlineImage src={hero.wave.src} alt={hero.wave.alt} sizeClass="size-[1em]" />{" "}
          {hero.greeting}{" "}
          <HeroInlineImage src={hero.portrait.src} alt={hero.portrait.alt} sizeClass="size-[1.35em]" rounded />{" "}
          {hero.intro}
          <br className="hidden lg:inline" />{" "}
          <span className="text-portfolio-pink-500">{hero.accent}</span> {hero.background}
          <br className="hidden lg:inline" />{" "}
          {hero.in}
          <HeroInlineImage src={hero.bag.src} alt={hero.bag.alt} sizeClass="size-[1.33em]" />
          {hero.ecommerce}
          <HeroInlineImage src={hero.phone.src} alt={hero.phone.alt} sizeClass="size-[1.33em]" />
          {hero.apps}
          <br className="hidden lg:inline" />{" "}
          {hero.andB2B}
          <HeroInlineImage src={hero.chart.src} alt={hero.chart.alt} sizeClass="size-[1.33em]" />
          {hero.saas}
        </h1>

        {/* Full-bleed container (DESIGN.md "Layout Containers"): breaks out of
            the section padding from sm: up so the panel reaches 1220px. */}
        <section
          aria-label="Selected work"
          className="flex flex-col gap-6 sm:-mx-10 sm:w-[calc(100%+5rem)]"
        >
          {projects.map((project) => (
            <ProjectCard key={project.href} {...project} />
          ))}
        </section>
      </main>
    </div>
  );
}
