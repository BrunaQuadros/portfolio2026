// Invest Like a Girl hero (brunatquadros.com/ILG). A copy of the hero Bruna
// designed for investlikeagirl.com.br (lab version "v4"): photos float with
// the cursor, and hovering a photo types its word under the headline.
// Photos are Death to Stock, decorative only.

export type IlgLocale = "pt" | "en";

export type IlgPhoto = {
  src: string;
  // Word typed under the headline while this photo is hovered.
  word: Record<IlgLocale, string>;
  // Position as % of the hero (phone, then md:). "hidden md:block" = desktop only.
  pos: string;
  // Width and aspect ratio (phone, then md:).
  size: string;
  width: number;
  height: number;
  // Parallax depth: higher moves more and feels closer.
  depth: number;
};

const IMG = "/images/ilg";

// Listed in paint order: later photos sit on top of earlier ones.
export const ILG_PHOTOS: IlgPhoto[] = [
  {
    src: `${IMG}/2693.jpg`,
    word: { pt: "recomeçar", en: "start over" },
    pos: "left-[-6%] top-[10%] md:left-[1%] md:top-[2%]",
    size: "w-40 aspect-[3/2] md:w-[20vw]",
    width: 400,
    height: 267,
    depth: 0.6,
  },
  {
    src: `${IMG}/15475.jpg`,
    word: { pt: "se cuidar", en: "take care of yourself" },
    pos: "left-[30%] top-[13%] md:left-[18.5%] md:top-[6%]",
    size: "w-24 aspect-[2/3] md:w-[11vw]",
    width: 220,
    height: 330,
    depth: 1.8,
  },
  {
    src: `${IMG}/15526.jpg`,
    word: { pt: "viajar o mundo", en: "travel the world" },
    pos: "hidden md:block md:left-[80%] md:top-[3%]",
    size: "md:w-[17vw] aspect-[3/2]",
    width: 340,
    height: 227,
    depth: 1.2,
  },
  {
    src: `${IMG}/14757.jpg`,
    word: { pt: "poder ir embora", en: "be able to leave" },
    pos: "left-[77%] top-[-3%] md:left-[68.5%] md:top-[2%]",
    size: "w-28 aspect-[3/4] md:w-[15vw]",
    width: 300,
    height: 400,
    depth: 2.6,
  },
  {
    src: `${IMG}/15655.jpg`,
    word: { pt: "empreender", en: "start a business" },
    pos: "hidden md:block md:left-[6%] md:top-[46%]",
    size: "md:w-[13vw] aspect-[9/10]",
    width: 260,
    height: 289,
    depth: 1.5,
  },
  {
    src: `${IMG}/15078.jpg`,
    word: { pt: "ficar mais forte", en: "get stronger" },
    pos: "left-[-4%] top-[78%] md:left-[13%] md:top-[70%]",
    size: "w-44 aspect-square md:w-[22vw]",
    width: 440,
    height: 440,
    depth: 3.2,
  },
  {
    src: `${IMG}/15237.jpg`,
    word: { pt: "ser maravilhosa", en: "be wonderful" },
    pos: "left-[52%] top-[calc(86%-20px)] md:left-[68%] md:top-[calc(85%-20px)]",
    size: "w-24 aspect-[3/4] md:w-[11.5vw]",
    width: 230,
    height: 307,
    depth: 0.9,
  },
  {
    src: `${IMG}/15407.jpg`,
    word: { pt: "ficar de pernas pro ar", en: "put your feet up" },
    pos: "left-[72%] top-[76%] md:left-[79.5%] md:top-[64%]",
    size: "w-28 aspect-[2/3] md:w-[16vw]",
    width: 320,
    height: 480,
    depth: 2.2,
  },
];

export const ILG_COPY: Record<
  IlgLocale,
  { lead: string; pre: string; opening: string; body: string; cta: string; home: string }
> = {
  pt: {
    lead: "Liberdade para",
    pre: "",
    opening: "ser quem você quiser",
    body: "Educação financeira feita por mulheres, para mulheres. Do Brasil à Europa.",
    cta: "Começar grátis",
    home: "Invest Like a Girl, página inicial",
  },
  en: {
    lead: "Financial freedom",
    pre: "to",
    opening: "be whoever you want",
    // "\n" = line break from sm: up (phones wrap on their own)
    body: "The first investment education platform\nfor Brazilian women in Europe.",
    cta: "Start for free",
    home: "Invest Like a Girl, home page",
  },
};

export const ILG_SITE = "https://www.investlikeagirl.com.br";
export const ILG_CTA_HREF = `${ILG_SITE}/comunidade/home`;
