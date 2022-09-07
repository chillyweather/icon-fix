//@ts-nocheck
import buildContentFrame from "./src/buildContentFrame";
import buildDocumentContentFrame from "./src/buildDocumentContentFrame";
import buildElementFrame from "./src/buildElementFrame";
import buildElementDescription from "./src/buildElementDescription";
import buildElementSubtitle from "./src/buildElementSubtitle";
import buildElementTitle from "./src/buildElementTitle";
import buildInfoFrame from "./src/buildInfoFrame";
import buildSubElementFrame from "./src/buildSubElementFrame";
import findCurrentY from "./src/findCurrentY";

figma.showUI(__html__);
figma.ui.resize(400, 500);

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
};

figma.ui.onmessage = ({ type, title, subtitle, description }) => {
  console.log("title, subtitle :>> ", title, subtitle);
  if (!title) {
    figma.notify("Please, write something in 'Element' field");
  } else {
    if (type === "add-block") {
      //!
      //! 0. find on the page frame with name 'Documentation'
      //!

      const docFrame = figma.currentPage.findOne(
        (node) => node.name === "Documentation"
      );
      //!
      //! 1. create frame with autolayout inside of 'Documentation' that
      //!

      buildDocumentContentFrame(docFrame);

      const documentContentFrame = docFrame.children.find(
        (node) => node.name === "documentContentFrame"
      );

      //! 2. frame for element, like 'Header', 'Footer', 'Sidebar', etc...
      buildElementFrame(
        title,
        documentContentFrame,
        findCurrentY(documentContentFrame)
      );
      const elementFrame = documentContentFrame.children.find(
        (node) => node.name === title
      );
      loadFonts().then(() => buildElementTitle(title, elementFrame));

      if (subtitle || description) {
        //! 3. frame for sub-element or element type
        const subElementFrame = buildSubElementFrame(
          title,
          subtitle,
          elementFrame,
          findCurrentY(elementFrame)
        );

        if (subElementFrame) {
          //! 4. frame for text content (info)
          const infoFrame = buildInfoFrame(subElementFrame);

          //! 5. frame for graphic content
          const contentFrame = buildContentFrame(subElementFrame);

          //! 6. try to append selection to content frame
          if (figma.currentPage.selection.length > 0) {
            figma.currentPage.selection.forEach((node) => {
              contentFrame?.appendChild(node);
            });
          }

          //! 7. add title, subtitle, description
          loadFonts().then(() => {
            // buildElementTitle(title, elementFrame);
            if (infoFrame) {
              const subtitleText = buildElementSubtitle(subtitle, infoFrame);
              const descriptionText = buildElementDescription(
                description,
                infoFrame
              );
            }
          });
        }
      } else {
        figma.notify(
          "Please, write something in 'Sub-Element / Type / State' field"
        );
      }
    }
  }
  // figma.closePlugin();
};
