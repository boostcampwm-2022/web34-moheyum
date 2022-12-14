import React from 'react';
import { GetServerSidePropsContext } from 'next';
import AuthGuard from '../../components/AuthGuard';
import { httpGet } from '../../utils/http';
import FollowerSection from '../../components/Follow/Follower';

export interface Props {
  userid: string;
  nickname: string;
}

export default function follower({ userData }: { userData: Props }) {
  return (
    <AuthGuard noRedirect>
      <FollowerSection userData={userData} />
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
