import { User } from "lucide-react";
import type { HandoffChartData } from "@/content/projects/types";

// A vertical handoff chart sized for the phone mockup slot: three people as
// columns, a zigzag line hopping between them once per handoff (top to
// bottom), an optional note under one column and a big total at the foot.
// First used for eco.mio's "Old demo process", rebuilt from the owner's PNG
// so it can be edited by request. The highlighted person (PM) and their dots
// are yellow; the others are white.
//
// Every number below is in the 780 x 1688 design canvas (the owner's file,
// same 250:541 shape as the phone mockups); the SVG scales as a whole.

const CANVAS = { width: 780, height: 1688 };
const COLUMN_X = [178, 390, 602];
const HEADER = { cy: 323.5, r: 52, iconSize: 40, labelY: 422, fontSize: 28 };
const LINES = { top: 466, bottom: 1344 };
// Handoff dots run evenly between the first and last measured positions.
const FIRST_DOT_Y = 505.5;
const LAST_DOT_Y = 1297.5;
const DOT_R = 17.5;
const TITLE = { x: 74, y: 175, fontSize: 60 };
const NOTE = { y: 1393, fontSize: 48 };
const DIVIDER = { x1: 72, x2: 708, y: 1477.5 };
const TOTAL = { x: 74, y: 1585, fontSize: 80, unitFontSize: 28 };

type HandoffChartProps = {
  chart: HandoffChartData;
  className?: string;
};

export function HandoffChart({ chart, className = "" }: HandoffChartProps) {
  const { label, titleLead, titleAccent, people, handoffs, note, total } = chart;
  const gap = handoffs.length > 1 ? (LAST_DOT_Y - FIRST_DOT_Y) / (handoffs.length - 1) : 0;
  const dots = handoffs.map((person, i) => ({ x: COLUMN_X[person], y: FIRST_DOT_Y + i * gap, person }));
  const isHighlight = (person: number) => Boolean(people[person]?.highlight);

  return (
    <svg
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      role="img"
      aria-label={label}
      className={`font-manrope ${className}`}
    >
      <rect width={CANVAS.width} height={CANVAS.height} className="fill-eco-mio-blue-500" />

      <text x={TITLE.x} y={TITLE.y} fontSize={TITLE.fontSize} fontWeight={700} letterSpacing={-1.5}>
        <tspan className="fill-white">{titleLead} </tspan>
        <tspan className="fill-eco-mio-yellow-400">{titleAccent}</tspan>
      </text>

      {people.map((person, i) => {
        const x = COLUMN_X[i];
        const highlight = isHighlight(i);
        return (
          <g key={person.name}>
            <line x1={x} x2={x} y1={LINES.top} y2={LINES.bottom} strokeWidth={4} className="stroke-white/10" />
            <circle cx={x} cy={HEADER.cy} r={HEADER.r} className={highlight ? "fill-eco-mio-yellow-400" : "fill-white"} />
            <User
              x={x - HEADER.iconSize / 2}
              y={HEADER.cy - HEADER.iconSize / 2}
              width={HEADER.iconSize}
              height={HEADER.iconSize}
              strokeWidth={2.5}
              className={highlight ? "text-eco-mio-navy-900" : "text-eco-mio-blue-600"}
              aria-hidden="true"
            />
            <text
              x={x}
              y={HEADER.labelY}
              fontSize={HEADER.fontSize}
              fontWeight={700}
              textAnchor="middle"
              className={highlight ? "fill-eco-mio-yellow-400" : "fill-white"}
            >
              {person.name}
            </text>
          </g>
        );
      })}

      <polyline
        points={dots.map((d) => `${d.x},${d.y}`).join(" ")}
        fill="none"
        strokeWidth={5.5}
        strokeLinejoin="round"
        className="stroke-white"
      />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={DOT_R} className={isHighlight(d.person) ? "fill-eco-mio-yellow-400" : "fill-white"} />
      ))}

      {note ? (
        <text
          x={COLUMN_X[note.person]}
          y={NOTE.y}
          fontSize={NOTE.fontSize}
          fontWeight={700}
          textAnchor="middle"
          className={isHighlight(note.person) ? "fill-eco-mio-yellow-400" : "fill-white"}
        >
          {note.text}
        </text>
      ) : null}

      <line x1={DIVIDER.x1} x2={DIVIDER.x2} y1={DIVIDER.y} y2={DIVIDER.y} strokeWidth={4} className="stroke-white/10" />
      <text x={TOTAL.x} y={TOTAL.y} fontWeight={700} className="fill-white">
        <tspan fontSize={TOTAL.fontSize} letterSpacing={-2}>{total.value}</tspan>
        <tspan fontSize={TOTAL.unitFontSize} fontWeight={600} dx={20}>{total.unit}</tspan>
      </text>
    </svg>
  );
}
