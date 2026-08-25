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
  description: faircado.context.body,
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
              {hero.descriptionMid}
              <span className="text-faircado-green-500">{hero.descriptionAccent2}</span>
              {hero.descriptionTail}
            </p>
          </div>
        </div>
        <div className="relative aspect-[1220/728] w-full overflow-hidden rounded-case-3xl bg-portfolio-grey-50">
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

      {/* Context */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-10 px-6 sm:px-10 lg:flex-row lg:items-center lg:gap-20">
        <SectionHeading eyebrow={context.eyebrow} heading={context.heading} body={<p>{context.body}</p>} className="lg:max-w-[520px]" />
        <div className="flex flex-1 items-center justify-center gap-6">
          {context.logos.map((logo, i) => (
            <div
              key={i}
              className={`relative size-[130px] shrink-0 overflow-hidden rounded-case-lg bg-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] sm:size-[180px] ${
                i === 1 ? "rotate-[-2deg]" : i === 2 ? "rotate-[3deg]" : "rotate-[2deg]"
              }`}
            >
              <Image src={logo.src} alt={logo.alt} fill className="object-contain p-6" />
            </div>
          ))}
        </div>
      </section>

      {/* Role / Timeline / Team / Space + Impact */}
      <section className="mx-auto w-full max-w-[1220px] px-6 sm:px-10">
        <div className="flex flex-col gap-10 rounded-case-3xl bg-portfolio-grey-50 p-8 sm:p-10">
          <div className="flex flex-wrap gap-10 sm:gap-16">
            <div className="flex flex-col gap-2">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">My Role</p>
              <p className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-900">{roleInfo.role.title}</p>
              <p className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-600">{roleInfo.role.subtitle}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">Timeline</p>
              <p className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-900">{roleInfo.timeline.title}</p>
              <p className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-600">{roleInfo.timeline.subtitle}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">Team</p>
              <div className="flex items-center">
                {roleInfo.team.avatars.map((avatar, i) => (
                  <div
                    key={i}
                    className={`relative size-[52px] shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] ${i > 0 ? "-ml-3" : ""}`}
                  >
                    <Image src={avatar.src} alt={avatar.alt} fill className="object-cover" />
                  </div>
                ))}
                <div className="-ml-3 flex size-[52px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-faircado-pink-500 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                  <span className="font-manrope font-bold text-[14px] text-white">{roleInfo.team.extra}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">Space</p>
              <p className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-900">{roleInfo.space.title}</p>
              <p className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-600">{roleInfo.space.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-manrope font-extrabold text-[16px] tracking-[0.48px] uppercase text-faircado-pink-500">My Impact</p>
            <ul className="list-disc space-y-1 pl-5 font-manrope text-[18px] leading-[28px] text-portfolio-grey-900">
              {roleInfo.impact.map((bullet, i) => (
                <li key={i}>{bullet.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-10 px-6 sm:px-10 lg:flex-row lg:items-center lg:gap-20">
        <SectionHeading
          eyebrow={problem.eyebrow}
          heading={problem.heading}
          body={
            <div className="flex flex-col gap-4">
              <p>{problem.body}</p>
              <p className="font-bold">{problem.closingLine}</p>
            </div>
          }
          className="lg:max-w-[520px]"
        />
        <div className="relative mx-auto aspect-[250/541] w-[220px] shrink-0 overflow-hidden rounded-case-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] sm:w-[250px]">
          <Image src={problem.beforeImage.src} alt={problem.beforeImage.alt} fill className="object-cover" />
        </div>
      </section>

      {/* Challenge headline */}
      <section className="mx-auto w-full max-w-[1220px] px-6 sm:px-10">
        <div className="rounded-case-3xl bg-portfolio-grey-50 px-8 py-16 text-center sm:px-20">
          <p className="mx-auto max-w-[700px] font-manrope font-bold text-[28px] leading-[1.4] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[40px] sm:leading-[60px]">
            {problem.challengeHeading.replace(problem.challengeAccent, "")}
            <span className="text-faircado-green-500">{problem.challengeAccent}</span>
          </p>
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
