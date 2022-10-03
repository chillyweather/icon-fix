//@ts-nocheck

figma.showUI(__html__);
figma.ui.resize(350, 300);

import buildTags from "./src/buildTags";
import buildSpacingMarks from "./src/buildSpacingMarks";

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
};

figma.ui.onmessage = ({ type, start, tagDirection, selectedCheckboxes }) => {
  loadFonts()
    .then(() => {
      const frame = figma.currentPage.selection[0];
      if (type === "create-spacings") {
        buildSpacingMarks(frame, selectedCheckboxes);
      }
      if (type === "create-tags") {
        buildTags(frame, start, tagDirection);
      }
    })
    .finally(() => figma.closePlugin());
};
