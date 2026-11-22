// The ring of text around the homepage logo, as Zdog shapes so it can tilt
// round the logo in 3D. Geometry comes from layoutRing, the same packing the
// SVG textPath version used; here the label widths are known exactly because
// the letters are our own glyphs.

import Zdog from "zdog";
import { glyphPath, GLYPHS, TRACKING, wordWidth } from "./glyphs";
import { layoutRing, type RingLayout } from "../logoRing.layout";

export interface RingOptions {
  labels: string[];
  capHeight: number;
  /** Line width of the letters. */
  weight: number;
  dot: number;
  gap: number;
  logoGap: number;
}

export function measureRing(options: RingOptions): RingLayout {
  return layoutRing({
    labelWidths: options.labels.map((l) => wordWidth(l) * options.capHeight),
    dot: options.dot,
    gap: options.gap,
    logoGap: options.logoGap,
    textHeight: options.capHeight,
  });
}

export interface RingModel {
  /** Spin this about z to turn the text round the ring. */
  anchor: Zdog.Anchor;
  setColors(colors: { text: string; dot: string }): void;
}

export function addRing(
  addTo: Zdog.Anchor,
  options: RingOptions,
  layout: RingLayout,
): RingModel {
  const { labels, capHeight, weight, dot } = options;
  const { r, size } = layout;
  const anchor = new Zdog.Anchor({ addTo });

  // Arc length s is measured clockwise from 9 o'clock, as in layoutRing.
  const at = (s: number) => {
    const theta = s / r;
    return { x: -r * Math.cos(theta), y: -r * Math.sin(theta), theta };
  };

  const letters: Zdog.Shape[] = [];
  labels.forEach((label, i) => {
    const width = wordWidth(label) * capHeight;
    let s = layout.labelOffsets[i] - width / 2;
    [...label].forEach((char) => {
      const w = GLYPHS[char.toUpperCase()].width * capHeight;
      const { x, y, theta } = at(s + w / 2);
      // Turn each letter so its top faces out from the centre.
      const letter = new Zdog.Anchor({
        addTo: anchor,
        translate: { x, y },
        rotate: { z: theta - Math.PI / 2 },
      });
      letters.push(
        new Zdog.Shape({
          addTo: letter,
          path: glyphPath(char, capHeight),
          closed: false,
          stroke: weight,
        }),
      );
      s += w + TRACKING * capHeight;
    });
  });

  // layoutRing places dots in its size × size box; recentre them.
  const c = size / 2;
  const dots = layout.dots.map(
    (d) =>
      new Zdog.Shape({
        addTo: anchor,
        translate: { x: d.x - c, y: d.y - c },
        stroke: dot,
      }),
  );

  return {
    anchor,
    setColors({ text, dot }) {
      letters.forEach((l) => (l.color = text));
      dots.forEach((d) => (d.color = dot));
    },
  };
}
