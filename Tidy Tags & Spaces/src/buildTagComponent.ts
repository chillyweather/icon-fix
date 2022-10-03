//@ts-nocheck
import {
  dsSpacingMarker,
  dsBlack,
  dsBlue,
  dsBlueGray,
  dsWhite,
} from "./colorStyles";

function addTextProperty(component, textNode, propName, propDefault) {
  component.addComponentProperty(`${propName}`, "TEXT", `${propDefault}`);
  const objName = Object.keys(component.componentPropertyDefinitions)[0];
  textNode.componentPropertyReferences = { characters: `${objName}` };
}

function addText(letterText) {
  const letter = figma.createText();
  letter.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 1,
        g: 1,
        b: 1,
      },
    },
  ];
  letter.fontSize = 14;
  letter.fontName = {
    family: "Inter",
    style: "Semi Bold",
  };
  letter.textCase = "UPPER";
  letter.characters = letterText;
  letter.textAlignHorizontal = "CENTER";
  letter.textAlignVertical = "CENTER";
  letter.lineHeight = {
    unit: "PERCENT",
    value: 2.9999999329447746,
  };
  return letter;
}

function createEllipse(textNode) {
  const ellipse = figma.createFrame();
  ellipse.bottomLeftRadius = 50;
  ellipse.bottomRightRadius = 50;
  ellipse.topRightRadius = 50;
  ellipse.topLeftRadius = 50;
  ellipse.fillStyleId = dsSpacingMarker.id;
  ellipse.appendChild(textNode);
  ellipse.layoutPositioning = "AUTO";
  ellipse.layoutMode = "VERTICAL";
  ellipse.resize(24, 24);
  ellipse.primaryAxisAlignItems = "CENTER";
  ellipse.counterAxisAlignItems = "CENTER";
  ellipse.name = "index";
  return ellipse;
}

function createLineBox() {
  const line = figma.createLine();
  line.strokeStyleId = dsSpacingMarker.id;
  const lineBox = figma.createFrame();
  lineBox.appendChild(line);
  lineBox.layoutPositioning = "AUTO";
  lineBox.layoutMode = "VERTICAL";
  lineBox.counterAxisAlignItems = "CENTER";
  lineBox.counterAxisSizingMode = "FIXED";
  lineBox.resize(24, 82);
  lineBox.layoutGrow = 1;
  lineBox.fills = [];
  line.rotation = 90;
  line.layoutGrow = 1;
  return lineBox;
}

function buildLabelText(label) {
  const labelText = figma.createText();
  labelText.fillStyleId = dsBlack.id;
  labelText.fontSize = 14;
  labelText.fontName = {
    family: "Inter",
    style: "Medium",
  };
  labelText.characters = label;
  return labelText;
}

function buildTag(letter, type, label) {
  const index = addText(`${letter}`);
  const ellipse = createEllipse(index);
  const tag = figma.createComponent();
  tag.layoutPositioning = "AUTO";
  if (type === "bottom") {
    const lineBox = createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "VERTICAL";
    tag.appendChild(ellipse);
    tag.appendChild(lineBox);
    tag.resize(24, 32);
    addTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "top") {
    const lineBox = createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "VERTICAL";
    tag.appendChild(lineBox);
    tag.appendChild(ellipse);
    tag.resize(24, 32);
    addTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "left") {
    const lineBox = createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(lineBox);
    tag.appendChild(ellipse);
    lineBox.rotation = 90;
    lineBox.layoutAlign = "STRETCH";
    tag.resize(32, 24);
    addTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "right") {
    const lineBox = createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(ellipse);
    tag.appendChild(lineBox);
    lineBox.rotation = 90;
    lineBox.layoutAlign = "STRETCH";
    tag.resize(32, 24);
    addTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "index") {
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(ellipse);
    tag.resize(24, 24);
    addTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "text" || type === "important" || type === "info") {
    const text = buildLabelText(label);
    const linkText = buildLabelText(label);
    linkText.fillStyleId = dsBlueGray.id;
    linkText.textDecoration = "UNDERLINE";
    linkText.name = "link";
    tag.resize(24, 24);
    tag.counterAxisSizingMode = "AUTO";
    tag.counterAxisAlignItems = "CENTER";
    tag.itemSpacing = 8;
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(ellipse);
    tag.appendChild(text);
    tag.appendChild(linkText);
    text.textCase = "TITLE";
    if (type === "important") {
      ellipse.fillStyleId = dsBlue.id;
    }
    if (type === "info") {
      ellipse.fillStyleId = dsBlueGray.id;
      ellipse.paddingLeft = 1;
      ellipse.paddingBottom = 1;
    }
    if (type === "text") {
      addTextProperty(tag, index, "index", "A");
    }
    //add text properties
    addTextProperty(tag, text, "label", "Text");
    addTextProperty(tag, linkText, "link", "Text");
    return tag;
  }
}

export default function buildAllTags() {
  const toolsPage = figma.root.findChild(
    (node) => node.name === "🧨 .DO NOT TOUCH!!! - internal tools"
  );

  const tagBottomLine = buildTag("A", "bottom");
  tagBottomLine.name = "type=bottom line";
  const tagTopLine = buildTag("B", "top");
  tagTopLine.name = "type=top line";
  const tagLeftLine = buildTag("C", "left");
  tagLeftLine.name = "type=left line";
  const tagRightLine = buildTag("D", "right");
  tagRightLine.name = "type=right line";
  const tagIndex = buildTag("E", "index");
  tagIndex.name = "type=index only";
  const tagText = buildTag("F", "text", "Text");
  tagText.name = "type=text";
  const tagImportant = buildTag("!", "important", "Text");
  tagImportant.name = "type=important";
  const tagInfo = buildTag("»", "info", "Text");
  tagInfo.name = "type=info";

  const tags = [
    tagTopLine,
    tagRightLine,
    tagBottomLine,
    tagLeftLine,
    tagIndex,
    tagText,
    tagImportant,
    tagInfo,
  ];
  tags.forEach((node) => toolsPage?.appendChild(node));

  const tagComponentSet = figma.combineAsVariants(tags, toolsPage);
  tagComponentSet.name = ".DS anatomy tags";
  tagComponentSet.x = 450;
  tagComponentSet.y = 1500;
  tagComponentSet.layoutPositioning = "AUTO";
  tagComponentSet.layoutMode = "VERTICAL";
  tagComponentSet.itemSpacing = 20;
  tagComponentSet.fillStyleId = dsWhite.id;
  tagComponentSet.paddingBottom = 20;
  tagComponentSet.paddingTop = 20;
  tagComponentSet.paddingLeft = 20;
  tagComponentSet.paddingRight = 20;
  tagComponentSet.cornerRadius = 28;
  tagComponentSet.resize(372, 388);
}
