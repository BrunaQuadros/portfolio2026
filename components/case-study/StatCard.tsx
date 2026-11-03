import Image from "next/image";

// One of the "impact" result cards near the end of the case study (adoption
// growth, sales lift, engagement lift). Repeats 3 times, so shared.
type StatCardProps = {
  icon?: string;
  // Urgency badges card shows two small bordered icon badges side by side
  // instead of the single colored icon circle the other cards use.
  icons?: string[];
  // Custom content for the icon slot (e.g. an ImagePlaceholder while the
  // real icon isn't exported yet). Used instead of `icon`/`icons`.
  iconNode?: React.ReactNode;
  heading: string;
  body: string;
  // Phrase within `body` to render in bold (matches the Figma design's
  // per-card emphasis). Usually the opening words, but it can sit anywhere
  // in the sentence.
  emphasis?: string;
  // "default" is 431px tall from sm up (impact cards); "short" is 383px
  // (eco.mio discarded ideas cards).
  size?: "default" | "short";
};

function renderBody(body: string, emphasis?: string) {
  const start = emphasis ? body.indexOf(emphasis) : -1;
  if (!emphasis || start === -1) return body;
  return (
    <>
      {body.slice(0, start)}
      <span className="font-bold">{emphasis}</span>
      {body.slice(start + emphasis.length)}
    </>
  );
}

export function StatCard({ icon, icons, iconNode, heading, body, emphasis, size = "default" }: StatCardProps) {
  const heightClass = size === "short" ? "sm:h-[383px]" : "sm:h-[431px]";
  return (
    <div className={`flex flex-1 flex-col justify-between gap-8 ${heightClass} rounded-case-mobile bg-portfolio-grey-50 sm:rounded-case-2xl p-6 min-w-[240px] sm:p-10`}>
      {iconNode ? (
        iconNode
      ) : icons ? (
        <div className="flex items-center gap-2">
          {icons.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              aria-hidden="true"
              width={52}
              height={52}
              className="drop-shadow-[0px_8px_12px_rgba(0,0,0,0.12)]"
            />
          ))}
        </div>
      ) : icon ? (
        <Image src={icon} alt="" aria-hidden="true" width={52} height={52} className="drop-shadow-[0px_8px_12px_rgba(0,0,0,0.12)]" />
      ) : null}
      <div className="flex flex-col gap-3">
        <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
          {heading}
        </p>
        <p className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
          {renderBody(body, emphasis)}
        </p>
      </div>
    </div>
  );
}
