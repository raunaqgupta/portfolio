// Geometry for the ring of text around the homepage logo.
//
// Items (labels and dots) are packed end to end around the circle with a fixed
// gap between each, so the circumference is exactly
//   sum(item widths) + items × gap
// and the radius follows from that. All units are CSS pixels.

export interface RingInput {
  /** Rendered width of each label, in order. */
  labelWidths: number[];
  /** Diameter of each separator dot. */
  dot: number;
  /** Space between every label and dot. */
  gap: number;
  /** Space between the text and the logo. */
  logoGap: number;
  /** Height of the label text (cap height), used to size the logo. */
  textHeight: number;
}

export interface RingLayout {
  /** Width/height of the square the ring is drawn in. */
  size: number;
  /** Radius of the text baseline circle. */
  r: number;
  /** Diameter of the logo inside the ring. */
  logo: number;
  /** Circle path traced twice, starting at 9 o'clock, clockwise. */
  path: string;
  /** startOffset (px along the path) for the centre of each label. */
  labelOffsets: number[];
  /** Centre of each dot; dot i follows label i. */
  dots: { x: number; y: number }[];
}

export function layoutRing({
  labelWidths,
  dot,
  gap,
  logoGap,
  textHeight,
}: RingInput): RingLayout {
  const count = labelWidths.length;
  const circumference =
    labelWidths.reduce((sum, w) => sum + w, 0) + count * dot + 2 * count * gap;
  const r = circumference / (2 * Math.PI);

  // The ring's outer edge is the top of the text; the logo's edge sits logoGap
  // inside the bottom of the text.
  const outer = r + textHeight / 2;
  const size = Math.ceil(2 * outer);
  const c = size / 2;
  const logo = 2 * (r - textHeight / 2 - logoGap);

  const arc = `a${r},${r} 0 1,1 ${2 * r},0 a${r},${r} 0 1,1 ${-2 * r},0`;
  const path = `M${c - r},${c} ${arc} ${arc}`;

  // Walk clockwise from 9 o'clock. The first label is centred at 1/8 turn
  // (upper left). Positions are measured on the path's second lap so a label
  // centred near the start is never clipped.
  const labelOffsets: number[] = [];
  const dots: { x: number; y: number }[] = [];
  let s = circumference / 8 - labelWidths[0] / 2;
  labelWidths.forEach((w) => {
    labelOffsets.push(circumference + ((s + w / 2) % circumference));
    s += w + gap;
    const theta = (s + dot / 2) / r;
    dots.push({ x: c - r * Math.cos(theta), y: c - r * Math.sin(theta) });
    s += dot + gap;
  });

  return { size, r, logo, path, labelOffsets, dots };
}
