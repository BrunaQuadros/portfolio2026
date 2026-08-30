import type { FaircadoContent } from "./types";

const IMG = "/images/case-studies/faircado";

// Faircado case study copy. Wording is preserved verbatim from the approved
// Figma design, only formatting/markup was adapted for structured content.
export const faircado: FaircadoContent = {
  meta: {
    slug: "faircado",
    title: "Redefining visual search: from MVP to star feature",
    year: "2025-2026",
  },
  hero: {
    logo: { src: `${IMG}/logo-faircado.svg`, alt: "Faircado logo" },
    headingLine1: "Redefining visual search:",
    headingLine2: "from MVP to star feature",
    descriptionLead: "Faircado is a ",
    descriptionAccent1: "fashion aggregator app",
    descriptionMid1: " on a mission to make second-hand shopping as easy as buying new.",
    descriptionMid2: " By 2025 it had over ",
    descriptionAccent2: "300k users",
    descriptionTail: ", mostly Gen Z.",
    image: {
      src: `${IMG}/hero-app-visual.png`,
      alt: "Faircado app visual search screens showing camera capture and image results",
    },
  },
  context: {
    eyebrow: "context",
    heading: "Why visual search?",
    bodyBold1: "Short answer: we were not nailing text search.",
    bodyText1: "Each marketplace uses its own taxonomy and keywords, making standardized text search nearly impossible.",
    bodyText2Lead: "At the same time, recent reports from Pinterest and ",
    bodyAccent: "Google showed Gen Z shops visually first",
    bodyText2Tail: ". Both facts pointed us in the same direction: build an ",
    bodyBold2: "image search MVP.",
    cards: [
      {
        src: `${IMG}/context-card-article.jpg`,
        alt: "Article: The End of the Search Bar? How AI Visual Search Is Redefining How Gen Z Shops",
      },
      {
        src: `${IMG}/context-card-google-stat.jpg`,
        alt: "Stat card: 80% of Gen Z relies on Google Search for shopping discovery, research, and decisions",
      },
      {
        src: `${IMG}/context-card-pinterest-stat.jpg`,
        alt: "Stat card: 69% of Gen Z agree that visual results are more helpful than text when deciding what to buy",
      },
    ],
  },
  roleInfo: {
    role: { title: "Product Designer", subtitle: "UX Researcher" },
    timeline: { title: "6 months", subtitle: "2025-2026" },
    team: {
      label: "Team",
      avatar: { src: `${IMG}/avatar-team-lead.jpg`, alt: "Team lead" },
      extra: "+6",
      extraBreakdown: "5 Dev + 1 PM",
    },
    space: { title: "E-commerce", subtitle: "Aggregator app" },
    impact: [
      {
        text: "Built the company's first structured user research process.",
        emphasis: ["user research process."],
      },
      {
        text: "Introduced qualitative research to a team hearing it for the first time.",
        emphasis: ["qualitative research"],
      },
      {
        text: "Shaped a year-long roadmap, tech sprints, and business strategy through continuous insights.",
        emphasis: ["year-long roadmap, tech sprints, and business strategy"],
      },
    ],
  },
  problem: {
    eyebrow: "PROBLEM",
    headingLine1: "The MVP engaged.",
    headingLine2: "But didn't sell.",
    bodyText1Lead: "Image searchers returned ",
    bodyAccent1: "3x more often",
    bodyText1Tail: " than text searchers. Potential was there, but users scrolled results, favorited, opened product pages, and didn't buy.",
    bodyText2Lead: "Despite the potential, ",
    bodyAccent2: "only ~40% of users",
    bodyText2Tail: " ever tried image search, and the ones who did use it weren't converting.",
    closingLine: "So our challenge became:",
    challengeLine1: "How can we improve the image",
    challengeLine2Lead: "search MVP to ",
    challengeAccentLine2: "drive sales and grow",
    challengeAccentLine3: "adoption beyond 40%?",
    beforeImage: {
      src: `${IMG}/before-mvp-search-results.png`,
      alt: "The image search MVP results screen before the redesign",
    },
  },
  approach: {
    eyebrow: "MY APPROACH",
    heading: "Evaluating the problem",
    body:
      "I led the research and investigation by digging deeper into the problem end-to-end with 4 approaches:",
    methods: [
      {
        title: "User Tracking",
        description: "I've analyzed 50+ user behaviour recordings",
        logos: [
          { src: `${IMG}/logo-usertracking-1.png`, alt: "Session recording tool logo" },
          { src: `${IMG}/logo-usertracking-2.png`, alt: "Session recording tool logo" },
        ],
      },
      {
        title: "User interviews",
        description: "Conducted 30+ user interviews over 6 months",
        avatars: [
          { src: `${IMG}/avatar-interview-1.png`, alt: "Interview participant" },
          { src: `${IMG}/avatar-interview-2.png`, alt: "Interview participant" },
          { src: `${IMG}/avatar-interview-3.png`, alt: "Interview participant" },
        ],
      },
      {
        title: "Benchmarking",
        description: "Analized main players in the visual search sphere",
        logos: [
          { src: `${IMG}/logo-benchmark-1.jpg`, alt: "Amazon logo" },
          { src: `${IMG}/logo-benchmark-2.jpg`, alt: "Pinterest logo" },
          { src: `${IMG}/logo-benchmark-3.jpg`, alt: "Google logo" },
        ],
      },
      {
        title: "Survey",
        description: "Collected 6 months of qualitative data",
        icons: [
          { src: `${IMG}/icon-thumbs-up.svg`, alt: "" },
          { src: `${IMG}/icon-thumbs-down.svg`, alt: "" },
        ],
      },
    ],
  },
  problemCards: [
    {
      tag: "Awareness",
      heading: "Adoption was an ",
      headingAccent: "awareness",
      headingTail: " problem",
      body: "How can I make image search impossible to miss?",
    },
    {
      tag: "Match accuracy",
      heading: "Our AI model lacked ",
      headingAccent: "match accuracy",
      headingTail: "",
      body: "How can I make it catch details and give users more control of search?",
    },
    {
      tag: "Momentum",
      heading: "Conversion was a ",
      headingAccent: "momentum",
      headingTail: " issue",
      body: "How can I create urgency and make it easy for users to search again?",
    },
  ],
  takeaways: {
    eyebrow: "TAKEAWAYS",
    headingLine1: "Three insights",
    headingLine2: "guided my work:",
    testimonials: [
      {
        quote: "Didn't know I could",
        quoteLine2: "image search",
        detail:
          "80% of behaviour recordings showed users missing the entry point to image search. Interviews confirmed users weren't aware of it.",
        detailBold: "80% of behaviour recordings",
        detailRest: " showed users missing the entry point to image search. Interviews confirmed users weren't aware of it.",
      },
      {
        quote: "Results didn't match",
        quoteLine2: "my image",
        detail:
          "#1 complaint, with over 4,000 mentions. Interviews revealed the model missed detail-heavy items e.g. embroidered jeans and v-necks.",
        detailBold: "#1 complaint, with over 4,000",
        detailRest: " mentions. Interviews revealed the model missed detail-heavy items e.g. embroidered jeans and v-necks.",
      },
      {
        quote: "I was still thinking",
        quoteLine2: "about it",
        detail:
          "70% of users who didn't buy were “just browsing” or “still thinking”. Interviews found timing and budget slowed down decision-making.",
        detailBold: "70% of users",
        detailRest: " who didn't buy were “just browsing” or “still thinking”. Interviews found timing and budget slowed down decision-making.",
      },
    ],
  },
  insight: {
    headingLine1: "The data told us what.",
    headingLine2: "I needed to find out why.",
    bodyLead: "The in-app survey revealed that users' top complaint was ",
    bodyAccentPink: "'Didn't match my image',",
    bodyMid: " but the team didn't know the specifics.",
    bodyLead2: "So ",
    bodyBoldAccent: "I brought qualitative research",
    bodyTail: " into a team hearing it for the first time.",
    screenshots: [
      {
        src: `${IMG}/decorative-feedback-screenshot-1.png`,
        alt: "Survey prompt asking 'Happy with these results?' with 'Didn't match my image' selected as the reason",
      },
      {
        src: `${IMG}/decorative-feedback-screenshot-2.png`,
        alt: "Survey prompt asking why items were left in the bag, with 'Still thinking about it' and 'Just browsing' selected",
      },
    ],
  },
  finalSolution: {
    eyebrow: "FINAL SOLUTION",
    heading: "One feature, extended across three fronts",
    body:
      "Over the next 6 months, I collaborated with engineering to revamp image search across the following fronts:",
  },
  solutionSections: [
    {
      number: "01.",
      title: "Awareness",
      tag: "Awareness",
      blocks: [
        {
          heading: "Redesigned onboarding to spotlight image search from day one",
          images: [
            {
              src: `${IMG}/onboarding-video-walkthrough.png`,
              alt: "Onboarding screen with a video walkthrough teaching users to select one item per photo",
              caption: "Video walkthrough teaches users to select one item per photo",
              video: { src: "/videos/case-studies/faircado/image-search-intro.mp4", overlayFrame: true },
            },
            {
              src: `${IMG}/onboarding-interactive-results.png`,
              alt: "Interactive onboarding screen showing real, favoritable search results",
              caption: "Interactive onboarding with real, favoritable results",
            },
            {
              src: `${IMG}/onboarding-registration.png`,
              alt: "Registration screen continuing the onboarding story",
              caption: "Storytelling continues into registration screen",
            },
          ],
        },
        {
          heading: "Added 2 new entry points to the homepage so image search is visible",
          images: [],
          beforeAfter: {
            before: {
              src: `${IMG}/before-mvp-search-results.png`,
              alt: "Homepage before adding new image search entry points",
            },
            after: {
              src: `${IMG}/after-homepage-entry-points.png`,
              alt: "Homepage after adding new image search entry points",
            },
            pins: [
              { label: "Camera icon in the search bar", top: 11.6, left: 92.8, showOn: "both" },
              { label: "New “Your images” section on the homepage", top: 46.6, left: 37.6, showOn: "after" },
              { label: "New camera icon in the bottom navigation", top: 90.4, left: 57.6, showOn: "after" },
            ],
          },
        },
      ],
    },
    {
      number: "02.",
      title: "Accuracy",
      tag: "Match accuracy",
      blocks: [
        {
          heading: "Retrained the model to catch key details and refine results with text",
          images: [
            {
              src: `${IMG}/model-training-annotation.png`,
              alt: "Model training example highlighting logos, embroidery, and collar type",
              caption: "Logos, embroidery and collar type were the most mentioned by users",
              badge: {
                pointTop: 22.4,
                pointLeft: 59.2,
                badgeTop: 4.4,
                badgeLeft: -20.6,
                zoom: 3,
                zoomedSrc: `${IMG}/accuracy-logo-badge.jpg`,
              },
            },
            {
              src: `${IMG}/after-generic-2.png`,
              alt: "Add to search feature letting users refine visual search with text",
              caption: "“Add to search” allow users to refine visual search with text",
              video: { src: "/videos/case-studies/faircado/refine-text-search.mp4" },
            },
          ],
          sidebarChips: [
            { thumbnail: `${IMG}/accuracy-chip-thumbnail.jpg`, text: "make it blue" },
            { thumbnail: `${IMG}/accuracy-chip-thumbnail.jpg`, text: "short sleeve" },
            { thumbnail: `${IMG}/accuracy-chip-thumbnail.jpg`, text: "like this v-neck" },
          ],
        },
        {
          heading: "Launched 'Find similar' to turn every item into a sharper, more engaging search",
          images: [
            {
              src: `${IMG}/awareness-onboarding-tags.png`,
              alt: "Find similar button added to a product page",
              caption: "“Find similar” button added to product pages",
              overlayTag: { label: "Find similar", top: 45, left: 79 },
            },
            {
              src: `${IMG}/after-generic-3.png`,
              alt: "Find similar feature in action on a product page",
              caption: "“Find similar” feature in action, creating an engaging search loop",
              video: { src: "/videos/case-studies/faircado/search-similar.mp4" },
            },
          ],
          connectWithArrow: true,
        },
      ],
    },
    {
      number: "03.",
      title: "Momentum",
      tag: "Momentum",
      blocks: [
        {
          heading: "Added urgency badges to push 'just browsing' users to act",
          images: [
            {
              src: `${IMG}/momentum-mockup-fire.png`,
              alt: "Product page with a fire urgency badge reading Almost taken, hurry up",
              caption: "Fire badge signals items already in other users' bags",
              overlayTip: { icon: "fire", title: "Almost taken, hurry up!", subtitle: "In other people's bag right now", top: 65.1 },
            },
            {
              src: `${IMG}/momentum-mockup-lightning.png`,
              alt: "Product page with a lightning urgency badge reading Popular item",
              caption: "Lightning badge flags items other users are favoriting",
              overlayTip: { icon: "lightning", title: "Popular item", subtitle: "Others are favouriting this", top: 65.1 },
            },
          ],
          peekCards: [
            { image: `${IMG}/momentum-patagonia.png`, badgeIcon: `${IMG}/impact-badge-fire.png` },
            { image: `${IMG}/momentum-adidas.png`, badgeIcon: `${IMG}/impact-badge-lightning.png` },
          ],
        },
        {
          heading: "Built two features so 'still thinking' users easily pick up where they left off",
          images: [
            {
              src: `${IMG}/momentum-recent-searches.png`,
              alt: "Recent searches feature showing past image searches",
              caption: "“Recent searches” feature",
            },
            {
              src: `${IMG}/momentum-your-images-page.png`,
              alt: "Image history page collecting past search photos",
              caption: "Image history page",
            },
          ],
        },
      ],
    },
  ],
  discardedIdeas: {
    eyebrow: "DISCARDED IDEAS",
    heading: "Some of the many 'NOs'",
    bodyLead: "For each front, I came up with many ideas that didn't make the cut due to ",
    bodyAccent1: "complexity, tech constraints ",
    bodyMid: "or lack of resources. Prioritizing what moved the needle took careful thinking and ",
    bodyAccent2: "real tradeoffs.",
    items: [
      {
        tag: "Awareness",
        tagIcon: `${IMG}/icon-tag-discarded-1.png`,
        image: { src: `${IMG}/tradeoff-onboarding-dialog.png`, alt: "Dialog shown on app open, prompting users to try image search" },
        captionTitle: "Dialog on app open",
        captionBody: "Removed after testing showed Gen Z skip dialogs entirely",
      },
      {
        tag: "Match accuracy",
        tagIcon: `${IMG}/icon-tag-discarded-2.png`,
        image: { src: `${IMG}/tradeoff-recommendation-feed.png`, alt: "Recommendation feed of visually similar items" },
        captionTitle: "Recommendation feed",
        captionBody: "The algorithm underperformed and was discontinued",
      },
      {
        tag: "Momentum",
        tagIcon: `${IMG}/icon-tag-discarded-3.png`,
        image: { src: `${IMG}/tradeoff-ai-shopping-agent.png`, alt: "Fairnando, an AI shopping agent chat assistant" },
        captionTitle: "AI shopping agent",
        captionBody: "“Fairnando” became too complex to build, so it was shelved",
      },
    ],
  },
  results: {
    heading: {
      eyebrow: "IMPACT",
      headingLine1: "Image search became",
      headingLine2: "the star feature",
      body: "Once overlooked, image search became the heart of the app, and each solution pushed it further. Below are the highlights:",
    },
    statCards: [
      {
        icon: `${IMG}/impact-image-search.png`,
        heading: "Adoption of image search grew to 89%",
        body: "Image search adoption climbed from ~40% to a peak of 89% in September 2025",
        emphasis: "Image search adoption",
      },
      {
        icon: `${IMG}/impact-search-simialr.png`,
        heading: "“Find similar” feature drove 3x higher sales",
        body: "Similarity search converted at a 3-4x higher rate than text search; search-history image, at 2x.",
        emphasis: "Similarity search",
      },
      {
        icons: [`${IMG}/impact-badge-fire.png`, `${IMG}/impact-badge-lightning.png`],
        heading: "Urgency badges had 3x higher engagement",
        body: "Urgency badged items were added to bag and favourited 3x more than un-badged ones.",
        emphasis: "Urgency badged items",
      },
    ],
    featuredTestimonial: {
      quote:
        "I've noticed Faircado is pricier than eBay, but I don't mind because the experience is way better.",
      user: {
        name: "Faircado user,",
        location: "the Netherlands",
        avatar: { src: `${IMG}/impact-faircado-user.jpg`, alt: "Faircado user" },
      },
    },
  },
  closingTakeaways: {
    eyebrow: "LEARNINGS",
    heading: "Lessons that stuck",
    testimonials: [
      {
        number: "01.",
        quote: "MVP is not enough.",
        quoteLine2: "MVE is the new bar.",
        detail:
          "Users are increasingly tech-savvy with high expectations. A Minimum Viable Product is no longer enough. Minimum Viable Experience is the real bar.",
        detailLead: "Users are increasingly tech-savvy with high expectations. A Minimum Viable Product is no longer enough. ",
        detailBold: "Minimum Viable Experience is the real bar.",
      },
      {
        number: "02.",
        quote: "When AI solves speed,",
        quoteLine2: "direction takes over.",
        detail:
          "Teams can now ship features simply because they can, rather than ask what's driving impact. Speed is no longer the differentiator, judgment is.",
        detailLead: "Teams can now ship features simply because they can, rather than ask what's driving impact. ",
        detailBold: "Speed is no longer the differentiator, judgment is.",
      },
      {
        number: "03.",
        quote: "Never overlook a key",
        quoteLine2: "feature over another",
        detail:
          "After adoption of image search peaked, it settled on 70%, leaving 30% of users relying on a broken text search. Optimizing one feature doesn't excuse a gap in another.",
        detailLead: "After adoption of image search peaked, it settled on 70%, leaving 30% of users relying on a broken text search. ",
        detailBold: "Optimizing one feature doesn't excuse a gap in another.",
      },
    ],
  },
};
