import type { Metadata } from "next";
import Image from "next/image";
import { faircado } from "@/content/projects/faircado";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { ProblemCard } from "@/components/case-study/ProblemCard";
import { MethodCard } from "@/components/case-study/MethodCard";
import { TestimonialCard } from "@/components/case-study/TestimonialCard";
import { StatCard } from "@/components/case-study/StatCard";
import { SolutionSection } from "@/components/case-study/SolutionSection";

const IMG = "/images/case-studies/faircado";

export const metadata: Metadata = {
  title: faircado.meta.title,
  description: `${faircado.context.bodyBold1}${faircado.context.bodyText1}`,
};

export default function FaircadoCaseStudyPage() {
  const { hero, context, roleInfo, problem, approach, problemCards, takeaways, insight, finalSolution, solutionSections, results, closingTakeaways } =
    faircado;

  return (
    <main className="flex flex-col gap-24 pb-32 sm:gap-32">
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col items-center gap-16 px-6 pt-20 sm:px-10 lg:gap-[110px] lg:pt-32">
        <div className="flex w-full max-w-[968px] flex-col gap-10 lg:gap-16">
          <div className="relative size-16">
            <Image src={hero.logo.src} alt={hero.logo.alt} fill priority />
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-manrope font-bold text-[40px] leading-[1.1] tracking-[-1.5px] text-portfolio-grey-900 sm:text-[56px] lg:text-[70px] lg:leading-[88px] lg:tracking-[-2.1px]">
              {hero.headingLine1}
              <br />
              {hero.headingLine2}
            </h1>
            <p className="font-manrope text-[22px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] lg:text-[40px] lg:leading-[60px] lg:tracking-[-1.2px]">
              {hero.descriptionLead}
              <span className="text-faircado-green-500">{hero.descriptionAccent1}</span>
              {hero.descriptionMid1}
              <br />
              {hero.descriptionMid2}
              <span className="text-faircado-green-500">{hero.descriptionAccent2}</span>
              {hero.descriptionTail}
            </p>
          </div>
        </div>
        <div
          // Breaks out of the section's px-6/sm:px-10 padding so this panel reaches
          // the container's full 1220px max-width, instead of being inset like the
          // heading/subtitle above it.
          className="relative -mx-6 aspect-[1220/728] w-[calc(100%+3rem)] overflow-hidden rounded-case-3xl bg-portfolio-grey-50 sm:-mx-10 sm:w-[calc(100%+5rem)]"
        >
          <Image
            src={`${IMG}/badge-featured-app-store.png`}
            alt="Featured by App Store"
            width={518}
            height={172}
            className="absolute object-contain"
            style={{ left: "3.6%", top: "6%", width: "24%", height: "auto" }}
          />
          {/* The phone/hand mockup and the app content are now a single pre-composited
              video, so there's no separate frame image or manual video-box positioning
              to maintain — one element, same on-screen placement the frame image used
              to have. */}
          <video
            src="/videos/case-studies/faircado/hero-cover-video.mp4"
            className="absolute object-contain"
            style={{ left: "37.54%", top: "10.74%", width: "44.93%", height: "97.5%" }}
            autoPlay
            muted
            loop
            playsInline
            aria-label={hero.image.alt}
          />
        </div>
      </section>

      {/* Section 2: Role / Timeline / Team / Space + Impact, then Context */}
      <section className="mx-auto w-full max-w-[1220px] px-6 sm:px-10">
        <div className="mx-auto flex w-fit max-w-full flex-col gap-10 rounded-case-xl bg-portfolio-grey-50 p-8 sm:p-10">
          <div className="flex flex-wrap gap-10 sm:gap-16 lg:gap-x-[140px]">
            <div className="flex flex-col gap-2">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">My Role</p>
              <div className="flex flex-col">
                <p className="-mb-0.5 font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-900">{roleInfo.role.title}</p>
                <p className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-600">{roleInfo.role.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">Timeline</p>
              <div className="flex flex-col">
                <p className="-mb-0.5 font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-900">{roleInfo.timeline.title}</p>
                <p className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-600">{roleInfo.timeline.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">Team</p>
              <div className="flex items-center">
                <div className="relative z-10 size-[52px] shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                  <Image src={roleInfo.team.avatar.src} alt={roleInfo.team.avatar.alt} fill className="object-cover" />
                </div>
                <div className="group relative -ml-3 flex size-[52px] shrink-0 cursor-default items-center justify-center rounded-full border-2 border-white bg-faircado-pink-500 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                  <span className="font-manrope font-bold text-[14px] text-white">{roleInfo.team.extra}</span>
                  {/* Tooltip: hidden by default, fades in above the badge on hover. */}
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-portfolio-grey-900 px-3 py-1.5 font-manrope text-[13px] font-bold text-white opacity-0 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] transition-opacity duration-200 ease-out group-hover:opacity-100"
                  >
                    {roleInfo.team.extraBreakdown}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">Space</p>
              <div className="flex flex-col">
                <p className="-mb-0.5 font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-900">{roleInfo.space.title}</p>
                <p className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-600">{roleInfo.space.subtitle}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">My Impact</p>
            <ul className="list-disc space-y-1 pl-5 font-manrope text-[18px] leading-[28px] text-portfolio-grey-900">
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
      <section className="relative mx-auto flex w-full max-w-[1220px] flex-col gap-16 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
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
        <div className="relative mx-auto aspect-[399/373] w-full max-w-[475px] shrink-0">
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
        {/* Curved connector from right after "Google" in the text to just outside
            the bottom-left of the Google stat card (not overlapping it). The curve
            lives in a box sized by two independent percentages (of section width
            and section height), which scale non-uniformly at viewports other than
            the one they were measured at — fine for a smooth line, but it shears a
            rigid shape. So the arrowhead is a separate, fixed-size element (not
            inside this stretched box) positioned at the curve's tip, rotated with a
            plain CSS transform — that never shears regardless of viewport. */}
        <svg
          viewBox="0 0 45.1 86.1"
          className="absolute z-20 hidden lg:block"
          style={{ left: "53.52%", top: "48.62%", width: "3.7%", height: "19.39%" }}
          aria-hidden="true"
        >
          <path d="M0,86.1 C22.55,86.1 22.55,0 45.1,0" stroke="#FF5182" strokeWidth="2" fill="none" />
        </svg>
        <svg
          viewBox="-6 -8 12 15"
          width="12"
          height="15"
          className="absolute z-20 hidden lg:block"
          style={{ left: "57.22%", top: "48.62%", transform: "translate(-50%, -50%) rotate(60deg)" }}
          aria-hidden="true"
        >
          <path d="M-5,6 L5,6 L0,-7 Z" fill="#FF5182" />
        </svg>
      </section>

      {/* Problem statement */}
      <section className="mx-auto w-full max-w-[1220px] px-6 sm:px-10">
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

      {/* Challenge headline. The gray panel matches the hero video panel's
          full-bleed breakout width exactly, and the whole block is pulled up
          with a negative top margin to overlap the Problem section above —
          rather than sharing row space with the Problem text, which forced
          the box narrow and the headline down to a tiny font size. */}
      <section className="relative z-10 mx-auto w-full max-w-[1220px] px-6 sm:px-10 lg:-mt-[420px]">
        <div className="-mx-6 w-[calc(100%+3rem)] sm:-mx-10 sm:w-[calc(100%+5rem)]">
          <div className="flex flex-col items-center">
            <div className="relative z-10 flex w-[220px] shrink-0 -mb-16 flex-col items-center gap-3 lg:mb-[-150px] lg:ml-auto lg:mr-16 lg:w-[250px]">
              <p className="w-[226px] text-center font-manrope text-[14px] leading-[20px] text-portfolio-grey-600">
                The Image Search MVP
              </p>
              <div className="relative aspect-[250/541] w-full overflow-hidden rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                <Image src={problem.beforeImage.src} alt={problem.beforeImage.alt} fill className="object-cover" />
              </div>
            </div>
            <div className="relative z-0 w-full rounded-case-3xl bg-portfolio-grey-50 py-14 sm:py-16">
              {/* Nested in the same max-w-[1220px]/px-6/px-10 grid as the
                  rest of the page, with the same left-alignment offset as
                  Problem and Context, so the headline's left edge lines up
                  with theirs even though the panel itself breaks out wider. */}
              <div className="mx-auto w-full max-w-[1220px] px-8 sm:px-10">
                <div style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}>
                  {/* Explicit line breaks (rather than letting the text wrap
                      on its own) so the headline always renders as exactly
                      three lines, matching the approved copy layout. */}
                  <p className="max-w-[560px] font-manrope font-bold text-[28px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 lg:max-w-none lg:text-[36px] lg:leading-[1.4]">
                    {problem.challengeLine1}
                    <br />
                    {problem.challengeLine2Lead}
                    <span className="text-faircado-green-500">
                      {problem.challengeAccentLine2}
                      <br />
                      {problem.challengeAccentLine3}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-10 px-6 sm:px-10">
        <SectionHeading eyebrow={approach.eyebrow} heading={approach.heading} body={<p>{approach.body}</p>} className="max-w-[526px]" />
        <div className="flex flex-wrap gap-6">
          {approach.methods.map((method, i) => (
            <MethodCard key={i} {...method} />
          ))}
        </div>
      </section>

      {/* Problem cards */}
      <section className="mx-auto w-full max-w-[1220px] px-6 sm:px-10">
        <div className="flex flex-wrap gap-7">
          {problemCards.map((card, i) => (
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
              body={card.body}
            />
          ))}
        </div>
      </section>

      {/* Takeaways */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-10 px-6 sm:px-10">
        <SectionHeading eyebrow={takeaways.eyebrow} heading={takeaways.heading} className="max-w-[420px]" />
        <div className="grid gap-10 sm:grid-cols-3">
          {takeaways.testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </div>
      </section>

      {/* Insight */}
      <section className="mx-auto w-full max-w-[720px] px-6 sm:px-10">
        <div className="flex flex-col gap-4">
          <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
            {insight.heading}
          </p>
          <p className="font-manrope text-[18px] leading-[28px] text-portfolio-grey-900">{insight.body}</p>
        </div>
      </section>

      {/* Final solution intro */}
      <section className="mx-auto w-full max-w-[720px] px-6 sm:px-10">
        <SectionHeading
          eyebrow={finalSolution.eyebrow}
          heading={finalSolution.heading}
          body={<p>{finalSolution.body}</p>}
          align="center"
        />
      </section>

      {/* Three numbered solution sections */}
      <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-24 px-6 sm:px-10 sm:gap-32">
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

      {/* Results / impact */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-7 px-6 sm:px-10">
        <div className="grid gap-7 sm:grid-cols-3">
          {results.statCards.map((card, i) => (
            <StatCard key={i} icon={card.icon} heading={card.heading} body={card.body} />
          ))}
        </div>
        <div className="grid gap-7 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col items-center justify-center gap-4 rounded-case-2xl bg-portfolio-grey-50 p-10 text-center">
            <div className="flex size-[52px] items-center justify-center rounded-full border border-portfolio-grey-200 bg-white shadow-[0px_16.75px_25.125px_0px_rgba(0,0,0,0.12)]">
              <Image src={`${IMG}/icon-tag-awareness.png`} alt="" aria-hidden="true" width={26} height={26} />
            </div>
            <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
              User feedback that made my day
            </p>
          </div>
          <figure className="flex flex-col gap-7 rounded-case-2xl bg-portfolio-grey-50 p-8 sm:p-10">
            <span aria-hidden="true" className="font-manrope text-[40px] leading-none text-portfolio-grey-400">
              &ldquo;
            </span>
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
      </section>

      {/* Closing takeaways */}
      <section className="mx-auto w-full max-w-[1220px] px-6 sm:px-10">
        <div className="grid gap-10 rounded-case-2xl bg-portfolio-grey-50 p-8 sm:grid-cols-3 sm:p-14">
          {closingTakeaways.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.number} {...testimonial} />
          ))}
        </div>
      </section>
    </main>
  );
}
