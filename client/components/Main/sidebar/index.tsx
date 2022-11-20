import React, { useState, useRef, RefObject } from 'react';
import Link from 'next/link';
import Menu from './menu';
import Title from './title';
import { Dropdown, Setting, SideMenuBox, Wrapper } from './index.style';

const menuList = [
  { routeSrc: '/', imgSrc: '/home.svg', text: '홈' },
  { routeSrc: '/announce', imgSrc: '/announce.svg', text: '알림' },
  { routeSrc: '/search', imgSrc: '/search.svg', text: '검색' },
];

export default function SideBar() {
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [dropdownState, setdropdownState] = useState<boolean>(false);
  const showSettingdropdown = () => {
    setdropdownState(!dropdownState);
  };
  return (
    <Wrapper>
      <Title />
      <SideMenuBox>
        {menuList.map((item) => (
          <Link key={item.routeSrc} href={item.routeSrc}>
            <Menu imgSrc={item.imgSrc} text={item.text} />
          </Link>
        ))}
      </SideMenuBox>
      {dropdownState && (
        <Dropdown ref={dropdownRef}>
          <div>
            <li>
              <Link href="/myAccount">내 계정 정보 확인</Link>
            </li>
            <li>비밀번호 변경</li>
            <li>알림 일시중지</li>
            <li>로그아웃</li>
          </div>
        </Dropdown>
      )}
      <Setting onClick={showSettingdropdown}>
        <Menu imgSrc="/setting.svg" text="설정" />
      </Setting>
    </Wrapper>
  );
}
