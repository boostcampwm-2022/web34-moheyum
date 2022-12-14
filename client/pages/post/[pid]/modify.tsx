import styled from '@emotion/styled';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import AuthGuard from '../../../components/AuthGuard';
import { httpGet } from '../../../utils/http';
import type PostProps from '../../../types/Post';
import EditorWrapper from '../../../components/Write';

interface Props {
  data: {
    post: PostProps;
  };
}

export default function Modify({ response }: { response: Props }) {
  return (
    <AuthGuard noRedirect>
      <ContentWrapper>
        <EditorWrapper modifyPostData={response.data.post} />
      </ContentWrapper>
    </AuthGuard>
  );
}

export async function getServerSideProps({ query: { pid } }: GetServerSidePropsContext) {
  const response = await httpGet(`/post/${pid}`);
  // Pass data to the page via props
  return {
    props: {
      response,
    },
  };
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
