import Link from "next/link";

// Top bar of the homepage: the site name on the left, a contact link on the
// right. Kept minimal on purpose (no menu yet); grows into the shared
// navigation once more pages exist.
type SiteHeaderProps = {
  name: string;
  contactLabel: string;
  contactHref: string;
};

export function SiteHeader({ name, contactLabel, contactHref }: SiteHeaderProps) {
  const linkClasses =
    "font-manrope text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-portfolio-grey-900 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-pink-500";

  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 pt-6 sm:px-10 lg:px-[110px] lg:pt-20">
      <Link href="/" className={linkClasses}>
        {name}
      </Link>
      <Link href={contactHref} className={linkClasses}>
        {contactLabel}
      </Link>
    </header>
  );
}
