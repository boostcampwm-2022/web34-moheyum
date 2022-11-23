import styled from '@emotion/styled';
import React from 'react';
import AuthGuard from '../components/AuthGuard';
import SideBar from '../components/Main/SideBar';
import Editor from '../components/Write';
import COLORS from '../styles/color';

export default function write() {
  return (
    <AuthGuard>
      <Frame>
        <SideBar />
        <ContentWrapper>
          <Editor />
        </ContentWrapper>
      </Frame>
    </AuthGuard>
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
