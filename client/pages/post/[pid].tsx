import { GetServerSidePropsContext } from 'next';
import React from 'react';
import AuthGuard from '../../components/AuthGuard';
import SideBar from '../../components/Main/SideBar';
import ReadPost from '../../components/ReadPost';
import Frame from '../../styles/frame';
import { httpGet } from '../../utils/http';

interface Props {
  data: {
    post: {
      _id: string;
      title: string;
      description: string;
      author: string;
      createdAt: string;
    };
  };
}

export default function Post({ response }: { response: Props }) {
  const title: string = '게시글';
  return (
    <AuthGuard noRedirect>
      <Frame>
        <SideBar />
        <ReadPost postData={response.data.post} title={title} />
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
