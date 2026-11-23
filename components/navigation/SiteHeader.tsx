import Link from "next/link";
import { CopyEmailButton } from "@/components/navigation/CopyEmailButton";

// Top bar of the homepage: the name stacked on two lines on the left, and on
// the right a Contact link (copies the email) and a LinkedIn link (new tab).
// Kept minimal on purpose (no menu yet); grows into the shared navigation
// once more pages exist.
type SiteHeaderProps = {
  nameLine1: string;
  nameLine2: string;
  contact: { label: string; email: string; confirmation: string };
  linkedin: { label: string; href: string };
};

// Shared focus ring for every header link (pink, like the rest of the site).
const focusRing =
  "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-pink-500";

// Right-side links use the case study eyebrow style (SectionHeading):
// Manrope extra bold 16px uppercase, here in black. On hover they turn the
// same pink as "product designer" in the hero (150ms fade, DESIGN.md "Motion").
const navLinkClasses = `font-manrope text-[16px] font-extrabold leading-[20px] tracking-[0.48px] uppercase text-portfolio-grey-900 cursor-pointer transition-colors duration-150 ease-out hover:text-portfolio-pink-500 ${focusRing}`;

export function SiteHeader({ nameLine1, nameLine2, contact, linkedin }: SiteHeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 pt-6 sm:px-10 lg:px-[110px] lg:pt-20">
      {/* Rolling name (after drukarov.com): the box shows two lines but holds
          three, "bruna / quadros / bruna". On hover the text rolls up one line
          so it reads "quadros / bruna"; leaving rolls it back. 300ms ease-out,
          like the card hover. No roll under reduced motion.
          Lines sit 22.4px apart (0.9333em of the 24px text), 4px tighter
          than the old 1.1 line height. That is so tight the "q" tail of
          "quadros" reaches past the box, so the box only clips at the top
          (clip-path, which rolls "bruna" out of view on hover) and lets the
          bottom spill. The third line, which would otherwise show under the
          box, stays invisible and fades in as it rolls up. The box (2 lines,
          1.8667em) and the roll (one line, 0.9333em) match that spacing. */}
      <Link
        href="/"
        className={`group/name block h-[1.8667em] [clip-path:inset(0_-1em_-1em_-1em)] font-manrope text-2xl font-bold leading-[0.9333] tracking-[-0.04em] text-portfolio-grey-900 ${focusRing}`}
      >
        <span className="sr-only">
          {nameLine1} {nameLine2}
        </span>
        <span
          aria-hidden
          className="flex flex-col transition-transform duration-300 ease-out group-hover/name:-translate-y-[0.9333em] group-focus-visible/name:-translate-y-[0.9333em] motion-reduce:transition-none motion-reduce:group-hover/name:translate-y-0 motion-reduce:group-focus-visible/name:translate-y-0"
        >
          <span>{nameLine1}</span>
          <span>{nameLine2}</span>
          <span className="opacity-0 transition-opacity duration-300 ease-out group-hover/name:opacity-100 group-focus-visible/name:opacity-100 motion-reduce:transition-none motion-reduce:group-hover/name:opacity-0 motion-reduce:group-focus-visible/name:opacity-0">
            {nameLine1}
          </span>
        </span>
      </Link>

      <nav aria-label="Contact" className="flex items-center gap-6 sm:gap-12">
        <CopyEmailButton
          label={contact.label}
          email={contact.email}
          confirmation={contact.confirmation}
          className={navLinkClasses}
        />
        <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className={navLinkClasses}>
          {linkedin.label}
        </a>
      </nav>
    </header>
  );
}
