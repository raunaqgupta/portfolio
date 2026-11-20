// Geometry for the nav around the homepage signature.
//
// The text runs along a rounded rectangle around the signature's bounding box,
// logoGap plus half the text height outside it. Links and dots are spread
// evenly along it, with the same gap between every item.
// All units are CSS pixels.

export interface RingInput {
  /** Rendered width of each link label, in order. */
  labelWidths: number[];
  /** Diameter of each separator dot. */
  dot: number;
  /** Smallest space allowed between a link and a dot. */
  gap: number;
  /** Space between the text and the signature. */
  logoGap: number;
  /** Height of the label text (cap height). */
  textHeight: number;
  /** Width of the signature. */
  logoWidth: number;
  /** Height of the signature. */
  logoHeight: number;
}

export interface RingLayout {
  /** Width and height of the box the ring is drawn in. */
  width: number;
  height: number;
  /** Width of the signature inside the ring (it grows if the labels need room). */
  logoWidth: number;
  /** Length of one lap of the path. */
  perimeter: number;
  /** Rounded-rectangle path traced twice, starting at 9 o'clock, clockwise. */
  path: string;
  /** Distance along one lap to the centre of each label, before rotation. */
  labelPositions: number[];
  /** Distance along one lap to the centre of each dot; dot i follows label i. */
  dotPositions: number[];
  /** Point on the path at a distance along it (any value, wraps). */
  pointAt: (s: number) => { x: number; y: number };
}

type Point = { x: number; y: number };
interface Segment {
  length: number;
  /** Point at fraction f (0–1) of the segment. */
  at: (f: number) => Point;
}

/**
 * Rounded rectangle with corner radius r for the text centreline, drawn
 * clockwise on screen from the middle of the left side, like the SVG path.
 */
function roundedRect(x0: number, y0: number, x1: number, y1: number, r: number) {
  const cy = (y0 + y1) / 2;
  const line = (a: Point, b: Point): Segment => ({
    length: Math.hypot(b.x - a.x, b.y - a.y),
    at: (f) => ({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f }),
  });
  // Quarter turn around (cx, cy) starting at angle `from` (radians, screen
  // coordinates, so increasing angle is clockwise).
  const corner = (cx: number, cy: number, from: number): Segment => ({
    length: (Math.PI / 2) * r,
    at: (f) => {
      const a = from + (Math.PI / 2) * f;
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    },
  });
  const segments: Segment[] = [
    line({ x: x0, y: cy }, { x: x0, y: y0 + r }),
    corner(x0 + r, y0 + r, Math.PI),
    line({ x: x0 + r, y: y0 }, { x: x1 - r, y: y0 }),
    corner(x1 - r, y0 + r, -Math.PI / 2),
    line({ x: x1, y: y0 + r }, { x: x1, y: y1 - r }),
    corner(x1 - r, y1 - r, 0),
    line({ x: x1 - r, y: y1 }, { x: x0 + r, y: y1 }),
    corner(x0 + r, y1 - r, Math.PI / 2),
    line({ x: x0, y: y1 - r }, { x: x0, y: cy }),
  ];
  const perimeter = segments.reduce((sum, seg) => sum + seg.length, 0);

  const pointAt = (s: number) => {
    let d = ((s % perimeter) + perimeter) % perimeter;
    for (const seg of segments) {
      if (d <= seg.length) return seg.at(seg.length ? d / seg.length : 0);
      d -= seg.length;
    }
    return segments[0].at(0);
  };

  const lap =
    `V${y0 + r} A${r},${r} 0 0,1 ${x0 + r},${y0} H${x1 - r} ` +
    `A${r},${r} 0 0,1 ${x1},${y0 + r} V${y1 - r} ` +
    `A${r},${r} 0 0,1 ${x1 - r},${y1} H${x0 + r} ` +
    `A${r},${r} 0 0,1 ${x0},${y1 - r} V${cy}`;
  const path = `M${x0},${cy} ${lap} ${lap}`;

  return { perimeter, pointAt, path };
}

export function layoutRing({
  labelWidths,
  dot,
  gap,
  logoGap,
  textHeight,
  logoWidth,
  logoHeight,
}: RingInput): RingLayout {
  const count = labelWidths.length;
  const labels = labelWidths.reduce((sum, w) => sum + w, 0);
  const needed = labels + count * dot + 2 * count * gap;

  // The text centreline sits `inset` outside the signature's box. Corners are
  // a little rounder than the inset so labels turn them smoothly; the corners
  // of the box itself are empty in the artwork, so this never clips the ink.
  const inset = logoGap + textHeight / 2;
  const radius = inset * 1.5;
  const outer = inset + textHeight / 2;

  // Grow the signature (keeping its aspect ratio) until the labels fit at the
  // minimum gap. With normal labels this does not kick in.
  let scale = 1;
  let shape = roundedRect(0, 0, 1, 1, 0);
  let width = 0;
  let height = 0;
  for (let i = 0; i < 20; i++) {
    width = Math.ceil(logoWidth * scale + 2 * outer);
    height = Math.ceil(logoHeight * scale + 2 * outer);
    const pad = textHeight / 2;
    shape = roundedRect(pad, pad, width - pad, height - pad, radius);
    if (shape.perimeter >= needed) break;
    scale *= 1.1;
  }
  const { perimeter, pointAt, path } = shape;

  // Spread the slack evenly: every label and dot has the same space between.
  const space = (perimeter - labels - count * dot) / (2 * count);

  // Walk clockwise from 9 o'clock. The first label is centred at 1/8 of the
  // way round (upper left).
  const labelPositions: number[] = [];
  const dotPositions: number[] = [];
  let s = perimeter / 8 - labelWidths[0] / 2;
  labelWidths.forEach((w) => {
    labelPositions.push(s + w / 2);
    s += w + space;
    dotPositions.push(s + dot / 2);
    s += dot + space;
  });

  return {
    width,
    height,
    logoWidth: logoWidth * scale,
    perimeter,
    path,
    labelPositions,
    dotPositions,
    pointAt,
  };
}

/** startOffset for a label centred at s: kept on the path's second lap so a
 *  label near the seam is never clipped. */
export function labelOffset(s: number, perimeter: number) {
  return perimeter + (((s % perimeter) + perimeter) % perimeter);
}
