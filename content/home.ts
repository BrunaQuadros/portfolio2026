// Homepage copy and assets. Wording is preserved verbatim from the approved
// Figma design (Portfolio 2026, Homepage frame); only markup was adapted.

const IMG = "/images/home";
const FAIRCADO_IMG = "/images/case-studies/faircado";

type ImageAsset = { src: string; alt: string };

export type HomeProjectCard = {
  href: string;
  company: { logo: ImageAsset; name: string };
  headingLine1: string;
  headingLine2: string;
  descriptionLine1: string;
  descriptionLine2: string;
  highlights: { icon: ImageAsset; label: string }[];
  media: {
    image: ImageAsset;
    video: { src: string; alt: string };
  };
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
        image: {
          src: `${IMG}/faircado-phone-model-training.png`,
          alt: "Faircado app scanning a photo of a pink sweater with the image search camera",
        },
        video: {
          src: "/videos/case-studies/faircado/refine-text-search.mp4",
          alt: "Faircado image search results being refined with a text query",
        },
      },
    },
  ] satisfies HomeProjectCard[],
};
