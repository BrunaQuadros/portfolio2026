import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, TimerOff } from "lucide-react";
import { ecoMio } from "@/content/projects/eco-mio";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { ProblemCard } from "@/components/case-study/ProblemCard";
import { StepHeading } from "@/components/case-study/StepHeading";
import { TagPill } from "@/components/case-study/TagPill";
import { TestimonialCard } from "@/components/case-study/TestimonialCard";
import { StatCard } from "@/components/case-study/StatCard";
import { SolutionSection } from "@/components/case-study/SolutionSection";
import { TeamAvatarGroup } from "@/components/case-study/TeamAvatarGroup";
import { DiscardedIdeasSection } from "@/components/case-study/DiscardedIdeasSection";
import { ImagePlaceholder } from "@/components/case-study/ImagePlaceholder";
import { RichText } from "@/components/case-study/RichText";
import { ContextCardCluster } from "@/components/case-study/ContextCardCluster";
import { ProcessSwimlane } from "@/components/case-study/ProcessSwimlane";
import { HandoffChart } from "@/components/case-study/HandoffChart";
import { AutoPlayVideo } from "@/components/media/AutoPlayVideo";

const IMG = "/images/case-studies/eco-mio";

// eco.mio's brand blue, used wherever the Faircado page uses its pink or
// green accents (eyebrows, highlighted phrases, numbers).
const ACCENT_TEXT = "text-eco-mio-blue-500";
const ACCENT_BG = "bg-eco-mio-blue-500";

// The page's text container (see docs/DESIGN.md, "Layout Containers"): lines
// each heading block up with the text inside the My Role/Impact box, not with
// the box's own background or the section's padding. Same value as every
// heading block on the Faircado page.
const TEXT_COLUMN = { marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" };

// Role box label and value styles, shared by the four columns.
const ROLE_LABEL = `font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase ${ACCENT_TEXT}`;
const ROLE_VALUE =
  "whitespace-nowrap font-manrope font-bold text-[15px] leading-[24px] sm:whitespace-normal sm:text-[18px] sm:leading-[28px]";

// The 80 / 20 split bar on the "Automate the 80%" card: a full-width pill,
// 80% near-black with "80" in white, 20% white with "20" (owner's artboard).
// Decorative: the card's heading and body say the same thing in words.
function EightyTwentyBar() {
  return (
    <div aria-hidden="true" className="flex h-11 w-full overflow-hidden rounded-full bg-white font-manrope text-[14px] font-bold">
      <span className="flex w-4/5 items-center justify-center bg-portfolio-grey-900 text-white">80</span>
      <span className="flex w-1/5 items-center justify-center text-portfolio-grey-900">20</span>
    </div>
  );
}

export const metadata: Metadata = {
  title: ecoMio.meta.title,
  description: ecoMio.meta.description,
};

export default function EcoMioCaseStudyPage() {
  const {
    hero,
    roleInfo,
    context,
    problem,
    approach,
    finalSolution,
    solutionSections,
    discardedIdeas,
    results,
    closingTakeaways,
    whatsNext,
  } = ecoMio;

  return (
    <main className="flex flex-col gap-24 pb-32 sm:gap-32">
      {/* Hero: same layout as the Faircado hero. The blue panel plays the
          Concur to eco.mio recording on a loop (AutoPlayVideo: muted, still
          first frame under reduced motion), with the Bayer logo where the
          Faircado hero has its "featured by App Store" badge. From lg up the
          panel keeps the hero's fixed 1220:728 shape, the video fills its
          height centred, and the badge sits in the top-left corner; below lg
          the badge goes back in flow above the video (Mobile Rule 2) and the
          panel hugs its content, since a fixed tall shape would leave a band
          of empty blue on phones. lg:p-[80px] leaves the corner badge room
          beside the video instead of overlapping it. rounded-case-md clips
          the recording's own window corners (~12px at this size), which are
          off-white in the source and would show on the blue. */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col items-center gap-16 px-4 pt-20 sm:px-10 lg:gap-[110px] lg:pt-32">
        <div className="flex w-full max-w-[968px] flex-col gap-10 lg:gap-16">
          <span className={`flex size-16 items-center justify-center rounded-md ${ACCENT_BG}`}>
            <Image src={hero.logo.src} alt={hero.logo.alt} width={52} height={52} className="size-[81%]" priority />
          </span>
          <div className="flex flex-col gap-6">
            <h1 className="font-manrope font-bold text-[40px] leading-[1.1] tracking-[-1.5px] text-portfolio-grey-900 sm:text-[56px] lg:text-[70px] lg:leading-[88px] lg:tracking-[-2.1px]">
              {hero.headingLine1}
              {/* Desktop-only break (Mobile Rule 4): two balanced lines at
                  the lg size, natural wrapping below it. */}
              <br className="hidden lg:block" />{" "}
              {hero.headingLine2}
            </h1>
            {/* From xl up the description is set in three art-directed
                lines (owner's layout); they're ~1040px long at 40px, wider
                than the 968px hero column, so the paragraph sizes to its
                longest line (w-max) and runs past the column on the right.
                Below xl (where 1040px no longer fits) the breaks are hidden
                and the text wraps naturally inside the column. */}
            <p className="font-manrope text-[22px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] lg:text-[40px] lg:leading-[60px] lg:tracking-[-1.2px] xl:w-max xl:max-w-none">
              <RichText segments={hero.description} accentClass={ACCENT_TEXT} breakClass="hidden xl:inline" />
            </p>
          </div>
        </div>
        <div
          className={`relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-case-mobile p-4 sm:gap-6 sm:rounded-case-2xl sm:p-10 lg:aspect-[1220/728] lg:rounded-case-3xl lg:p-[80px] ${ACCENT_BG}`}
        >
          <Image
            src={hero.clientLogo.src}
            alt={hero.clientLogo.alt}
            width={hero.clientLogo.width}
            height={hero.clientLogo.height}
            // Sized and placed like the App Store icon inside the Faircado
            // hero's badge: that icon is 80px of the 518px-wide badge, and
            // the badge is 24% of the panel's width on desktop (36% below),
            // so the icon is 3.71% of the panel width on lg (42px at 1440)
            // and ~5.6% below lg (6% of this panel's padded content box).
            // lg:left/top put it on the icon's own spot within that badge.
            className="h-auto w-[6%] self-start lg:absolute lg:left-[5.18%] lg:top-[9.03%] lg:w-[3.71%]"
          />
          <AutoPlayVideo
            src={hero.video.src}
            alt={hero.video.alt}
            className="aspect-[1800/1210] w-full rounded-case-md shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] lg:h-full lg:w-auto lg:max-w-full"
          />
        </div>
      </section>

      {/* Role / Timeline / Team / Space + Impact. Same box and mobile grid as
          Faircado: My Role/Space stack on the left, Team/Timeline on the
          right below sm (order-*), desktop keeps the DOM order in one row. */}
      <section className="mx-auto w-full max-w-[1220px] px-4 sm:px-10">
        <div className="mx-auto flex w-fit max-w-full flex-col gap-10 rounded-case-mobile bg-portfolio-grey-50 p-6 sm:rounded-case-xl sm:p-10 lg:p-[60px]">
          <div className="grid grid-cols-[3fr_2fr] gap-x-6 gap-y-10 sm:flex sm:flex-wrap sm:gap-16 lg:gap-x-[140px]">
            <div className="order-1 flex flex-col gap-2 sm:order-none">
              <p className={ROLE_LABEL}>My Role</p>
              <div className="flex flex-col">
                <p className={`-mb-0.5 text-portfolio-grey-900 ${ROLE_VALUE}`}>{roleInfo.role.title}</p>
                <p className={`text-portfolio-grey-600 ${ROLE_VALUE}`}>{roleInfo.role.subtitle}</p>
              </div>
            </div>
            <div className="order-4 flex flex-col gap-2 sm:order-none">
              <p className={ROLE_LABEL}>Timeline</p>
              <div className="flex flex-col">
                <p className={`-mb-0.5 text-portfolio-grey-900 ${ROLE_VALUE}`}>{roleInfo.timeline.title}</p>
                <p className={`text-portfolio-grey-600 ${ROLE_VALUE}`}>{roleInfo.timeline.subtitle}</p>
              </div>
            </div>
            <div className="order-2 flex flex-col gap-2 sm:order-none">
              <p className={ROLE_LABEL}>Team</p>
              <TeamAvatarGroup
                avatar={roleInfo.team.avatar}
                extra={roleInfo.team.extra}
                extraBreakdown={roleInfo.team.extraBreakdown}
                accentClass={ACCENT_BG}
              />
            </div>
            <div className="order-3 flex flex-col gap-2 sm:order-none">
              <p className={ROLE_LABEL}>Space</p>
              <div className="flex flex-col">
                <p className={`-mb-0.5 text-portfolio-grey-900 ${ROLE_VALUE}`}>{roleInfo.space.title}</p>
                <p className={`text-portfolio-grey-600 ${ROLE_VALUE}`}>{roleInfo.space.subtitle}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className={ROLE_LABEL}>My Impact</p>
            <ul className="list-disc space-y-1 pl-5 font-manrope text-[15px] leading-[24px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
              {roleInfo.impact.map((bullet, i) => (
                <li key={i}>
                  <RichText segments={bullet} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Context: same layout and card cluster as the Faircado Context
          section (heading block left, three tilted black-and-white cards
          right, stacked below lg). Here the cards take the screenshots' own
          shape so each booking tool shows whole. lg: the text column is
          420px and the cluster 560px. xl: the text is set in the owner's
          line breaks (~575px at 18px), so the column sizes to its longest
          line (w-max) and the cluster is 535px, its box running 40px into
          the page margin (-mr-10) so the cards themselves start ~64px from
          the text and end inside the content edge, nudged 40px down
          (translate-y-10) from the text's centre line. */}
      <section className="relative mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 max-sm:overflow-x-hidden sm:gap-16 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <div className="w-full lg:max-w-[420px] xl:w-max xl:max-w-none" style={TEXT_COLUMN}>
          <SectionHeading
            eyebrow={context.eyebrow}
            heading={context.heading}
            accentClass={ACCENT_TEXT}
            body={
              // gap-7: one blank 28px line between paragraphs, as in the
              // owner's layout.
              <div className="flex flex-col gap-7">
                {context.paragraphs.map((paragraph, i) => (
                  <p key={i}>
                    <RichText segments={paragraph} accentClass={ACCENT_TEXT} breakClass="hidden xl:inline" />
                  </p>
                ))}
              </div>
            }
          />
        </div>
        <ContextCardCluster
          cards={context.cards}
          cardAspect="2564 / 2188"
          boxAspect="399 / 321"
          frontCard={0}
          smallCorners
          className="lg:max-w-[560px] xl:-mr-10 xl:max-w-[535px] xl:translate-y-10"
        />
      </section>

      {/* Problem statement */}
      <section className="mx-auto w-full max-w-[1220px] px-4 sm:px-10">
        <div className="w-full lg:max-w-[526px]" style={TEXT_COLUMN}>
          <SectionHeading
            eyebrow={problem.eyebrow}
            accentClass={ACCENT_TEXT}
            heading={
              <>
                {problem.headingLine1}
                <br className="hidden lg:inline" />{" "}
                {problem.headingLine2}
              </>
            }
            body={
              <div className="flex flex-col gap-4">
                {problem.paragraphs.map((paragraph, i) => (
                  <p key={i}>
                    <RichText segments={paragraph} />
                  </p>
                ))}
                <p className="font-bold">{problem.closingLine}</p>
              </div>
            }
          />
        </div>
      </section>

      {/* Challenge headline. Same composition as Faircado: pulled up beside
          the Problem text on desktop, with the old process diagram
          phone overlapping the grey panel by 150px. Below lg the panel sits
          48px under "So my challenge became:" (-mt-12) and the phone is
          hidden, as on Faircado. */}
      <section className="relative z-10 mx-auto -mt-12 w-full max-w-[1220px] px-4 sm:px-10 lg:-mt-[420px]">
        <div className="flex flex-col items-center">
          {/* lg:translate-y-10: the diagram sits 40px lower than Faircado's
              phone (owner's request), overlapping the panel a little more. */}
          <div className="relative z-10 hidden w-[250px] shrink-0 flex-col items-center lg:mb-[-150px] lg:ml-auto lg:mr-16 lg:flex lg:-translate-x-10 lg:translate-y-10">
            {/* The old demo process, drawn in code (HandoffChart) at the
                phone mockup's size and corners. */}
            <div className="h-[541px] w-[250px] overflow-hidden rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
              <HandoffChart chart={problem.processChart} className="block size-full" />
            </div>
          </div>
          <div className="relative z-0 flex w-full items-center rounded-case-mobile bg-portfolio-grey-50 py-6 sm:min-h-[340px] sm:rounded-case-3xl sm:py-10 lg:h-[340px] lg:min-h-0 lg:py-0">
            <div className="w-full px-6 sm:px-10 lg:px-[80px]">
              {/* lg:max-w-[640px] (no <br>): narrow enough that the headline
                  wraps on its own into the owner's three lines, "...demo
                  creation" / "to win back...take PM" / "out of the process?",
                  while smaller screens keep wrapping naturally. */}
              <p className="max-w-[560px] text-left font-manrope font-bold text-[28px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 lg:max-w-[640px] lg:text-[36px] lg:leading-[1.4]">
                <RichText segments={problem.challenge} accentClass={ACCENT_TEXT} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My process: the section heading, then three steps (Audit, Align,
          Scope), each a StepHeading above its content. 96px between the
          blocks and 48px from each step heading to its content, on every
          screen size (the mobile rhythm; the owner's artboard uses the same
          96px on desktop). Align and Scope add lg:mt-16, so on desktop they
          sit 160px under the step above (owner's request). lg:mt-10 matches the extra breathing room
          Faircado adds after the Challenge panel. */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-24 px-4 sm:px-10 lg:mt-10">
        <div style={TEXT_COLUMN}>
          <SectionHeading
            eyebrow={approach.eyebrow}
            heading={approach.heading}
            body={
              <p>
                <RichText segments={approach.body} accentClass={ACCENT_TEXT} />
              </p>
            }
            accentClass={ACCENT_TEXT}
            className="max-w-[640px]"
          />
        </div>

        {/* 1. Audit: the old process diagram, drawn in code
            (ProcessSwimlane, its blue rounded panel included), with a
            caption under it. */}
        <div className="flex flex-col gap-12">
          <div style={TEXT_COLUMN}>
            <StepHeading
              label={approach.audit.label}
              heading={approach.audit.heading}
              body={
                <p>
                  <RichText segments={approach.audit.body} />
                </p>
              }
              accentClass={ACCENT_TEXT}
            />
          </div>
          <figure className="flex flex-col gap-4">
            {/* From lg the diagram fills the content width. Below lg, shrunk
                to the screen its labels would be ~4px, so it keeps a readable
                300px height and scrolls sideways (the horizontal scroll strip
                pattern, docs/DESIGN.md), breaking out of the section padding
                so it runs edge to edge. Focusable so keyboard users can
                scroll it too. */}
            <div
              className="scrollbar-hide -mx-4 overflow-x-auto px-4 sm:-mx-10 sm:px-10 lg:mx-0 lg:overflow-visible lg:px-0"
              tabIndex={0}
              role="region"
              aria-label={approach.audit.processDiagram.regionLabel}
            >
              {/* 921 x 300 below lg keeps the 2002:652 canvas shape at a
                  readable height. */}
              <ProcessSwimlane
                diagram={approach.audit.processDiagram}
                className="block h-[300px] w-[921px] max-w-none lg:h-auto lg:w-full"
              />
            </div>
            <figcaption
              style={TEXT_COLUMN}
              className="font-manrope text-[14px] leading-[20px] tracking-[0.48px] text-portfolio-grey-600"
            >
              {approach.audit.caption}
            </figcaption>
          </figure>
        </div>

        {/* 2. Align: the three goals, with the tag pills used through the
            rest of the case study. */}
        <div className="flex flex-col gap-12 lg:mt-16">
          <div style={TEXT_COLUMN}>
            <StepHeading
              label={approach.align.label}
              heading={approach.align.heading}
              body={<p>{approach.align.body}</p>}
              accentClass={ACCENT_TEXT}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7">
            {approach.align.cards.map((card) => (
              <ProblemCard
                key={card.tag}
                tag={card.tag}
                tagIcon={card.tagIcon}
                heading={card.heading}
                body={<RichText segments={card.body} />}
              />
            ))}
          </div>
        </div>

        {/* 3. Scope: the constraint (blue) and the two decisions it shaped.
            One column below lg, three from lg. */}
        <div className="flex flex-col gap-12 lg:mt-16">
          <div style={TEXT_COLUMN}>
            <StepHeading label={approach.scope.label} heading={approach.scope.heading} accentClass={ACCENT_TEXT} />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
            <div
              className={`relative flex flex-col items-start justify-between gap-8 rounded-case-mobile p-6 sm:rounded-case-2xl sm:p-10 lg:h-[383px] ${ACCENT_BG}`}
            >
              <TagPill
                label={approach.scope.constraint.tag}
                iconNode={<TimerOff className="size-6 text-eco-mio-blue-600" strokeWidth={2} aria-hidden="true" />}
              />
              <div className="flex flex-col gap-3 text-white">
                <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] sm:text-[28px] sm:leading-[38px]">
                  {approach.scope.constraint.heading}
                </p>
                <p className="font-manrope text-[16px] leading-[26px] sm:text-[18px] sm:leading-[28px]">
                  <RichText segments={approach.scope.constraint.body} />
                </p>
              </div>
              {/* The arrow from the constraint to the two decisions: centred
                  in the gap below the card on phones (pointing down), in the
                  gap to its right from lg (pointing right). */}
              <span
                role="img"
                aria-label={approach.scope.constraint.arrowLabel}
                className="absolute -bottom-9 left-1/2 z-10 flex size-12 -translate-x-1/2 rotate-90 items-center justify-center rounded-full bg-white shadow-[0px_4px_16px_0px_rgba(17,17,17,0.16)] lg:top-1/2 lg:-right-[38px] lg:bottom-auto lg:left-auto lg:translate-x-0 lg:-translate-y-1/2 lg:rotate-0"
              >
                <ArrowRight className="size-6 text-eco-mio-blue-600" strokeWidth={2.5} aria-hidden="true" />
              </span>
            </div>
            <StatCard
              size="short"
              iconNode={<EightyTwentyBar />}
              heading={approach.scope.eightyTwenty.heading}
              body={approach.scope.eightyTwenty.body}
              emphasis={approach.scope.eightyTwenty.emphasis}
            />
            <StatCard
              size="short"
              iconNode={
                // Overlapping, slightly tilted tool logos (-6 / +5 degree
                // alternation). The names are in the copy elsewhere, so the
                // logos still get alt text for the list.
                <ul className="flex items-center" aria-label="Tools used">
                  {approach.scope.build.tools.map((tool, i) => (
                    <li
                      key={tool.alt}
                      className={`flex size-[52px] shrink-0 items-center justify-center rounded-case-md shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] ${tool.tileClass} ${i % 2 === 0 ? "-rotate-6" : "rotate-5"} ${i > 0 ? "-ml-3" : ""}`}
                    >
                      <Image
                        src={tool.src}
                        alt={tool.alt}
                        width={42}
                        height={42}
                        className={tool.inset === "logo" ? "size-[80%] object-contain" : "size-7"}
                      />
                    </li>
                  ))}
                </ul>
              }
              heading={approach.scope.build.heading}
              body={approach.scope.build.body}
              emphasis={approach.scope.build.emphasis}
            />
          </div>
        </div>
      </section>

      {/* Final solution intro. lg:mt-5: same extra desktop gap as Faircado. */}
      <section className="mx-auto w-full max-w-[600px] px-4 sm:px-10 lg:mt-5">
        <SectionHeading
          eyebrow={finalSolution.eyebrow}
          heading={finalSolution.heading}
          body={<p>{finalSolution.body}</p>}
          align="center"
          accentClass={ACCENT_TEXT}
        />
      </section>

      {/* Three numbered solution sections. Same pull-ups as Faircado: the
          giant titles sit close under the intro (-mt-16, lg:-mt-[100px]). */}
      <div className="mx-auto -mt-16 flex w-full max-w-[1220px] flex-col gap-24 px-4 sm:px-10 sm:gap-32 lg:-mt-[100px]">
        {solutionSections.map((section) => (
          <SolutionSection
            key={section.number}
            number={section.number}
            title={section.title}
            tag={section.tag}
            tagIcon={section.tagIcon}
            blocks={section.blocks}
            numberClass={ACCENT_TEXT}
            arrow={{ src: `${IMG}/tailored-arrow.svg`, width: 160, phoneHeight: true }}
            longTitle={section.title.length > 12}
            tagInFlowUntilXl
          />
        ))}
      </div>

      {/* Discarded ideas. lg:mt-[72px]: 200px above on desktop, as on
          Faircado. Eyebrow in blue like every other eyebrow here (the pink
          in Figma is a leftover from the Faircado file). */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-16 sm:px-10 lg:mt-[72px]">
        <div className="w-full lg:max-w-[592px]" style={TEXT_COLUMN}>
          <SectionHeading
            eyebrow={discardedIdeas.eyebrow}
            heading={discardedIdeas.heading}
            accentClass={ACCENT_TEXT}
            body={
              <p>
                <RichText segments={discardedIdeas.body} />
              </p>
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {discardedIdeas.cards.map((card) => (
            <StatCard
              key={card.heading}
              size="short"
              iconNode={<ImagePlaceholder className="h-[58px] w-[94px] rounded-full" />}
              heading={card.heading}
              body={card.body}
              emphasis={card.emphasis}
            />
          ))}
        </div>
      </section>

      {/* Results / impact: same shared 3-column grid as Faircado (stat
          cards, then the intro card and the 2-column quote). */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-16 sm:px-10 lg:mt-[72px]">
        <div className="w-full lg:max-w-[592px]" style={TEXT_COLUMN}>
          <SectionHeading eyebrow={results.eyebrow} heading={results.heading} accentClass={ACCENT_TEXT} />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7">
          {results.statCards.map((card) => (
            <StatCard
              key={card.heading}
              iconNode={
                <ImagePlaceholder className="size-[52px] rounded-full shadow-[0px_8px_12px_0px_rgba(0,0,0,0.12)]" />
              }
              heading={card.heading}
              body={card.body}
              emphasis={card.emphasis}
            />
          ))}
          {/* Hidden below sm, as on Faircado: the quote stands on its own. */}
          <div className="hidden flex-col items-center justify-center gap-7 rounded-case-mobile bg-portfolio-grey-50 p-6 text-center sm:flex sm:rounded-case-2xl sm:p-10">
            <ImagePlaceholder className="size-[52px] rounded-full border border-portfolio-grey-200 shadow-[0px_16.75px_25.125px_0px_rgba(0,0,0,0.12)]" />
            <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
              {results.feedbackIntro}
            </p>
          </div>
          <figure className="flex flex-col justify-center gap-7 rounded-case-mobile bg-portfolio-grey-50 p-6 sm:col-span-2 sm:rounded-case-2xl sm:p-10 sm:h-[431px]">
            <Image src={`${IMG}/icon-quote-mark.svg`} alt="" aria-hidden="true" width={50} height={44} />
            <blockquote className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
              {results.featuredTestimonial.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <ImagePlaceholder label={results.featuredTestimonial.user.avatar.alt} className="size-[50px] shrink-0 rounded-full" />
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-portfolio-grey-900">
                {results.featuredTestimonial.user.name}
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Learnings: numbered lessons in one grey panel, as Faircado's
          closing takeaways. */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-16 sm:px-10 lg:mt-[72px]">
        <div className="w-full lg:max-w-[592px]" style={TEXT_COLUMN}>
          <SectionHeading eyebrow={closingTakeaways.eyebrow} heading={closingTakeaways.heading} accentClass={ACCENT_TEXT} />
        </div>
        <div className="grid gap-6 rounded-case-mobile bg-portfolio-grey-50 p-6 sm:grid-cols-3 sm:gap-10 sm:rounded-case-2xl sm:p-[60px]">
          {closingTakeaways.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.number} {...testimonial} accentClass={ACCENT_TEXT} />
          ))}
        </div>
      </section>

      {/* What's next: same tag + phone + caption layout as Faircado's
          discarded ideas (scroll strip below lg). */}
      <div className="lg:mt-[72px]">
        <DiscardedIdeasSection
          eyebrow={whatsNext.eyebrow}
          heading={whatsNext.heading}
          bodyLead={whatsNext.body}
          items={whatsNext.items}
          accentClass={ACCENT_TEXT}
        />
      </div>
    </main>
  );
}
