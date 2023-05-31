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
      // TODO: set tooltip id as entire path
      // bc if two files in different folders with the same name will conflict
      if (!url.match(/^https*:\/\//)) {
        node.data.hProperties["data-tooltip-id"] = path.basename(url);
      }
    });
  };
};
