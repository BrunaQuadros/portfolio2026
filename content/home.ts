// Homepage copy and assets. Wording is preserved verbatim from the approved
// Figma design (Portfolio 2026, Homepage frame); only markup was adapted.

const IMG = "/images/home";
const FAIRCADO_IMG = "/images/case-studies/faircado";

type ImageAsset = { src: string; alt: string };

// startAt: second of the clip shown while the card is not hovered.
type VideoAsset = { src: string; alt: string; startAt: number };

// Two phone mockups (image + video frozen until hover), or one wide panel
// with a website screenshot (still image or hover-play video) on a
// brand-colored background.
export type ProjectCardMedia =
  | {
      kind: "phones";
      image: ImageAsset;
      video: VideoAsset;
    }
  | {
      kind: "panel";
      // A video here starts once the card is scrolled into view, see AutoPlayVideo.
      screen: ({ type: "image" } & ImageAsset) | ({ type: "video"; startAt?: number } & ImageAsset);
      // "bottom": screenshot inset at the top and cropped below.
      // "fill": covers the whole panel, for videos with their own background.
      crop: "bottom" | "fill";
      // Tailwind background class using a color token from globals.css.
      backgroundClass: string;
      // Adds a 1px grey stroke (portfolio-grey-200) around the panel.
      bordered?: boolean;
    };

export type HomeProjectCard = {
  href: string;
  // logoBackgroundClass: optional brand-colored square behind the logo, for
  // logos that sit inset on a tile (eco.mio).
  company: { logo: ImageAsset; logoBackgroundClass?: string; name: string };
  headingLine1: string;
  headingLine2: string;
  descriptionLine1: string;
  descriptionLine2: string;
  highlights: { icon: ImageAsset; label: string }[];
  media: ProjectCardMedia;
};

// A paragraph split into pieces so some words can be bold.
export type TextSegment = { text: string; bold?: boolean };

export type ExperienceEntry = {
  dates: string;
  role: string;
  // Company and what it does, shown in grey under the role
  company: string;
  logo: {
    src: string;
    // Tailwind background class (color token) for the square tile behind the logo
    tileClass: string;
    // Size and position of the logo inside its tile, copied from Figma
    imageClass: string;
  };
};

export const home = {
  header: {
    // Stacked on two lines, top left
    nameLine1: "bruna",
    nameLine2: "quadros",
    // Copies the email and shows the confirmation instead of opening a mail app
    contact: { label: "Email", email: "bruna.quadros@gmail.com", confirmation: "Email copied" },
    // Opens in a new tab
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/bruna-todeschini-de-quadros-53922150/",
    },
  },
  hero: {
    // Reads: "Hi! I am Bruna, a charismatic product designer with work
    // across consumer apps, SaaS and EdTech" (Nov 2026 wording, no emojis;
    // only the portrait photo stays inline.)
    // 3D waving hand before "Hi": Apple emoji pose rendered in a soft 3D
    // clay style (owner generated it with ChatGPT, thiings.co style as the
    // texture reference). Decorative, so empty alt.
    wave: { src: `${IMG}/emoji-wave-hand-3d-v2.webp`, alt: "" },
    greeting: "Hi! I am Bruna,",
    portrait: {
      src: `${IMG}/portrait-bruna-cutout.png`,
      // Slides in on hover over the portrait
      hoverSrc: `${IMG}/portrait-bruna-hover.webp`,
      alt: "Portrait of Bruna",
    },
    intro: "a charismatic",
    accent: "product designer",
    across: "with work across",
    rest: "consumer apps, SaaS and EdTech",
  },
  projects: [
    {
      href: "/case-studies/faircado",
      company: {
        logo: { src: `${FAIRCADO_IMG}/logo-faircado.svg`, alt: "" },
        name: "faircado",
      },
      headingLine1: "Redefining visual search:",
      headingLine2: "from MVP to star feature",
      descriptionLine1: "How I drove image search adoption from 40% to 89%",
      descriptionLine2: "on a second-hand shopping app.",
      highlights: [
        { icon: { src: `${IMG}/icon-highlight-designer.png`, alt: "" }, label: "Product designer" },
        { icon: { src: `${IMG}/icon-highlight-zero-to-one.png`, alt: "" }, label: "0 → 1 product" },
        { icon: { src: `${IMG}/icon-highlight-adoption.png`, alt: "" }, label: "40% → 89% adoption" },
        { icon: { src: `${IMG}/icon-highlight-cart.png`, alt: "" }, label: "E-commerce | consumer app" },
      ],
      media: {
        kind: "phones",
        image: {
          src: `${IMG}/faircado-phone-model-training.png`,
          alt: "Faircado app scanning a photo of a pink sweater with the image search camera",
        },
        video: {
          src: "/videos/case-studies/faircado/refine-text-search.mp4",
          alt: "Faircado image search results being refined with a text query",
          startAt: 3,
        },
      },
    },
    {
      href: "/case-studies/eco-mio",
      company: {
        logo: { src: `${IMG}/logo-eco-mio.jpg`, alt: "" },
        logoBackgroundClass: "bg-eco-mio-blue-500",
        name: "eco.mio",
      },
      headingLine1: "Automating sales demos",
      headingLine2: "to cut 15h of work monthly",
      descriptionLine1: "How I built a client-ready demo maker that turned 5 hours",
      descriptionLine2: "of work into 30 minutes at a B2B climate tech company.",
      highlights: [
        { icon: { src: `${IMG}/icon-highlight-designer.png`, alt: "" }, label: "AI Product Engineer" },
        { icon: { src: `${IMG}/icon-highlight-bolt.png`, alt: "" }, label: "Streamlining a cross-team process" },
        { icon: { src: `${IMG}/icon-highlight-adoption.png`, alt: "" }, label: "5-hour process → 30 minutes" },
        { icon: { src: `${IMG}/icon-highlight-tree.png`, alt: "" }, label: "Climate tech | B2B SaaS" },
      ],
      media: {
        kind: "panel",
        screen: {
          type: "video",
          src: "/videos/home/eco-mio-demo-studio-new-demo-flow.mp4",
          // Resting frame and play start: 1.7s, half a second before the
          // "New demo" click (owner's pick). The video plays from here only
          // while the card is hovered.
          startAt: 1.7,
          alt: "Demo Studio: creating a new flight demo for a client by entering a name, picking Flight and confirming, then the demo is created and ready to edit",
        },
        crop: "fill",
        backgroundClass: "bg-eco-mio-blue-500",
        bordered: true,
      },
    },
    // Impact Hero card removed for now (Nov 2026) until its case study
    // exists. Its logo, portal image and color token are still in place;
    // the card's content is in git history (commit 0e50db6, content/home.ts).
  ] satisfies HomeProjectCard[],

  // Paragraph under the project cards. Figma wording, double spaces removed.
  experienceIntro: [
    { text: "With over " },
    { text: "6 years of experience in Product Design,", bold: true },
    { text: " including co-founding a design studio, I am used to think " },
    { text: "strategy, outcomes and systems", bold: true },
    { text: " beyond aesthetics." },
  ] satisfies TextSegment[],

  // Work timeline, newest first
  experience: [
    {
      dates: "2026 - Now",
      role: "Senior Product Designer",
      company: "eco.mio · Corporate travel booking",
      logo: {
        src: `${IMG}/logo-timeline-eco-mio.png`,
        tileClass: "bg-eco-mio-blue-500",
        imageClass: "left-[-25.56%] top-[-26.27%] size-[152.51%]",
      },
    },
    {
      dates: "2024 - 2026",
      role: "Mid → Senior Product Designer",
      company: "Faircado · Second-hand shopping app",
      logo: {
        src: `${IMG}/logo-timeline-faircado.png`,
        tileClass: "bg-faircado-green-400",
        imageClass: "left-[10.02%] top-[9.36%] size-[79.71%]",
      },
    },
    {
      dates: "2022 - 2024",
      role: "Product Designer",
      company: "Impact Hero · Climate Tech",
      logo: {
        src: `${IMG}/logo-timeline-impact-hero.png`,
        // Light tile in both themes (grey-900 is the near-white grey in dark mode)
        tileClass: "bg-portfolio-grey-100 dark:bg-portfolio-grey-900",
        imageClass: "left-[11.87%] top-[12.6%] size-[75.93%]",
      },
    },
    {
      dates: "2020 - 2022",
      role: "Co-Founder & Product Designer",
      company: "VanBruben · Design Studio",
      logo: {
        src: `${IMG}/logo-timeline-vanbruben.png`,
        tileClass: "bg-portfolio-ink",
        imageClass: "left-[12.21%] top-[11.71%] size-[77.09%]",
      },
    },
  ] satisfies ExperienceEntry[],

  // Closing paragraph. The Figma " - " became a comma (no dashes in copy).
  experienceOutro: [
    { text: "I am used to deliver " },
    { text: "end-to-end", bold: true },
    {
      text: ", and comfortable being the only designer on a team, or collaborating with peers, engineering, product and founders.",
    },
  ] satisfies TextSegment[],
};
