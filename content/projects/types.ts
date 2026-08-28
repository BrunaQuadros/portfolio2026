// Shared content types for case study pages.
// Extended here (beyond ARCHITECTURE.md's original sketch) with the fields a
// real case study needs: narrative sections, stat cards, and testimonials.
// This is the first case study built, so this shape establishes the pattern
// future projects should follow.

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  role: string[];
  heroImage: string;
};

export type ImpactBullet = {
  text: string;
  emphasis?: string[];
};

export type MethodCard = {
  title: string;
  description: string;
  logos?: { src: string; alt: string }[];
  avatars?: { src: string; alt: string }[];
  icons?: { src: string; alt: string }[];
};

export type ProblemCard = {
  tag: string;
  heading: string;
  headingAccent?: string;
  headingTail?: string;
  body: string;
};

export type Testimonial = {
  quote: string;
  detail: string;
};

export type AnnotatedImage = {
  src: string;
  alt: string;
  caption?: string;
  video?: { src: string; poster?: string };
};

export type BeforeAfterPair = {
  before: AnnotatedImage;
  after: AnnotatedImage;
  annotations?: string[];
};

export type SolutionBlock = {
  heading: string;
  images: AnnotatedImage[];
  beforeAfter?: BeforeAfterPair;
};

export type SolutionSection = {
  number: string;
  title: string;
  tag: string;
  blocks: SolutionBlock[];
};

export type StatCard = {
  icon?: string;
  heading: string;
  body: string;
  emphasis?: string;
};

export type FaircadoContent = {
  meta: {
    slug: string;
    title: string;
    year: string;
  };
  hero: {
    logo: { src: string; alt: string };
    headingLine1: string;
    headingLine2: string;
    descriptionLead: string;
    descriptionAccent1: string;
    descriptionMid1: string;
    descriptionMid2: string;
    descriptionAccent2: string;
    descriptionTail: string;
    image: { src: string; alt: string };
  };
  context: {
    eyebrow: string;
    heading: string;
    bodyBold1: string;
    bodyText1: string;
    bodyText2Lead: string;
    bodyAccent: string;
    bodyText2Tail: string;
    bodyBold2: string;
    cards: { src: string; alt: string }[];
  };
  roleInfo: {
    role: { title: string; subtitle: string };
    timeline: { title: string; subtitle: string };
    team: { label: string; avatar: { src: string; alt: string }; extra: string; extraBreakdown: string };
    space: { title: string; subtitle: string };
    impact: ImpactBullet[];
  };
  problem: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    bodyText1Lead: string;
    bodyAccent1: string;
    bodyText1Tail: string;
    bodyText2Lead: string;
    bodyAccent2: string;
    bodyText2Tail: string;
    closingLine: string;
    challengeLine1: string;
    challengeLine2Lead: string;
    challengeAccentLine2: string;
    challengeAccentLine3: string;
    beforeImage: { src: string; alt: string };
  };
  approach: {
    eyebrow: string;
    heading: string;
    body: string;
    methods: MethodCard[];
  };
  problemCards: ProblemCard[];
  takeaways: {
    eyebrow: string;
    heading: string;
    testimonials: Testimonial[];
  };
  insight: {
    headingLine1: string;
    headingLine2: string;
    bodyLead: string;
    bodyAccentPink: string;
    bodyMid: string;
    bodyLead2: string;
    bodyBoldAccent: string;
    bodyTail: string;
    screenshots: [{ src: string; alt: string }, { src: string; alt: string }];
  };
  finalSolution: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  solutionSections: SolutionSection[];
  results: {
    statCards: StatCard[];
    featuredTestimonial: {
      quote: string;
      user: { name: string; location: string; avatar: { src: string; alt: string } };
    };
  };
  closingTakeaways: {
    testimonials: (Testimonial & { number: string })[];
  };
};
