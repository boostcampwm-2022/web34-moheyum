import React from 'react';
import { httpGet } from '../utils/http';
import { GetServerSidePropsContext } from 'next';
import Main from '../components/Main';
import { RecoilRoot } from 'recoil';

interface newsPeedType {
  _id: string;
  title: string;
  description: string;
  author: string;
}

export default function Home({ response }: { response: newsPeedType[] }) {
  return (
    <RecoilRoot>
      <Main response={response} />
    </RecoilRoot>
  );
}
// SSR
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 외부 API로 데이터 가져오기
  const response = await httpGet('/post');
  // Pass data to the page via props
  return {
    props: {
      response,
    },
  };
}
