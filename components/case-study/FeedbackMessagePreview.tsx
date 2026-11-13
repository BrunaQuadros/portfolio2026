import Image from "next/image";

// The original message behind a short quote (a screenshot, e.g. from Slack),
// fading in over the quote card while it is hovered. Only on devices that can
// hover. Put it inside the card and give the card the `group relative`
// classes. Screen readers get the full message from the screenshot's alt text.
type FeedbackMessagePreviewProps = {
  screenshot: { src: string; alt: string; width: number; height: number };
};

export function FeedbackMessagePreview({ screenshot }: FeedbackMessagePreviewProps) {
  return (
    <>
      <p className="sr-only">{screenshot.alt}</p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center rounded-[inherit] bg-portfolio-grey-50 p-6 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none sm:p-10 [@media(hover:hover)]:flex"
      >
        <Image
          src={screenshot.src}
          alt=""
          width={screenshot.width}
          height={screenshot.height}
          sizes="760px"
          className="h-auto max-h-full w-auto max-w-full rounded-case-lg shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]"
        />
      </div>
    </>
  );
}
