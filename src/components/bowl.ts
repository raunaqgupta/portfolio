// The concave "bowl" warp shared by the grid background and the cards that
// scroll over it. A point moves away from the viewport's centre in
// proportion to the square of its distance from it, so things shrink at the
// centre and stretch towards the edges.

/** How much a point at (x, y) is scaled away from the centre of a
 *  width × height area. 1 at the centre, 1 + curve at the corners. */
export function bowlScale(
  x: number,
  y: number,
  width: number,
  height: number,
  curve: number,
) {
  const cx = width / 2;
  const cy = height / 2;
  const dx = x - cx;
  const dy = y - cy;
  return 1 + (curve * (dx * dx + dy * dy)) / (cx * cx + cy * cy);
}
