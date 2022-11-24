import React from 'react';
import Frame from '../../../styles/frame';
import MainSection from '../../../components/Main/Mainsection';
import SideBar from '../../../components/Main/SideBar';
import AuthGuard from '../../../components/AuthGuard';
import FollowingSection from '../../../components/Follow/Following';
import { httpGet } from '../../../utils/http';
import { GetServerSidePropsContext } from 'next';



export interface Props {
  userid: string;
  nickname: string;
};

export default function following({ userData }: { userData: Props }) {
  return (
    <AuthGuard noRedirect>
      <Frame>
        <SideBar />
        <FollowingSection userData={userData} />
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

  //Fake Following List
  // userData.data.FollowingList = [
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "rkskekfk",
  //     targetid: "rkskekfk",
  //   },
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "가느다란",
  //     targetid: "namhyo01",
  //   },
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "rkskekfk",
  //     targetid: "rkskekfk",
  //   },
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "가느다란",
  //     targetid: "namhyo01",
  //   },
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "rkskekfk",
  //     targetid: "rkskekfk",
  //   },
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "가느다란",
  //     targetid: "namhyo01",
  //   },
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "rkskekfk",
  //     targetid: "rkskekfk",
  //   },
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "가느다란",
  //     targetid: "namhyo01",
  //   },
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "rkskekfk",
  //     targetid: "rkskekfk",
  //   },
  //   {
  //     profileimg: "/default-profile.png",
  //     nickname: "가느다란",
  //     targetid: "namhyo01",
  //   },
  // ]