import { MoveRight } from "lucide-react";
import type { RichSegment } from "@/content/projects/types";

// Renders a sentence stored as segments: plain strings stay as they are,
// `bold` segments are bold, `accent` segments take the case study's brand
// color, `br` segments are line breaks shown only from `breakClass`'s
// breakpoint up (with a space so the words don't run together below it),
// and `arrow` segments are a right-pointing arrow in the accent color, shown
// from the same breakpoint (where the visual it points at sits beside the
// text).
// Lets content files mark emphasis anywhere in a sentence without a
// separate lead/accent/tail field for every phrase (first used on eco.mio).
type RichTextProps = {
  segments: RichSegment[];
  accentClass?: string;
  breakClass?: string;
  // Where an `arrow` segment's fallback shows: the opposite of breakClass
  // (pass "xl:hidden" with "hidden xl:inline").
  fallbackClass?: string;
};

export function RichText({
  segments,
  accentClass = "",
  breakClass = "hidden lg:inline",
  fallbackClass = "lg:hidden",
}: RichTextProps) {
  return (
    <>
      {segments.map((segment, i) => {
        if (typeof segment === "string") return segment;
        if ("arrow" in segment) {
          return (
            <span key={i}>
              {segment.fallback ? <span className={fallbackClass}>{segment.fallback}</span> : null}
              <MoveRight
                aria-hidden="true"
                strokeWidth={2.5}
                className={`${breakClass} ml-2 size-7 align-middle ${accentClass}`}
              />
            </span>
          );
        }
        if ("br" in segment) {
          return (
            <span key={i}>
              <br className={breakClass} />{" "}
            </span>
          );
        }
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
