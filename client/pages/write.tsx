import styled from '@emotion/styled';
import React from 'react';
import AuthGuard from '../components/AuthGuard';
import SideBar from '../components/Main/SideBar';
import Editor from '../components/Write';
import Frame from '../styles/frame';
import { mainSectionStyle } from '../styles/mixin';

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

const ContentWrapper = styled.div`
  ${mainSectionStyle}
`;
