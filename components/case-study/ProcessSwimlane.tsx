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
// Lane names sit near the panel's left edge: at the full 1140px desktop
// width the person icon lines up with the 40px card padding below the
// diagram (the "Faster demos" card), owner's request.
const LANE_HEADER = { iconX: 67, iconSize: 29, labelX: 112, fontSize: 27 };
// Steps sit at even columns between the first and last measured nodes.
const FIRST_STEP_X = 435.5;
const LAST_STEP_X = 1728;
const LABEL = { fontSize: 22, gapAbove: 12, gapBelow: 28 };
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
    <svg
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      role="img"
      aria-label={label}
      className={`font-manrope ${className}`}
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
            <g key={`${step.label}-${i}`}>
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
      </g>
    </svg>
  );
}
