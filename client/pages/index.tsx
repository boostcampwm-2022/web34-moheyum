import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { httpGet } from '../utils/http';
import Frame from '../styles/frame';
import SideBar from '../components/Main/SideBar';
import MainSection from '../components/Main/Mainsection';
import { newsfeedState } from '../atom';
import AuthGuard from '../components/AuthGuard';

interface newsfeedType {
  _id: string;
  title: string;
  description: string;
  author: string;
}

export default function Home({ response }: { response: newsfeedType[] }) {
  const setNewsfeedList = useSetRecoilState(newsfeedState);
  useEffect(() => {
    setNewsfeedList(response);
  }, []);
  return (
    <AuthGuard>
      <Frame>
        <SideBar />
        <MainSection />
      </Frame>
    </AuthGuard>
  );
}
// SSR
export async function getServerSideProps() {
  // 외부 API로 데이터 가져오기
  const response = await httpGet('/post');
  // Pass data to the page via props
  return {
    props: {
      response,
    },
  };
}
