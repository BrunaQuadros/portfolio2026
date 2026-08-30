import Link from "next/link";
import { X } from "lucide-react";

// Fixed circular close button shown on case study pages, letting visitors
// jump straight back to the homepage from anywhere on the page (stays
// pinned to the viewport while scrolling, instead of scrolling away with
// the page content).
export function ExitButton() {
  return (
    <Link
      href="/"
      aria-label="Close and return to homepage"
      className="fixed right-6 top-6 z-50 flex size-11 items-center justify-center rounded-full bg-portfolio-grey-900/10 text-portfolio-grey-900 backdrop-blur-sm transition-colors hover:bg-portfolio-grey-900/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-faircado-pink-500"
    >
      <X className="size-5" aria-hidden="true" />
    </Link>
  );
}
