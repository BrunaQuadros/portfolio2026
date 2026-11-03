"use client";

import { useEffect, useRef } from "react";

// A muted looping video that plays on its own as soon as it loads. Visitors
// who ask for reduced motion (ACCESSIBILITY.md, "Motion") see the first
// frame as a still instead. Used for the eco.mio demo on the homepage card.
type AutoPlayVideoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function AutoPlayVideo({ src, alt, className }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const playOrStop = () => {
      if (reducedMotion.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        video.play().catch(() => {
          // Autoplay can be refused by the browser; the first frame stays.
        });
      }
    };

    playOrStop();
    // Follow the setting if the visitor changes it while on the page.
    reducedMotion.addEventListener("change", playOrStop);
    return () => reducedMotion.removeEventListener("change", playOrStop);
  }, []);

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
