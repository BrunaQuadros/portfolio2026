"use client";

import { useEffect, useRef } from "react";

// A muted looping video that plays on its own. Visitors who ask for reduced
// motion (ACCESSIBILITY.md, "Motion") see the first frame as a still
// instead. Used for the eco.mio demo on the homepage card and the eco.mio
// case study hero.
type AutoPlayVideoProps = {
  src: string;
  alt: string;
  className?: string;
  // Wait until most of the video (60%) is on screen, then play from the
  // start; once it has scrolled fully out of view it stops and rewinds, so
  // visitors always see it from the beginning (eco.mio hero, owner's
  // request). Off by default: the video plays as soon as it loads.
  startOnView?: boolean;
};

// Share of the video that must be visible before it starts.
const START_VISIBLE_SHARE = 0.6;

export function AutoPlayVideo({ src, alt, className, startOnView = false }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Without startOnView the video counts as "in view" from the start.
    let inView = !startOnView;

    const rewind = () => {
      video.pause();
      video.currentTime = 0;
    };

    const playOrStop = () => {
      if (reducedMotion.matches || !inView) {
        rewind();
      } else {
        video.play().catch(() => {
          // Autoplay can be refused by the browser; the first frame stays.
        });
      }
    };

    playOrStop();
    // Follow the setting if the visitor changes it while on the page.
    reducedMotion.addEventListener("change", playOrStop);

    let observer: IntersectionObserver | undefined;
    if (startOnView) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= START_VISIBLE_SHARE && !inView) {
            inView = true;
            playOrStop();
          } else if (!entry.isIntersecting && inView) {
            // Fully out of view: stop and rewind for next time.
            inView = false;
            playOrStop();
          }
        },
        { threshold: [0, START_VISIBLE_SHARE] },
      );
      observer.observe(video);
    }

    return () => {
      reducedMotion.removeEventListener("change", playOrStop);
      observer?.disconnect();
    };
  }, [startOnView]);

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
