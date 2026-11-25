"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useAnimationFrame } from "motion/react";

import { cn } from "@/lib/utils";

// Parallax layer (adapted from fancycomponents.dev "Parallax Floating").
// <ParallaxFloating> follows the pointer and, every frame, eases each
// <FloatingElement> towards an offset proportional to its depth. Transforms
// go straight to the DOM, so nothing re-renders at 60fps. With
// prefers-reduced-motion the elements stay put.

type ElementData = {
  element: HTMLDivElement;
  depth: number;
  current: { x: number; y: number };
};

type FloatingContextValue = {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
  unregisterElement: (id: string) => void;
};

const FloatingContext = createContext<FloatingContextValue | null>(null);

type ParallaxFloatingProps = {
  children: ReactNode;
  className?: string;
  // Negative values move elements away from the cursor.
  sensitivity?: number;
  // 0..1, how fast elements catch up with the target (lower = floatier).
  easingFactor?: number;
  // Freezes every element where it is (e.g. while a photo is hovered, so it
  // doesn't drift out from under the cursor).
  paused?: boolean;
};

export function ParallaxFloating({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  paused = false,
}: ParallaxFloatingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elements = useRef(new Map<string, ElementData>());
  // Where each element was when it unregistered, so a re-register resumes
  // from there instead of jumping back to 0,0.
  const lastPositions = useRef(new Map<string, { x: number; y: number }>());
  const pointer = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = query.matches;
    const onChange = () => {
      reducedMotion.current = query.matches;
    };
    query.addEventListener("change", onChange);

    const update = (clientX: number, clientY: number) => {
      const box = containerRef.current?.getBoundingClientRect();
      pointer.current = box
        ? { x: clientX - box.left, y: clientY - box.top }
        : { x: clientX, y: clientY };
    };
    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) update(t.clientX, t.clientY);
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      query.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      const current = lastPositions.current.get(id) ?? { x: 0, y: 0 };
      elements.current.set(id, { element, depth, current });
    },
    []
  );

  const unregisterElement = useCallback((id: string) => {
    const data = elements.current.get(id);
    if (data) lastPositions.current.set(id, data.current);
    elements.current.delete(id);
  }, []);

  const contextValue = useMemo(
    () => ({ registerElement, unregisterElement }),
    [registerElement, unregisterElement]
  );

  useAnimationFrame(() => {
    if (!containerRef.current || reducedMotion.current || pausedRef.current) return;
    elements.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20;
      data.current.x += (pointer.current.x * strength - data.current.x) * easingFactor;
      data.current.y += (pointer.current.y * strength - data.current.y) * easingFactor;
      data.element.style.transform = `translate3d(${data.current.x}px, ${data.current.y}px, 0)`;
    });
  });

  return (
    <FloatingContext.Provider value={contextValue}>
      <div ref={containerRef} className={cn("absolute left-0 top-0 h-full w-full", className)}>
        {children}
      </div>
    </FloatingContext.Provider>
  );
}

type FloatingElementProps = {
  children: ReactNode;
  className?: string;
  depth?: number;
};

export function FloatingElement({ children, className, depth = 1 }: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | null>(null);
  const context = useContext(FloatingContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    idRef.current ??= Math.random().toString(36).slice(2, 9);
    const id = idRef.current;
    context.registerElement(id, elementRef.current, depth || 0.01);
    return () => context.unregisterElement(id);
  }, [depth, context]);

  return (
    <div ref={elementRef} className={cn("absolute will-change-transform", className)}>
      {children}
    </div>
  );
}
