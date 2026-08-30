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
  // Second line of the quote, forcing a manual break (matching the
  // approved copy layout) instead of relying on natural text wrap.
  // Optional: only the Takeaways insight cards use it.
  quoteLine2?: string;
  detail: string;
  // Plain lead-in text before the bold phrase (e.g. the Closing Takeaways
  // cards, which bold their closing sentence instead of their opening one).
  // Optional: only used when the bold phrase isn't at the very start.
  detailLead?: string;
  // Bold phrase within the detail line (e.g. "80% of behaviour
  // recordings"), with the rest of the sentence in regular weight around
  // it. Optional: only the Takeaways/Closing Takeaways cards use it.
  detailBold?: string;
  detailRest?: string;
};

export type ImageBadge = {
  // Where the badge points to on the image, and where the badge circle
  // itself sits — both as % of the image frame (same convention as
  // BeforeAfterPin). The badge shows a zoomed-in crop of the same image,
  // centered on the point it points to.
  pointTop: number;
  pointLeft: number;
  badgeTop: number;
  badgeLeft: number;
  // How zoomed-in the badge's close-up crop is, relative to the frame.
  // Ignored when `zoomedSrc` is set.
  zoom: number;
  // A pre-cropped close-up image to show in the badge circle instead of
  // computing a zoom crop of the main image at render time.
  zoomedSrc?: string;
};

export type AnnotatedImage = {
  src: string;
  alt: string;
  caption?: string;
  // overlayFrame: when true, `src` is drawn on top of the video (used for a
  // transparent-center PNG that only shows device chrome, e.g. the status
  // bar, with the video showing through). When false/omitted, the video
  // fills the whole frame on its own — `src` is only used as a fallback
  // poster before playback starts.
  video?: { src: string; poster?: string; overlayFrame?: boolean };
  badge?: ImageBadge;
  // A pill overlaid on top of the image (e.g. layered over a matching tag
  // already baked into the screenshot itself), positioned as % of the
  // frame — same convention as ImageBadge/BeforeAfterPin.
  overlayTag?: { label: string; top: number; left: number };
  // A wider callout card overlaid on top of the image, layered exactly
  // over a matching tip already baked into the screenshot — e.g. the
  // urgency badge tooltips on the Momentum mockups. `top` is % of the
  // frame; the card itself is horizontally centered and wider than the
  // frame (per Figma: 280px against a 250px frame).
  overlayTip?: { icon: "fire" | "lightning"; title: string; subtitle: string; top: number };
};

export type SearchChip = {
  thumbnail: string;
  text: string;
};

export type BeforeAfterPin = {
  // Accessible description of what the pin points to (not rendered visibly —
  // the pin itself is just a numbered badge, matching the Figma design).
  label: string;
  // Position of the pin's anchor point, as a percentage of the screenshot
  // it points at (so it scales with the image instead of needing per-
  // breakpoint pixel values).
  top: number;
  left: number;
  // Which screenshot(s) this pin appears on. Pin 1 (pointing at the
  // pre-existing camera icon) shows on both Before and After for
  // continuity; new-entry-point pins only show on After.
  showOn: "before" | "after" | "both";
};

export type BeforeAfterPair = {
  before: AnnotatedImage;
  after: AnnotatedImage;
  pins?: BeforeAfterPin[];
};

export type SolutionBlock = {
  heading: string;
  images: AnnotatedImage[];
  beforeAfter?: BeforeAfterPair;
  // Accuracy block 1's composition: mockups flanked by a spacer (balancing
  // the sidebar below on the other side) and a sidebar of example search
  // chips, instead of just a centered row of screenshots.
  sidebarChips?: SearchChip[];
  // Accuracy block 2's composition: two mockups connected by an arrow.
  connectWithArrow?: boolean;
  // Momentum block 1's composition: the two mockups flanked by a small
  // "peek" card on each side (a cropped product card with a corner badge),
  // desktop only. Exactly 2 entries: left card, right card.
  peekCards?: { image: string; badgeIcon: string }[];
};

export type SolutionSection = {
  number: string;
  title: string;
  tag: string;
  blocks: SolutionBlock[];
};

export type StatCard = {
  icon?: string;
  icons?: string[];
  heading: string;
  body: string;
  emphasis?: string;
};

export type DiscardedIdea = {
  tag: string;
  tagIcon: string;
  image: { src: string; alt: string };
  captionTitle: string;
  captionBody: string;
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
    headingLine1: string;
    headingLine2: string;
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
  discardedIdeas: {
    eyebrow: string;
    heading: string;
    bodyLead: string;
    bodyAccent1: string;
    bodyMid: string;
    bodyAccent2: string;
    items: DiscardedIdea[];
  };
  results: {
    heading: {
      eyebrow: string;
      headingLine1: string;
      headingLine2: string;
      body: string;
    };
    statCards: StatCard[];
    featuredTestimonial: {
      quote: string;
      user: { name: string; location: string; avatar: { src: string; alt: string } };
    };
  };
  closingTakeaways: {
    eyebrow: string;
    heading: string;
    testimonials: (Testimonial & { number: string })[];
  };
};
