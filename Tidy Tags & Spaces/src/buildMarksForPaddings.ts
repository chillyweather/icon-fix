//@ts-nocheck

import getMarkerShift from "./getMarkerShift";
import getMarker from "./getMarker";
import setMarkerProps from "./setMarkerProps";
import { dsPaddingsMarker } from "./colorStyles";

function findPaddings(frame) {
  const elementPaddings = {};
  elementPaddings.topPadding = {};
  elementPaddings.rightPadding = {};
  elementPaddings.bottomPadding = {};
  elementPaddings.leftPadding = {};

  if (frame.children) {
    const children = figma.group(frame.children, frame);

    elementPaddings.topPadding.y = frame.absoluteRenderBounds.y;
    elementPaddings.topPadding.size =
      children.absoluteRenderBounds.y - frame.absoluteRenderBounds.y;

    elementPaddings.bottomPadding.y =
      children.absoluteRenderBounds.y + children.absoluteRenderBounds.height;
    elementPaddings.bottomPadding.size =
      frame.absoluteRenderBounds.y +
      frame.absoluteRenderBounds.height -
      (children.absoluteRenderBounds.y + children.absoluteRenderBounds.height);

    elementPaddings.leftPadding.x = frame.absoluteRenderBounds.x;
    elementPaddings.leftPadding.size =
      children.absoluteRenderBounds.x - frame.absoluteRenderBounds.x;

    elementPaddings.rightPadding.x =
      children.absoluteRenderBounds.x + children.absoluteRenderBounds.width;
    elementPaddings.rightPadding.size =
      frame.absoluteRenderBounds.x +
      frame.absoluteRenderBounds.width -
      (children.absoluteRenderBounds.x + children.absoluteRenderBounds.width);
    figma.ungroup(children);
  }

  return elementPaddings;
}

function isPaddings(obj) {
  return (
    obj.topPadding.size !== 0 ||
    obj.rightPadding.size !== 0 ||
    obj.bottomPadding.size !== 0 ||
    obj.leftPadding.size !== 0
  );
}

function reColor(marker) {
  const num = marker.findOne(
    (node) => node.name === ".DS anatomy spacing-meter-value"
  );
  const vector = marker.findOne(
    (node) => node.name === ".DS anatomy spacing-meter-marker"
  );
  const line = marker.findOne((node) => node.name === "Line");
  const barMarker = marker.findOne(
    (node) => node.name === ".DS anatomy spacing-bar-marker"
  );
  const body = marker.findOne(
    (node) => node.name === ".DS anatomy spacing-bar-body"
  );

  body.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 0.5,
      blendMode: "NORMAL",
      color: {
        r: 0.9041666984558105,
        g: 0.9375,
        b: 0.6875,
      },
    },
  ];
  num.fillStyleId = dsPaddingsMarker.id;
  barMarker.fillStyleId = dsPaddingsMarker.id;
  vector.strokeStyleId = dsPaddingsMarker.id;
  line.strokeStyleId = dsPaddingsMarker.id;
}

function buildMarksForPaddings(node) {
  const elementPaddings = findPaddings(node);

  if (isPaddings(elementPaddings)) {
    if (elementPaddings.leftPadding.size > 0) {
      const leftPaddingMarker = getMarker("top");
      // const leftPaddingMarker = createSpacingMarker();
      leftPaddingMarker.x = elementPaddings.leftPadding.x;
      leftPaddingMarker.y = node.absoluteRenderBounds.y - 56;
      leftPaddingMarker.resize(
        elementPaddings.leftPadding.size,
        node.height + 56
      );
      setMarkerProps(leftPaddingMarker, elementPaddings.leftPadding.size);
      reColor(leftPaddingMarker);
      leftPaddingMarker.name = "padding-marker";
    }

    if (elementPaddings.rightPadding.size > 0) {
      const rightPaddingMarker = getMarker("top");
      rightPaddingMarker.x = elementPaddings.rightPadding.x;
      rightPaddingMarker.y = node.absoluteRenderBounds.y - 56;
      rightPaddingMarker.resize(
        elementPaddings.rightPadding.size,
        node.height + 56
      );
      setMarkerProps(rightPaddingMarker, elementPaddings.rightPadding.size);
      reColor(rightPaddingMarker);
      rightPaddingMarker.name = "padding-marker";
    }

    if (elementPaddings.topPadding.size > 0) {
      const topPaddingMarker = getMarker("right");
      topPaddingMarker.y = elementPaddings.topPadding.y;
      topPaddingMarker.x = node.absoluteRenderBounds.x;
      setMarkerProps(topPaddingMarker, elementPaddings.topPadding.size);
      const shift = getMarkerShift(topPaddingMarker);
      topPaddingMarker.resize(
        node.width + shift,
        elementPaddings.topPadding.size
      );
      reColor(topPaddingMarker);
      topPaddingMarker.name = "padding-marker";
    }

    if (elementPaddings.bottomPadding.size > 0) {
      const bottomPaddingMarker = getMarker("right");
      bottomPaddingMarker.y = elementPaddings.bottomPadding.y;
      bottomPaddingMarker.x = node.absoluteRenderBounds.x;
      setMarkerProps(bottomPaddingMarker, elementPaddings.bottomPadding.size);
      const shift = getMarkerShift(bottomPaddingMarker);
      bottomPaddingMarker.resize(
        node.width + shift,
        elementPaddings.bottomPadding.size
      );
      reColor(bottomPaddingMarker);
      bottomPaddingMarker.name = "padding-marker";
    }
  }
}

export default buildMarksForPaddings;
