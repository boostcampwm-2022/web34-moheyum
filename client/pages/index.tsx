import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { httpGet } from '../utils/http';
import Frame from '../styles/frame';
import SideBar from '../components/main/SideBar';
import MainSection from '../components/main/MainSection';
import newsfeedState from '../atom/newsfeedState';

interface newsPeedType {
  _id: string;
  title: string;
  description: string;
  author: string;
}

export default function Home({ response }: { response: newsPeedType[] }) {
  const setNewsPeedList = useSetRecoilState(newsfeedState);
  useEffect(() => {
    setNewsPeedList(response);
  }, []);
  return (
    <Frame>
      <SideBar />
      <MainSection />
    </Frame>
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
