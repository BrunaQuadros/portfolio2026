import Image from "next/image";
import Link from "next/link";
import type { HomeProjectCard } from "@/content/home";
import { ProjectMediaPanel } from "@/components/home/ProjectMediaPanel";
import { ProjectMediaPhones } from "@/components/home/ProjectMediaPhones";

// Grey project panel on the homepage: company, title, one-line summary and
// three highlights on the left, a media block on the right (two phones or a
// brand-colored panel, see ProjectMediaPhones / ProjectMediaPanel). The whole panel is one link to the case study. Built for the
// Faircado card, reused for every project added to the homepage.
type ProjectCardProps = HomeProjectCard;

export function ProjectCard({
  href,
  company,
  headingLine1,
  headingLine2,
  descriptionLine1,
  descriptionLine2,
  highlights,
  media,
}: ProjectCardProps) {
  // Phone mockups use the two approved sizes from DESIGN.md: 250 x 541 on
  // desktop, 190 x 411 below lg.
  return (
    <Link
      href={href}
      className="group flex w-full flex-col gap-12 rounded-case-mobile bg-portfolio-grey-50 p-6 transition-colors duration-300 ease-out hover:bg-portfolio-grey-100 focus-visible:bg-portfolio-grey-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-pink-500 sm:rounded-case-3xl sm:p-10 lg:flex-row lg:items-stretch lg:justify-between lg:p-20"
    >
      <div className="flex flex-col justify-between gap-12 lg:w-[480px] lg:shrink-0">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Image src={company.logo.src} alt={company.logo.alt} width={32} height={32} className="size-8" />
            <span className="font-manrope text-[18px] font-bold leading-[28px] text-portfolio-grey-900">
              {company.name}
            </span>
          </div>
          <div className="flex flex-col gap-3 text-portfolio-grey-900">
            <h2 className="font-manrope text-[32px] font-bold leading-[1.2] tracking-[-0.03em] sm:text-[40px] sm:leading-[48px]">
              {headingLine1}
              {/* Desktop-only line break: two balanced lines at the 40px size,
                  natural wrapping on phones. */}
              <br className="hidden lg:inline" /> {headingLine2}
            </h2>
            <p className="font-manrope text-[18px] leading-[28px]">
              {descriptionLine1}
              <br className="hidden lg:inline" /> {descriptionLine2}
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {highlights.map((highlight) => (
            <li key={highlight.label} className="flex items-center gap-3">
              <Image
                src={highlight.icon.src}
                alt={highlight.icon.alt}
                aria-hidden="true"
                width={28}
                height={28}
                className="size-7 object-contain"
              />
              <span className="font-manrope text-[18px] font-bold leading-[28px] text-portfolio-grey-900">
                {highlight.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {media.kind === "phones" ? (
        <ProjectMediaPhones image={media.image} video={media.video} />
      ) : (
        <ProjectMediaPanel image={media.image} backgroundClass={media.backgroundClass} />
      )}
    </Link>
  );
}
