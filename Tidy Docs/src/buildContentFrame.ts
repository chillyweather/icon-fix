//@ts-nocheck

function buildContentFrame(parent) {
  if (!parent) {
    return;
  }
  const isContentFrame = parent.children.some(
    (node) => node.name === `${parent.name}_content`
  );
  if (!isContentFrame) {
    const contentFrame = figma.createFrame();
    contentFrame.resize(2050, 300);
    parent.appendChild(contentFrame);
    contentFrame.x = 0;
    contentFrame.y = 0;
    contentFrame.name = `${parent.name}_content`;
    contentFrame.layoutPositioning = "AUTO";
    contentFrame.layoutMode = "VERTICAL";
    contentFrame.layoutGrow = 1;
    contentFrame.paddingLeft = 50;
    contentFrame.itemSpacing = 100;
    return contentFrame;
  }
}

export default buildContentFrame;
