"use client";

import { useEffect, useRef } from "react";

// Cursor dot grid behind the whole homepage (after femke.design).
//
// A grid of 2px dots sits behind the content, almost invisible (15% opacity).
// Dots within 150px of the mouse fade up, to full strength right under the
// cursor, and fade back down once it moves away (about 200ms per dot).
//
// How it covers the whole page without a giant canvas: the <canvas> is pinned
// to the screen (fixed, one screen tall), and the dots are laid out in page
// coordinates, so drawing them shifted by the scroll position makes them
// scroll with the page like a normal background. Only the dots on screen are
// drawn. (A canvas as tall as the page would pass Safari's canvas size limit
// on phones and simply go blank.)
//
// It only redraws while something changes (mouse, scroll, resize, theme).
// The layer ignores clicks (pointer-events-none), so links and hovers
// underneath keep working; the mouse is tracked on the whole window instead.
// It sits behind every block on the page, so the project cards cover it.
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
const SETTLED = 0.005; // opacity difference treated as "arrived"
// Dot color: the portfolio-grey-500 value from app/globals.css, so the dots
// near the cursor read grey rather than black (owner's direction). Read from
// the raw theme variable, which holds the light or dark value.
const COLOR_TOKEN = "--portfolio-grey-500";

export function DotGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const readColor = () => getComputedStyle(document.documentElement).getPropertyValue(COLOR_TOKEN).trim() || "#737373";
    let color = readColor();

    let width = 0; // screen size, in CSS pixels
    let height = 0;
    let spacing = SPACING_DESKTOP;
    // Mouse position on the screen; null when there is no cursor
    let pointerOnScreen: { x: number; y: number } | null = null;
    // Opacity of every dot that is not at rest, keyed by "column,row".
    // Dots missing from the map are at REST_OPACITY.
    const litDots = new Map<string, number>();
    let frame = 0;
    let lastTime = 0;

    // Page position of the dot in a given column and row
    const dotX = (column: number) => spacing / 2 + column * spacing;
    const dotY = (row: number) => spacing / 2 + row * spacing;

    // Resting opacity, raised the closer the dot is to the cursor
    // (both in page coordinates)
    const targetOpacity = (x: number, y: number, pointer: { x: number; y: number } | null) => {
      if (!pointer) return REST_OPACITY;
      const distance = Math.hypot(x - pointer.x, y - pointer.y);
      if (distance > REACH) return REST_OPACITY;
      return Math.max(REST_OPACITY, (1 - distance / REACH) * MAX_OPACITY);
    };

    // Match the canvas pixels to the screen (sharp on retina)
    const fitCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      spacing = width < SM_BREAKPOINT ? SPACING_MOBILE : SPACING_DESKTOP;
      litDots.clear();
    };

    // Draw the dots currently on screen, shifted up by the scroll position
    const draw = () => {
      const scrollY = window.scrollY;
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      const firstRow = Math.max(0, Math.floor(scrollY / spacing) - 1);
      const lastRow = Math.ceil((scrollY + height) / spacing);
      const columns = Math.ceil(width / spacing);
      for (let row = firstRow; row <= lastRow; row++) {
        for (let column = 0; column < columns; column++) {
          context.globalAlpha = litDots.get(`${column},${row}`) ?? REST_OPACITY;
          context.beginPath();
          context.arc(dotX(column), dotY(row) - scrollY, DOT_SIZE / 2, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    // One animation step: every dot near the cursor, plus every dot still
    // fading back, moves part of the way toward its target opacity.
    // Keeps running only while some dot is still fading.
    const step = (time: number) => {
      const elapsed = lastTime ? time - lastTime : 16;
      lastTime = time;
      const pointer = pointerOnScreen && { x: pointerOnScreen.x, y: pointerOnScreen.y + window.scrollY };
      // Share of the remaining distance covered this frame (about 95% after FADE_MS)
      const ease = 1 - Math.exp((-3 * elapsed) / FADE_MS);

      // Dots to update: those within reach of the cursor and those already lit
      const keys = new Set(litDots.keys());
      if (pointer) {
        const minColumn = Math.max(0, Math.floor((pointer.x - REACH) / spacing));
        const maxColumn = Math.ceil((pointer.x + REACH) / spacing);
        const minRow = Math.max(0, Math.floor((pointer.y - REACH) / spacing));
        const maxRow = Math.ceil((pointer.y + REACH) / spacing);
        for (let row = minRow; row <= maxRow; row++) {
          for (let column = minColumn; column <= maxColumn; column++) keys.add(`${column},${row}`);
        }
      }

      let stillMoving = false;
      for (const key of keys) {
        const [column, row] = key.split(",").map(Number);
        const target = targetOpacity(dotX(column), dotY(row), pointer);
        const current = litDots.get(key) ?? REST_OPACITY;
        const difference = target - current;
        if (Math.abs(difference) > SETTLED) {
          litDots.set(key, current + difference * ease);
          stillMoving = true;
        } else if (target === REST_OPACITY) {
          litDots.delete(key); // back at rest
        } else {
          litDots.set(key, target);
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

    const handleResize = () => {
      fitCanvas();
      draw();
    };

    // Light/dark switch (the "dark" class on <html>): pick up the new dot color
    const themeObserver = new MutationObserver(() => {
      color = readColor();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    fitCanvas();
    draw();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    // Scrolling moves the dots (redraw) and moves the page under a still mouse
    window.addEventListener("scroll", requestStep, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", requestStep);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Pinned to the screen (fixed, full width and height of the window).
  // size-full matters: a canvas does not stretch between its edges like a
  // div; without an explicit size it takes its pixel-buffer size (2x on
  // retina screens).
  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none fixed inset-0 size-full ${className}`} />;
}
