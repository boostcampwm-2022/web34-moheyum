import React from 'react';
import styled from '@emotion/styled';
import AuthGuard from '../components/AuthGuard';
import Notification from '../components/Notification';

export default function notification() {
  return (
    <AuthGuard>
      <ContentWrapper>
        <Notification />
      </ContentWrapper>
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
`;
