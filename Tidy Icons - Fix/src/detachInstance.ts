export function detachInstance(node) {
  if (node.type === "INSTANCE") {
    return node.detachInstance();
  }
  return node;
}
