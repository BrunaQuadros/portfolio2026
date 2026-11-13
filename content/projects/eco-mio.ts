import type { EcoMioContent } from "./types";

const IMG = "/images/case-studies/eco-mio";

// eco.mio case study copy. Wording is preserved verbatim from the approved
// Figma design (Portfolio 2026, "eco.mio Case Study (full draft)"), apart
// from four typo fixes approved by the owner. Images without a `src` are
// still empty frames in Figma and render as grey placeholders.
export const ecoMio: EcoMioContent = {
  sectionNav: [
    { id: "overview", label: "Overview" },
    { id: "context", label: "Context" },
    { id: "problem", label: "Problem" },
    { id: "approach", label: "My approach" },
    { id: "solution", label: "Final solution" },
    { id: "impact", label: "Impact" },
    { id: "learnings", label: "Learnings" },
  ],
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
        "Introduced ",
        { text: "AI prototypes as the team’s new handoff,", bold: true },
        " replacing static Figma links.",
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
        "I designed the first two demos the old way, as a hands-on audit.",
        // Desktop-only break (RichText default: lg up); phones wrap naturally.
        { br: true },
        "By then, ",
        { text: "the two bottlenecks were clear.", bold: true, accent: true },
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
      heading: "One key constraint → Two scope decisions",
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
    heading: "Demo Studio, the demo maker",
    body: "An internal tool anyone can use. Create a demo, add the client and routes, upload three screenshots, publish. One person, no handovers.",
  },
  // One run of cards with no giant numbered titles (owner's Figma order,
  // node 1677:778). Each card carries its own tag pill.
  solutionSections: [
    {
      number: "",
      title: "Demo Studio",
      tag: "",
      blocks: [
        // First look at Demo Studio (it opens the solution cards).
        {
          heading: "Anyone can build a demo",
          tag: "Decentralization",
          tagIcon: `${IMG}/icon-tag-decentralization.png`,
          images: [],
          // Owner's recording (3. Solution1-demo-studio-new-demo-flow-8s-no-background.mp4).
          video: {
            src: "/videos/case-studies/eco-mio/decentralization-new-demo-flow.mp4",
            alt: "Demo Studio: creating a new demo, from client and route to a finished demo",
            aspectClass: "aspect-[1920/1290]",
          },
        },
        {
          heading: "Choose layout and routes according to client’s needs",
          tag: "Personalization",
          tagIcon: `${IMG}/icon-tag-personalization.png`,
          images: [],
          // Owner's recording (demo-studio-layout-route-siemens.mp4), edited:
          // the demo is renamed Bayer and the sidebar lists only that demo.
          video: {
            src: "/videos/case-studies/eco-mio/personalization-layout-route-bayer.mp4",
            alt: "Demo Studio: switching the layout from class to emissions, setting the route to Frankfurt to Paris and picking a date",
            aspectClass: "aspect-[2884/1940]",
          },
        },
        {
          heading: "Screenshot reader fills every field",
          tag: "Automation",
          tagIcon: `${IMG}/icon-tag-automation.png`,
          // One line on desktop (owner's request); wraps on phones.
          headingMaxWidth: 640,
          images: [],
          // Owner's recording (4. Solution2-demo-studio-autofill-siemens.mp4),
          // edited: studio.ecomio.com address, the demo renamed Bayer with
          // only that demo in the sidebar, and the drag starting at the
          // Lufthansa card overlay.
          video: {
            src: "/videos/case-studies/eco-mio/automation-autofill-bayer.mp4",
            alt: "Demo Studio: flight screenshots are uploaded for a Bayer demo and AI fills in every field",
            aspectClass: "aspect-[2884/1940]",
            // Image overlapping the video's lower left corner: a flight card
            // from a booking tool (4. Solution2-lufthansa-screenshot.png).
            overlay: {
              src: `${IMG}/automation-lufthansa-screenshot.png`,
              alt: "A Lufthansa flight card from a booking tool: Frankfurt to Paris Charles de Gaulle, nonstop, 8:10 AM to 9:25 AM, 1h 15m, flight LH 1026, 264 kg CO2e",
              aspectClass: "aspect-[812/1008]",
            },
          },
        },
        {
          heading: "Tweak and publish to see the demo live",
          tag: "Automation",
          tagIcon: `${IMG}/icon-tag-automation.png`,
          images: [],
          // Owner's recording (demo-studio-edit-publish-concur-siemens.mp4),
          // edited: the demo renamed Bayer (also in the preview address) with
          // only that demo in the sidebar.
          video: {
            src: "/videos/case-studies/eco-mio/automation-edit-publish-concur-bayer.mp4",
            alt: "Demo Studio: a flight's price and emissions are edited, the demo is published, and the preview opens in SAP Concur showing the three curated flights",
            aspectClass: "aspect-[2884/1940]",
          },
        },
        {
          heading: "Easy switch to client’s OBT for a full product flow.",
          tag: "Personalization",
          tagIcon: `${IMG}/icon-tag-personalization.png`,
          images: [],
          // Owner's recording (demo-studio-concur-loop-booking-bayer.mp4).
          video: {
            src: "/videos/case-studies/eco-mio/personalization-concur-loop-booking-bayer.mp4",
            alt: "The Bayer demo switches between booking tools (SAP Concur, Egencia, Neo), then a flight from Frankfurt to Paris is searched, picked from the three curated options and booked in Concur",
            aspectClass: "aspect-[2884/1940]",
          },
        },
      ],
    },
  ],
  results: {
    eyebrow: "IMPACT",
    heading: "A powerful sales tool",
    statCards: [
      // Icons: Thiings (thiings.co), free for personal use.
      { icon: `${IMG}/impact-icon-stopwatch.png`, heading: "10x faster", body: "Each demo went from 5 hours to 30 minutes, freeing about 15h a month.", emphasis: "5 hours to 30 minutes" },
      { icon: `${IMG}/impact-icon-waving-hand.png`, heading: "PM out, anyone in", body: "Sales and marketing now build demos on their own, even live in meetings.", emphasis: "Sales and marketing" },
      { icon: `${IMG}/impact-icon-trophy.png`, heading: "Demos that impress", body: "Live flows in each client’s own OBT, now with a link they can share internally.", emphasis: "each client’s own OBT" },
    ],
    feedbackIntro: "Client feedback that made my day",
    feedbackIntroIcon: `${IMG}/impact-icon-heart-white.png`,
    featuredTestimonial: {
      // Key line from Jamaine's Slack message; the full message opens in a pop-up.
      // The client's name is under NDA, so it is replaced with [Client].
      quote: "[Client] was super happy and convinced and congratulated us for a smart tool.",
      user: {
        avatar: { src: `${IMG}/avatar-jamaine.png`, alt: "" },
        name: "Jamaine, Sales at eco.mio",
      },
      fullMessage: {
        screenshot: {
          src: `${IMG}/impact-jamaine-slack-two-highlights.png`,
          alt: "Slack message from Jamaine, Sep 14th at 6:05 PM: Heeey @Bruna I was just in a Discovery call with a pretty big lead and in the end he was asking whether I could show him some example and we had only a few min left. What can I say, I just jumped over to the preview, changed the interface to Concur in just a few seconds and could underline what I initially told him. He was super happy and convinced and congratulated us for a smart tool. That said, the demo flow and studio made a great difference here. So thank you very much!!! (red heart)",
          // Rebuilt from the original screenshot at 3x so it stays sharp, with
          // "pretty big lead" and the quoted sentence highlighted in eco.mio
          // blue (#6b81ee).
          width: 1806,
          height: 867,
        },
      },
    },
  },
  closingTakeaways: {
    eyebrow: "LEARNINGS",
    heading: "Lessons that stuck",
    testimonials: [
      {
        number: "01.",
        quote: "Own the process, delivery will follow.",
        detail: "Fixing how demos were made raised the quality of every demo, not just the next one.",
        detailLead: "Fixing how demos were made raised the quality of ",
        detailBold: "every demo",
        detailRest: ", not just the next one.",
      },
      {
        number: "02.",
        quote: "Constraints spark creative solutions.",
        detail: "No dev time pushed me to build it myself, with AI, on eco.mio’s real codebase.",
        detailLead: "No dev time pushed me to ",
        detailBold: "build it myself",
        detailRest: ", with AI, on eco.mio’s real codebase.",
      },
      {
        number: "03.",
        quote: "Ship the 80% fast.",
        detail: "We covered most of the cases, so the tool could go live fast. Edge cases are next.",
        detailLead: "We covered most of the cases, so the tool could ",
        detailBold: "go live fast",
        detailRest: ". Edge cases are next.",
      },
    ],
  },
};
