import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { httpPost } from '../../../utils/http';
import { Dropdown } from './index.style';

export default function SideBarDropdown() {
  const router = useRouter();
  const signOut = async () => {
    const result = await httpPost('/auth/logout');
    console.log(result);
    router.reload();
  };
  return (
    <Dropdown>
      <button type="button">
        <Link href="/myAccount">내 계정 정보 확인</Link>
      </button>
      <button type="button">알림 일시중지</button>
      <button type="button" onClick={signOut}>
        로그아웃
      </button>
    </Dropdown>
  );
}
