//@ts-nocheck
import { findTitleComponent } from "./utils";

function buildElementSubtitle(name, parent) {
  const subTitleComp = findTitleComponent("xl", "regular", "primary");
  subTitleComp.name = `${parent.name}_subtitle`;

  //position & alignment
  subTitleComp.resize(720, 300);
  subTitleComp.counterAxisSizingMode = "AUTO";

  //inside text alignment
  const textBlock = subTitleComp.children[0];
  textBlock.layoutGrow = 1;
  textBlock.textAutoResize = "HEIGHT";
  textBlock.characters = name;
  parent.appendChild(subTitleComp);
}

export default buildElementSubtitle;
