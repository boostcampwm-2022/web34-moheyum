import { GetServerSidePropsContext } from 'next';
import React from 'react';
import Router from 'next/router';
import AuthGuard from '../../components/AuthGuard';
import ReadPost from '../../components/ReadPost';
import { httpGet } from '../../utils/http';
import type PostProps from '../../types/Post';

interface Props {
  statusCode: number;
  data: {
    post: PostProps | null;
  };
}

export default function Post({ response }: { response: Props }) {
  const title = '게시글';
  let postData;
  if (response.statusCode === 404) {
    postData = null;
  } else {
    postData = response.data.post;
  }
  return (
    <AuthGuard noRedirect>
      <ReadPost postData={postData} title={title} />
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
