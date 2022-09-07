//@ts-nocheck

function buildDocumentContentFrame(parent) {
  const isDocumentContentFrame = parent.children.some(
    (node) => node.name === "documentContentFrame"
  );
  if (!isDocumentContentFrame) {
    const documentContentFrame = figma.createFrame();
    documentContentFrame.resize(3000, 300);
    parent.appendChild(documentContentFrame);
    documentContentFrame.x = 0;
    documentContentFrame.y = 200;
    documentContentFrame.name = "documentContentFrame";
    documentContentFrame.layoutPositioning = "AUTO";
    documentContentFrame.layoutMode = "VERTICAL";
    documentContentFrame.primaryAxisSizingMode = "AUTO";
    documentContentFrame.counterAxisSizingMode = "FIXED";
    documentContentFrame.counterAxisAlignItems = "CENTER";

    return documentContentFrame;
  }
}

export default buildDocumentContentFrame;
