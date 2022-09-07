//@ts-nocheck

function buildInfoFrame(parent) {
  if (!parent) {
    return;
  }
  const isInfoFrame = parent.children.some(
    (node) => node.name === `${parent.name}_info`
  );
  if (!isInfoFrame) {
    const infoFrame = figma.createFrame();
    infoFrame.resize(750, 300);
    parent.appendChild(infoFrame);
    infoFrame.x = 0;
    infoFrame.y = 0;
    infoFrame.name = `${parent.name}_info`;
    infoFrame.layoutPositioning = "AUTO";
    infoFrame.layoutMode = "VERTICAL";
    infoFrame.primaryAxisSizingMode = "AUTO";
    infoFrame.counterAxisSizingMode = "FIXED";
    infoFrame.itemSpacing = 20;
    return infoFrame;
  }
}

export default buildInfoFrame;
