import React from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import Backlinks from "@site/src/components/Backlinks/index";
import { useLocation } from "@docusaurus/router";
import { Tooltip } from "react-tooltip";
import LinkPreview from "@site/src/components/LinkPreview/index";

export default function BidirectionalLinkWrapper({ children }) {
  const location = useLocation();
  const { backlinks, excerpts, links } = usePluginData(
    "docusaurus-plugin-backlinks",
  );

  const pageBacklinks = backlinks[location.pathname];
  const pageLinks = links[location.pathname];

  return (
    <>
      {children}
      {pageBacklinks && (
        <>
          <h1>Backlinks</h1>
          <Backlinks backlinks={pageBacklinks.map((b) => excerpts[b])} />
        </>
      )}

      {pageLinks && pageLinks.map((p, i) => {
        const previewObj = excerpts[p];
        const basename = p.split(/[\\/]/).pop();
        if (!previewObj) return null;
        return (
          <Tooltip id={basename} key={i}>
            <LinkPreview
              title={previewObj.title}
              excerpt={previewObj.excerpt}
              style={{
                maxWidth: "400px",
                maxHeight: "300px",
                overflowY: "hidden",
              }}
            />
          </Tooltip>
        );
      })}
    </>
  );
}
