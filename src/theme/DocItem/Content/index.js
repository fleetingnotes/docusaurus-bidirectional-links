import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { usePluginData } from '@docusaurus/useGlobalData';
import Backlinks from '@site/src/components/Backlinks/index';
import { useLocation } from '@docusaurus/router';
import { Tooltip } from 'react-tooltip';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function ContentWrapper(props) {
  const location = useLocation();
  const { backlinks, excerpts, links } = usePluginData('docusaurus-plugin-backlinks');

  const pageBacklinks = backlinks[location.pathname];
  const pageLinks = links[location.pathname];

  return (
    <>
      <Content {...props} />
      {pageBacklinks && (
        <>
          <h1>Backlinks</h1>
          <Backlinks backlinks={pageBacklinks.map(b => excerpts[b])} />
        </>
      )}

      {pageLinks && pageLinks.map((p, i) => {
        const previewObj = excerpts[p];
        const basename = p.split(/[\\/]/).pop();
        if (!previewObj) return null;
        return (
          <Tooltip id={basename} key={i}>
            <div>
              <h1>{previewObj.title}</h1>
              <ReactMarkdown>{previewObj.excerpt}</ReactMarkdown>
            </div>
          </Tooltip>
        )
      })}

    </>
  );
}
