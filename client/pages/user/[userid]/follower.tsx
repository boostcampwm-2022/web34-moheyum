import React from 'react';
import Frame from '../../../styles/frame';
import MainSection from '../../../components/Main/Mainsection';
import SideBar from '../../../components/Main/SideBar';
import AuthGuard from '../../../components/AuthGuard';
import { GetServerSidePropsContext } from 'next';
import { httpGet } from '../../../utils/http';
import FollowerSection from '../../../components/Follow/Follower';

export interface Props {
  userid: string;
  nickname: string;
};

export default function follower({ userData }: { userData: Props }) {
  return (
    <AuthGuard noRedirect>
      <Frame>
        <SideBar />
        <FollowerSection userData={userData} />
      </Frame>
    </AuthGuard>
  );
}

export async function getServerSideProps({ query: { userid } }: GetServerSidePropsContext) {
  const userData = await httpGet(`/user/${userid}`);
  return {
    props: {
      userData: userData.data,
    },
  };
}