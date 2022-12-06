import styled from '@emotion/styled';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import Router from 'next/router';
import AuthGuard from '../../../components/AuthGuard';
import MainPost from '../../../components/ReadPost/MainPost';
import { httpGet } from '../../../utils/http';
import type PostProps from '../../../types/Post';
import Editor from '../../../components/Write/Editor';
import COLORS from '../../../styles/color';
import { ButtonBack, TopBar } from '../../../styles/common';

interface Props {
  data: {
    post: PostProps;
  };
}

const goBack = () => {
  Router.back();
};

export default function CommentPost({ response }: { response: Props }) {
  return (
    <AuthGuard>
      <TopBar>
        <div>
          <ButtonBack type="button" onClick={goBack} />
        </div>
        <h1>답글 작성</h1>
      </TopBar>
      <ContentWrapper>
        <MainPostWrapper>
          <MainPost postData={response.data.post} />
        </MainPostWrapper>
        <CommentEditor>
          <Editor parentPostData={response.data.post} isComment />
        </CommentEditor>
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
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const MainPostWrapper = styled.div`
  width: 100%;
  padding: 8px 15px;
`;

const CommentEditor = styled.div`
  overflow-y: scroll;
  width: 100%;
  flex: 1;
  border-top: 2px solid ${COLORS.GRAY3};
  margin-top: 20px;
  padding-top: 20px;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
