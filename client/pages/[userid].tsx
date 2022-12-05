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
  // console.log(userData);
  // const defaultProps = {
  //   userid: "",
  //   nickname: "",
  //   email: "",
  //   bio: "",
  //   profileimg: "/default-profile.png",
  //   state: false,
  //   following: -1,
  //   follower: -1,
  //   postcount: -1,
  // }
  // userData.data = {...defaultProps, ...userData.data};
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
