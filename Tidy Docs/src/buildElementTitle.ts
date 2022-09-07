//@ts-nocheck
import { findTitleComponent } from "./utils";

function buildElementTitle(name, parent) {
  const isElementTitle = parent.children.some(
    (node) => node.name === `${name}_title`
  );
  if (!isElementTitle) {
    const titleComp = findTitleComponent("xl", "bold", "primary");
    titleComp.paddingTop = 150;
    titleComp.paddingBottom = 20;
    titleComp.name = `${name}_title`;
    titleComp.children[0].characters = name;
    parent.insertChild(0, titleComp);
  }
}

export default buildElementTitle;
