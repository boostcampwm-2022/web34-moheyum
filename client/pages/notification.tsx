import React from 'react';
import styled from '@emotion/styled';
import Frame from '../styles/frame';
import SideBar from '../components/Main/SideBar';
import AuthGuard from '../components/AuthGuard';
import Notification from '../components/Notification';

export default function notification() {
  return (
    <AuthGuard>
      <Frame>
        <SideBar notiState />
        <ContentWrapper>
          <Notification />
        </ContentWrapper>
      </Frame>
    </AuthGuard>
  );
}
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 1090px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;
