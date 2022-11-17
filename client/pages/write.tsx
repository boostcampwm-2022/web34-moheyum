import styled from '@emotion/styled';
import React from 'react';
import Editor from '../components/write/Editor';
import COLORS from '../styles/color';

export default function write() {
  return (
    <Frame>
      <Sidebar />
      <ContentWrapper>
        <Editor />
      </ContentWrapper>
    </Frame>
  );
}

// dev 브랜치에 Frame 올라오면 지울것
const Frame = styled.div`
  background-color: ${COLORS.OFF_WHITE};
  width: 1280px;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Sidebar = styled.div`
  height: inherit;
  width: 320px;
  background-color: yellow;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
