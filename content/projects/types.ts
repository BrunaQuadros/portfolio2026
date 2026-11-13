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
  // Optional badge position used below lg (same % units). When set, the
  // desktop position above only applies from lg up; without it the same
  // position is used at every width.
  mobileBadge?: { badgeTop: number; badgeLeft: number };
  // How zoomed-in the badge's close-up crop is, relative to the frame.
  // Ignored when `zoomedSrc` is set.
  zoom: number;
  // A pre-cropped close-up image to show in the badge circle instead of
  // computing a zoom crop of the main image at render time.
  zoomedSrc?: string;
};

export type AnnotatedImage = {
  // No `src` = grey placeholder phone until the screenshot is exported
  // (eco.mio). Badges and overlays need a real image.
  src?: string;
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
  // Optional description under the heading.
  body?: string;
  // This block's own tag pill, instead of the section's (eco.mio What's
  // next: "Hotels", "Dev").
  tag?: string;
  tagIcon?: string;
  // Overrides the heading's default 500px wrap width (e.g. to force a long
  // heading like Accuracy block 2's back down to 2 lines instead of 3).
  headingMaxWidth?: number;
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
  // A screen recording instead of phone mockups, styled like the eco.mio
  // hero video (rounded, soft shadow) but straight on the grey card.
  // `aspectClass` reserves the video's shape before it loads (e.g.
  // "aspect-[2884/1940]"). `overlay` is an image overlapping the video's
  // lower left corner (a grey 3:4 placeholder while it has no `src`); its
  // own `aspectClass` keeps the image's shape.
  // Without `src` the video is a grey placeholder of the same size.
  video?: {
    src?: string;
    alt: string;
    aspectClass: string;
    overlay?: { src?: string; alt: string; aspectClass?: string };
  };
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
  // Optional: without a tag the card is just the screenshot and caption.
  tag?: string;
  tagIcon?: string;
  // No `src` = grey placeholder until the screenshot is exported.
  image: { src?: string; alt: string };
  captionTitle: string;
  captionBody: string;
};

// One entry in a case study's left-hand section list. `id` matches the id on
// the section in the page file.
export type SectionNavItem = { id: string; label: string };

export type FaircadoContent = {
  sectionNav: SectionNavItem[];
  meta: {
    slug: string;
    title: string;
    year: string;
  };
  hero: {
    logo: { src: string; alt: string };
    headingLine1: string;
    // Line 2 is split around an inline 3D star that sits between the words
    headingLine2Before: string;
    headingStar: { src: string; alt: string };
    // Sunglasses that drop onto the star on hover
    headingStarGlasses: { src: string; alt: string };
    headingLine2After: string;
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
    // Decorative 3D icon that peeks out of the challenge panel on mobile only
    challengeIcon: { src: string; alt: string };
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
    // The left mockup carries a caption crediting the in-app survey behind
    // it; the right one doesn't need one.
    screenshots: [{ src: string; alt: string; caption?: string }, { src: string; alt: string }];
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

// A sentence stored as pieces: plain strings, phrases marked bold and/or
// in the brand accent color, or `{ br: true }` for an art-directed line
// break that only applies on wide screens (Mobile Rule 4). Rendered by
// components/case-study/RichText.
// `arrow`: an inline arrow in the accent color pointing right, at a visual
// beside the text (shown with the line breaks, from `breakClass` up);
// `fallback` is the text shown instead on smaller screens (e.g. ".").
export type RichSegment =
  | string
  | { text: string; bold?: boolean; accent?: boolean }
  | { br: true }
  | { arrow: true; fallback?: string };

// Process diagrams drawn in code (components/case-study/ProcessSwimlane and
// HandoffChart), so wording and order are data, not pixels in an image.
export type SwimlaneNode = "card" | "question" | "reply" | "screens" | "send" | "figma" | "link";

export type ProcessSwimlaneData = {
  // Accessible description of the whole diagram (it is one image to
  // screen readers).
  label: string;
  // Exactly three lanes, top to bottom; the highlighted one is yellow.
  lanes: { name: string; highlight?: boolean }[];
  // Left to right. `lane` is the index into `lanes`.
  steps: {
    label: string;
    lane: number;
    node: SwimlaneNode;
    labelPosition: "above" | "below";
    labelAlign?: "center" | "start";
    // Time the step took (e.g. "2h"), shown as a dark badge above the node
    // to mark it as a bottleneck.
    duration?: string;
    // A bigger example shown on hover or keyboard focus over the node, from
    // lg up (eco.mio: one demo built by hand in Figma). `buttonLabel` names
    // the hover target for screen readers.
    preview?: { src: string; alt: string; width: number; height: number; buttonLabel: string };
  }[];
};

export type HandoffChartData = {
  label: string;
  titleLead: string;
  titleAccent: string;
  // Exactly three people, left to right; the highlighted one is yellow.
  people: { name: string; highlight?: boolean }[];
  // Who holds the work at each handoff, top to bottom (index into people).
  handoffs: number[];
  // Optional note under one person's column (e.g. their time).
  note?: { person: number; text: string };
  total: { value: string; unit: string };
};

// eco.mio case study. Same section order as Faircado, but the copy uses
// RichSegment paragraphs instead of per-phrase lead/accent/tail fields.
// Images without a `src` render as grey placeholders until exported.
export type EcoMioContent = {
  sectionNav: SectionNavItem[];
  meta: { slug: string; title: string; description: string; year: string };
  hero: {
    logo: { src: string; alt: string };
    headingLine1: string;
    headingLine2: string;
    description: RichSegment[];
    // Looping screen recording in the blue hero panel, with its natural
    // size for the aspect ratio before it loads.
    video: { src: string; alt: string; width: number; height: number };
    // Client logo badge in the panel's top-left corner (the Faircado hero's
    // "featured by App Store" spot), at its natural size.
    clientLogo: { src: string; alt: string; width: number; height: number };
  };
  roleInfo: {
    role: { title: string; subtitle: string };
    timeline: { title: string; subtitle: string };
    team: { avatar: { src?: string; alt: string }; extra: string; extraBreakdown: string };
    space: { title: string; subtitle: string };
    impact: RichSegment[][];
  };
  context: {
    eyebrow: string;
    heading: string;
    paragraphs: RichSegment[][];
    // Three cards for ContextCardCluster ([0] behind, [1] top left,
    // [2] top right). No `src` = grey placeholder.
    cards: { src?: string; alt: string }[];
  };
  problem: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    paragraphs: RichSegment[][];
    closingLine: string;
    challenge: RichSegment[];
    processChart: HandoffChartData;
  };
  // "My process": a heading block, then three steps, each with a small
  // label ("1. Audit"), a heading and a body above its content.
  approach: {
    eyebrow: string;
    heading: string;
    // The three step names in the big numbered row under the heading.
    stepNames: string[];
    audit: {
      label: string;
      heading: string;
      body: RichSegment[];
      caption: string;
      // Process diagram under the step heading (scrolls sideways below lg).
      processDiagram: ProcessSwimlaneData & { regionLabel: string };
    };
    align: {
      label: string;
      heading: string;
      body: string;
      // Problem cards with the tag pills used through the case study.
      cards: { tag: string; tagIcon: string; heading: string; body: RichSegment[] }[];
    };
    scope: {
      label: string;
      heading: string;
      constraint: { tag: string; tagIcon: string; heading: string; body: RichSegment[]; arrowLabel: string };
      eightyTwenty: { heading: string; body: string; emphasis: string };
      build: {
        heading: string;
        body: string;
        emphasis: string;
        tools: { src: string; alt: string; tileClass: string; inset: "logo" | "icon" }[];
      };
    };
  };
  finalSolution: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  solutionSections: (SolutionSection & { tagIcon?: string })[];
  results: {
    eyebrow: string;
    heading: string;
    // 3D icon, heading, and an optional line under it with an optional bold phrase.
    statCards: { icon: string; heading: string; body?: string; emphasis?: string }[];
    feedbackIntro: string;
    feedbackIntroIcon: string;
    featuredTestimonial: {
      quote: string;
      user: { avatar: { src?: string; alt: string }; name: string };
      // The original message as a screenshot, shown over the quote card on hover.
      fullMessage?: {
        screenshot: { src: string; alt: string; width: number; height: number };
      };
    };
  };
  closingTakeaways: {
    eyebrow: string;
    heading: string;
    testimonials: (Testimonial & { number: string })[];
  };
};
