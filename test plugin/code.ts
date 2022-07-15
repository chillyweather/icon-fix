// @ts-nocheck
//* test file for all the bullshit i think about

//& convert hex to rgb
function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const colors = {
    r: r,
    g: g,
    b: b,
  };
  console.log(colors);
  return colors;
}

//& color style creation
function createPaintStyle(name: string, hex: string) {
  const baseStyle = figma.createPaintStyle();
  baseStyle.name = name;
  // const col = { r: r, g: g, b: b };
  const paint = {
    type: "SOLID",
    color: hexToRGB(hex),
  };
  baseStyle.paints = [paint];
  return baseStyle;
}

//& check if new styles already were created earlier
function ifStyleExists(name: String) {
  const styles = figma.getLocalPaintStyles();
  return styles.some((style) => style.name === name);
}

//& find by name and return local style
function localStyle(name: String) {
  const styles = figma.getLocalPaintStyles();
  const newStyle = styles.find((style) => style.name === name);
  return newStyle;
}

//& 1. check if styles we want to create already exist in document
//& 2. if positive - apply local style
//& 3. if negative - create and apply new style
function setColorStyle(name, r, g, b) {
  return ifStyleExists(name)
    ? localStyle(name)
    : createPaintStyle(name, r, g, b);
}

//! ========= Create Status Component ========

//& load fonts
const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
};

//^ CREATE STATUS COMPONENT / 6 TYPES

function createStatusComponent() {
  const statusComponent = figma.createComponent();
  const statusText = figma.createText();
  statusComponent.appendChild(statusText);

  // component settings
  statusComponent.fillStyleId = pending.id;
  statusComponent.resize(500, 68);
  statusComponent.cornerRadius = 50;
  statusComponent.name = ".DS-status";
  statusComponent.constraints = {
    horizontal: "MIN",
    vertical: "MIN",
  };
  //* set auto layout
  statusComponent.layoutPositioning = "AUTO";
  statusComponent.layoutMode = "HORIZONTAL";
  statusComponent.counterAxisAlignItems = "CENTER";
  statusComponent.primaryAxisAlignItems = "CENTER";

  // set padding
  statusComponent.paddingRight = 40;
  statusComponent.paddingLeft = 40;
  statusComponent.paddingTop = 20;
  statusComponent.paddingBottom = 20;

  // component text settings
  statusText.fontSize = 24;
  statusText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  statusText.characters = "pending";
  statusText.textCase = "UPPER";
  statusText.fontName = {
    family: "Inter",
    style: "Bold",
  };
  return statusComponent;
}

//& temp selection

const pending = setColorStyle("ds-status/Pending", "9275FF");

loadFonts()
  .then(() => {
    createStatusComponent();
  })
  .finally(() => figma.closePlugin());
