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
          { src: `${IMG}/logo-benchmark-1.png`, alt: "Competitor logo" },
          { src: `${IMG}/logo-benchmark-2.png`, alt: "Competitor logo" },
          { src: `${IMG}/logo-benchmark-3.png`, alt: "Competitor logo" },
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
      body: "How can I make image search impossible to miss?",
    },
    {
      tag: "Match accuracy",
      heading: "Our AI model lacked ",
      headingAccent: "match accuracy",
      body: "How can I make it catch details and give users more control of search?",
    },
    {
      tag: "Momentum",
      heading: "Conversion was a ",
      headingAccent: "momentum",
      body: "How can I create urgency and make it easy for users to search again?",
    },
  ],
  takeaways: {
    eyebrow: "TAKEAWAYS",
    heading: "Three insights guided my work:",
    testimonials: [
      {
        quote: "Didn't know I could image search",
        detail:
          "80% of behaviour recordings showed users missing the entry point to image search. Interviews confirmed users weren't aware of it.",
      },
      {
        quote: "Results didn't match my image",
        detail:
          "#1 complaint, with over 4,000 mentions. Interviews revealed the model missed detail-heavy items e.g. embroidered jeans and v-necks.",
      },
      {
        quote: "I was still thinking about it",
        detail:
          "70% of users who didn't buy were “just browsing” or “still thinking”. Interviews found timing and budget slowed down decision-making.",
      },
    ],
  },
  insight: {
    heading: "The data told us what. I needed to find out why.",
    body:
      "The in-app survey revealed that users' top complaint was 'Didn't match my image', but the team didn't know the specifics. So I brought qualitative research into a team hearing it for the first time.",
  },
  finalSolution: {
    eyebrow: "FINAL SOLUTION",
    heading: "One feature, extended across three fronts",
    body:
      "Over the next 6 months, I collaborated with engineering to revamp image search across the following fronts:",
  },
  solutionSections: [
    {
      number: "01/",
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
              // Drop the real screen recording at public/videos/case-studies/faircado/onboarding-walkthrough.mp4
              // and uncomment the line below to swap this still frame for a playable video (poster falls back to `src` above).
              // video: { src: `/videos/case-studies/faircado/onboarding-walkthrough.mp4` },
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
          heading: "Added 2 new entry points to the homepage to keep image search visible",
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
            annotations: [
              "New camera icon added to the homepage search bar",
              "New image search entry point added to the navigation",
              "Persistent call-to-action promoting image search on scroll",
            ],
          },
        },
      ],
    },
    {
      number: "02/",
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
            },
            {
              src: `${IMG}/after-generic-2.png`,
              alt: "Add to search feature letting users refine visual search with text",
              caption: "“Add to search” allow users to refine visual search with text",
            },
          ],
        },
        {
          heading: "Launched 'Find similar' to turn every item into a sharper, more engaging search",
          images: [
            {
              src: `${IMG}/awareness-onboarding-tags.png`,
              alt: "Find similar feature in action on a product page",
              caption: "“Find similar” feature in action, creating an engaging search loop",
            },
            {
              src: `${IMG}/after-generic-3.png`,
              alt: "Find similar button added to a product page",
              caption: "“Find similar” button added to product pages",
            },
          ],
        },
      ],
    },
    {
      number: "03/",
      title: "Momentum",
      tag: "Momentum",
      blocks: [
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
              alt: "Your images page collecting past search photos",
              caption: "“Your images” page",
            },
          ],
        },
      ],
    },
  ],
  results: {
    statCards: [
      {
        icon: `${IMG}/icon-camera.svg`,
        heading: "Adoption of image search grew to 89%",
        body: "Image search adoption climbed from ~40% to a peak of 89% in September 2025",
        emphasis: "Image search adoption",
      },
      {
        icon: `${IMG}/icon-back-arrow.svg`,
        heading: "“Find similar” feature drove 3x higher sales",
        body: "Similarity search converted at a 3-4x higher rate than text search; search-history image, at 2x.",
      },
      {
        icon: `${IMG}/icon-fire-badge.svg`,
        heading: "Urgency badges had 3x higher engagement",
        body: "Urgency badged items were added to bag and favourited 3x more than un-badged ones.",
        emphasis: "Urgency badged items",
      },
    ],
    featuredTestimonial: {
      quote:
        "I've noticed Faircado is pricier than eBay, but I don't mind because the experience is way better. Plus, image search makes finding what I want easier.",
      user: {
        name: "Faircado user,",
        location: "the Netherlands",
        avatar: { src: `${IMG}/testimonial-user-avatar.png`, alt: "Faircado user" },
      },
    },
  },
  closingTakeaways: {
    testimonials: [
      {
        number: "01/",
        quote: "MVP is not enough. MVE is the new bar.",
        detail:
          "Users are increasingly tech-savvy with high expectations. A Minimum Viable Product is no longer enough. Minimum Viable Experience is the real bar.",
      },
      {
        number: "02/",
        quote: "When AI solves speed, direction takes over.",
        detail:
          "Teams can now ship features simply because they can, rather than ask what's driving impact. Speed is no longer the differentiator, judgment is.",
      },
      {
        number: "03/",
        quote: "Never overlook a key feature over another",
        detail:
          "Once adoption of image search peaked and then settled around 70%, 30% of users were left relying on a broken text search. Optimizing one feature doesn't excuse a gap in another.",
      },
    ],
  },
};
