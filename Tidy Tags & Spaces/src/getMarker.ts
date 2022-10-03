//@ts-nocheck

function getMarker(markerPosition) {
  const page = figma.currentPage;
  const toolsPage = figma.root.findChild(
    (node) => node.name === "🧨 .DO NOT TOUCH!!! - internal tools"
  );
  const spacingSet = toolsPage.findOne(
    (node) => node.name === ".DS anatomy spacing"
  );
  const spacing = spacingSet
    .findOne((node) => node.name === `position=${markerPosition}`)
    .createInstance();
  page.appendChild(spacing);
  return spacing;
}

export default getMarker;
