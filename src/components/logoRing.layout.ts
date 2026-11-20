// Geometry for the oval nav around the homepage signature.
//
// The text runs along an ellipse whose shape comes from the signature: the
// smallest ellipse that holds the signature's bounding box (semi-axes w/√2 and
// h/√2), grown outwards by logoGap plus half the text height. Links and dots
// are then spread evenly along it, with the same gap between every item.
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
  /** Semi-axes of the text baseline ellipse. */
  rx: number;
  ry: number;
  /** Width of the signature inside the ring (it grows if the labels need room). */
  logoWidth: number;
  /** Length of one lap of the ellipse. */
  perimeter: number;
  /** Ellipse path traced twice, starting at 9 o'clock, clockwise. */
  path: string;
  /** Distance along one lap to the centre of each label, before rotation. */
  labelPositions: number[];
  /** Distance along one lap to the centre of each dot; dot i follows label i. */
  dotPositions: number[];
  /** Point on the ellipse at a distance along the path (any value, wraps). */
  pointAt: (s: number) => { x: number; y: number };
}

const SAMPLES = 720;

/** Arc-length table for an ellipse, so items can be placed by distance. */
function ellipseSampler(cx: number, cy: number, rx: number, ry: number) {
  // Clockwise on screen from 9 o'clock, like the SVG path.
  const at = (t: number) => ({
    x: cx - rx * Math.cos(t),
    y: cy - ry * Math.sin(t),
  });
  const lengths = [0];
  let prev = at(0);
  for (let i = 1; i <= SAMPLES; i++) {
    const p = at((i / SAMPLES) * 2 * Math.PI);
    lengths.push(lengths[i - 1] + Math.hypot(p.x - prev.x, p.y - prev.y));
    prev = p;
  }
  const perimeter = lengths[SAMPLES];

  const pointAt = (s: number) => {
    const d = ((s % perimeter) + perimeter) % perimeter;
    let lo = 0;
    let hi = SAMPLES;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (lengths[mid] <= d) lo = mid;
      else hi = mid;
    }
    const f = (d - lengths[lo]) / (lengths[hi] - lengths[lo] || 1);
    return at(((lo + f) / SAMPLES) * 2 * Math.PI);
  };

  return { perimeter, pointAt };
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
  const needed =
    labelWidths.reduce((sum, w) => sum + w, 0) + count * dot + 2 * count * gap;

  // Grow the signature (keeping its aspect ratio) until the labels fit at the
  // minimum gap. With normal labels this does not kick in.
  let scale = 1;
  let rx = 0;
  let ry = 0;
  let sampler = ellipseSampler(0, 0, 1, 1);
  for (let i = 0; i < 20; i++) {
    const inset = logoGap + textHeight / 2;
    rx = (logoWidth * scale) / Math.SQRT2 + inset;
    ry = (logoHeight * scale) / Math.SQRT2 + inset;
    sampler = ellipseSampler(0, 0, rx, ry);
    if (sampler.perimeter >= needed) break;
    scale *= 1.1;
  }

  const width = Math.ceil(2 * (rx + textHeight / 2));
  const height = Math.ceil(2 * (ry + textHeight / 2));
  const cx = width / 2;
  const cy = height / 2;
  const { perimeter, pointAt } = ellipseSampler(cx, cy, rx, ry);

  const arc = `a${rx},${ry} 0 1,1 ${2 * rx},0 a${rx},${ry} 0 1,1 ${-2 * rx},0`;
  const path = `M${cx - rx},${cy} ${arc} ${arc}`;

  // Spread the slack evenly: every label and dot has the same space between.
  const used = labelWidths.reduce((sum, w) => sum + w, 0) + count * dot;
  const space = (perimeter - used) / (2 * count);

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
    rx,
    ry,
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
