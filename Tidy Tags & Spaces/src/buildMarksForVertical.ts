//@ts-nocheck
import getMarker from "./getMarker";
import setMarkerProps from "./setMarkerProps";
import getMarkerShift from "./getMarkerShift";

function buildMarksForVertical(frame, elementsDimensions, xPos) {
  const spacings = [];
  //all inner spacings
  elementsDimensions.forEach((element, index, array) => {
    if (index < array.length - 1) {
      const space = array[index + 1][0] - array[index][1];
      if (space > 0) {
        const marker = getMarker("right");
        /////////////////
        marker.x = xPos;
        marker.y = array[index][1];
        setMarkerProps(marker, space);
        const shift = getMarkerShift(marker);
        marker.resize(frame.width + shift, space);
        marker.name = "spacing marker";
        spacings.push(marker);
      }
    }
  });
  if (spacings.length > 0) {
    const spacingGroup = figma.group(spacings, frame.parent);
    spacingGroup.name = "spacings";
  }
}

export { buildMarksForVertical };
