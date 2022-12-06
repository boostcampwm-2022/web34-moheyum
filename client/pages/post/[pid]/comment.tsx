import { GetServerSidePropsContext } from 'next';
import React from 'react';
import Router from 'next/router';
import AuthGuard from '../../../components/AuthGuard';
import { httpGet } from '../../../utils/http';
import type PostProps from '../../../types/Post';
import CommentPost from '../../../components/CommentPost';
import { ButtonBack, TopBar } from '../../../styles/common';

interface Props {
  data: {
    post: PostProps;
  };
}

const goBack = () => {
  Router.back();
};

export default function Post({ response }: { response: Props }) {
  return (
    <AuthGuard>
      <TopBar>
        <div>
          <ButtonBack type="button" onClick={goBack} />
        </div>
        <h1>답글 작성</h1>
      </TopBar>
      <CommentPost response={response}></CommentPost>
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
