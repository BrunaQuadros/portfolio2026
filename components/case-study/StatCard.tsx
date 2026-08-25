import Image from "next/image";

// One of the "impact" result cards near the end of the case study (adoption
// growth, sales lift, engagement lift). Repeats 3 times, so shared.
type StatCardProps = {
  icon?: string;
  heading: string;
  body: string;
};

export function StatCard({ icon, heading, body }: StatCardProps) {
  return (
    <div className="flex flex-1 flex-col justify-between gap-8 rounded-[40px] bg-portfolio-grey-50 p-8 min-w-[240px] sm:p-10">
      {icon ? (
        <div className="flex size-[52px] items-center justify-center rounded-full bg-white shadow-[0px_8px_12px_0px_rgba(0,0,0,0.12)]">
          <Image src={icon} alt="" aria-hidden="true" width={26} height={26} />
        </div>
      ) : null}
      <div className="flex flex-col gap-3">
        <p className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
          {heading}
        </p>
        <p className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
          {body}
        </p>
      </div>
    </div>
  );
}
