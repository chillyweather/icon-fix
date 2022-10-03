//@ts-nocheck

function getFrameMeasurements(frame) {
  const frameMeasurements = {};
  frameMeasurements.x = frame.absoluteBoundingBox.x;
  frameMeasurements.y = frame.absoluteBoundingBox.y;
  frameMeasurements.width = frame.absoluteBoundingBox.width;
  frameMeasurements.height = frame.absoluteBoundingBox.height;
  return frameMeasurements;
}

function buildIndexesFrame(frame) {
  const frameMeasurements = getFrameMeasurements(frame);
  const indexes = figma.createFrame();
  indexes.y = frameMeasurements.y + frameMeasurements.height + 64;
  indexes.x = frameMeasurements.x;
  indexes.layoutPositioning = "AUTO";
  indexes.layoutMode = "VERTICAL";
  indexes.itemSpacing = 16;
  figma.currentPage.appendChild(indexes);
  indexes.fills = [];
  indexes.counterAxisSizingMode = "AUTO";
  indexes.name = `${frame.name} - indexes`;
  return indexes;
}

export { getFrameMeasurements, buildIndexesFrame };
