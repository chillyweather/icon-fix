import { chooseIconizeType } from "./src/iconize";

let selection = figma.currentPage.selection;

figma.parameters.on("input", ({ query, result }) => {
  result.setSuggestions(["16", "24", "32"].filter((s) => s.includes(query)));
});

figma.on("run", ({ parameters }: RunEvent) => {

  const size = parseInt(parameters.size, 10);
  chooseIconizeType(selection, size);
  figma.closePlugin();
});
