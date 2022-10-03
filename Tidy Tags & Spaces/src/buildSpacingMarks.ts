//@ts-nocheck

import {
  elementsCoordinatesAndDimensionsX,
  elementsCoordinatesAndDimensionsY,
  frameY,
  frameX,
} from "./getElementsSizes";
import { buildMarksForHorizontal } from "./buldMarksForHorizontal";
import { buildMarksForVertical } from "./buildMarksForVertical";
import buildMarksForPaddings from "./buildMarksForPaddings";
import getFrameMeasurements from "./getFrameMeasurements";
import { isToolComp } from "./utils";

import addAnatomySpacingsToTools from "./tmpMarker";
import cloneFrame from "./cloneFrame";

//just for better readability
function getSelectedCheckboxes(arr) {
  const result = {};
  result.size = arr.includes("size");
  result.paddings = arr.includes("paddings");
  result.itemspacings = arr.includes("itemspacings");
  return result;
}

function buildSpacingMarks(frame, selectedCheckboxes) {
  const checkboxes = getSelectedCheckboxes(selectedCheckboxes);

  if (!isToolComp(".DS anatomy spacing")) {
    addAnatomySpacingsToTools();
  }

  const workingFrame = cloneFrame(frame);

  if (checkboxes.paddings) {
    buildMarksForPaddings(workingFrame);
  }

  if (checkboxes.itemspacings) {
    if (workingFrame.layoutMode === "VERTICAL") {
      buildMarksForVertical(
        workingFrame,
        elementsCoordinatesAndDimensionsY,
        frameX
      );
    } else {
      buildMarksForHorizontal(
        workingFrame,
        elementsCoordinatesAndDimensionsX,
        frameY
      );
    }
  }

  if (checkboxes.size) {
    getFrameMeasurements(workingFrame);
  }

  workingFrame.remove();
}

export default buildSpacingMarks;
