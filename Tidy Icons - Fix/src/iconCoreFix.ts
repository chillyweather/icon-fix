import { vectorToOutline } from "./vectorToOutline";
import { dsPrimaryColor } from "./colorStyles";

export function iconCoreFix(node, size = 16) {
  const vectorObj = node.findAllWithCriteria({
    types: [
      "VECTOR",
      "ELLIPSE",
      "POLYGON",
      "RECTANGLE",
      "STAR",
      "TEXT",
      "BOOLEAN_OPERATION",
    ],
  });

  vectorObj.forEach((vector) => {
    if (vector.strokes.length === 0 && vector.fills.length === 0) {
      vector.remove();
    } else {
      vectorToOutline(vector);
    }
  });

  node.name = node.name.toLowerCase();
  const flatVector = figma.flatten(node.children);
  node.children[0].name = "ic";
  node.children[0].fillStyleId = dsPrimaryColor.id;
  flatVector.constraints = {
    horizontal: "SCALE",
    vertical: "SCALE",
  };
  node.resize(size, size);
}
