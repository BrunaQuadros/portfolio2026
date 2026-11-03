// A flat grey box standing in for a screenshot or icon that hasn't been
// exported from Figma yet (eco.mio case study). Takes the same size and
// corner classes as the image it replaces, so swapping in the real image
// later doesn't move anything. `label` describes what will go there, so
// screen readers still get the meaning of the slot.
type ImagePlaceholderProps = {
  label?: string;
  className?: string;
};

export function ImagePlaceholder({ label, className = "" }: ImagePlaceholderProps) {
  return label ? (
    <div role="img" aria-label={label} className={`bg-portfolio-grey-400 ${className}`} />
  ) : (
    <div aria-hidden="true" className={`bg-portfolio-grey-400 ${className}`} />
  );
}
