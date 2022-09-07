//@ts-nocheck

function findCurrentY(frame) {
  let currentY = 0;
  frame.children.forEach((node) => {
    const nodeMaxY = node.y + node.height;
    if (nodeMaxY > currentY) {
      currentY = nodeMaxY;
    }
  });
  return currentY;
}

export default findCurrentY;
