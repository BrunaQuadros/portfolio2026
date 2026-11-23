"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// Light/dark switch. Dark mode is the "dark" class on <html>: every
// portfolio-grey token flips with it (app/globals.css). The choice is saved in
// localStorage; the inline script in app/layout.tsx applies it (or the
// visitor's system setting) before the first paint, so there is no flash.
// Fixed in the bottom-right corner so it shows on every page while dark mode
// is being tested; styled like the case study ExitButton.

const STORAGE_KEY = "theme";

// Watch the <html> class so the icon stays right whoever changes the theme.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const isDarkNow = () => document.documentElement.classList.contains("dark");
// The server can't know the theme, so it renders the light-mode icon.
const isDarkOnServer = () => false;

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, isDarkNow, isDarkOnServer);

  const toggle = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    try {
      localStorage.setItem(STORAGE_KEY, nextIsDark ? "dark" : "light");
    } catch {
      // Storage blocked (private mode): the switch still works for this visit.
    }
  };

  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed bottom-6 right-6 z-50 flex size-11 cursor-pointer items-center justify-center rounded-full bg-portfolio-grey-900/10 text-portfolio-grey-900 backdrop-blur-sm transition-colors hover:bg-portfolio-grey-900/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-pink-500"
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
}
