import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { httpPost } from '../../../utils/http';
import { Dropdown } from './index.style';

export default function SideBarDropdown() {
  const router = useRouter();
  const signOut = async () => {
    await httpPost('/auth/logout', {});
    router.reload();
  };
  return (
    <Dropdown>
      <button type="button">
        <Link href="/myAccount">내 계정</Link>
      </button>
      <button type="button" onClick={signOut}>
        로그아웃
      </button>
    </Dropdown>
  );
}
