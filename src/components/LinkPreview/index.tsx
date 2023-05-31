import React from 'react';
import ReactMarkdown from 'react-markdown';

// Link Preview component
function LinkPreview({ title, excerpt, maxWidth, maxHeight }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '1em',
      borderRadius: '5px',
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      overflowY: 'hidden'
    }}>
      {title && (
        <h3 style={{ marginTop: '0' }}>{title}</h3>
      )}
      <ReactMarkdown>{excerpt}</ReactMarkdown>
      <div style={{ padding: '1em' }}></div>
    </div>
  );
}

export default LinkPreview;
