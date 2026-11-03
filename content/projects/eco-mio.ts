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
      "eco.mio is an AI recommendation engine making business travel simpler, faster and greener. How I built Demo Studio, an automated demo maker that turned 5 hours of work into 30 minutes.",
    year: "2026",
  },
  hero: {
    // Same file as the homepage card logo (identical bytes in Figma).
    logo: { src: "/images/home/logo-eco-mio.jpg", alt: "eco.mio logo" },
    headingLine1: "Automating sales demos",
    headingLine2: "to cut 15h of work monthly",
    description: [
      "eco.mio is an ",
      { text: "AI recommendation engine", accent: true },
      " making business travel simpler, faster and greener. Companies like Bayer use it to save up to ",
      { text: "10% on travel costs", accent: true },
      " a year.",
    ],
    video: {
      src: "/videos/home/eco-mio-demo-studio.mp4",
      alt: "Demo Studio walkthrough: creating a flight demo for a client, filling in route, dates and fare cards, publishing it, then the generated Concur booking flow",
    },
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
    heading: "Why tailored demos?",
    paragraphs: [
      [
        "Corporate booking tools (OBTs) show travelers ",
        { text: "30+ options per trip,", bold: true },
        " causing decision fatigue, delayed bookings and missed savings.",
      ],
      [
        "eco.mio narrows them to ",
        { text: "3 recommendations", bold: true },
        " based on what each client prioritizes: lower cost, train over plane, or lower CO₂.",
      ],
      [
        {
          text: "Routes and priorities differ by client, so every lead needs its own custom prototype.",
          bold: true,
          accent: true,
        },
      ],
    ],
    image: {
      src: `${IMG}/context-concur-results.png`,
      alt: "SAP Concur flight results for London to Amsterdam, listing dozens of fares across economy and business classes",
      width: 1438,
      height: 4096,
    },
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
    processImage: {
      alt: "The demo process when I joined the company, coming soon",
      caption: "Process when I joined the company",
    },
  },
  approach: {
    eyebrow: "MY APPROACH",
    heading: "Audit → Align → Scope",
    body: "I audited the process myself, aligned with sales and PM on needs & constraints. Scope came next.",
    processPanel: "Process that took 5 hours",
  },
  findings: {
    eyebrow: "FINDINGS",
    heading: "What the team needs",
    body: "I audited the process myself, aligned with sales and PM on needs & constraints. Scope came next.",
    cards: [
      {
        tag: "Speed",
        tagIcon: `${IMG}/icon-tag-speed.png`,
        heading: "Automate to speed up the manual work",
        body: "Auditing revealed two bottlenecks: PM scraping flights and design replacing info manually.",
      },
      {
        tag: "Personalization",
        tagIcon: `${IMG}/icon-tag-personalization.png`,
        heading: "Sales needed high personalized demos",
        body: "Aligning with sales revealed that clients want to see the demo on their own OBT, routes and highlights.",
      },
      {
        tag: "Decentralization",
        tagIcon: `${IMG}/icon-tag-decentralization.png`,
        heading: "Demos shouldn’t depend on PM time",
        body: "PM was the bottleneck. She was overloaded and ideally had to be taken off the process.",
      },
    ],
    scope: { icon: `${IMG}/icon-scope-arrow.png`, label: "Scope" },
    build: {
      heading: "Building Demo Studio",
      body: "With no dev time, I designed and built it myself, with Claude Code, Cursor and GitHub, on eco.mio's own codebase and current design.",
      // tileClass: the tile behind each logo, mapped to the closest
      // existing tokens (Figma's #faf5ed, #17171a and #1f2126 brand tiles).
      // inset "logo": full-color mark inset at ~80% of the tile;
      // "icon": a 28px glyph centred on a dark tile.
      tools: [
        { src: `${IMG}/logo-claude-code.png`, alt: "Claude Code", tileClass: "bg-portfolio-grey-50", inset: "logo" },
        { src: `${IMG}/logo-cursor.svg`, alt: "Cursor", tileClass: "bg-portfolio-grey-900", inset: "icon" },
        { src: `${IMG}/logo-github.svg`, alt: "GitHub", tileClass: "bg-portfolio-grey-900", inset: "icon" },
        { src: `${IMG}/logo-netlify.png`, alt: "Netlify", tileClass: "bg-white", inset: "logo" },
      ],
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
      title: "Speed",
      tag: "Speed",
      tagIcon: `${IMG}/icon-tag-speed.png`,
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
      title: "Tailored",
      tag: "Tailored",
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
      title: "Autonomy",
      tag: "Autonomy",
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
