//@ts-nocheck

function setTitleStyle(size, weight, color) {
  return {
    size: size,
    font: weight,
    color: color,
  };
}

export function findTitleComponent(size, weight, color) {
  const toolsPage = figma.root.findChild(
    (child) => child.name === "🧨 .DO NOT TOUCH!!! - internal tools"
  );

  const iconLabel = toolsPage.findChild(
    (node) => node.name === ".DS-title" && node.type === "COMPONENT_SET"
  );

  if (iconLabel) {
    const subtitle = iconLabel.children[0].createInstance();
    subtitle.setProperties(setTitleStyle(size, weight, color));
    return subtitle;
  } else {
    figma.notify(
      'to use this plugin, please, add "🧨 .DO NOT TOUCH!!! - internal tools" page to this project'
    );
    figma.closePlugin();
    return;
  }
}
