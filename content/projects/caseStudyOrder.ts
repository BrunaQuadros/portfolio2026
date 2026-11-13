// The order visitors move through the case studies with the Previous and Next
// arrows. Same order as the homepage; add a line here when a new case study
// page is published.
export const caseStudyOrder = [
  { slug: "faircado", name: "Faircado", href: "/case-studies/faircado" },
  { slug: "eco-mio", name: "eco.mio", href: "/case-studies/eco-mio" },
];

// Heading above the next case study's card at the end of each case study.
export const nextProjectHeading = "Next Project";

// The case studies either side of this one. The order loops, so the arrows
// always lead somewhere.
export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudyOrder.findIndex((caseStudy) => caseStudy.slug === slug);
  const count = caseStudyOrder.length;
  return {
    previous: caseStudyOrder[(index - 1 + count) % count],
    next: caseStudyOrder[(index + 1) % count],
  };
}
