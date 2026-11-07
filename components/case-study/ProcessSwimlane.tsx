import Image from "next/image";
import { Link as LinkIcon, MessageCircleQuestionMark, Send, Undo2, User } from "lucide-react";
import type { ProcessSwimlaneData, SwimlaneNode } from "@/content/projects/types";

// A horizontal "who does what" process diagram: three lanes (people) and a
// zigzag of steps hopping between them, each step a small node with a
// label. Drawn in SVG from data (first the eco.mio "closer look at the
// process" diagram, rebuilt from the owner's PNG) so wording, order or
// lanes can change without redrawing anything. The highlighted lane (PM)
// and its nodes are yellow; the others are white. Every step label is white
// (owner's request, so the copy reads as one line of text across lanes).
//
// Every number below is in the 2002 x 652 design canvas, measured from the
// owner's file (half its 4004 x 1304 export); the SVG scales as a whole.

const CANVAS = { width: 2002, height: 652, radius: 67 };
const LANE_Y = [186, 316, 446];
const LANE_LINE = { x1: 340, x2: 1841 };
const LANE_HEADER = { iconX: 165, iconSize: 29, labelX: 210, fontSize: 27 };
// Steps sit at even columns between the first and last measured nodes.
const FIRST_STEP_X = 435.5;
const LAST_STEP_X = 1728;
const LABEL = { fontSize: 22, gapAbove: 12, gapBelow: 28 };
// Bottleneck hover layer: a hand-drawn loop around each step with a
// `duration`, holding its node and label, plus the time written by hand
// beside it (owner's spec).
const LOOP = { padTop: 24, padBottom: 28, padSide: 30, cornerPad: 16, strokeWidth: 5 };
const HANDWRITING = { fontSize: 44 };
// Rough width of a label, in canvas units (Manrope semibold ~0.52em a character).
const labelHalfWidth = (text: string) => (text.length * LABEL.fontSize * 0.52) / 2;
// The big decorative ring in the top-right corner, cropped by the panel.
const RING = { cx: 1973, cy: -191, r: 391.5, width: 117 };

// Half the height of each node shape, for placing labels above or below.
const HALF_HEIGHT: Record<SwimlaneNode, number> = {
  card: 28.5,
  question: 28,
  reply: 28,
  screens: 33,
  send: 28,
  figma: 56,
  link: 25,
};

// Half the width of each node shape, for the hover target over a node
// with a preview.
const HALF_WIDTH: Record<SwimlaneNode, number> = {
  card: 46,
  question: 28,
  reply: 28,
  screens: 52,
  send: 28,
  figma: 87,
  link: 46,
};

// Canvas units as a percentage of the canvas, for placing HTML over the SVG.
const pctX = (x: number) => `${(x / CANVAS.width) * 100}%`;
const pctY = (y: number) => `${(y / CANVAS.height) * 100}%`;

// Fill and icon colours per lane type, as Tailwind classes on SVG elements.
const COLORS = {
  highlight: { fill: "fill-eco-mio-yellow-400", text: "fill-eco-mio-yellow-400", icon: "text-eco-mio-navy-900" },
  plain: { fill: "fill-white", text: "fill-white", icon: "text-eco-mio-blue-600" },
};

type Colors = (typeof COLORS)["plain"];

function Icon({ as: IconComponent, cx, cy, size, className }: {
  as: typeof User;
  cx: number;
  cy: number;
  size: number;
  className: string;
}) {
  return <IconComponent x={cx - size / 2} y={cy - size / 2} width={size} height={size} strokeWidth={2} className={className} aria-hidden="true" />;
}

// The Trello brief: a white card with one dark and two light text bars.
function CardNode({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 46} y={cy - 28.5} width={92} height={57} rx={8} className="fill-white" />
      <rect x={cx - 33.5} y={cy - 14} width={40} height={6} rx={3} className="fill-eco-mio-blue-600" />
      <rect x={cx - 33.5} y={cy - 2} width={60} height={4} rx={2} className="fill-eco-mio-blue-500/30" />
      <rect x={cx - 33.5} y={cy + 10} width={47} height={4} rx={2} className="fill-eco-mio-blue-500/30" />
    </g>
  );
}

// The Notion screenshots: a tile with a title bar and three thumbnails.
function ScreensNode({ cx, cy, colors }: { cx: number; cy: number; colors: Colors }) {
  return (
    <g>
      <rect x={cx - 52} y={cy - 33} width={104} height={66} rx={8} className={colors.fill} />
      <rect x={cx - 41} y={cy - 23} width={43} height={6} rx={3} className="fill-eco-mio-navy-900" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={cx - 41 + i * 28} y={cy - 9} width={22} height={30} rx={4} className="fill-black/20" />
      ))}
    </g>
  );
}

// The Figma file built by hand: a white card holding three phone screens,
// the first one selected (green).
function FigmaNode({ cx, cy }: { cx: number; cy: number }) {
  const screens = [-75, -22, 32];
  return (
    <g>
      <rect x={cx - 87} y={cy - 56} width={174} height={112} rx={8} className="fill-white" />
      {screens.map((dx, i) => {
        const x = cx + dx;
        const y = cy - 46;
        const selected = i === 0;
        const line = selected ? "stroke-eco-mio-green-600" : "stroke-eco-mio-blue-500/30";
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={44}
              height={90}
              rx={4}
              strokeWidth={1.5}
              className={selected ? "fill-eco-mio-green-600/10 stroke-eco-mio-green-600" : "fill-white stroke-eco-mio-blue-500/30"}
            />
            <rect x={x + 13} y={y + 5} width={18} height={3} rx={1.5} className={selected ? "fill-eco-mio-green-600" : "fill-eco-mio-blue-500/30"} />
            {[0, 1, 2].map((row) => (
              <rect
                key={row}
                x={x + 5}
                y={y + 14 + row * 13}
                width={34}
                height={8}
                rx={2}
                fill="none"
                strokeWidth={1}
                strokeDasharray="2 2"
                className={selected ? "stroke-eco-mio-green-600/50" : line}
              />
            ))}
            {selected ? (
              <rect x={x + 4} y={y + 78} width={36} height={6} rx={3} className="fill-eco-mio-green-600" />
            ) : (
              <rect x={x + 5} y={y + 78} width={34} height={6} rx={3} fill="none" strokeWidth={1} className={line} />
            )}
          </g>
        );
      })}
    </g>
  );
}

// A hand-drawn loop: a slightly wobbly, slightly tilted ellipse that runs
// a little past its start and spirals outward, so its ends overlap like a
// pen loop. Points are smoothed into curves (Catmull-Rom to cubic Bezier).
function loopPath(cx: number, cy: number, rx: number, ry: number) {
  const start = Math.PI * 1.1;
  const sweep = Math.PI * 2 + 0.5;
  const steps = 28;
  const tilt = (-4 * Math.PI) / 180;
  const points = Array.from({ length: steps + 1 }, (_, i) => {
    const t = start + (sweep * i) / steps;
    const wobble = 1 + 0.035 * Math.sin(3 * t + 1) + (0.06 * i) / steps;
    const px = rx * wobble * Math.cos(t);
    const py = ry * wobble * Math.sin(t);
    return [cx + px * Math.cos(tilt) - py * Math.sin(tilt), cy + px * Math.sin(tilt) + py * Math.cos(tilt)];
  });
  const round = (n: number) => Math.round(n * 10) / 10;
  let d = `M${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const [p1, p2] = [points[i], points[i + 1]];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${round(p2[0])} ${round(p2[1])}`;
  }
  return d;
}

// The loop's ellipse for a step: it holds the node and its label (below
// it), and is wide enough that the node's corners sit inside the curve.
function loopFor(x: number, y: number, node: SwimlaneNode, label: string, labelY: number) {
  const top = y - HALF_HEIGHT[node] - LOOP.padTop;
  const bottom = labelY + LOOP.padBottom;
  const cy = (top + bottom) / 2;
  const ry = (bottom - top) / 2;
  const cornerDy = (y - HALF_HEIGHT[node] - cy) / ry;
  const rxForCorners = HALF_WIDTH[node] / Math.sqrt(1 - cornerDy * cornerDy) + LOOP.cornerPad;
  const rx = Math.max(labelHalfWidth(label) + LOOP.padSide, rxForCorners);
  return { cx: x, cy, rx, ry };
}

function StepNode({ node, cx, cy, colors }: { node: SwimlaneNode; cx: number; cy: number; colors: Colors }) {
  switch (node) {
    case "card":
      return <CardNode cx={cx} cy={cy} />;
    case "screens":
      return <ScreensNode cx={cx} cy={cy} colors={colors} />;
    case "figma":
      return <FigmaNode cx={cx} cy={cy} />;
    case "link":
      return (
        <g>
          <rect x={cx - 46} y={cy - 25} width={92} height={50} rx={25} className={colors.fill} />
          <Icon as={LinkIcon} cx={cx} cy={cy} size={24} className={colors.icon} />
        </g>
      );
    default: {
      const icon = node === "question" ? MessageCircleQuestionMark : node === "reply" ? Undo2 : Send;
      return (
        <g>
          <circle cx={cx} cy={cy} r={28} className={colors.fill} />
          <Icon as={icon} cx={cx} cy={cy} size={26} className={colors.icon} />
        </g>
      );
    }
  }
}

type ProcessSwimlaneProps = {
  diagram: ProcessSwimlaneData;
  className?: string;
};

export function ProcessSwimlane({ diagram, className = "" }: ProcessSwimlaneProps) {
  const { lanes, steps, label } = diagram;
  const stepGap = steps.length > 1 ? (LAST_STEP_X - FIRST_STEP_X) / (steps.length - 1) : 0;
  const points = steps.map((step, i) => ({ x: FIRST_STEP_X + i * stepGap, y: LANE_Y[step.lane] }));
  const colorsFor = (lane: number) => (lanes[lane]?.highlight ? COLORS.highlight : COLORS.plain);

  return (
    // The wrapper takes the sizing classes; the SVG fills it, and any
    // preview hover targets sit over their nodes in percentages.
    <div className={`group/diagram relative ${className}`}>
      <svg
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        role="img"
        aria-label={label}
        className="block h-full w-full font-manrope"
      >
        <defs>
          <clipPath id="process-swimlane-panel">
            <rect width={CANVAS.width} height={CANVAS.height} rx={CANVAS.radius} />
          </clipPath>
        </defs>
        <g clipPath="url(#process-swimlane-panel)">
          <rect width={CANVAS.width} height={CANVAS.height} className="fill-eco-mio-blue-500" />
          <circle cx={RING.cx} cy={RING.cy} r={RING.r} fill="none" strokeWidth={RING.width} className="stroke-white/10" />

          {lanes.map((lane, i) => {
            const colors = colorsFor(i);
            const y = LANE_Y[i];
            return (
              <g key={lane.name}>
                <line x1={LANE_LINE.x1} x2={LANE_LINE.x2} y1={y} y2={y} strokeWidth={2} className="stroke-white/10" />
                <Icon as={User} cx={LANE_HEADER.iconX + LANE_HEADER.iconSize / 2} cy={y} size={LANE_HEADER.iconSize + 6} className={lane.highlight ? "text-eco-mio-yellow-400" : "text-white"} />
                <text x={LANE_HEADER.labelX} y={y + 9.5} fontSize={LANE_HEADER.fontSize} fontWeight={600} className={colors.text}>
                  {lane.name}
                </text>
              </g>
            );
          })}

          <polyline
            points={points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            strokeWidth={3}
            strokeLinejoin="round"
            className="stroke-white"
          />

          {steps.map((step, i) => {
            const { x, y } = points[i];
            const colors = colorsFor(step.lane);
            const half = HALF_HEIGHT[step.node];
            const labelY = step.labelPosition === "above" ? y - half - LABEL.gapAbove : y + half + LABEL.gapBelow;
            // "start" aligns the label with the node's left edge (the Figma
            // link review pill) instead of centring it.
            const labelX = step.labelAlign === "start" ? x - 46 : x;
            return (
              // Steps without a duration fade to 40% while the diagram is
              // hovered, so the bottlenecks stand out.
              <g
                key={`${step.label}-${i}`}
                className={
                  step.duration
                    ? undefined
                    : "transition-opacity duration-300 group-hover/diagram:opacity-40 motion-reduce:transition-none"
                }
              >
                <StepNode node={step.node} cx={x} cy={y} colors={colors} />
                <text
                  x={labelX}
                  y={labelY}
                  fontSize={LABEL.fontSize}
                  fontWeight={600}
                  textAnchor={step.labelAlign === "start" ? "start" : "middle"}
                  className="fill-white"
                >
                  {step.label}
                </text>
              </g>
            );
          })}

          {/* Bottleneck hover layer, drawn on top: a loop around each step
              with a duration, drawing itself in 700ms (the second 150ms
              later), then its time written by hand fading in and rising 6px
              (500ms and 650ms in, over 350ms). The first time sits to the
              lower left of its loop, the others to the right. pathLength 1
              lets the dash offset animate the whole stroke. */}
          {steps.map((step, i) => {
            if (!step.duration) return null;
            const order = steps.slice(0, i).filter((s) => s.duration).length;
            const { x, y } = points[i];
            const half = HALF_HEIGHT[step.node];
            const labelY = step.labelPosition === "above" ? y - half - LABEL.gapAbove : y + half + LABEL.gapBelow;
            const loop = loopFor(x, y, step.node, step.label, labelY);
            const first = order === 0;
            const textX = first ? loop.cx - loop.rx * 0.78 : loop.cx + loop.rx + 18;
            const textY = first ? loop.cy + loop.ry + 30 : loop.cy + 30;
            return (
              <g key={`bottleneck-${i}`} aria-hidden="true">
                <path
                  d={loopPath(loop.cx, loop.cy, loop.rx, loop.ry)}
                  pathLength={1}
                  fill="none"
                  strokeWidth={LOOP.strokeWidth}
                  strokeLinecap="round"
                  className={`stroke-eco-mio-yellow-300 [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-out group-hover/diagram:[stroke-dashoffset:0] motion-reduce:transition-none ${first ? "" : "group-hover/diagram:delay-150"}`}
                />
                <g transform={`rotate(${first ? -8 : -6} ${textX} ${textY})`}>
                  <text
                    x={textX}
                    y={textY}
                    fontSize={HANDWRITING.fontSize}
                    textAnchor={first ? "end" : "start"}
                    className={`fill-eco-mio-yellow-300 font-handwritten font-bold opacity-0 translate-y-[6px] transition duration-350 ease-out group-hover/diagram:translate-y-0 group-hover/diagram:opacity-100 motion-reduce:transition-none ${first ? "group-hover/diagram:delay-500" : "group-hover/diagram:delay-650"}`}
                  >
                    {step.duration}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      {/* Hover or focus a node with a preview to see a bigger example above
          it. From lg only: below lg the diagram sits in a sideways scroll
          strip that would clip the card, and there's no hover on touch. */}
      {steps.map((step, i) => {
        if (!step.preview) return null;
        const { x, y } = points[i];
        const halfW = HALF_WIDTH[step.node];
        const halfH = HALF_HEIGHT[step.node];
        return (
          <button
            key={`preview-${i}`}
            type="button"
            aria-label={step.preview.buttonLabel}
            className="group absolute z-20 hidden cursor-zoom-in rounded-md outline-none ring-white/60 transition-shadow hover:ring-4 focus-visible:ring-4 lg:block"
            style={{ left: pctX(x - halfW), top: pctY(y - halfH), width: pctX(halfW * 2), height: pctY(halfH * 2) }}
          >
            {/* The preview is part of the button, so moving the mouse up onto
                it keeps it open; its transparent pb-4 bridges the 16px gap
                above the node so the hover isn't lost on the way. It only
                takes pointer events while shown. 600px screenshot inside a
                24px white margin. */}
            <span className="pointer-events-none absolute bottom-full left-1/2 block -translate-x-1/2 translate-y-2 pb-4 opacity-0 transition duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <span className="block w-[648px] cursor-default rounded-case-md bg-white p-6 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                <Image
                  src={step.preview.src}
                  alt={step.preview.alt}
                  width={step.preview.width}
                  height={step.preview.height}
                  sizes="600px"
                  className="block h-auto w-full"
                />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
