//@ts-nocheck
import { findTitleComponent } from "./utils";

function buildElementDescription(name, parent) {
  const descriptionComp = findTitleComponent("l", "regular", "primary");
  descriptionComp.name = `${parent.name}_description`;

  //position & alignment
  descriptionComp.resize(720, 300);
  descriptionComp.counterAxisSizingMode = "AUTO";

  //inside text alignment
  const textBlock = descriptionComp.children[0];
  textBlock.layoutGrow = 1;
  textBlock.textAutoResize = "HEIGHT";
  textBlock.layoutPositioning = "AUTO";

  textBlock.characters = name;
  parent.appendChild(descriptionComp);
}

export default buildElementDescription;
