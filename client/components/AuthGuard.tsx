import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authedUser, defaultAuthedUser } from '../atom';

type AuthProps = {
  // children: React.ReactNode;
  noRedirect?: boolean;
};

AuthGuard.defaultProps = {
  noRedirect: false,
};

export default function AuthGuard({ children, noRedirect }: React.PropsWithChildren<AuthProps>) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const setAuthedUserInfo = useSetRecoilState(authedUser);

  useEffect(() => {
    authCheck();
  }, []);

  async function authCheck() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, { credentials: 'include' });
    const result = await response.json();

    if (result.message === 'success') {
      setAuthedUserInfo({ logined: true, ...result.data });
      setAuthorized(true);
    }
    if (response.statusText === 'Unauthorized') {
      setAuthorized(false);
      setAuthedUserInfo(defaultAuthedUser);
      if (!noRedirect)
        router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath },
        });
    }
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{(noRedirect || authorized) && children}</>
  );
}
