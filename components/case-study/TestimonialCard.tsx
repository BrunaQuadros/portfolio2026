import Image from "next/image";

// A quote pulled from user research, paired with the supporting data point.
// Used 3 times under "Takeaways" and again 3 times under the closing
// insights, so it's a shared component.
type TestimonialCardProps = {
  quote: string;
  quoteLine2?: string;
  detail: string;
  detailBold?: string;
  detailRest?: string;
  number?: string;
};

export function TestimonialCard({ quote, quoteLine2, detail, detailBold, detailRest, number }: TestimonialCardProps) {
  return (
    <figure className="flex flex-col gap-6">
      {number ? (
        <p
          aria-hidden="true"
          className="font-[family-name:var(--font-inter-display)] font-bold text-[50px] leading-[1.2] tracking-[-1.5px] text-faircado-green-500"
        >
          {number}
        </p>
      ) : (
        <Image
          src="/images/case-studies/faircado/takeaways-quote-mark.svg"
          alt=""
          aria-hidden="true"
          width={33}
          height={29}
        />
      )}
      <blockquote className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
        {quote}
        {quoteLine2 ? (
          <>
            <br />
            {quoteLine2}
          </>
        ) : null}
      </blockquote>
      <figcaption className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
        {detailBold ? (
          <>
            <span className="font-bold">{detailBold}</span>
            {detailRest}
          </>
        ) : (
          detail
        )}
      </figcaption>
    </figure>
  );
}
