"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

// A round play/pause toggle for a video elsewhere on the page (found by its
// id). It follows the video's real state, so it stays right when the video
// is started or stopped by AutoPlayVideo (scrolling it in or out of view).
// Pausing here also gives visitors a way to stop a looping video
// (ACCESSIBILITY.md, "Motion"); playing here works even under reduced
// motion, since the visitor asked for it.
//
// White ring with a white icon, drawn to sit on a brand-colored panel next
// to a white client logo (eco.mio hero). Size and position come from the
// className passed in.
type VideoPlayPauseButtonProps = {
  videoId: string;
  playLabel: string;
  pauseLabel: string;
  className?: string;
};

export function VideoPlayPauseButton({ videoId, playLabel, pauseLabel, className = "" }: VideoPlayPauseButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Keep the icon in sync with the video, whoever plays or pauses it.
  useEffect(() => {
    const video = document.getElementById(videoId);
    if (!(video instanceof HTMLVideoElement)) return;

    const sync = () => setIsPlaying(!video.paused);
    sync();
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    return () => {
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
    };
  }, [videoId]);

  const toggle = () => {
    const video = document.getElementById(videoId);
    if (!(video instanceof HTMLVideoElement)) return;

    if (video.paused) {
      video.play().catch(() => {
        // Playback can be refused by the browser; the icon stays on "play".
      });
    } else {
      video.pause();
    }
  };

  const Icon = isPlaying ? Pause : Play;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-controls={videoId}
      aria-label={isPlaying ? pauseLabel : playLabel}
      className={`flex aspect-square cursor-pointer items-center justify-center rounded-full border-2 border-white text-white transition-colors duration-150 ease-out hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
    >
      {/* Filled icon at 40% of the button, so it scales with it. */}
      <Icon aria-hidden className="size-[40%] fill-current" strokeWidth={0} />
    </button>
  );
}
