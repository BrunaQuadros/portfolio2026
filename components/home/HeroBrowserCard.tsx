// Hover card for "product designer" in the homepage hero (after adasilv2.framer.website):
// a small tilted browser window with a sidebar, a content area, a cursor and a
// black button. While hovered it floats and the button and cursor glide and click together.
// Drawn in SVG so it stays crisp and every color is a token.
// Hovering the phrase pops the card in above it (Settle curve, DESIGN.md
// "Motion"); under reduced motion it only fades. Decorative, so hidden from
// screen readers: the phrase itself carries the meaning.

// Card hidden at rest, shown when the phrase (the `group`) is hovered.
const CARD_MOTION =
  "pointer-events-none opacity-0 scale-50 rotate-0 transition-[opacity,scale,rotate] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/saas:opacity-100 group-hover/saas:scale-100 group-hover/saas:-rotate-8 motion-reduce:scale-100 motion-reduce:-rotate-8 motion-reduce:duration-150 motion-reduce:ease-out";

export function HeroBrowserCardPhrase({ text, className = "" }: { text: string; className?: string }) {
  return (
    // cursor-pointer: the mouse turns into the hand while over the phrase,
    // hinting there is something to discover (owner's direction).
    <span className={`group/saas relative inline-block cursor-pointer ${className}`}>
      {text}
      <span
        aria-hidden
        // Centered above the phrase, a little overlap so it feels attached.
        className={`absolute bottom-[80%] left-1/2 -ml-[0.9em] w-[1.8em] origin-bottom ${CARD_MOTION}`}
      >
        {/* Inner wrapper floats up and down while hovered (saas-float). */}
        <span className="block motion-safe:group-hover/saas:animate-saas-float">
          <BrowserIllustration />
        </span>
      </span>
    </span>
  );
}

function BrowserIllustration() {
  return (
    <svg
      viewBox="0 0 200 140"
      className="block h-auto w-full overflow-visible drop-shadow-[0px_8px_24px_rgba(0,0,0,0.12)]"
    >
      {/* Window */}
      <rect x="1" y="1" width="198" height="138" rx="14" className="fill-white stroke-portfolio-grey-200 dark:fill-portfolio-grey-100" strokeWidth="2" />

      {/* Window buttons, top left */}
      <circle cx="16" cy="14" r="4" className="fill-portfolio-pink-500" />
      <circle cx="28" cy="14" r="4" className="fill-portfolio-grey-200" />
      <circle cx="40" cy="14" r="4" className="fill-portfolio-grey-200" />

      {/* Sidebar: one selected item in blue, two grey ones */}
      <circle cx="18" cy="38" r="4" className="fill-eco-mio-blue-500" />
      <rect x="26" y="34" width="30" height="8" rx="4" className="fill-eco-mio-blue-500" />
      <rect x="14" y="50" width="8" height="8" rx="4" className="fill-portfolio-grey-100 dark:fill-portfolio-grey-200" />
      <rect x="26" y="51" width="26" height="6" rx="3" className="fill-portfolio-grey-100 dark:fill-portfolio-grey-200" />
      <rect x="14" y="64" width="8" height="8" rx="4" className="fill-portfolio-grey-100 dark:fill-portfolio-grey-200" />
      <rect x="26" y="65" width="22" height="6" rx="3" className="fill-portfolio-grey-100 dark:fill-portfolio-grey-200" />

      {/* Main content area */}
      <rect x="66" y="28" width="122" height="98" rx="6" className="fill-portfolio-grey-50" />
      <rect x="74" y="36" width="20" height="5" rx="2.5" className="fill-portfolio-grey-200" />
      <rect x="74" y="48" width="32" height="30" rx="4" className="fill-portfolio-grey-100 dark:fill-portfolio-grey-200" />
      <rect x="111" y="48" width="32" height="30" rx="4" className="fill-portfolio-grey-100 dark:fill-portfolio-grey-200" />
      <rect x="148" y="48" width="32" height="30" rx="4" className="fill-portfolio-grey-100 dark:fill-portfolio-grey-200" />
      <rect x="74" y="92" width="80" height="5" rx="2.5" className="fill-portfolio-grey-200" />
      <rect x="74" y="104" width="50" height="5" rx="2.5" className="fill-portfolio-grey-100 dark:fill-portfolio-grey-200" />

      {/* Black button with the cursor on it. The two move as one: while
          hovered they glide across the content area, press like a click and
          glide back (globals.css saas-drag). transform-box makes the press
          shrink around the pair's own center instead of the SVG corner. */}
      <g className="[transform-box:fill-box] origin-center motion-safe:group-hover/saas:animate-saas-drag">
        <rect x="122" y="70" width="58" height="22" rx="11" className="fill-portfolio-ink" />
        <path
          d="M0 0 L0 17 L4.5 12.5 L7.5 19.5 L10.5 18.2 L7.6 11.4 L13.5 11.4 Z"
          transform="translate(104 50)"
          className="fill-portfolio-ink stroke-white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
