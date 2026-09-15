"use client";

import { useEffect, useRef } from "react";

// A looping video that sits frozen on a chosen frame until the visitor
// hovers (or keyboard-focuses) the nearest link around it. On hover it plays
// from that frame in a loop; on leave it pauses and returns to the frame.
// Used inside the homepage project card, whose whole panel is the link.
type HoverPlayVideoProps = {
  src: string;
  alt: string;
  // Second of the video to freeze on before hover.
  startAt: number;
  className?: string;
};

export function HoverPlayVideo({ src, alt, startAt, className }: HoverPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const freezeOnStartFrame = () => {
      video.currentTime = startAt;
    };

    const play = () => {
      video.play().catch(() => {
        // Autoplay can be refused by the browser; the frozen frame stays.
      });
    };

    const pause = () => {
      video.pause();
      freezeOnStartFrame();
    };

    // Seek as soon as the metadata is available (it may already be).
    if (video.readyState >= 1) freezeOnStartFrame();
    video.addEventListener("loadedmetadata", freezeOnStartFrame);

    // The hover target is the surrounding link (the whole project card),
    // not just the video, so the card feels like one object.
    const trigger = video.closest("a") ?? video;
    trigger.addEventListener("mouseenter", play);
    trigger.addEventListener("mouseleave", pause);
    trigger.addEventListener("focusin", play);
    trigger.addEventListener("focusout", pause);

    return () => {
      video.removeEventListener("loadedmetadata", freezeOnStartFrame);
      trigger.removeEventListener("mouseenter", play);
      trigger.removeEventListener("mouseleave", pause);
      trigger.removeEventListener("focusin", play);
      trigger.removeEventListener("focusout", pause);
    };
  }, [startAt]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={alt}
    />
  );
}
