import React, { useEffect, useRef } from "react";
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
  const ref = useRef(null);

  // set anchor tags to have tooltip id
  useEffect(() => {
    if (ref.current) {
      const links = ref.current.getElementsByTagName("a");
      for (let link of links) {
        const href = link.getAttribute("href");
        link.setAttribute("data-tooltip-id", href);
      }
    }
  }, []);

  return (
    <div ref={ref}>
      {children}
      {pageBacklinks && (
        <>
          <hr />
          <h1>Backlinks</h1>
          <Backlinks
            backlinks={pageBacklinks.map((b) => ({
              "slug": b,
              "title": excerpts[b]?.title,
              "excerpt": excerpts[b]?.excerpt,
            }))}
          />
        </>
      )}

      {pageLinks && pageLinks.map((p, i) => {
        const previewObj = excerpts[p];
        if (!previewObj) return null;
        return (
          <Tooltip id={p} key={i}>
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
    </div>
  );
}
