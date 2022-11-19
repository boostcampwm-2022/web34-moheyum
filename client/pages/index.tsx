import React, { useEffect } from 'react';
import { httpGet } from '../utils/http';
import { GetServerSidePropsContext } from 'next';
import { useSetRecoilState } from 'recoil';
import Frame from '../styles/frame';
import SideBar from '../components/Main/SideBar';
import MainSection from '../components/Main/MainSection';
import newsPeedState from '../atom/newsPeedState';

interface newsPeedType {
  _id: string;
  title: string;
  description: string;
  author: string;
}

export default function Home({ response }: { response: newsPeedType[] }) {
  const setNewsPeedList = useSetRecoilState(newsPeedState);
  useEffect(() => {
    setNewsPeedList(response);
  });
  return (
    <Frame>
      <SideBar />
      <MainSection />
    </Frame>
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
