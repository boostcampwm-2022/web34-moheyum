import { GetServerSidePropsContext } from 'next';
import React from 'react';
import AuthGuard from '../../components/AuthGuard';
import ReadPost from '../../components/ReadPost';
import { httpGet } from '../../utils/http';
import type PostProps from '../../types/Post';

interface Props {
  data: {
    post: PostProps;
  };
}

export default function Post({ response }: { response: Props }) {
  const title = '게시글';
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
