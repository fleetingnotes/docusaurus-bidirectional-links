const visit = require("unist-util-visit");
const path = require("path");

module.exports = function remarkTooltip() {
  return (tree) => {
    visit(tree, "link", (node) => {
      const url = node.url;
      if (!node.data) {
        node.data = {};
      }
      if (!node.data.hProperties) {
        node.data.hProperties = {};
      }
      if (url.startsWith("/") || url.startsWith(".")) {
        node.data.hProperties["data-tooltip-id"] = path.basename(url);
      }
    });
  };
};
