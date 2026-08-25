import Image from "next/image";

// Small rounded pill with an icon and a label, used to tag which problem
// ("Awareness", "Match accuracy", "Momentum") a card or section relates to.
// Repeats across the problem cards, the results cards, and every solution
// section, so it's a shared component.
type TagPillProps = {
  icon: string;
  label: string;
};

export function TagPill({ icon, label }: TagPillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-[0px_4px_12.5px_0px_rgba(94,95,93,0.1)]">
      <Image src={icon} alt="" aria-hidden="true" width={24} height={24} className="size-6" />
      <span className="font-manrope font-bold text-[18px] leading-[28px] text-portfolio-grey-900 whitespace-nowrap">
        {label}
      </span>
    </span>
  );
}
