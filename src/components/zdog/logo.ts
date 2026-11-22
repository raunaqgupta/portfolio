// The logo as a Zdog model: a sphere with the triangle and circle from
// logo.svg wrapped onto its front. The sphere is a flat disc of colour, as
// in logo.svg; only the shapes on its surface turn with the model.

import Zdog from "zdog";

// logo.svg is 263 units square with the circle filling it. These are its
// shapes in units of the circle's radius, centred on the origin, y down.
const TRIANGLE = [
  { x: -0.5238, y: -0.5238 },
  { x: 0.442, y: -0.5238 },
  { x: -0.5238, y: 0.442 },
];
const DOT = { x: 0.2643, y: 0.2633, r: 0.2598 };

/** Lift the decals just off the surface so they never sink into it. */
const LIFT = 1.002;

export interface LogoColors {
  /** The sphere. */
  sphere: string;
  /** The shapes cut into it. */
  mark: string;
}

export interface LogoModel {
  /** Rotate this to turn the shapes on the sphere. */
  surface: Zdog.Anchor;
  setColors(colors: LogoColors): void;
}

/** Put a point in the sphere's front face onto its surface. */
function onSphere(x: number, y: number, radius: number) {
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  return { x: x * radius * LIFT, y: y * radius * LIFT, z: z * radius * LIFT };
}

/** Sample the outline of a polygon so its edges curve with the sphere. */
function polygonOnSphere(points: { x: number; y: number }[], radius: number) {
  const steps = 16;
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      path.push(onSphere(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, radius));
    }
  }
  return path;
}

function circleOnSphere(radius: number) {
  const steps = 48;
  return Array.from({ length: steps }, (_, i) => {
    const a = (i / steps) * Zdog.TAU;
    return onSphere(
      DOT.x + DOT.r * Math.cos(a),
      DOT.y + DOT.r * Math.sin(a),
      radius,
    );
  });
}

export function addLogo(addTo: Zdog.Anchor, radius: number): LogoModel {
  // A Group draws its children in the order added, so the shapes always sit
  // on top of the sphere whatever their depth.
  const ball = new Zdog.Group({ addTo });
  const sphere = new Zdog.Shape({ addTo: ball, stroke: radius * 2 });

  const surface = new Zdog.Anchor({ addTo: ball });
  const marks = [
    new Zdog.Shape({
      addTo: surface,
      path: polygonOnSphere(TRIANGLE, radius),
      fill: true,
      stroke: false,
      backface: false,
    }),
    new Zdog.Shape({
      addTo: surface,
      path: circleOnSphere(radius),
      fill: true,
      stroke: false,
      backface: false,
    }),
  ];

  return {
    surface,
    setColors({ sphere: color, mark }) {
      sphere.color = color;
      marks.forEach((m) => (m.color = mark));
    },
  };
}

/** The logo's colours from the site's theme variables. */
export function themeColors(el: Element): LogoColors {
  const style = getComputedStyle(el);
  return {
    sphere: style.getPropertyValue("--color-bg-invert").trim() || "#1e2227",
    mark: style.getPropertyValue("--color-bg").trim() || "#fcfcfc",
  };
}

/** Run a callback when the colour scheme changes. */
export function onSchemeChange(callback: () => void) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", callback);
}
