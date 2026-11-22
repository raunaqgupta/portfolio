// A small monoline stroke font for the letters in the logo ring, drawn as Zdog
// paths so the text can live in the same 3D scene as the logo.
//
// Each glyph is drawn in a box one cap-height tall: x runs 0..width, y runs
// 0 (cap line) to 1 (baseline). Arcs are quarter ellipses, using Zdog's
// { arc: [corner, end] } command.

import type { PathCommand, VectorOptions } from "zdog";

export interface Glyph {
  /** Width of the glyph box, in cap heights. */
  width: number;
  path: PathCommand[];
}

const p = (x: number, y: number): VectorOptions => ({ x, y });
const move = (x: number, y: number) => ({ move: p(x, y) });
const arc = (cx: number, cy: number, x: number, y: number) => ({
  arc: [p(cx, cy), p(x, y)] as [VectorOptions, VectorOptions],
});

export const GLYPHS: Record<string, Glyph> = {
  A: {
    width: 0.68,
    path: [p(0, 1), p(0.34, 0), p(0.68, 1), move(0.12, 0.66), p(0.56, 0.66)],
  },
  G: {
    width: 0.7,
    path: [
      p(0.68, 0.24),
      arc(0.68, 0, 0.36, 0),
      arc(0, 0, 0, 0.5),
      arc(0, 1, 0.36, 1),
      arc(0.7, 1, 0.7, 0.62),
      p(0.7, 0.52),
      p(0.4, 0.52),
    ],
  },
  N: {
    width: 0.62,
    path: [p(0, 1), p(0, 0), p(0.62, 1), p(0.62, 0)],
  },
  P: {
    width: 0.58,
    path: [
      p(0, 1),
      p(0, 0),
      p(0.32, 0),
      arc(0.58, 0, 0.58, 0.27),
      arc(0.58, 0.54, 0.32, 0.54),
      p(0, 0.54),
    ],
  },
  Q: {
    width: 0.76,
    path: [
      p(0.38, 0),
      arc(0.76, 0, 0.76, 0.5),
      arc(0.76, 1, 0.38, 1),
      arc(0, 1, 0, 0.5),
      arc(0, 0, 0.38, 0),
      move(0.46, 0.7),
      p(0.76, 1.04),
    ],
  },
  R: {
    width: 0.6,
    path: [
      p(0, 1),
      p(0, 0),
      p(0.32, 0),
      arc(0.6, 0, 0.6, 0.26),
      arc(0.6, 0.52, 0.32, 0.52),
      p(0, 0.52),
      move(0.3, 0.52),
      p(0.6, 1),
    ],
  },
  T: {
    width: 0.62,
    path: [p(0, 0), p(0.62, 0), move(0.31, 0), p(0.31, 1)],
  },
  U: {
    width: 0.62,
    path: [
      p(0, 0),
      p(0, 0.66),
      arc(0, 1, 0.31, 1),
      arc(0.62, 1, 0.62, 0.66),
      p(0.62, 0),
    ],
  },
};

/** Space between letters, in cap heights. */
export const TRACKING = 0.32;

function glyph(char: string): Glyph {
  const g = GLYPHS[char.toUpperCase()];
  if (!g) throw new Error(`No glyph for "${char}"`);
  return g;
}

/** Width of a word set in this font, in cap heights. */
export function wordWidth(word: string): number {
  const chars = [...word];
  return (
    chars.reduce((sum, c) => sum + glyph(c).width, 0) +
    (chars.length - 1) * TRACKING
  );
}

/**
 * A glyph's path scaled to a cap height, centred on its box so it can be
 * rotated about its middle.
 */
export function glyphPath(char: string, capHeight: number): PathCommand[] {
  const { width, path } = glyph(char);
  const map = ({ x = 0, y = 0 }: VectorOptions) => ({
    x: (x - width / 2) * capHeight,
    y: (y - 0.5) * capHeight,
  });
  return path.map((cmd) => {
    if ("move" in cmd) return { move: map(cmd.move) };
    if ("arc" in cmd) return { arc: [map(cmd.arc[0]), map(cmd.arc[1])] };
    return map(cmd as VectorOptions);
  }) as PathCommand[];
}
