//@ts-nocheck

function cloneFrame(frame) {
  let newFrame = frame.clone();
  if (frame.type === "INSTANCE") {
    newFrame = newFrame.detachInstance();
  }
  const parent = figma.currentPage;
  parent.appendChild(newFrame);
  newFrame.x = frame.absoluteRenderBounds.x;
  newFrame.y = frame.absoluteRenderBounds.y;

  return newFrame;
}

export default cloneFrame;
