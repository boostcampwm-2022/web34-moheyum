import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import Frame from '../../styles/frame';
import MainSection from './MainSection';
import SideBar from './SideBar';
import newsPeedState from '../../atom/newsPeedState';

interface newsPeedType {
  _id: string;
  title: string;
  description: string;
  author: string;
}

export default function main({ response }: { response: newsPeedType[] }) {
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
