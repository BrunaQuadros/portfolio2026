"use client";

import { useEffect, useId, useRef, useState } from "react";

/* ══ Image compare ════════════════════════════════════════
   From Bencho's "Image compare" block (MIT licence,
   bencho.dev/licence). Styles live in app/globals.css under
   "Image compare".

   One picture, two states of it, and a line to drag across.
   Left of the line is the raw shot, right of it the edit. Drag
   slowly and it stays where you leave it; flick it and it
   glides to the edge you threw it at.

   ── TWO PICTURES, ONE FRAME ─────────────────────────────
   The x-ray and the colour photograph are the same scene at the
   same size, so the two halves line up exactly and the line
   reads as seeing through the picture.

   ── THE LINE IS JELLY ───────────────────────────────────
   The knob is exactly where the finger is; the two ends of the
   line are not. They follow it on an under-damped spring, so a
   hard swing leaves them behind and the line bows into a curve,
   then wobbles straight when you stop. The before layer is cut
   along the SAME curve — clip-path: path(), in the block's own
   pixels — so the picture's edge bends with the line rather than
   the line bending over a straight cut.

   ── THE LAYERS DRIFT ────────────────────────────────────
   The back layer moves a few pixels against the line as it
   goes, so the wipe reads as two sheets with depth between them
   rather than a mask sliding over a flat picture.

   ── CHANGES FOR THIS PORTFOLIO ──────────────────────────
   - The pictures come in as props (eco.mio: the Concur results
     list as before, the eco.mio recommendations as after), with
     their natural size for the aspect ratio.
   - Responsive: the block fills its column instead of a fixed
     270 x 360, so its width and height are measured (and
     re-measured on resize) to keep the curve in real pixels.
   - Reduced motion: the line jumps to where it's sent, with no
     glide or bend (docs/ACCESSIBILITY.md, "Motion").
   - Screen readers: the slider's children are presentational,
     so the two pictures' descriptions are linked to it with
     aria-describedby, and the value is spoken as before/after
     percentages. Home and End jump to either edge. */

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Picture = { src: string; alt: string };

type ImageCompareProps = {
  before: Picture;
  after: Picture;
  /* natural size of the two pictures (they must match), used for
     the aspect ratio and as the size until the block is measured */
  width: number;
  height: number;
  /* what the slider compares, read out when it gets focus */
  label: string;
  /* show the Before and After tags */
  labels?: boolean;
  corner?: number;
  className?: string;
};

export function ImageCompare({
  before,
  after,
  width,
  height,
  label,
  labels = true,
  corner = 20,
  className = "",
}: ImageCompareProps) {
  const [p, setP] = useState(0.5);
  const [bend, setBend] = useState(0);
  const [size, setSize] = useState({ w: width, h: height });
  const cur = useRef(0.5);
  const target = useRef<number | null>(null);
  /* the ends of the line, and how fast they are moving */
  const ends = useRef({ x: 0.5, v: 0 });
  const raf = useRef(0);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ v: number; t: number; last: number } | null>(null);
  const [held, setHeld] = useState(false);
  const widthPx = useRef(width);
  const reducedMotion = useRef(false);
  const descriptionId = useId();

  /* the block's real size, kept current as the column resizes */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      widthPx.current = r.width;
      setSize({ w: r.width, h: r.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => (reducedMotion.current = query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  /* one loop for both motions: the glide toward a target, and
     the ends catching up with the middle. It stops itself once
     everything is still. */
  const loop = () => {
    if (raf.current) return;
    let prev = performance.now();
    const step = (t: number) => {
      const dt = Math.min(0.033, (t - prev) / 1000);
      prev = t;
      if (target.current !== null) {
        cur.current += (target.current - cur.current) * (1 - Math.pow(0.0004, dt));
        if (Math.abs(target.current - cur.current) < 0.0005) { cur.current = target.current; target.current = null; }
      }
      /* the jelly: a spring from the ends to the middle, damped
         firmly enough that it flexes and settles without a wobble */
      const e = ends.current;
      e.v += ((cur.current - e.x) * 620 - e.v * 44) * dt;
      e.x += e.v * dt;
      setP(cur.current);
      setBend(clamp((cur.current - e.x) * widthPx.current * 0.5, -9, 9));
      const still = target.current === null && Math.abs(cur.current - e.x) < 0.0006 && Math.abs(e.v) < 0.002;
      if (still) { e.x = cur.current; e.v = 0; setBend(0); raf.current = 0; return; }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };
  /* reduced motion: go straight there, line straight, no loop */
  const jump = (v: number) => {
    target.current = null;
    cur.current = v;
    ends.current = { x: v, v: 0 };
    setP(v);
    setBend(0);
  };
  const glide = (to: number) => {
    if (reducedMotion.current) return jump(to);
    target.current = to;
    loop();
  };
  /* under the finger: the knob is drawn this frame, not the next —
     only the ends are left to the loop */
  const place = (v: number) => {
    if (reducedMotion.current) return jump(v);
    target.current = null; cur.current = v; setP(v); loop();
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const at = (cx: number) => {
    const r = box.current!.getBoundingClientRect();
    return clamp((cx - r.left) / r.width, 0, 1);
  };

  const W = size.w;
  const H = size.h;
  const r = clamp(corner, 0, 28);
  /* the line as a curve: ends at x - bend, and a control point at
     x + bend so the curve passes exactly through the knob */
  const x = p * W;
  const top = x - bend;
  const curve = `M ${top.toFixed(2)} 0 Q ${(x + bend).toFixed(2)} ${H / 2} ${top.toFixed(2)} ${H}`;
  const cut = `path("M 0 0 L ${top.toFixed(2)} 0 Q ${(x + bend).toFixed(2)} ${H / 2} ${top.toFixed(2)} ${H} L 0 ${H} Z")`;
  const percent = Math.round(p * 100);

  return (
    <>
      <div
        ref={box}
        className={`cmp ${className}`}
        data-held={held || undefined}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-describedby={descriptionId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${percent}% before, ${100 - percent}% after`}
        style={{ aspectRatio: `${width} / ${height}`, borderRadius: r, "--p": p } as React.CSSProperties}
        onPointerDown={(e) => {
          try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* a scripted pointer */ }
          const v = at(e.clientX);
          drag.current = { v: 0, t: performance.now(), last: v };
          setHeld(true);
          glide(v);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const v = at(e.clientX);
          const now = performance.now();
          d.v = (v - d.last) / Math.max(1, now - d.t);
          d.t = now;
          d.last = v;
          place(v);
        }}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          setHeld(false);
          try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* never captured */ }
          /* a flick carries it to the edge it was thrown at */
          if (d && Math.abs(d.v) > 0.0025) {
            glide(d.v > 0 ? 1 : 0);
          }
        }}
        onPointerCancel={() => { drag.current = null; setHeld(false); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); glide(clamp((target.current ?? cur.current) - 0.1, 0, 1)); }
          if (e.key === "ArrowRight") { e.preventDefault(); glide(clamp((target.current ?? cur.current) + 0.1, 0, 1)); }
          if (e.key === "Home") { e.preventDefault(); glide(0); }
          if (e.key === "End") { e.preventDefault(); glide(1); }
        }}
      >
        {/* the edit underneath, drifting a little with the line */}
        {/* eslint-disable-next-line @next/next/no-img-element -- both layers must stay
            pixel-identical in size and framing, so plain images, not next/image */}
        <img className="cmp-img cmp-after" src={after.src} alt="" draggable={false} />
        {/* the raw shot on top, cut off at the line */}
        <div className="cmp-before" style={{ clipPath: cut }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
          <img className="cmp-img" src={before.src} alt="" draggable={false} />
        </div>
        {labels && (
          <>
            <span className="cmp-tag" style={{ opacity: clamp((p - 0.14) * 4, 0, 1) }}>Before</span>
            <span className="cmp-tag cmp-right" style={{ opacity: clamp((0.86 - p) * 4, 0, 1) }}>After</span>
          </>
        )}
        <svg className="cmp-line" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <path d={curve} />
        </svg>
        <span className="cmp-grip" style={{ left: x }}>
          <span className="cmp-knob">
            <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
              <path d="M5 1 1 5l4 4M11 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </div>
      <p id={descriptionId} className="sr-only">
        Before: {before.alt}. After: {after.alt}.
      </p>
    </>
  );
}
