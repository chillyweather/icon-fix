export function vectorToOutline(vector) {
  if (vector.strokes.length > 0 && vector.strokeWeight !== 0) {
    const parent = vector.parent;
    const outlinedStroke = vector.outlineStroke();
    parent.appendChild(outlinedStroke);
    vector.remove();
  }
}
