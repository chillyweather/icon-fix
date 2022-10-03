//@ts-nocheck
import { dsPrimaryColor } from "./colorStyles";

function createSpacingMarker() {
  const marker = figma.createFrame();
  marker.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 0.5,
      blendMode: "NORMAL",
      color: {
        r: 1,
        g: 0.843137264251709,
        b: 0.8392156958580017,
      },
    },
  ];
  return marker;
}

export default createSpacingMarker;
