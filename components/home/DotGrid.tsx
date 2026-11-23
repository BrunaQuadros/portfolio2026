"use client";

import { useEffect, useRef } from "react";

// Cursor dot grid behind the top of the homepage (after femke.design).
//
// A grid of 2px dots sits behind the content, almost invisible (15% opacity).
// Dots within 150px of the mouse fade up, to full strength right under the
// cursor, and fade back down once it moves away (about 200ms per dot).
//
// Drawn on one <canvas> instead of hundreds of elements, and only redrawn
// while something changes. The layer ignores clicks (pointer-events-none),
// so links and hovers underneath keep working; the mouse is tracked on the
// whole window instead.
//
// Height: the grid starts where it is placed and ends at the bottom of the
// element matched by `endSelector` (on the homepage, the first project card).
// It is re-measured whenever the page layout changes size.
//
// Touch screens have no cursor, so the dots simply stay at their resting
// level there. Only opacity changes (no movement), so it stays on under
// reduced motion.

const DOT_SIZE = 2; // px
const SPACING_DESKTOP = 24; // px between dot centers, from sm: up
const SPACING_MOBILE = 20; // px between dot centers, below sm: (640px)
const SM_BREAKPOINT = 640;
const REACH = 150; // px around the cursor where dots light up
const REST_OPACITY = 0.15;
const MAX_OPACITY = 1;
const FADE_MS = 200; // how long a dot takes to (mostly) reach its new opacity
// Dot color: the portfolio-grey-500 value from app/globals.css, so the dots
// near the cursor read grey rather than black (owner's direction). Read from
// the raw theme variable, which holds the light or dark value.
const COLOR_TOKEN = "--portfolio-grey-500";

export function DotGrid({ endSelector, className = "" }: { endSelector: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const readColor = () => getComputedStyle(document.documentElement).getPropertyValue(COLOR_TOKEN).trim() || "#737373";
    let color = readColor();

    // Dot centers and their current opacity, rebuilt whenever the size changes
    let dots: { x: number; y: number; opacity: number }[] = [];
    let width = 0;
    let height = 0;
    // Mouse position on the screen; null when there is no cursor
    let pointerOnScreen: { x: number; y: number } | null = null;
    // Same position relative to the canvas, refreshed every frame (scrolling moves the canvas)
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let lastTime = 0;

    // Stretch the canvas from its top down to the bottom of the end element.
    // The height goes into a CSS variable read by the h-(--dot-grid-height) class.
    const fitHeight = () => {
      const end = document.querySelector(endSelector);
      if (!end) return;
      const top = canvas.getBoundingClientRect().top;
      const bottom = end.getBoundingClientRect().bottom;
      canvas.style.setProperty("--dot-grid-height", `${Math.max(0, bottom - top)}px`);
    };

    // Resting opacity, raised the closer the dot is to the cursor
    const targetOpacity = (dot: { x: number; y: number }) => {
      if (!pointer) return REST_OPACITY;
      const distance = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
      if (distance > REACH) return REST_OPACITY;
      return Math.max(REST_OPACITY, (1 - distance / REACH) * MAX_OPACITY);
    };

    const buildGrid = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const spacing = window.innerWidth < SM_BREAKPOINT ? SPACING_MOBILE : SPACING_DESKTOP;
      dots = [];
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          dots.push({ x, y, opacity: REST_OPACITY });
        }
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      for (const dot of dots) {
        context.globalAlpha = dot.opacity;
        context.beginPath();
        context.arc(dot.x, dot.y, DOT_SIZE / 2, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    // One animation step: every dot moves part of the way toward its target.
    // Keeps running only while some dot is still fading.
    const step = (time: number) => {
      const elapsed = lastTime ? time - lastTime : 16;
      lastTime = time;
      const box = canvas.getBoundingClientRect();
      pointer = pointerOnScreen && { x: pointerOnScreen.x - box.left, y: pointerOnScreen.y - box.top };
      // Share of the remaining distance covered this frame (about 95% after FADE_MS)
      const ease = 1 - Math.exp((-3 * elapsed) / FADE_MS);

      let stillMoving = false;
      for (const dot of dots) {
        const target = targetOpacity(dot);
        const difference = target - dot.opacity;
        if (Math.abs(difference) > 0.005) {
          dot.opacity += difference * ease;
          stillMoving = true;
        } else {
          dot.opacity = target;
        }
      }
      draw();

      if (stillMoving) {
        frame = requestAnimationFrame(step);
      } else {
        frame = 0;
        lastTime = 0;
      }
    };

    const requestStep = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerOnScreen = { x: event.clientX, y: event.clientY };
      requestStep();
    };

    // Mouse left the browser window: let the lit dots fade back
    const handlePointerLeave = () => {
      pointerOnScreen = null;
      requestStep();
    };

    // The canvas changed size: rebuild the dots
    const canvasObserver = new ResizeObserver(() => {
      buildGrid();
      draw();
    });
    // Anything on the page changed size (images loading, window resize):
    // the end element may have moved, so measure again
    const layoutObserver = new ResizeObserver(fitHeight);
    // Light/dark switch (the "dark" class on <html>): pick up the new dot color
    const themeObserver = new MutationObserver(() => {
      color = readColor();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    fitHeight();
    buildGrid();
    draw();
    canvasObserver.observe(canvas);
    if (canvas.parentElement) layoutObserver.observe(canvas.parentElement);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    // Scrolling moves the grid under a still mouse, so recheck which dots are near
    window.addEventListener("scroll", requestStep, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      canvasObserver.disconnect();
      layoutObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", requestStep);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [endSelector]);

  // w-full is required: a canvas does not stretch between left/right like a
  // div; without an explicit width it takes its pixel-buffer width (2x on
  // retina screens), which made the grid twice the page width.
  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none w-full h-(--dot-grid-height) ${className}`} />;
}
