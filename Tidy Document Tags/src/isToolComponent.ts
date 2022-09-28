//@ts-nocheck

export default function isToolComp(name) {
  const toolsPage = figma.root.findChild(
    (node) => node.name === "🧨 .DO NOT TOUCH!!! - internal tools"
  );
  const spacingComp = toolsPage.findOne((node) => node.name === `${name}`);
  //   return spacingComp ? true : false;
  return spacingComp;
}
