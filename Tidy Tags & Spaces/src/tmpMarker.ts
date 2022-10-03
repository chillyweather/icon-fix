//@ts-nocheck

import { dsSpacingMarker, dsWhite, dsPaddingsMarker } from "./colorStyles";
const emptyFill = [
  {
    type: "SOLID",
    visible: false,
    opacity: 1,
    blendMode: "NORMAL",
    color: {
      r: 1,
      g: 1,
      b: 1,
    },
  },
];
const barColor = [
  {
    type: "SOLID",
    visible: true,
    opacity: 0.5,
    blendMode: "NORMAL",
    color: {
      r: 0.9583332538604736,
      g: 0.8181667923927307,
      b: 0.6628471612930298,
    },
  },
];

function addTextProperty(component, textNode) {
  component.addComponentProperty("text", "TEXT", `16`);
  const objName = Object.keys(component.componentPropertyDefinitions)[0];
  textNode.componentPropertyReferences = { characters: `${objName}` };
}

function createMarkerLines(position) {
  const frame = figma.createFrame();
  frame.fills = emptyFill;
  frame.strokeStyleId = dsSpacingMarker.id;
  const line = figma.createLine();
  frame.appendChild(line);
  line.strokeWeight = 1;
  line.strokeStyleId = dsSpacingMarker.id;
  if (position === "top" || position === "bottom") {
    frame.strokeLeftWeight = 1;
    frame.strokeRightWeight = 1;
    line.constraints = {
      horizontal: "STRETCH",
      vertical: "CENTER",
    };
    line.y = 50;
    frame.resize(16, 15);
  }
  if (position === "left" || position === "right") {
    frame.strokeTopWeight = 1;
    frame.strokeBottomWeight = 1;
    line.constraints = {
      horizontal: "CENTER",
      vertical: "STRETCH",
    };
    line.rotation = 90;
    frame.resize(16, 15);
    line.x = 8;
    line.y = 16;
  }
  frame.name = ".DS anatomy spacing-meter-marker";
  frame.layoutAlign = "STRETCH";
  return frame;
}

function createAnatomySpacingsText(size) {
  const meterValue = figma.createText();
  meterValue.fontSize = 14;
  meterValue.fontName = {
    family: "Inter",
    style: "Regular",
  };
  meterValue.characters = `${size}`;
  meterValue.fillStyleId = dsSpacingMarker.id;
  meterValue.name = ".DS anatomy spacing-meter-value";
  meterValue.layoutAlign = "INHERIT";
  meterValue.textAlignHorizontal = "CENTER";
  return meterValue;
}

function createAnatomySpacingsMeter(size, position) {
  const meter = figma.createFrame();
  const marker = createMarkerLines(position);
  const value = createAnatomySpacingsText(size);
  meter.resize(16, 32);
  meter.layoutPositioning = "AUTO";
  meter.itemSpacing = 0;
  meter.layoutAlign = "STRETCH";
  meter.layoutGrow = 0;
  meter.layoutMode = "VERTICAL";
  meter.counterAxisAlignItems = "CENTER";

  if (position === "top") {
    meter.appendChild(value);
    meter.appendChild(marker);
  }
  if (position === "bottom") {
    meter.appendChild(marker);
    meter.appendChild(value);
  }
  if (position === "left") {
    meter.layoutMode = "HORIZONTAL";
    meter.appendChild(value);
    meter.appendChild(marker);
    meter.resize(32, 16);
  }
  if (position === "right") {
    meter.layoutMode = "HORIZONTAL";
    meter.appendChild(marker);
    meter.appendChild(value);
  }

  meter.name = ".DS anatomy spacing-meter";
  meter.fills = emptyFill;
  meter.clipsContent = false;

  return meter;
}

function createAnatomyBar(position) {
  const bar = figma.createFrame();
  bar.name = ".DS anatomy spacing-bar";
  bar.resize(16, 88);
  bar.fills = emptyFill;

  const barMarker = figma.createFrame();
  barMarker.name = ".DS anatomy spacing-bar-marker";
  barMarker.resize(16, 16);
  const barBody = figma.createFrame();
  barBody.name = ".DS anatomy spacing-bar-body";
  barBody.resize(16, 100);

  barMarker.fillStyleId = dsSpacingMarker.id;
  barBody.fills = barColor;

  barMarker.layoutAlign = "STRETCH";
  barBody.layoutAlign = "STRETCH";
  barBody.layoutGrow = 1;

  bar.layoutPositioning = "AUTO";
  bar.itemSpacing = 0;
  bar.layoutAlign = "STRETCH";
  bar.layoutMode = "VERTICAL";
  bar.layoutGrow = 1;

  if (position === "top") {
    bar.appendChild(barMarker);
    bar.appendChild(barBody);
  }
  if (position === "bottom") {
    bar.appendChild(barBody);
    bar.appendChild(barMarker);
  }
  if (position === "left") {
    bar.appendChild(barMarker);
    bar.appendChild(barBody);
  }
  if (position === "right") {
    bar.appendChild(barBody);
    bar.appendChild(barMarker);
  }
  if (position === "left" || position === "right") {
    bar.layoutMode = "HORIZONTAL";
  }

  return bar;
}

function createAnatomySpacings(size, position) {
  const spacingMarker = figma.createComponent();

  //autolayout
  spacingMarker.layoutPositioning = "AUTO";
  spacingMarker.itemSpacing = 8;
  spacingMarker.layoutAlign = "STRETCH";

  const meter = createAnatomySpacingsMeter(size, position);
  const bar = createAnatomyBar(position);
  if (position === "top") {
    spacingMarker.name = "position=top";
    spacingMarker.appendChild(meter);
    spacingMarker.appendChild(bar);
  }
  if (position === "bottom") {
    spacingMarker.name = "position=bottom";
    spacingMarker.appendChild(bar);
    spacingMarker.appendChild(meter);
  }
  if (position === "left") {
    spacingMarker.name = "position=left";
    spacingMarker.appendChild(meter);
    spacingMarker.appendChild(bar);
  }
  if (position === "right") {
    spacingMarker.name = "position=right";
    spacingMarker.appendChild(bar);
    spacingMarker.appendChild(meter);
  }

  if (position === "top" || position === "bottom") {
    spacingMarker.layoutMode = "VERTICAL";
    spacingMarker.resize(16, 160);
  }
  if (position === "left" || position === "right") {
    spacingMarker.layoutMode = "HORIZONTAL";
    spacingMarker.resize(160, 16);
  }
  const valueText = meter.children.find((node) => node.type === "TEXT");
  addTextProperty(spacingMarker, valueText);
  return spacingMarker;
}

function addAnatomySpacingsToTools() {
  const toolsPage = figma.root.findChild(
    (node) => node.name === "🧨 .DO NOT TOUCH!!! - internal tools"
  );

  const spacingTop = createAnatomySpacings("16", "top");
  const spacingBottom = createAnatomySpacings("16", "bottom");
  const spacingLeft = createAnatomySpacings("16", "left");
  const spacingRight = createAnatomySpacings("16", "right");

  const spacings = [spacingTop, spacingBottom, spacingLeft, spacingRight];
  spacings.forEach((node) => toolsPage.appendChild(node));
  const spacingComponentSet = figma.combineAsVariants(spacings, toolsPage);

  spacingComponentSet.name = ".DS anatomy spacing";
  spacingComponentSet.x = 450;
  spacingComponentSet.y = 1320;
  spacingComponentSet.layoutPositioning = "AUTO";
  spacingComponentSet.layoutMode = "HORIZONTAL";
  spacingComponentSet.itemSpacing = 20;
  // spacingComponentSet.counterAxisAlignItems = "MIN";
  // spacingComponentSet.counterAxisSizingMode = "AUTO";
  spacingComponentSet.fillStyleId = dsWhite.id;
  spacingComponentSet.paddingBottom = 20;
  spacingComponentSet.paddingTop = 20;
  spacingComponentSet.paddingLeft = 20;
  spacingComponentSet.paddingRight = 20;
  spacingComponentSet.cornerRadius = 28;
  spacingLeft.resize(120, 16);
  spacingRight.resize(120, 16);
  return spacingComponentSet;
}

export default addAnatomySpacingsToTools;
