//@ts-nocheck

const frame = figma.currentPage.selection[0];

const elementsCoordinatesAndDimensionsX = [];
const elementsCoordinatesAndDimensionsY = [];

const frameY = frame ? frame.absoluteRenderBounds.y : 0;
const frameX = frame ? frame.absoluteRenderBounds.x : 0;

function researchNodesX(frame) {
  if (frame) {
    frame.children.forEach((node) => {
      if (node.visible === true) {
        if (
          !node.children ||
          node.children.length === 0 ||
          node.type === "INSTANCE"
        ) {
          /////
          if (
            node.absoluteRenderBounds &&
            node.absoluteRenderBounds.width > 0.01
          ) {
            elementsCoordinatesAndDimensionsX.push([
              node.absoluteRenderBounds.x,
              node.absoluteRenderBounds.x + node.absoluteRenderBounds.width,
              node.absoluteRenderBounds.width,
            ]);
          }
        } else {
          researchNodesX(node);
        }
      }
    });
  }
}

function researchNodesY(frame) {
  if (frame) {
    frame.children.forEach((node) => {
      if (node.visible === true) {
        if (
          !node.children ||
          node.children.length === 0 ||
          node.type === "INSTANCE"
        ) {
          if (
            node.absoluteRenderBounds &&
            node.absoluteRenderBounds.height > 0.01
          ) {
            elementsCoordinatesAndDimensionsY.push([
              node.absoluteRenderBounds.y,
              node.absoluteRenderBounds.y + node.absoluteRenderBounds.height,
              node.absoluteRenderBounds.height,
            ]);
          }
        } else {
          researchNodesY(node);
        }
      }
    });
  }
}
//
researchNodesX(frame);
researchNodesY(frame);

export {
  frame,
  elementsCoordinatesAndDimensionsX,
  elementsCoordinatesAndDimensionsY,
  frameY,
  frameX,
};
