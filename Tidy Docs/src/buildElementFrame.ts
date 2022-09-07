//@ts-nocheck
import { dsPrimaryColor } from "./colorStyles";

function buildElementFrame(name, parent, position) {
  const isElementFrame = parent.children.some((node) => node.name === name);
  if (!isElementFrame) {
    const elementFrame = figma.createFrame();
    elementFrame.resize(2800, 300);
    parent.appendChild(elementFrame);
    elementFrame.x = 100;
    elementFrame.y = position;
    elementFrame.name = name;
    elementFrame.layoutPositioning = "AUTO";
    elementFrame.layoutMode = "VERTICAL";
    elementFrame.primaryAxisSizingMode = "AUTO";
    elementFrame.counterAxisSizingMode = "FIXED";

    elementFrame.strokeBottomWeight = 5;
    elementFrame.strokeStyleId = dsPrimaryColor.id;
    return elementFrame;
  }
}

export default buildElementFrame;
