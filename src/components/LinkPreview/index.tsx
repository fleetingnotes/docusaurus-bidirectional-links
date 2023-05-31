import React from "react";
import ReactMarkdown from "react-markdown";

// Link Preview component
function LinkPreview({ title, excerpt, style }) {
  return (
    <div
      style={style}
    >
      {title && <h3 style={{ marginTop: "0" }}>{title}</h3>}
      <ReactMarkdown>{excerpt}</ReactMarkdown>
    </div>
  );
}

export default LinkPreview;
