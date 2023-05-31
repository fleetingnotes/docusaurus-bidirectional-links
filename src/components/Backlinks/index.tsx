import React from "react";
import LinkPreview from "@site/src/components/LinkPreview/index";
import Link from "@docusaurus/Link";

function Backlinks({ backlinks }) {
  // The backlinks prop will be the imported backlinks data

  return (
    // Render your document page here, using the backlinks data
    <>
      {backlinks.map((
        { title, excerpt, slug }: {
          slug: string;
          title: string;
          excerpt: string;
        },
        i: number,
      ) => (
        <div key={i} style={{ marginBottom: "1em" }}>
          <Link
            to={slug}
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <LinkPreview
              title={title}
              excerpt={excerpt}
              style={{
                border: "1px solid #ddd",
                padding: "1em",
                borderRadius: "5px",
                maxHeight: "150px",
                overflowY: "hidden",
              }}
            />
          </Link>
        </div>
      ))}
    </>
    // <div>hello world</div>
  );
}

export default Backlinks;
