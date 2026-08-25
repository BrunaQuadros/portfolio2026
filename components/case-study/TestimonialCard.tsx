// A quote pulled from user research, paired with the supporting data point.
// Used 3 times under "Takeaways" and again 3 times under the closing
// insights, so it's a shared component.
type TestimonialCardProps = {
  quote: string;
  detail: string;
  number?: string;
};

export function TestimonialCard({ quote, detail, number }: TestimonialCardProps) {
  return (
    <figure className="flex flex-col gap-3">
      {number ? (
        <p
          aria-hidden="true"
          className="font-[family-name:var(--font-inter-display)] font-bold text-[50px] leading-[1.2] tracking-[-1.5px] text-faircado-green-500"
        >
          {number}
        </p>
      ) : (
        <span aria-hidden="true" className="font-manrope text-[32px] leading-none text-portfolio-grey-400">
          &ldquo;
        </span>
      )}
      <blockquote className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 sm:text-[28px] sm:leading-[38px]">
        {quote}
      </blockquote>
      <figcaption className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900 sm:text-[18px] sm:leading-[28px]">
        {detail}
      </figcaption>
    </figure>
  );
}
