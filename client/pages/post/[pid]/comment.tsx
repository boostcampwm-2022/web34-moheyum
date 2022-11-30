import styled from '@emotion/styled';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import AuthGuard from '../../../components/AuthGuard';
import SideBar from '../../../components/Main/SideBar';
import ReadPost from '../../../components/ReadPost';
import Frame from '../../../styles/frame';
import { httpGet } from '../../../utils/http';
import type PostProps from '../../../types/Post';
import Editor from '../../../components/Write';

interface Props {
  data: {
    post: PostProps;
  };
}

export default function Post({ response }: { response: Props }) {
  const title = '답글 작성';
  return (
    <AuthGuard noRedirect>
      <Frame>
        <SideBar />
        <ContentWrapper>
          <PostWrapper>
            <ReadPost postData={response.data.post} title={title} />
          </PostWrapper>
          <Editor postData={response.data.post} />
        </ContentWrapper>
      </Frame>
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
  &::-webkit-scrollbar {
    display: none;
  }
`;
const PostWrapper = styled.div`
  flex: 1;
`;
