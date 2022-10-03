//@ts-nocheck
export default function getMarkerShift(marker: InstanceNode) {
  const markerText = marker.findOne((node) => node.type === "TEXT");
  const difference = 16 - markerText.width;
  return 56 - difference;
}
