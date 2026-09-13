"use client";

import { useState } from "react";
import Image from "next/image";

// The avatar stack under "Team": a photo plus a "+N" badge whose tooltip
// lists the roles it's standing in for. Needs real click state (not just
// CSS :hover/:focus) because iOS Safari doesn't focus a tapped <button> —
// group-focus never fires there, so the tooltip would never open on mobile.
type TeamAvatarGroupProps = {
  avatar: { src: string; alt: string };
  extra: string;
  extraBreakdown: string;
};

export function TeamAvatarGroup({ avatar, extra, extraBreakdown }: TeamAvatarGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center">
      <div className="relative z-10 size-[52px] shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
        <Image src={avatar.src} alt={avatar.alt} fill className="object-cover" />
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group relative -ml-3 flex size-[52px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-faircado-pink-500 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] focus:outline-none"
      >
        <span className="font-manrope font-bold text-[14px] text-white">{extra}</span>
        {/* Desktop: real mouse hover still reveals the tooltip on its own via
            group-hover, unchanged from the original design. Mobile: layered
            on top with the `open` click state, since a tap doesn't produce a
            real :hover on iOS Safari the way a mouse does. */}
        <span
          role="tooltip"
          className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-portfolio-grey-900 px-3 py-1.5 font-manrope text-[13px] font-bold text-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] transition-opacity duration-200 ease-out group-hover:opacity-100 ${open ? "opacity-100" : "opacity-0"}`}
        >
          {extraBreakdown}
        </span>
      </button>
    </div>
  );
}
