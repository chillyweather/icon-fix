//@ts-nocheck

function checkSelection(selection) {
  if (selection.length === 0) {
    figma.notify("select something!");
    figma.closePlugin();
    return;
  }
}

// if (figma.currentPage.selection === 0) {
// }
checkSelection(figma.currentPage.selection);

import buildAllTags from "./buildTagComponent";
import { isToolComp, setProps } from "./utils";
import { findAllInstances, buildIndexesFrame } from "./pluginUtils";

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
          node.masterComponent.parent
            ? node.masterComponent.parent.id
            : figma.currentPage.id,
        ]);
      } else if (node.children) {
        findAllInstances(node);
      }
    }
  });
  // return array;
}

function newABC(string, start) {
  const startIndex = string.indexOf(start.toLowerCase());
  const newString = string.slice(startIndex);
  return newString;
}

function getTagInstance(tagDirection, tagComp) {
  if (tagDirection === "right") {
    const tag = tagComp
      .findOne((node) => node.name === "type=left line")
      .createInstance();
    return tag;
  } else {
    const tag = tagComp
      .findOne((node) => node.name === "type=bottom line")
      .createInstance();
    return tag;
  }
}

function addLink(component, link) {
  const linkText = component.findOne(
    (node) => node.name === "link" && node.type === "TEXT"
  );
  linkText.hyperlink = { type: "NODE", value: link };
}

function buildTags(frame, start, tagDirection) {
  const abc = "abcdefghijklmnopqrstuvwxyz0123456789";

  const stringOfIndexes = newABC(abc, start);

  const tagComp = isToolComp(".DS anatomy tags");
  if (!tagComp) {
    buildAllTags();
  }

  elementsCoordinatesAndDimensions.length = 0;

  findAllInstances(frame);

  const indexes = buildIndexesFrame(frame);

  elementsCoordinatesAndDimensions.forEach((element, index) => {
    const tag = getTagInstance(tagDirection, tagComp);
    const indexWithLabel = tagComp
      .findOne((node) => node.name === "type=text")
      .createInstance();

    figma.currentPage.appendChild(tag);
    debugger;
    if (tagDirection === "right") {
      tag.resize(120, 24);
      tag.y = element[1] + element[3] / 2 - 12;
      tag.x = element[0] + element[2] + 4;
    } else {
      const tagHeight =
        Math.abs(frame.absoluteRenderBounds.y - element[1]) + 120;
      tag.resize(24, tagHeight);
      tag.y = frame.absoluteRenderBounds.y - 120;
      tag.x = element[0] + element[2] / 2 - 12;
    }

    addLink(indexWithLabel, element[5]);

    indexes.appendChild(indexWithLabel);

    setProps(tag, "index", `${stringOfIndexes[index]}`);
    setProps(indexWithLabel, "index", `${stringOfIndexes[index]}`);
    setProps(indexWithLabel, "label", `${element[4]}`);
    setProps(indexWithLabel, "link", `see documentation`);
  });
}

export default buildTags;
