import React from 'react';
import Content from '@theme-original/DocItem/Content';
import BidirectionalLinkWrapper from '@site/src/components/BidirectionalLinkWrapper/index';

export default function ContentWrapper(props) {
  return (
    <BidirectionalLinkWrapper>
      <Content {...props} />
    </BidirectionalLinkWrapper>
  )
}
