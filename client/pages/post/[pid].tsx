import { GetServerSidePropsContext } from 'next';
import React from 'react';
import AuthGuard from '../../components/AuthGuard';
import ReadPost from '../../components/ReadPost';
import NotFound from '../../components/NotFound';
import { httpGet } from '../../utils/http';
import type PostProps from '../../types/Post';

interface Props {
  statusCode: number;
  data: {
    post: PostProps;
  };
}

export default function Post({ response }: { response: Props }) {
  const title = '게시글';
  if (response.statusCode === 404) {
    return <NotFound>없는 게시글 입니다.</NotFound>;
  }
  return (
    <AuthGuard noRedirect>
      <ReadPost postData={response.data.post} title={title} />
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
