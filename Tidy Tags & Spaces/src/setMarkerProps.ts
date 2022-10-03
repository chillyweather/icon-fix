//@ts-nocheck

function setMarkerProps(marker, space) {
  const rounded = Math.round(space);
  const propList = marker.componentProperties;
  for (const property in propList) {
    if (property.includes("text")) {
      const newProps = {};
      newProps[property] = `${rounded}`;
      marker.setProperties(newProps);
    }
  }
}

export default setMarkerProps;
