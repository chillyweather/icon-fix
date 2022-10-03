//@ts-nocheck
import getMarker from "./getMarker";
import setMarkerProps from "./setMarkerProps";

function buildMarksForHorizontal(frame, elementsDimensions, yPos) {
  const spacings = [];
  //all inner spacings
  elementsDimensions.forEach((element, index, array) => {
    if (index < array.length - 1) {
      const space = array[index + 1][0] - array[index][1];
      if (space > 0) {
        const marker = getMarker("top");
        marker.resize(space, frame.height + 56);
        marker.x = array[index][1];
        marker.y = yPos - 56;
        setMarkerProps(marker, space);
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

export { buildMarksForHorizontal };
