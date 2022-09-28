//@ts-nocheck

import buildAllTags from "./src/buildTagComponent";
import { isToolComp, setProps } from "./src/utils";

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
};

function getFrameMeasurements(frame) {
  const frameMeasurements = {};
  frameMeasurements.x = frame.absoluteBoundingBox.x;
  frameMeasurements.y = frame.absoluteBoundingBox.y;
  frameMeasurements.width = frame.absoluteBoundingBox.width;
  frameMeasurements.height = frame.absoluteBoundingBox.height;
  return frameMeasurements;
}
const elementsCoordinatesAndDimensions = [];

function findAllInstances(frame) {
  figma.skipInvisibleInstanceChildren = true;
  frame.children.forEach((node) => {
    if (node.absoluteRenderBounds && node.absoluteRenderBounds.width > 0.01) {
      if (node.type === "INSTANCE") {
        elementsCoordinatesAndDimensions.push([
          node.absoluteRenderBounds.x,
          node.absoluteRenderBounds.y,
          node.absoluteRenderBounds.width,
          node.absoluteRenderBounds.height,
          node.name,
        ]);
      } else if (node.children) {
        findAllInstances(node);
      }
    }
  });
}

function buildIndexesFrame() {
  const indexes = figma.createFrame();
  indexes.y = frameMeasurements.y + frameMeasurements.height + 50;
  indexes.x = frameMeasurements.x;
  indexes.layoutPositioning = "AUTO";
  indexes.layoutMode = "VERTICAL";
  indexes.itemSpacing = 16;
  figma.currentPage.appendChild(indexes);
  indexes.fills = [];
  indexes.counterAxisSizingMode = "AUTO";
  return indexes;
}

const abc = "abcdefghijklmnopqrstuvwxyz";

const frame = figma.currentPage.selection[0];
const frameMeasurements = getFrameMeasurements(frame);

loadFonts()
  .then(() => {
    const tagComp = isToolComp(".DS anatomy tags");
    if (!tagComp) {
      buildAllTags();
    }
    const isVertical = frame.layoutMode === "VERTICAL";

    findAllInstances(frame);
    const indexes = buildIndexesFrame();

    elementsCoordinatesAndDimensions.forEach((element, index) => {
      let tag;

      isVertical
        ? (tag = tagComp
            .findOne((node) => node.name === "type=left line") //1
            .createInstance())
        : (tag = tagComp
            .findOne((node) => node.name === "type=bottom line")
            .createInstance());
      const indexWithLabel = tagComp
        .findOne((node) => node.name === "type=text")
        .createInstance();

      figma.currentPage.appendChild(tag);

      if (isVertical) {
        tag.resize(100, 24);
        tag.y = element[1] + element[3] / 2 - 12;
        tag.x = element[0] + element[2];
      } else {
        tag.resize(24, 100);
        tag.y = element[1] - 100;
        tag.x = element[0] + element[2] / 2 - 12;
      }

      indexes.appendChild(indexWithLabel);

      setProps(tag, "index", `${abc[index]}`);
      setProps(indexWithLabel, "index", `${abc[index]}`);
      setProps(indexWithLabel, "label", `${element[4]}`);
      setProps(indexWithLabel, "link", `see documentation`);
    });
  })
  .finally(() => figma.closePlugin());
