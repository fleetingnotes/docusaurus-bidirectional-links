import React from "react";
import LinkPreview from "../LinkPreview/index";

function Backlinks({ backlinks }) {
  // The backlinks prop will be the imported backlinks data

  return (
    // Render your document page here, using the backlinks data
    <>
      {backlinks.map(({ title, excerpt }, i) => (
        <div key={i} style={{ marginBottom: "1em" }}>
          <LinkPreview
            title={title}
            excerpt={excerpt}
            maxHeight={125}
          />
        </div>
      ))}
    </>
    // <div>hello world</div>
  );
}

export default Backlinks;
