import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { usePluginData } from '@docusaurus/useGlobalData';
import Backlinks from '@site/src/components/Backlinks/index';
import { useLocation } from '@docusaurus/router';

export default function ContentWrapper(props) {
  const location = useLocation();
  const { backlinks, excerpts } = usePluginData('docusaurus-plugin-backlinks');
  const pageBacklinks = backlinks[location.pathname];

  return (
    <>
      <Content {...props} />
      {pageBacklinks && (
        <>
          <h1>Backlinks</h1>
          <Backlinks backlinks={pageBacklinks.map(b => excerpts[b])} />
        </>
      )}
    </>
  );
}
