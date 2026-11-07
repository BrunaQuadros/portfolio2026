import type { EcoMioContent } from "./types";

const IMG = "/images/case-studies/eco-mio";

// eco.mio case study copy. Wording is preserved verbatim from the approved
// Figma design (Portfolio 2026, "eco.mio Case Study (full draft)"), apart
// from four typo fixes approved by the owner. Images without a `src` are
// still empty frames in Figma and render as grey placeholders.
export const ecoMio: EcoMioContent = {
  meta: {
    slug: "eco-mio",
    title: "Automating sales demos to cut 15h of work monthly",
    description:
      "eco.mio turns 200+ flight options into 3 curated ones, right inside each company’s travel booking tool. How I built Demo Studio, an automated demo maker that turned 5 hours of work into 30 minutes.",
    year: "2026",
  },
  hero: {
    // Same file as the homepage card logo (identical bytes in Figma).
    logo: { src: "/images/home/logo-eco-mio.jpg", alt: "eco.mio logo" },
    headingLine1: "Automating sales demos",
    headingLine2: "to cut 15h of work monthly",
    description: [
      "eco.mio turns ",
      { text: "200+ flight options into 3 curated ones", accent: true },
      ",",
      { br: true },
      "right inside each company’s travel booking tool. Clients",
      { br: true },
      "like Bayer use it to save up to ",
      { text: "10% on travel costs a year", accent: true },
      ".",
    ],
    video: {
      src: "/videos/case-studies/eco-mio/hero-concur-to-eco-mio-grow.mp4",
      alt: "Screen recording in SAP Concur: a London to Amsterdam search lists 200+ flights, the cursor clicks Show recommendations, and the list turns into eco.mio's three options, with Eurostar recommended as best value and greener",
      width: 1800,
      height: 1210,
    },
    // White Bayer cross on transparent (owner's PNG, resized to 256px),
    // shown straight on the blue.
    clientLogo: { src: `${IMG}/logo-bayer-white.png`, alt: "Bayer", width: 256, height: 256 },
  },
  roleInfo: {
    role: { title: "Product Designer", subtitle: "AI Product Engineer" },
    timeline: { title: "3 months", subtitle: "2026" },
    team: {
      // Same photo as the Faircado case study's Team slot.
      avatar: { src: "/images/case-studies/faircado/avatar-team-lead.jpg", alt: "Bruna" },
      extra: "+4",
      extraBreakdown: "1 PM, 2 Devs, 1 Sales",
    },
    space: { title: "B2B SaaS", subtitle: "Climate tech" },
    impact: [
      [
        { text: "Rebuilt a recurring process", bold: true },
        " into an on-demand AI tool, ",
        { text: "designed and coded end to end.", bold: true },
      ],
      [
        "Gave sales and marketing ",
        { text: "teams autonomy", bold: true },
        " to create client prototypes and content on their own.",
      ],
      [
        { text: "Added client value", bold: true },
        " through hyper-personalized prototypes clients can ",
        { text: "keep and share internally.", bold: true },
      ],
    ],
  },
  context: {
    eyebrow: "context",
    heading: "Why so many demos?",
    // Owner's layout: the booking tools phrase in bold accent, the closing
    // paragraph all bold, and set line breaks (wide screens only, see the
    // page's Context section).
    paragraphs: [
      [
        "eco.mio runs inside ",
        { text: "16+ online booking tools (OBTs)", bold: true, accent: true },
        // Blue arrow pointing at the booking tool screenshots on the right;
        // a full stop on screens where they sit below the text instead.
        { arrow: true, fallback: "." },
        { br: true },
        "Every client wants to see it in their own tool, on their",
        { br: true },
        "own routes, pushing their own priority: lower cost,",
        { br: true },
        "rail over air or lower CO₂.",
      ],
      [{ text: "So every new lead means building a custom prototype.", bold: true }],
    ],
    // Three booking tools eco.mio runs inside. Order follows
    // ContextCardCluster's slots: [0] low and centred (lifted to the front
    // on this page), [1] top left, [2] top right.
    cards: [
      {
        src: `${IMG}/context-card-cytric-dashboard.png`,
        alt: "Cytric by Amadeus: the personal dashboard with buttons to book a flight, train, hotel or car",
      },
      {
        src: `${IMG}/context-card-concur.png`,
        alt: "SAP Concur: the travel home page with a London to Amsterdam flight search",
      },
      {
        src: `${IMG}/context-card-egencia.png`,
        alt: "Egencia: the book a flight form with an Oslo to Bergen search",
      },
    ],
  },
  problem: {
    eyebrow: "PROBLEM",
    headingLine1: "5 hours, 3 people, 1 mockup.",
    headingLine2: "Repeat three times a month.",
    paragraphs: [
      [
        "Each prototype bounced between sales, PM and design, ending as a static Figma link clients couldn’t always open.",
      ],
      [
        "That was ",
        { text: "15 hours of manual work", bold: true },
        " a month in the AI era, pulling PM and design away from building the real product.",
      ],
    ],
    closingLine: "So my challenge became:",
    challenge: [
      "How can we ",
      { text: "automate demo creation to win back those hours", accent: true },
      " and take PM out of the process?",
    ],
    // The old demo process, drawn in code (HandoffChart) in the phone
    // mockup slot. `handoffs` lists who holds the work at each step, top to
    // bottom: 0 Sales, 1 PM, 2 Design.
    processChart: {
      label: "Old demo process: each demo bounced between Sales, PM and Design, back and forth through PM, whose part alone took 2 hours, for 5 hours per demo",
      titleLead: "Old",
      titleAccent: "demo process",
      people: [{ name: "Sales" }, { name: "PM", highlight: true }, { name: "Design" }],
      handoffs: [0, 1, 0, 1, 1, 2, 1, 0],
      note: { person: 1, text: "2 h" },
      total: { value: "5 hours", unit: "per demo" },
    },
  },
  // "My process": one section in three steps (Audit, Align, Scope), from
  // the owner's "Copy round 2" artboard, 2026-11-04.
  approach: {
    eyebrow: "MY APPROACH",
    // Read by screen readers; on screen the heading is the numbered
    // 01 / 02 / 03 row made from `stepNames`.
    heading: "Audit, Align, Scope",
    stepNames: ["Audit", "Align", "Scope"],
    audit: {
      label: "1. Audit",
      heading: "Process complexity, mapped",
      body: [
        "One demo bounced across 3 roles and 6 handoffs. ",
        { text: "Two bottlenecks ate most of the 5 hours.", bold: true, accent: true },
        " Vague briefs made both slower.",
      ],
      caption: "The old process, from Trello brief to final Figma link.",
      // Drawn in code (ProcessSwimlane): steps run left to right, `lane` is
      // 0 Sales, 1 PM, 2 Design.
      processDiagram: {
        label: "Process diagram across Sales, PM and Design: Sales writes a Trello brief, PM sends questions and Sales answers, PM collects flight screenshots on Notion and sends a brief to design, Design builds it by hand in Figma, PM reviews the Figma link, and the Figma link goes to Sales. The two bottlenecks: the Notion flight screenshots took 2 hours and Figma by hand 3 hours",
        regionLabel: "Process diagram, scroll sideways to see all of it",
        lanes: [{ name: "Sales" }, { name: "PM", highlight: true }, { name: "Design" }],
        steps: [
          { label: "Trello brief", lane: 0, node: "card", labelPosition: "above" },
          { label: "Questions", lane: 1, node: "question", labelPosition: "below" },
          { label: "Answers", lane: 0, node: "reply", labelPosition: "above" },
          { label: "Notion flight screenshots", lane: 1, node: "screens", labelPosition: "below", duration: "2h" },
          { label: "Brief to design", lane: 1, node: "send", labelPosition: "above" },
          {
            label: "Figma by hand",
            lane: 2,
            node: "figma",
            labelPosition: "below",
            duration: "3h",
            // One demo, screenshotted from eco.mio's demo site
            // (ricoh-3, results view) on 2026-11-07.
            preview: {
              src: `${IMG}/figma-by-hand-ricoh-demo.png`,
              alt: "Example demo for Ricoh: London to Amsterdam search results with three curated options, Eurostar recommended for best price, low emissions and shorter travel time",
              width: 1600,
              height: 1083,
              buttonLabel: "Show an example demo built by hand in Figma",
            },
          },
          { label: "Figma link review", lane: 1, node: "link", labelPosition: "below", labelAlign: "start" },
          { label: "Figma link sales", lane: 0, node: "link", labelPosition: "above" },
        ],
      },
    },
    align: {
      label: "2. Align",
      heading: "Stakeholders on the same page",
      body: "I brought sales and PM together to decide what we all needed.",
      cards: [
        {
          tag: "Automation",
          tagIcon: `${IMG}/icon-tag-automation.png`,
          heading: "Faster demos",
          body: [
            "Reduce the 5h of manual work with AI, especially on the identified ",
            { text: "bottlenecks", bold: true },
            ".",
          ],
        },
        {
          tag: "Personalization",
          tagIcon: `${IMG}/icon-tag-personalization.png`,
          heading: "Even more tailored",
          body: [
            "Sales showed that clients expect even ",
            { text: "higher quality", bold: true },
            " than we were delivering.",
          ],
        },
        {
          tag: "Decentralization",
          tagIcon: `${IMG}/icon-tag-decentralization.png`,
          heading: "No PM involved",
          body: [
            "Sitting between sales and design ",
            { text: "made no sense", bold: true },
            ", and the PM wanted out.",
          ],
        },
      ],
    },
    scope: {
      label: "3. Scope",
      heading: "One key constraint. Two scope decisions.",
      // The blue card; its arrow points at the two decisions it shaped.
      constraint: {
        tag: "Constraint",
        // Owner's 3D "no" sign, recoloured from red to black.
        tagIcon: `${IMG}/icon-tag-constraint.png`,
        heading: "No dev time",
        body: [
          "Dev had no capacity in this phase. ",
          { text: "No new features", bold: true },
          ", only what eco.mio can do now.",
        ],
        arrowLabel: "The constraint shaped these decisions",
      },
      eightyTwenty: {
        heading: "Automate the 80%",
        body: "We’d cover the most common requests. Edge cases stay manual, but equally adaptable.",
        emphasis: "Edge cases stay manual",
      },
      build: {
        heading: "Build on real code",
        body: "I built it myself on eco.mio’s own codebase, using real product components.",
        emphasis: "real product components",
        // tileClass: the tile behind each logo, in the style of the owner's
        // app icons: Claude orange, Cursor near-black, GitHub purple.
        // inset "logo": full-color mark inset at ~80% of the tile;
        // "icon": a 28px glyph centred on a dark tile.
        tools: [
          { src: `${IMG}/logo-claude-code-white.png`, alt: "Claude Code", tileClass: "bg-claude-orange-500", inset: "logo" },
          { src: `${IMG}/logo-cursor-cube.svg`, alt: "Cursor", tileClass: "bg-portfolio-grey-900", inset: "icon" },
          { src: `${IMG}/logo-github.svg`, alt: "GitHub", tileClass: "bg-github-purple-500", inset: "icon" },
          { src: `${IMG}/logo-netlify.png`, alt: "Netlify", tileClass: "bg-white", inset: "logo" },
        ],
      },
    },
  },
  finalSolution: {
    eyebrow: "FINAL SOLUTION",
    heading: "Demo Studio: the automated demo maker",
    body: "Create a demo, add the client and routes, upload three screenshots, publish. One person, no handovers.",
  },
  solutionSections: [
    {
      number: "01.",
      title: "Automation",
      tag: "Automation",
      tagIcon: `${IMG}/icon-tag-automation.png`,
      blocks: [
        {
          heading: "AI reads three screenshots and fills every field",
          images: [
            { alt: "Uploading three flight screenshots, coming soon", caption: "Upload three flight screenshots" },
            { alt: "AI filling in the demo fields, coming soon", caption: "AI fills all 36+ fields" },
            { alt: "Recommendation pills on each pick, coming soon", caption: "Pills like +€526 highlight each pick" },
          ],
        },
        {
          heading: "From 36+ fields typed by hand to one upload",
          images: [],
          beforeAfter: {
            before: { alt: "Demo fields typed by hand, coming soon" },
            after: { alt: "Demo fields filled from one upload, coming soon" },
          },
        },
      ],
    },
    {
      number: "02.",
      title: "Personalization",
      tag: "Personalization",
      tagIcon: `${IMG}/icon-tag-personalization.png`,
      blocks: [
        {
          heading: "Built on eco.mio's own components, so the demo is the product",
          images: [
            {
              alt: "The full demo flow, coming soon",
              caption: "The full flow: search, loading and recommendations",
            },
            { alt: "OBT results and booking screens, coming soon", caption: "OBT results, confirmation and booking" },
          ],
        },
        {
          heading: "High-fidelity Egencia, Concur and Cytric, so clients see their own tool",
          headingMaxWidth: 518,
          connectWithArrow: true,
          images: [
            { alt: "The demo in Egencia, coming soon", caption: "The demo in Egencia" },
            { alt: "The same demo in Concur and Cytric, coming soon", caption: "The same demo in Concur and Cytric" },
          ],
        },
      ],
    },
    {
      number: "03.",
      title: "Decentralization",
      tag: "Decentralization",
      tagIcon: `${IMG}/icon-tag-decentralization.png`,
      blocks: [
        {
          heading: "Every field stays editable when a screenshot can't be read",
          images: [
            { alt: "CMS-style backend, coming soon", caption: "CMS-style backend, every field editable" },
            { alt: "Logo library picker, coming soon", caption: "Logos fill from a library, with manual upload as backup" },
          ],
        },
        {
          heading: "One click publishes a live link anyone can share",
          headingMaxWidth: 538,
          images: [
            { alt: "Publish button, coming soon", caption: "Publish in one click" },
            { alt: "The published demo link, coming soon", caption: "A live link the client keeps" },
          ],
        },
      ],
    },
  ],
  discardedIdeas: {
    eyebrow: "DISCARDED IDEAS",
    heading: "Some of the many ‘NOs’",
    body: [
      "For each front, I came up with many ideas that didn't make the cut due to ",
      { text: "complexity, tech constraints", bold: true },
      " or lack of resources. Prioritizing what moved the needle took careful thinking and ",
      { text: "real tradeoffs.", bold: true },
    ],
    cards: [
      { heading: "80%, not 100%", body: "We'd cover the most common requests. Edge cases stay manual.", emphasis: "most common requests" },
      { heading: "No dev time", body: "The team had no capacity to invest.", emphasis: "no capacity" },
      { heading: "Today's product only", body: "No new features, so demos show what eco.mio can do now.", emphasis: "No new features" },
    ],
  },
  results: {
    eyebrow: "IMPACT",
    heading: "Demos went from 5 hours to 30 minutes",
    statCards: [
      { heading: "10x faster demos", body: "Each demo went from 5 hours to 30 minutes.", emphasis: "5 hours to 30 minutes" },
      { heading: "15h a month back", body: "At an average of 3 demos a month.", emphasis: "3 demos a month" },
      { heading: "Adopted beyond sales", body: "Marketing now uses Demo Studio to create content.", emphasis: "Marketing" },
    ],
    feedbackIntro: "Client feedback that made my day",
    featuredTestimonial: {
      quote: "[Client's feedback on Demo Studio, shared by Jamaine]",
      user: {
        avatar: { alt: "Client photo, coming soon" },
        name: "eco.mio client, via Jamaine (Sales)",
      },
    },
  },
  closingTakeaways: {
    eyebrow: "LEARNINGS",
    heading: "Lessons that stuck",
    testimonials: [
      {
        number: "01.",
        quote: "Fix the process, not the deliverable.",
        detail: "Every demo I made by hand cost 5 hours. The tool made every one after it cost 30 minutes.",
        detailLead: "Every demo I made by hand cost 5 hours. The tool made every one after it cost ",
        detailBold: "30 minutes",
        detailRest: ".",
      },
      {
        number: "02.",
        quote: "Constraints are a brief.",
        detail: "No dev, no new features and no 100% told me exactly what to build.",
        detailLead: "No dev, no new features and no 100% told me ",
        detailBold: "exactly what to build",
        detailRest: ".",
      },
      {
        number: "03.",
        quote: "Know where vibe coding stops.",
        detail: "It removed design's manual work. Automating flight scraping needs real engineering, so dev joins next.",
        detailLead: "It removed design's manual work. Automating flight scraping needs ",
        detailBold: "real engineering",
        detailRest: ", so dev joins next.",
      },
    ],
  },
  whatsNext: {
    eyebrow: "WHAT'S NEXT",
    heading: "The team liked it so much, it's growing",
    body: "Demo Studio solved design's bottleneck. PM's still needs dev.",
    items: [
      {
        tag: "Hotels",
        image: { alt: "Demo Studio for hotels, coming soon" },
        captionTitle: "Expanding to hotels",
        captionBody: "Demo Studio is being extended to eco.mio's new hotel product",
      },
      {
        tag: "Dev",
        image: { alt: "Automated flight scraping, coming soon" },
        captionTitle: "Bringing dev in",
        captionBody: "To automate flight scraping, the bottleneck vibe coding couldn't solve",
      },
    ],
  },
};
