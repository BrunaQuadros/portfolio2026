import Image from "next/image";

// Small rounded pill with an icon and a label, used to tag which problem
// ("Awareness", "Match accuracy", "Momentum") a card or section relates to.
// Repeats across the problem cards, the results cards, and every solution
// section, so it's a shared component. The icon is optional: most eco.mio
// tags are text only.
type TagPillProps = {
  icon?: string;
  // A ready-made icon (e.g. a lucide icon) instead of an image file.
  iconNode?: React.ReactNode;
  label: string;
  // "sm": a smaller pill (16px label, 20px icon) for eco.mio's solution
  // blocks, centred above the heading.
  size?: "default" | "sm";
};

export function TagPill({ icon, iconNode, label, size = "default" }: TagPillProps) {
  const small = size === "sm";
  return (
    <span
      className={`inline-flex items-center rounded-full bg-white shadow-[0px_4px_12.5px_0px_rgba(94,95,93,0.1)] ${small ? "gap-1.5 px-4 py-1.5" : "gap-2 px-5 py-2"}`}
    >
      {iconNode}
      {icon ? (
        <Image src={icon} alt="" aria-hidden="true" width={24} height={24} className={small ? "size-5" : "size-6"} />
      ) : null}
      <span
        className={`font-manrope font-bold text-portfolio-grey-900 whitespace-nowrap ${small ? "text-[16px] leading-[24px]" : "text-[18px] leading-[28px]"}`}
      >
        {label}
      </span>
    </span>
  );
}
