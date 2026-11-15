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
  // Second (in seconds) to show as the resting frame, and to play from.
  // Defaults to the very first frame.
  startAt?: number;
  // Rest on the startAt frame and only play while the pointer is over the
  // video; on leave it pauses and goes back to startAt (eco.mio homepage
  // card, owner's request). Devices without hover (phones) fall back to
  // startOnView so the video still moves there.
  playOnHover?: boolean;
};

// Share of the video that must be visible before it starts.
const START_VISIBLE_SHARE = 0.6;

export function AutoPlayVideo({
  src,
  alt,
  className,
  startOnView = false,
  startAt = 0,
  playOnHover = false,
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Hover mode only where a real pointer can hover; otherwise behave like
    // startOnView (see the playOnHover prop).
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (playOnHover && canHover) {
      return setUpHoverPlayback(video, startAt);
    }
    const waitForView = startOnView || playOnHover;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Without startOnView the video counts as "in view" from the start.
    let inView = !waitForView;

    const rewind = () => {
      video.pause();
      video.currentTime = startAt;
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
    if (waitForView) {
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
  }, [startOnView, startAt, playOnHover]);

  return (
    <video
      // Ask the browser for the startAt frame right away (media fragment), so
      // the resting frame shows even before the script runs.
      ref={videoRef}
      src={startAt > 0 ? `${src}#t=${startAt}` : src}
      className={className}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={alt}
    />
  );
}

// Hover playback: rest on the startAt frame, play while the pointer is over
// the video, pause and go back to startAt on leave. Under reduced motion it
// never plays. Returns a cleanup function for useEffect.
function setUpHoverPlayback(video: HTMLVideoElement, startAt: number) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const showRestingFrame = () => {
    video.pause();
    video.currentTime = startAt;
  };
  const play = () => {
    if (reducedMotion.matches) return;
    video.play().catch(() => {
      // Playback can be refused by the browser; the resting frame stays.
    });
  };

  showRestingFrame();
  video.addEventListener("mouseenter", play);
  video.addEventListener("mouseleave", showRestingFrame);
  return () => {
    video.removeEventListener("mouseenter", play);
    video.removeEventListener("mouseleave", showRestingFrame);
  };
}
