//@ts-nocheck
import getMarker from "./getMarker";
import setMarkerProps from "./setMarkerProps";
import getMarkerShift from "./getMarkerShift";

export default function getFrameMeasurements(frame: SceneNode) {
  const leftMarker = getMarker("left");
  const bottomMarker = getMarker("bottom");
  setMarkerProps(leftMarker, frame.height);
  setMarkerProps(bottomMarker, frame.width);
  const shift = getMarkerShift(leftMarker);
  leftMarker.resize(shift, frame.height);
  leftMarker.x = frame.x - shift;
  leftMarker.y = frame.y;
  bottomMarker.resize(frame.width, 56);
  bottomMarker.x = frame.x;
  bottomMarker.y = frame.y + frame.height;
  const bottomMarkerBody = bottomMarker.findOne((node) =>
    node.name.includes("bar-body")
  );
  bottomMarkerBody.visible = false;
}
