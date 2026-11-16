"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

// A nav link that copies an email address instead of opening a mail app,
// then shows a small confirmation under it for a moment. If the browser
// refuses clipboard access, it falls back to opening a mailto: link.
type CopyEmailButtonProps = {
  label: string;
  email: string;
  confirmation: string;
  className?: string;
};

// How long the confirmation stays visible.
const CONFIRMATION_MS = 2000;

export function CopyEmailButton({ label, email, confirmation, className = "" }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Clear a pending timer if the page is left mid-confirmation.
  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setCopied(false), CONFIRMATION_MS);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <span className="relative inline-flex">
      <button type="button" onClick={copyEmail} className={className}>
        {label}
      </button>
      {/* Visible chip: always rendered so it can fade out with its text. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute right-0 top-full mt-2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-portfolio-grey-900 px-3 py-1.5 font-manrope text-xs font-semibold text-white transition-opacity duration-150 ease-out ${copied ? "opacity-100" : "opacity-0"}`}
      >
        <Check className="size-3.5" strokeWidth={3} />
        {confirmation}
      </span>
      {/* Screen reader announcement, only filled in when the email is copied. */}
      <span aria-live="polite" className="sr-only">
        {copied ? confirmation : ""}
      </span>
    </span>
  );
}
