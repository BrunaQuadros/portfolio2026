// Homepage copy and assets. Wording is preserved verbatim from the approved
// Figma design (Portfolio 2026, Homepage frame); only markup was adapted.

const IMG = "/images/home";
const FAIRCADO_IMG = "/images/case-studies/faircado";

type ImageAsset = { src: string; alt: string };

// Two phone mockups (image + video frozen until hover), or one wide panel
// with a website screenshot on a brand-colored background.
export type ProjectCardMedia =
  | {
      kind: "phones";
      image: ImageAsset;
      // startAt: second of the clip shown while the card is not hovered.
      video: { src: string; alt: string; startAt: number };
    }
  | {
      kind: "panel";
      image: ImageAsset;
      // Tailwind background class using a color token from globals.css.
      backgroundClass: string;
    };

export type HomeProjectCard = {
  href: string;
  company: { logo: ImageAsset; name: string };
  headingLine1: string;
  headingLine2: string;
  descriptionLine1: string;
  descriptionLine2: string;
  highlights: { icon: ImageAsset; label: string }[];
  media: ProjectCardMedia;
};

export const home = {
  header: {
    name: "Bruna TDQ",
    contactLabel: "Contact",
    // Placeholder until the contact destination is decided (mailto, /about
    // or a footer section). Flagged in the implementation summary.
    contactHref: "#contact",
  },
  hero: {
    wave: { src: `${IMG}/emoji-wave.png`, alt: "" },
    greeting: "Hi! I am Bruna,",
    portrait: { src: `${IMG}/portrait-bruna.png`, alt: "Portrait of Bruna" },
    intro: "a charismatic",
    accent: "product designer",
    background: "with a background",
    in: "in",
    bag: { src: `${IMG}/emoji-shopping-bag.png`, alt: "" },
    ecommerce: "e-commerce, consumer",
    phone: { src: `${IMG}/emoji-mobile-phone.png`, alt: "" },
    apps: "apps",
    andB2B: "and B2B",
    chart: { src: `${IMG}/emoji-chart.png`, alt: "" },
    saas: "SaaS",
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
      // No case study page yet; the route is reserved for it.
      href: "/case-studies/impact-hero",
      company: {
        logo: { src: `${IMG}/logo-impact-hero.png`, alt: "" },
        name: "impact hero",
      },
      headingLine1: "Building a lead conversion",
      headingLine2: "tree gifting portal",
      descriptionLine1: "Automated a tree-gifting portal, driving 20% more upsells",
      descriptionLine2: "and a 30% higher conversion rate.",
      highlights: [
        { icon: { src: `${IMG}/icon-highlight-designer.png`, alt: "" }, label: "Sole designer" },
        { icon: { src: `${IMG}/icon-highlight-tree.png`, alt: "" }, label: "IaaS | Climate tech" },
        { icon: { src: `${IMG}/icon-highlight-adoption.png`, alt: "" }, label: "20% increase in upsold products" },
      ],
      media: {
        kind: "panel",
        image: {
          src: `${IMG}/impact-hero-portal.png`,
          alt: "Impact Hero tree gifting portal for Allianz Direct, with a gift redemption form and a world map of planting sites",
        },
        backgroundClass: "bg-impact-hero-green-900",
      },
    },
  ] satisfies HomeProjectCard[],
};
