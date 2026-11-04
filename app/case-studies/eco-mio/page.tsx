import type { Metadata } from "next";
import Image from "next/image";
import { ecoMio } from "@/content/projects/eco-mio";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { ProblemCard } from "@/components/case-study/ProblemCard";
import { TestimonialCard } from "@/components/case-study/TestimonialCard";
import { StatCard } from "@/components/case-study/StatCard";
import { SolutionSection } from "@/components/case-study/SolutionSection";
import { TeamAvatarGroup } from "@/components/case-study/TeamAvatarGroup";
import { DiscardedIdeasSection } from "@/components/case-study/DiscardedIdeasSection";
import { ImagePlaceholder } from "@/components/case-study/ImagePlaceholder";
import { RichText } from "@/components/case-study/RichText";
import { ImageCompare } from "@/components/media/ImageCompare";

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
    findings,
    finalSolution,
    solutionSections,
    discardedIdeas,
    results,
    closingTakeaways,
    whatsNext,
  } = ecoMio;

  return (
    <main className="flex flex-col gap-24 pb-32 sm:gap-32">
      {/* Hero: same layout as the Faircado hero. The blue panel holds the
          same before/after drag-to-compare as the Context section (Concur
          results without and with eco.mio). From lg up the panel keeps the
          hero's fixed 1220:728 shape and the compare fills its height,
          centred; below lg the panel hugs the full-width compare, since a
          fixed tall shape would leave a band of empty blue on phones. */}
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
            <p className="font-manrope text-[22px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] lg:text-[40px] lg:leading-[60px] lg:tracking-[-1.2px]">
              <RichText segments={hero.description} accentClass={ACCENT_TEXT} />
            </p>
          </div>
        </div>
        <div
          className={`flex w-full items-center justify-center overflow-hidden rounded-case-mobile p-4 sm:rounded-case-2xl sm:p-10 lg:aspect-[1220/728] lg:rounded-case-3xl lg:p-[60px] ${ACCENT_BG}`}
        >
          <ImageCompare
            label={context.compare.label}
            before={context.compare.before}
            after={context.compare.after}
            width={context.compare.width}
            height={context.compare.height}
            corner={0}
            labels={false}
            className="w-full lg:h-full lg:w-auto lg:max-w-full"
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

      {/* Context: heading block on the left, and a brand-blue panel on
          the right holding a before/after drag-to-compare of the Concur
          results without and with eco.mio. The text column is narrowed to
          420px on desktop so the panel can take the rest of the row and
          stay as large as possible; below lg the panel stacks under the
          text at full width. Corner 0 on the compare: the screenshots carry
          their own rounded browser window and shadow, which float on the
          blue. */}
      <section className="relative mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-16 sm:px-10 lg:flex-row lg:items-center">
        <div className="w-full lg:max-w-[420px] lg:shrink-0" style={TEXT_COLUMN}>
          <SectionHeading
            eyebrow={context.eyebrow}
            heading={context.heading}
            accentClass={ACCENT_TEXT}
            body={
              <div className="flex flex-col gap-4">
                {context.paragraphs.map((paragraph, i) => (
                  <p key={i}>
                    <RichText segments={paragraph} accentClass={ACCENT_TEXT} />
                  </p>
                ))}
              </div>
            }
          />
        </div>
        {/* Same corners as the My Role/Impact box above it (28px on phones,
            24px from sm up). */}
        <div className={`w-full rounded-case-mobile p-4 sm:rounded-case-xl sm:p-10 lg:min-w-0 lg:flex-1 lg:p-8 ${ACCENT_BG}`}>
          <ImageCompare
            label={context.compare.label}
            before={context.compare.before}
            after={context.compare.after}
            width={context.compare.width}
            height={context.compare.height}
            corner={0}
            labels={false}
            className="mx-auto w-full max-w-[960px] lg:max-w-none"
          />
        </div>
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
          the Problem text on desktop, with the "process when I joined"
          phone overlapping the grey panel by 150px. Below lg the panel sits
          48px under "So my challenge became:" (-mt-12) and the phone is
          hidden, as on Faircado. */}
      <section className="relative z-10 mx-auto -mt-12 w-full max-w-[1220px] px-4 sm:px-10 lg:-mt-[420px]">
        <div className="flex flex-col items-center">
          <figure className="relative z-10 hidden w-[250px] shrink-0 flex-col items-center gap-3 lg:mb-[-150px] lg:ml-auto lg:mr-16 lg:flex lg:-translate-x-10">
            <figcaption className="w-[226px] text-center font-manrope text-[14px] leading-[20px] text-portfolio-grey-600">
              {problem.processImage.caption}
            </figcaption>
            {problem.processImage.src ? (
              <div className="relative h-[541px] w-[250px] overflow-hidden rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                <Image src={problem.processImage.src} alt={problem.processImage.alt} fill className="object-cover" />
              </div>
            ) : (
              <ImagePlaceholder
                label={problem.processImage.alt}
                className="h-[541px] w-[250px] rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]"
              />
            )}
          </figure>
          <div className="relative z-0 flex w-full items-center rounded-case-mobile bg-portfolio-grey-50 py-6 sm:min-h-[340px] sm:rounded-case-3xl sm:py-10 lg:h-[340px] lg:min-h-0 lg:py-0">
            <div className="w-full px-6 sm:px-10 lg:px-[80px]">
              <p className="max-w-[560px] text-left font-manrope font-bold text-[28px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 lg:max-w-[698px] lg:text-[36px] lg:leading-[1.4]">
                <RichText segments={problem.challenge} accentClass={ACCENT_TEXT} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach: heading, then the "Process that took 5 hours" panel
          (same grey panel and type as the Challenge headline). lg:mt-10
          matches the extra breathing room Faircado adds after the Challenge
          panel. */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-20 sm:px-10 lg:mt-10">
        <div style={TEXT_COLUMN}>
          <SectionHeading
            eyebrow={approach.eyebrow}
            heading={approach.heading}
            body={<p>{approach.body}</p>}
            accentClass={ACCENT_TEXT}
            className="max-w-[516px]"
          />
        </div>
        <div className="flex w-full items-center rounded-case-mobile bg-portfolio-grey-50 px-6 py-10 sm:rounded-case-3xl sm:p-10 lg:p-20">
          <p className="font-manrope font-bold text-[28px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 lg:text-[36px]">
            {approach.processPanel}
          </p>
        </div>
      </section>

      {/* Findings: three need cards, then the "Scope" intro card and the
          wide "Building Demo Studio" card, on one shared 3-column grid (same
          approach as the Faircado results grid, so the wide card spans
          exactly two columns). lg:-mt-12 brings it 80px under the process
          panel on desktop, as in Figma; mobile keeps the 96px section gap. */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-4 sm:gap-20 sm:px-10 lg:-mt-12">
        <div style={TEXT_COLUMN}>
          <SectionHeading
            eyebrow={findings.eyebrow}
            heading={findings.heading}
            body={<p>{findings.body}</p>}
            accentClass={ACCENT_TEXT}
            className="max-w-[516px]"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-x-7 sm:gap-y-10">
          {findings.cards.map((card) => (
            <ProblemCard key={card.tag} tag={card.tag} tagIcon={card.tagIcon} heading={card.heading} body={card.body} />
          ))}
          {/* Hidden below sm, like Faircado's "User feedback that made my
              day" intro card: on phones the label card is a whole extra
              card before the one it introduces. */}
          <div className="hidden flex-col items-center justify-center gap-7 rounded-case-mobile bg-portfolio-grey-50 p-6 text-center sm:flex sm:rounded-case-2xl sm:p-10">
            <span className="flex size-[52px] items-center justify-center overflow-hidden rounded-full border border-portfolio-grey-200 bg-white shadow-[0px_16.75px_25.125px_0px_rgba(0,0,0,0.12)]">
              <Image src={findings.scope.icon} alt="" aria-hidden="true" width={45} height={45} className="size-[45px] max-w-none" />
            </span>
            <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
              {findings.scope.label}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-10 rounded-case-mobile bg-portfolio-grey-50 p-6 sm:col-span-2 sm:h-[383px] sm:rounded-case-2xl sm:p-10">
            {/* Overlapping, slightly tilted tool logos (Figma's -6 / +5
                degree alternation). The names are in the copy below, but the
                logos still get alt text since Netlify is only shown here. */}
            <ul className="flex items-center" aria-label="Tools used">
              {findings.build.tools.map((tool, i) => (
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
            <div className="flex flex-col gap-3">
              <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
                {findings.build.heading}
              </p>
              <p className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
                {findings.build.body}
              </p>
            </div>
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
