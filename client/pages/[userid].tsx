import { GetServerSidePropsContext } from 'next';
import React from 'react';
import AuthGuard from '../components/AuthGuard';
import UserSection from '../components/User';
import { UserPostProps } from '../types/Post';
import { httpGet } from '../utils/http';

export default function Post({ userData }: { userData: UserPostProps }) {
  return (
    <AuthGuard noRedirect>
      <UserSection userData={userData} />
    </AuthGuard>
  );
}

export async function getServerSideProps({ query: { userid } }: GetServerSidePropsContext) {
  const userData = await httpGet(`/user/${userid}`);
  if (userData.data !== null)
    return {
      props: {
        userData: userData.data,
      },
    };
  return {
    props: {
      userData: null,
    },
  };
}
