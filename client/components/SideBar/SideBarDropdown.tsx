import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { httpPost } from '../../utils/http';
import { authedUser } from '../../atom';
import { Dropdown } from './index.style';

export default function SideBarDropdown() {
  const router = useRouter();
  const authed = useRecoilValue(authedUser);
  const signOut = async () => {
    await httpPost('/auth/logout', {});
    router.push('/login');
  };
  return (
    <Dropdown>
      {authed.logined ? (
        <>
          <button type="button">
            <Link href="/myAccount">내 계정</Link>
          </button>
          <button type="button" onClick={signOut}>
            로그아웃
          </button>
        </>
      ) : (
        <button type="button" onClick={() => router.push('/login')}>
          로그인
        </button>
      )}
    </Dropdown>
  );
}
