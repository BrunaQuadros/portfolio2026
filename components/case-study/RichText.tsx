import type { RichSegment } from "@/content/projects/types";

// Renders a sentence stored as segments: plain strings stay as they are,
// `bold` segments are bold, `accent` segments take the case study's brand
// color. Lets content files mark emphasis anywhere in a sentence without a
// separate lead/accent/tail field for every phrase (first used on eco.mio).
type RichTextProps = {
  segments: RichSegment[];
  accentClass?: string;
};

export function RichText({ segments, accentClass = "" }: RichTextProps) {
  return (
    <>
      {segments.map((segment, i) => {
        if (typeof segment === "string") return segment;
        const classes = [segment.bold ? "font-bold" : "", segment.accent ? accentClass : ""].join(" ").trim();
        return (
          <span key={i} className={classes}>
            {segment.text}
          </span>
        );
      })}
    </>
  );
}
