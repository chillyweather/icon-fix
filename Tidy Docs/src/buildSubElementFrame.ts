//@ts-nocheck
import { dsPrimaryColor } from "./colorStyles";
import findCurrentY from "./findCurrentY";

function buildSubElementFrame(name, subname, parent, position) {
  const isContentFrame = parent.children.some(
    (node) => node.name === `${name}_${subname}`
  );
  if (!isContentFrame && subname) {
    const contentFrame = figma.createFrame();
    contentFrame.resize(2800, 300);
    parent.appendChild(contentFrame);
    contentFrame.x = 0;
    contentFrame.y = position;
    contentFrame.name = `${name}_${subname}`;
    contentFrame.layoutPositioning = "AUTO";
    contentFrame.layoutMode = "HORIZONTAL";
    contentFrame.primaryAxisSizingMode = "FIXED";
    contentFrame.counterAxisSizingMode = "AUTO";
    contentFrame.paddingBottom = 100;
    contentFrame.paddingTop = 100;
    contentFrame.strokeBottomWeight = 2;
    contentFrame.strokeStyleId = dsPrimaryColor.id;
    return contentFrame;
  } else {
    figma.notify(
      "Frame with this name already exists. Please, change text in 'Sub-Element / Type / State' field"
    );
    return null;
  }
}

export default buildSubElementFrame;
