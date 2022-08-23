import { detachInstance } from "./detachInstance";
import { iconCoreFix } from "./iconCoreFix";

function iconizeOne(node, size) {
  let icon = detachInstance(node[0]);

  iconCoreFix(icon, size);
}

function iconizeGroup(group, size) {
  for (const node of group) {
    const icon = detachInstance(node);
    iconCoreFix(icon, size);
  }
}

function chooseIconizeType(node, size) {
  if (node[0] === undefined) {
    figma.notify("please, select an icon, uncertainity upsets me!");
    figma.closePlugin();
    return;
  }

  if (node.length > 1) {
    iconizeGroup(node, size);
    return;
  }

  iconizeOne(node, size);
  return;
}

export { iconizeOne, iconizeGroup, chooseIconizeType };
