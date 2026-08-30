import Image from "next/image";

// One of the "impact" result cards near the end of the case study (adoption
// growth, sales lift, engagement lift). Repeats 3 times, so shared.
type StatCardProps = {
  icon?: string;
  // Urgency badges card shows two small bordered icon badges side by side
  // instead of the single colored icon circle the other cards use.
  icons?: string[];
  heading: string;
  body: string;
  // Leading phrase within `body` to render in bold (matches the Figma
  // design's per-card emphasis on the opening few words).
  emphasis?: string;
};

export function StatCard({ icon, icons, heading, body, emphasis }: StatCardProps) {
  return (
    <div className="flex h-[431px] flex-1 flex-col justify-between gap-8 rounded-[40px] bg-portfolio-grey-50 p-8 min-w-[240px] sm:p-10">
      {icons ? (
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
          {emphasis && body.startsWith(emphasis) ? (
            <>
              <span className="font-bold">{emphasis}</span>
              {body.slice(emphasis.length)}
            </>
          ) : (
            body
          )}
        </p>
      </div>
    </div>
  );
}
