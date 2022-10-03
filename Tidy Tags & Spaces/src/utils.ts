//@ts-nocheck

//1. find tools component by name
//2. set component text properties

//checks if needed element exists on the Internal Tools Page
function isToolComp(name) {
  const toolsPage = figma.root.findChild(
    (node) => node.name === "🧨 .DO NOT TOUCH!!! - internal tools"
  );
  const toolComp = toolsPage.findOne((node) => node.name === `${name}`);
  return toolComp;
}

//element - component with properties
//name - property name (or part of the name)
//value - new value for property
function setProps(element, name, value) {
  const propList = element.componentProperties;
  for (const property in propList) {
    if (property.includes(`${name}`)) {
      const newProps = {};
      newProps[property] = `${value}`;
      element.setProperties(newProps);
    }
  }
}

export { isToolComp, setProps };
