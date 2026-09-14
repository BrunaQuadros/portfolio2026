import type { Metadata } from "next";
import Image from "next/image";
import { faircado } from "@/content/projects/faircado";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { ProblemCard } from "@/components/case-study/ProblemCard";
import { MethodCard } from "@/components/case-study/MethodCard";
import { TestimonialCard } from "@/components/case-study/TestimonialCard";
import { StatCard } from "@/components/case-study/StatCard";
import { SolutionSection } from "@/components/case-study/SolutionSection";
import { TeamAvatarGroup } from "@/components/case-study/TeamAvatarGroup";
import { DiscardedIdeasSection } from "@/components/case-study/DiscardedIdeasSection";

const IMG = "/images/case-studies/faircado";

export const metadata: Metadata = {
  title: faircado.meta.title,
  description: `${faircado.context.bodyBold1}${faircado.context.bodyText1}`,
};

export default function FaircadoCaseStudyPage() {
  const {
    hero,
    context,
    roleInfo,
    problem,
    approach,
    problemCards,
    takeaways,
    insight,
    finalSolution,
    solutionSections,
    discardedIdeas,
    results,
    closingTakeaways,
  } = faircado;

  // Takeaways section pieces. Rendered twice (once for the mobile
  // interleaved layout, once for the desktop two-row grid, each hidden at
  // the other's breakpoints), so they live in small helpers instead of
  // being copy-pasted.
  const renderTakeawayTestimonial = (i: number) => (
    // The background numeral's own left edge lines up with the column's
    // bare left edge (matching the card background below), while the
    // actual quote/body text stays inset with pl-10 to match the card's
    // text — text aligns with text, background aligns with background.
    <div key={i} className="relative">
      <img
        src={`${IMG}/takeaways-number-0${i + 1}.svg`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 w-[calc(68%+40px)]"
      />
      {/* Pushes the quote/heading/body down while the background numeral
          (an absolutely-positioned sibling) stays put, so more of the
          numeral shows above the content instead of being covered by the
          quote mark right away. */}
      <div className="pl-6 pr-6 pt-14 sm:pl-10">
        <TestimonialCard {...takeaways.testimonials[i]} />
      </div>
    </div>
  );

  const renderProblemCard = (i: number) => {
    const card = problemCards[i];
    return (
      <ProblemCard
        key={i}
        tag={card.tag}
        tagIcon={
          i === 0
            ? `${IMG}/icon-tag-awareness.png`
            : i === 1
              ? `${IMG}/icon-tag-accuracy.png`
              : `${IMG}/icon-tag-momentum.png`
        }
        heading={card.heading}
        headingAccent={card.headingAccent}
        headingTail={card.headingTail}
        body={card.body}
      />
    );
  };

  return (
    <main className="flex flex-col gap-24 pb-32 sm:gap-32">
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col items-center gap-16 px-4 pt-20 sm:px-10 lg:gap-[110px] lg:pt-32">
        <div className="flex w-full max-w-[968px] flex-col gap-10 lg:gap-16">
          <div className="relative size-16">
            <Image src={hero.logo.src} alt={hero.logo.alt} fill priority />
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-manrope font-bold text-[40px] leading-[1.1] tracking-[-1.5px] text-portfolio-grey-900 sm:text-[56px] lg:text-[70px] lg:leading-[88px] lg:tracking-[-2.1px]">
              {hero.headingLine1}
              {/* The line break here is a desktop-only art direction choice
                  (two balanced lines at the lg heading size). Forcing it at
                  every breakpoint orphaned words on mobile, since the text
                  wraps again on top of the manual break at narrower widths;
                  hiding the <br> below lg lets it wrap naturally there. */}
              <br className="hidden lg:block" />
              {" "}
              {hero.headingLine2Before}{" "}
              {/* Decorative 3D star sized in em so it scales with the heading
                  at every breakpoint. Empty alt: it's ornamental, the word
                  "star" already carries the meaning for screen readers. */}
              {/* overflow-hidden clips the glasses while they travel in and out, so
                  they never show over the line of text above the star. */}
              <span className="group relative inline-block size-[1.25em] translate-x-0.5 overflow-hidden align-[-0.28em]">
                <Image
                  src={hero.headingStar.src}
                  alt={hero.headingStar.alt}
                  width={96}
                  height={96}
                  className="size-full"
                />
                {/* The sunglasses image shares the star's canvas, so stacking
                    it edge to edge lands the glasses exactly on the face. They
                    start hidden and tilted above the star, then drop on hover
                    with an overshoot easing so they "settle" onto the face.
                    Opacity fades in faster (150ms) than the movement (500ms).
                    Tailwind 4 animates `translate` and `rotate` as their own
                    CSS properties, so they must be listed by name here;
                    listing only `transform` would make the drop snap. */}
                <Image
                  src={hero.headingStarGlasses.src}
                  alt={hero.headingStarGlasses.alt}
                  width={96}
                  height={96}
                  aria-hidden
                  className="absolute inset-0 size-full -translate-y-full -rotate-6 opacity-0 transition-[translate,rotate,opacity] ease-[cubic-bezier(0.34,1.56,0.64,1)] [transition-duration:500ms,500ms,150ms] group-hover:translate-y-0 group-hover:rotate-0 group-hover:opacity-100"
                />
              </span>{" "}
              {hero.headingLine2After}
            </h1>
            <p className="font-manrope text-[22px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] lg:text-[40px] lg:leading-[60px] lg:tracking-[-1.2px]">
              {hero.descriptionLead}
              <span className="text-faircado-green-500">{hero.descriptionAccent1}</span>
              {hero.descriptionMid1}
              <br className="hidden lg:block" />
              {" "}
              {hero.descriptionMid2}
              <span className="text-faircado-green-500">{hero.descriptionAccent2}</span>
              {hero.descriptionTail}
            </p>
          </div>
        </div>
        <div
          // Sits inside the section's own px-4/sm:px-10 padding, same as every
          // other gray panel on the page — no full-bleed breakout, so this panel
          // keeps the same 24px (mobile) / 40px (sm+) gutter as the rest.
          className="relative w-full aspect-[9/13] overflow-hidden rounded-case-mobile bg-portfolio-grey-50 sm:aspect-[16/10] sm:rounded-case-2xl lg:aspect-[1220/728] lg:rounded-case-3xl"
        >
          <Image
            src={`${IMG}/badge-featured-app-store.png`}
            alt="Featured by App Store"
            width={518}
            height={172}
            className="absolute left-[5%] top-[3%] w-[36%] object-contain lg:left-[3.6%] lg:top-[6%] lg:w-[24%]"
          />
          {/* The phone/hand mockup and the app content are now a single pre-composited
              video, so there's no separate frame image or manual video-box positioning
              to maintain — one element, same on-screen placement the frame image used
              to have. Mobile/sm get a taller container (aspect-[9/13]/[16/10]) and a
              bigger, centered video so the hand+phone read at a usable size on a phone
              screen, matching reference treatments; lg keeps the original wide-panel
              placement untouched. Below sm the box sits at 58.5% (not 50%)
              because the hand in the video reaches further right than the
              phone, so the composition's visual centre is at ~46% of the
              video's width; nudging the box right centres hand + phone in
              the panel. */}
          <video
            src="/videos/case-studies/faircado/hero-cover-video.mp4"
            className="absolute left-[58.5%] top-[2%] h-[98%] w-[84%] -translate-x-1/2 object-contain object-bottom sm:left-[58%] sm:top-[4%] sm:h-[98%] sm:w-[62%] lg:left-[37.54%] lg:top-[10.74%] lg:h-[97.5%] lg:w-[44.93%] lg:translate-x-0 lg:object-center"
            autoPlay
            muted
            loop
            playsInline
            aria-label={hero.image.alt}
          />
        </div>
      </section>

      {/* Section 2: Role / Timeline / Team / Space + Impact, then Context */}
      <section className="mx-auto w-full max-w-[1220px] px-4 sm:px-10">
        <div className="mx-auto flex w-fit max-w-full flex-col gap-10 rounded-case-mobile bg-portfolio-grey-50 p-6 sm:rounded-case-xl sm:p-10 lg:p-[60px]">
          {/* Grid (2 fixed columns) on mobile so My Role/Space stack in the left
              column and Team/Timeline stack in the right column — both pairs
              read as similarly narrow, so pairing them this way (instead of the
              desktop's My Role+Timeline / Team+Space row order) avoids an
              awkward ragged mix of short and long columns. `order-*` reshuffles
              only the mobile grid; sm:order-none restores the original DOM
              order once the layout switches back to the desktop flex row. */}
          {/* Left column wider than the right (3fr/2fr) on mobile, and the
              value lines drop to 15px there — "Product Designer" and
              "Aggregator app" were wrapping to 2 lines in an even 2-column
              split at 18px. sm+ resets both (equal columns via flex, 18px
              text) since the desktop row never had this problem. */}
          <div className="grid grid-cols-[3fr_2fr] gap-x-6 gap-y-10 sm:flex sm:flex-wrap sm:gap-16 lg:gap-x-[140px]">
            <div className="order-1 flex flex-col gap-2 sm:order-none">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">My Role</p>
              <div className="flex flex-col">
                <p className="-mb-0.5 whitespace-nowrap font-manrope font-bold text-[15px] leading-[24px] text-portfolio-grey-900 sm:whitespace-normal sm:text-[18px] sm:leading-[28px]">{roleInfo.role.title}</p>
                <p className="whitespace-nowrap font-manrope font-bold text-[15px] leading-[24px] text-portfolio-grey-600 sm:whitespace-normal sm:text-[18px] sm:leading-[28px]">{roleInfo.role.subtitle}</p>
              </div>
            </div>
            <div className="order-4 flex flex-col gap-2 sm:order-none">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">Timeline</p>
              <div className="flex flex-col">
                <p className="-mb-0.5 whitespace-nowrap font-manrope font-bold text-[15px] leading-[24px] text-portfolio-grey-900 sm:whitespace-normal sm:text-[18px] sm:leading-[28px]">{roleInfo.timeline.title}</p>
                <p className="whitespace-nowrap font-manrope font-bold text-[15px] leading-[24px] text-portfolio-grey-600 sm:whitespace-normal sm:text-[18px] sm:leading-[28px]">{roleInfo.timeline.subtitle}</p>
              </div>
            </div>
            <div className="order-2 flex flex-col gap-2 sm:order-none">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">Team</p>
              <TeamAvatarGroup avatar={roleInfo.team.avatar} extra={roleInfo.team.extra} extraBreakdown={roleInfo.team.extraBreakdown} />
            </div>
            <div className="order-3 flex flex-col gap-2 sm:order-none">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">Space</p>
              <div className="flex flex-col">
                <p className="-mb-0.5 whitespace-nowrap font-manrope font-bold text-[15px] leading-[24px] text-portfolio-grey-900 sm:whitespace-normal sm:text-[18px] sm:leading-[28px]">{roleInfo.space.title}</p>
                <p className="whitespace-nowrap font-manrope font-bold text-[15px] leading-[24px] text-portfolio-grey-600 sm:whitespace-normal sm:text-[18px] sm:leading-[28px]">{roleInfo.space.subtitle}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">My Impact</p>
            <ul className="list-disc space-y-1 pl-5 font-manrope text-[15px] leading-[24px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
              {roleInfo.impact.map((bullet, i) => {
                const phrase = bullet.emphasis?.[0];
                const splitIndex = phrase ? bullet.text.indexOf(phrase) : -1;
                if (!phrase || splitIndex === -1) {
                  return <li key={i}>{bullet.text}</li>;
                }
                const before = bullet.text.slice(0, splitIndex);
                const after = bullet.text.slice(splitIndex + phrase.length);
                return (
                  <li key={i}>
                    {before}
                    <span className="font-bold">{phrase}</span>
                    {after}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="relative mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 max-sm:overflow-x-hidden sm:gap-16 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <div
          className="w-full lg:max-w-[520px]"
          // Aligns this heading's left edge with the text inside the My
          // Role/Impact box above (not that box's grey background): the box is
          // centered and hugs its own content (~975px wide), so its inner text
          // sits inset by half the leftover space, plus the box's 40px padding.
          style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}
        >
          <SectionHeading
            eyebrow={context.eyebrow}
            heading={context.heading}
            body={
              <div className="flex flex-col gap-4">
                <p>
                  <span className="font-bold">{context.bodyBold1}</span>
                  <br />
                  {context.bodyText1}
                </p>
                <p>
                  {context.bodyText2Lead}
                  <span className="font-bold text-faircado-pink-500">{context.bodyAccent}</span>
                  {context.bodyText2Tail}
                  <span className="font-bold">{context.bodyBold2}</span>
                </p>
              </div>
            }
          />
        </div>
        {/* Below sm the cluster box is 18% wider than the column, pulled
            out with negative side margins so the three cards (which only
            fill ~82% of the box's width, sitting slightly left of its
            centre) read bigger and land centred on the screen. The margins
            are uneven on purpose to correct that off-centre cluster. The cards also end at ~82% of the
            box's height, so the negative bottom margin trims that empty
            band before the next section. */}
        <div className="relative -ml-[6%] -mr-[12%] -mb-8 w-[118%] aspect-[399/373] max-w-none shrink-0 sm:mx-auto sm:mb-0 sm:w-full sm:max-w-[475px]">
          {context.cards.map((card, i) => (
            <div
              key={i}
              className="absolute transition-transform duration-300 ease-out hover:z-30 hover:scale-[1.08]"
              // Tightly overlapping cluster (article card behind, tucked under the
              // two stat cards). Rotations match the exact Figma values; radius and
              // shadow are applied here in CSS since these are now plain flat photos
              // (no chrome/shadow baked in), per the design system's Shadow/L token.
              // The rotation is a wrapper around this div (below) so the hover scale
              // above doesn't fight with it for the single `transform` property.
              style={
                i === 0
                  ? { left: "20%", top: "42%", width: "40%", aspectRatio: "1 / 1", zIndex: 1 }
                  : i === 1
                    ? { left: "6%", top: "4%", width: "44%", aspectRatio: "1 / 1", zIndex: 2 }
                    : { left: "46%", top: "10%", width: "42%", aspectRatio: "1 / 1", zIndex: 3 }
              }
            >
              <div
                className="relative size-full"
                style={{ transform: `rotate(${i === 0 ? "-1.72deg" : i === 1 ? "2.31deg" : "-3.58deg"})` }}
              >
                {/* Black and white by default; hovering the card (the whole
                    absolutely-positioned wrapper above, which this image fills)
                    reveals full color. A CSS filter, not a second image file, so
                    there's only one asset per card to keep track of. */}
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="rounded-[20px] object-cover shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] grayscale transition-[filter] duration-300 ease-out hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem statement */}
      <section className="mx-auto w-full max-w-[1220px] px-4 sm:px-10">
        <div
          className="w-full lg:max-w-[520px]"
          // Same alignment trick as the Context heading above: lines this
          // block's left edge up with the text inside the My Role/Impact box
          // (not the box's own background), not the section's own padding.
          style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}
        >
          <SectionHeading
            eyebrow={problem.eyebrow}
            heading={
              <>
                {problem.headingLine1}
                <br />
                {problem.headingLine2}
              </>
            }
            body={
              <div className="flex flex-col gap-4">
                <p>
                  {problem.bodyText1Lead}
                  <span className="font-bold">{problem.bodyAccent1}</span>
                  {problem.bodyText1Tail}
                </p>
                <p>
                  {problem.bodyText2Lead}
                  <span className="font-bold">{problem.bodyAccent2}</span>
                  {problem.bodyText2Tail}
                </p>
                <p className="font-bold">{problem.closingLine}</p>
              </div>
            }
          />
        </div>
      </section>

      {/* Challenge headline. The gray panel sits inside the section's own
          px-4/sm:px-10 padding (no full-bleed breakout — that left it
          edge-to-edge with no gutter on desktop windows narrower than the
          section's max-w), and the whole block is pulled up with a negative
          top margin to overlap the Problem section above — rather than
          sharing row space with the Problem text, which forced the box
          narrow and the headline down to a tiny font size. */}
      {/* -mt-12 below lg: the grey panel sits 48px under "So our challenge
          became:" (the heading-to-content step) instead of the 96px section
          gap, since it completes that sentence. */}
      <section className="relative z-10 mx-auto -mt-12 w-full max-w-[1220px] px-4 sm:px-10 lg:-mt-[420px]">
        <div className="w-full">
          <div className="flex flex-col items-center">
            {/* The MVP phone (with its caption) is desktop-only: on phones
                it added little between the Problem text and the challenge
                panel. On lg it overlaps the panel by 150px and sits to the
                right, as before. */}
            <div className="relative z-10 hidden w-[250px] shrink-0 flex-col items-center gap-3 lg:mb-[-150px] lg:ml-auto lg:mr-16 lg:flex lg:-translate-x-10">
              <p className="w-[226px] text-center font-manrope text-[14px] leading-[20px] text-portfolio-grey-600">
                The Image Search MVP
              </p>
              <div className="relative h-[541px] w-[250px] overflow-hidden rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                <Image src={problem.beforeImage.src} alt={problem.beforeImage.alt} fill className="object-cover" />
              </div>
            </div>
            {/* Below lg the panel grows to its content with even padding;
                on lg it keeps its fixed 340px height with no padding, since
                the text sits beside the phone there. */}
            <div className="relative z-0 flex w-full items-center rounded-case-mobile bg-portfolio-grey-50 py-6 sm:min-h-[340px] sm:rounded-case-3xl sm:py-10 lg:h-[340px] lg:min-h-0 lg:py-0">
              {/* Mobile-only decorative lightbulb sitting on the panel's
                  top-right corner, half in and half out of the grey box.
                  It gives the text-heavy Problem section a visual on
                  phones; desktop has the phone mockup beside the text
                  already, so it's hidden from lg up. */}
              <Image
                src={problem.challengeIcon.src}
                alt={problem.challengeIcon.alt}
                width={128}
                height={128}
                className="pointer-events-none absolute -top-14 -right-0.5 size-32 lg:hidden"
              />
              <div className="w-full px-6 sm:px-10 lg:px-[80px]">
                {/* Explicit line breaks (rather than letting the text wrap
                    on its own) so the headline always renders as exactly
                    three lines, matching the approved copy layout. */}
                <p className="relative max-w-[560px] text-left font-manrope font-bold text-[28px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 lg:max-w-none lg:text-[36px] lg:leading-[1.4]">
                  {/* The manual line breaks are desktop-only: on narrower
                      screens the lines are shorter anyway, so forcing the
                      desktop breaks on top of the natural wrapping left
                      orphan words ("the image" alone on a line). Below lg
                      the break is replaced by a plain space and the text
                      wraps naturally. */}
                  {problem.challengeLine1}
                  <br className="hidden lg:inline" />
                  {/* Plain space below lg so "image" can stay on the first
                      line and overlap the magnifier slightly; the text is
                      `relative` so it paints above the icon. */}
                  {" "}
                  {problem.challengeLine2Lead}
                  <span className="text-faircado-green-500">
                    {problem.challengeAccentLine2}
                    <br className="hidden lg:inline" />
                    {" "}
                    {problem.challengeAccentLine3}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach */}
      {/* lg:mt-10: +40px on top of the page's standard section gap on
          desktop, per request to add extra breathing room after the Problem
          section's grey CTA panel. Mobile keeps the plain 96px gap. */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-[60px] sm:px-10 lg:mt-10">
        <div
          // Same alignment trick as Context and Problem above: lines this
          // section's left edge up with the text inside the My Role/Impact
          // box (not the box's own background), not the section's own padding.
          style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}
        >
          <SectionHeading eyebrow={approach.eyebrow} heading={approach.heading} body={<p>{approach.body}</p>} className="max-w-[526px]" />
        </div>
        {/* Grid instead of flex-wrap so all four cards share exactly the
            same column width regardless of their content (title length,
            number of avatars/logos), instead of each card sizing to its
            own contents. Sits inside the section's own px-4/px-10 padding
            (no full-bleed breakout, to keep a consistent gutter at every
            desktop width). */}
        <div className="w-full">
          {/* gap-2 below sm: the 2x2 phone grid uses an 8px gap (an approved
              exception to the 24px card gap) so each card gets more room for
              its own content. */}
          <div className="grid grid-cols-2 gap-2 sm:gap-6 lg:grid-cols-4">
            {approach.methods.map((method, i) => (
              <MethodCard key={i} {...method} />
            ))}
          </div>
        </div>
      </section>

      {/* Insight */}
      {/* lg:mt-10: +40px on top of the page's standard section gap (128px)
          on desktop, bringing the gap above this section to 168px. Mobile
          keeps the plain 96px section gap. */}
      <section className="mx-auto w-full max-w-[1220px] px-4 sm:px-10 lg:mt-10">
        <div className="w-full">
          <div className="flex flex-col items-start gap-12 sm:gap-16 lg:flex-row lg:items-center lg:gap-0">
            <div
              className="w-full lg:max-w-[348px] lg:shrink-0 lg:-translate-y-[70px]"
              // Same text-container alignment trick used by Context, Problem,
              // and the My Approach heading, so this paragraph's left edge
              // lines up with theirs.
              style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}
            >
              <div className="flex flex-col gap-6">
                <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
                  {insight.headingLine1}
                  <br />
                  {insight.headingLine2}
                </p>
                <div className="flex flex-col gap-4">
                  <p className="font-manrope text-[18px] leading-[28px] text-portfolio-grey-900">
                    {insight.bodyLead}
                    <span className="font-bold text-faircado-pink-500">{insight.bodyAccentPink}</span>
                    {insight.bodyMid}
                  </p>
                  <p className="font-manrope text-[18px] leading-[28px] text-portfolio-grey-900">
                    {insight.bodyLead2}
                    <span className="font-bold">{insight.bodyBoldAccent}</span>
                    {insight.bodyTail}
                  </p>
                </div>
              </div>
            </div>
            {/* Stretchy connector: fills whatever horizontal space is left
                between the text block and the screenshots, growing or
                shrinking with viewport width instead of a fixed gap. Kept at
                its native size and centered in that flexible gap (rather than
                stretched to fill it) so the line and arrowhead never distort
                at different viewport widths. */}
            <div className="hidden h-[130px] flex-1 items-start justify-center self-center pt-2 lg:flex" aria-hidden="true">
              <img src={`${IMG}/insight-arrow.svg`} alt="" className="h-2 w-[74px]" />
            </div>
            {/* Mobile (below lg): a horizontal scroll strip, one phone per
                snap stop, both at the standard 190x411 size. It breaks out
                of the section's side padding so the strip runs edge to
                edge and the second phone peeks in from the right, which
                signals there's more to scroll. The caption sits under the
                strip, inside the normal padding. */}
            <div className="w-full lg:hidden">
              {/* scroll-pl matches the padding so the first snap stop lands on the
                  content's left edge (aligned with the text above), not on
                  the screen edge; scrollbar-hide keeps the strip clean.
                  The vertical padding gives the phones' drop shadow room
                  inside the scroll box (overflow clips it otherwise, which
                  showed up as a hard grey line under the phones), and the
                  matching negative margins cancel it out so the spacing
                  around the strip stays the same. */}
              <div className="scrollbar-hide -mx-4 -mt-8 -mb-10 flex snap-x snap-mandatory gap-10 overflow-x-auto px-4 pt-8 pb-14 scroll-pl-4 sm:-mx-10 sm:px-10 sm:scroll-pl-10">
                {insight.screenshots.map((screenshot, i) => (
                  <div
                    key={i}
                    className="relative h-[411px] w-[190px] shrink-0 snap-start overflow-hidden rounded-case-xl shadow-[0px_12px_37px_0px_rgba(0,0,0,0.12)]"
                  >
                    <Image src={screenshot.src} alt={screenshot.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
              {insight.screenshots[0].caption ? (
                <p className="mt-2 w-full text-left font-manrope text-[14px] leading-[20px] text-portfolio-grey-600">
                  {insight.screenshots[0].caption}
                </p>
              ) : null}
            </div>
            {/* Desktop (lg and up): the two phones as a staggered pair,
                fixed at 250x541 each, 28px apart, in a container sized to
                fit both plus the second phone's 24% vertical offset. */}
            <div className="relative hidden h-[711px] w-[528px] shrink-0 lg:block">
              {/* Positioned so the arrowhead (bottom-left of the source SVG)
                  lands centered just above the first phone's top edge,
                  instead of dipping down into the screen itself. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-[140px] right-[41%] w-[190px]"
              >
                <img src={`${IMG}/insight-curve-arrow.svg`} alt="" />
              </div>
              <div className="absolute left-0 top-0 flex w-[250px] flex-col items-center gap-3">
                <div className="relative h-[541px] w-[250px] overflow-hidden rounded-case-xl shadow-[0px_12px_37px_0px_rgba(0,0,0,0.12)]">
                  <Image src={insight.screenshots[0].src} alt={insight.screenshots[0].alt} fill className="object-cover" />
                </div>
                {insight.screenshots[0].caption ? (
                  <p className="text-center font-manrope text-[14px] leading-[20px] text-portfolio-grey-600">
                    {insight.screenshots[0].caption}
                  </p>
                ) : null}
              </div>
              <div className="absolute right-0 top-[24%] h-[541px] w-[250px] overflow-hidden rounded-case-lg shadow-[0px_12px_37px_0px_rgba(0,0,0,0.12)]">
                <Image src={insight.screenshots[1].src} alt={insight.screenshots[1].alt} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Takeaways: testimonials connected by arrows to the matching
          problem cards below, as one composition in Figma rather than two
          unrelated sections — so both rows share the same 3-column grid
          (for the arrows to land under the right column), inside the
          section's own px-4/px-10 padding. */}
      {/* lg:-mt-[60px]: pulls this section (and everything after it, since
          they follow in normal flow) 60px closer to Insight above. Desktop
          only: below lg the Insight phones sit in a scroll strip right
          above, and the full page gap is wanted there. */}
      <section className="mx-auto w-full max-w-[1220px] px-4 sm:px-10 lg:-mt-[60px]">
        <div
          className="mb-12 sm:mb-20 lg:max-w-[420px]"
          // Same text-container alignment trick used by Context, Problem,
          // My Approach, and Insight, so this heading's left edge lines up
          // with theirs.
          style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}
        >
          <SectionHeading
            eyebrow={takeaways.eyebrow}
            heading={
              <>
                {takeaways.headingLine1}
                <br />
                {takeaways.headingLine2}
              </>
            }
          />
        </div>
        <div className="w-full">
          {/* Mobile (below sm): each testimonial is followed directly by
              the problem card it leads to (01 > Awareness, 02 > Match
              accuracy, 03 > Momentum), so the pairing reads in sequence
              instead of as two separate stacks. */}
          <div className="flex flex-col gap-16 sm:hidden">
            {takeaways.testimonials.map((_, i) => (
              <div key={i} className="flex flex-col gap-6">
                {renderTakeawayTestimonial(i)}
                {renderProblemCard(i)}
              </div>
            ))}
          </div>
          {/* Desktop (sm and up): testimonials row, connector arrows,
              problem cards row, sharing the same 3-column grid so each
              arrow lands under the right column. */}
          <div className="hidden grid-cols-3 gap-10 sm:grid">
            {takeaways.testimonials.map((_, i) => renderTakeawayTestimonial(i))}
          </div>
          <div className="mt-5 mb-[60px] hidden grid-cols-3 sm:grid" aria-hidden="true">
            {takeaways.testimonials.map((_, i) => (
              // The source arrow SVG is a flat, right-pointing line. Centering
              // it in a fixed-height box and rotating it 90deg (same technique
              // Figma itself uses) turns it into the vertical down-pointing
              // connector without distorting its stroke weight. Shifted
              // 100px left of column-center per earlier feedback.
              <div key={i} className="relative h-16 w-full">
                <div
                  className="absolute top-1/2 origin-center"
                  style={{ left: "calc(50% - 100px)", transform: "translate(-50%, -50%) rotate(90deg)" }}
                >
                  <img src={`${IMG}/takeaways-connector-arrow.svg`} alt="" className="h-[7px] w-16" />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden grid-cols-3 gap-6 sm:grid">
            {problemCards.map((_, i) => renderProblemCard(i))}
          </div>
        </div>
      </section>

      {/* Final solution intro */}
      {/* lg:mt-5: +20px on top of the base section gap on desktop, bringing
          the gap above this title (from the problem cards) to 200px. */}
      <section className="mx-auto w-full max-w-[600px] px-4 sm:px-10 lg:mt-5">
        <SectionHeading
          eyebrow={finalSolution.eyebrow}
          heading={finalSolution.heading}
          body={<p>{finalSolution.body}</p>}
          align="center"
        />
      </section>

      {/* Three numbered solution sections */}
      {/* lg:-mt-[100px]: reduces the gap above this from the Final Solution
          title (128px base) down to 28px, per request. Only from lg up: the
          big "01 Awareness" title is 152px tall there, so pulling up 100px
          still leaves it clear of the intro text. Below lg the title is
          smaller (vw-based, ~50px on phones), so the same pull-up made it
          overlap the intro paragraph; a smaller pull-up keeps the gap
          similar. */}
      <div className="mx-auto -mt-16 flex w-full max-w-[1220px] flex-col gap-24 px-4 sm:px-10 sm:gap-32 lg:-mt-[100px]">
        {solutionSections.map((section) => (
          <SolutionSection
            key={section.number}
            number={section.number}
            title={section.title}
            tag={section.tag}
            tagIcon={
              section.tag === "Awareness"
                ? `${IMG}/icon-tag-awareness.png`
                : section.tag === "Match accuracy"
                  ? `${IMG}/icon-tag-accuracy.png`
                  : `${IMG}/icon-tag-momentum.png`
            }
            blocks={section.blocks}
          />
        ))}
      </div>

      {/* Discarded ideas */}
      {/* lg:mt-[72px]: +72px on top of the base section gap (128px) on
          desktop, bringing the gap above this section (from the last Momentum
          card) to 200px. Mobile keeps the plain 96px gap. */}
      <div className="lg:mt-[72px]">
        <DiscardedIdeasSection
          eyebrow={discardedIdeas.eyebrow}
          heading={discardedIdeas.heading}
          bodyLead={discardedIdeas.bodyLead}
          bodyAccent1={discardedIdeas.bodyAccent1}
          bodyMid={discardedIdeas.bodyMid}
          bodyAccent2={discardedIdeas.bodyAccent2}
          items={discardedIdeas.items}
        />
      </div>

      {/* Results / impact */}
      {/* mt-[72px]: +72px on top of the base section gap (128px), bringing
          the gap above this section (from Discarded Ideas) to 200px, same
          as the gap above Discarded Ideas. */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-16 sm:px-10 lg:mt-[72px]">
        <div
          className="w-full lg:max-w-[592px]"
          // Same text-container alignment trick used by Context, Problem, My
          // Approach, Insight, and Discarded Ideas, so this heading's left
          // edge lines up with theirs.
          style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}
        >
          <SectionHeading
            eyebrow={results.heading.eyebrow}
            heading={
              <>
                {results.heading.headingLine1}
                <br />
                {results.heading.headingLine2}
              </>
            }
            body={<p>{results.heading.body}</p>}
          />
        </div>
        <div className="w-full">
          {/* One shared 3-column grid for both rows (instead of two separate
              grids) so the feedback card's width matches a single stat card
              exactly, and the testimonial's width (col-span-2) matches the
              first two stat cards combined, including the gap between them. */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7">
            {results.statCards.map((card, i) => (
              <StatCard key={i} icon={card.icon} icons={card.icons} heading={card.heading} body={card.body} emphasis={card.emphasis} />
            ))}
            {/* Hidden below sm: on phones the "User feedback that made my
                day" intro card is a whole extra card before the quote, so
                the quote stands on its own there. */}
            <div className="hidden flex-col items-center justify-center gap-4 rounded-case-mobile bg-portfolio-grey-50 p-6 text-center sm:flex sm:rounded-case-2xl sm:p-10 lg:p-[80px]">
              <Image
                src={`${IMG}/impact-arrow.png`}
                alt=""
                aria-hidden="true"
                width={52}
                height={52}
                className="drop-shadow-[0px_8px_12px_rgba(0,0,0,0.12)]"
              />
              <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
                User feedback that made my day
              </p>
            </div>
            <figure className="flex flex-col justify-center gap-7 rounded-case-mobile bg-portfolio-grey-50 sm:rounded-case-2xl p-6 sm:col-span-2 sm:p-10 lg:p-[80px]">
              <img
                src={`${IMG}/icon-quote-mark.svg`}
                alt=""
                aria-hidden="true"
                className="h-[29px] w-[33px]"
              />
              <blockquote className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
                {results.featuredTestimonial.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="relative size-[50px] shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={results.featuredTestimonial.user.avatar.src}
                    alt={results.featuredTestimonial.user.avatar.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-portfolio-grey-900">
                  {results.featuredTestimonial.user.name}{" "}
                  <span className="text-portfolio-grey-600">{results.featuredTestimonial.user.location}</span>
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Closing takeaways */}
      {/* mt-[72px]: +72px on top of the base section gap (128px), bringing
          the gap above this section (from the Impact cards) to 200px. */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-16 sm:px-10 lg:mt-[72px]">
        <div
          className="w-full lg:max-w-[592px]"
          // Same text-container alignment trick used by Context, Problem, My
          // Approach, Insight, Discarded Ideas, and Results, so this
          // heading's left edge lines up with theirs.
          style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}
        >
          <SectionHeading eyebrow={closingTakeaways.eyebrow} heading={closingTakeaways.heading} />
        </div>
        <div className="w-full">
          <div className="grid gap-6 rounded-case-mobile bg-portfolio-grey-50 sm:gap-10 sm:rounded-case-2xl p-6 sm:grid-cols-3 sm:p-[60px]">
            {closingTakeaways.testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.number} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
