import React, { useState, useRef, RefObject, useEffect } from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import Menu from './Menu';
import Title from './Title';
import { Dropdown, Setting, SideMenuBox, Wrapper } from './index.style';
import { authedUser } from '../../../atom';

const menuList = [
  { routeSrc: '/', imgSrc: '/home.svg', text: '홈', avatar: false },
  { routeSrc: '/notification', imgSrc: '/announce.svg', text: '알림', avatar: false },
  { routeSrc: '/search', imgSrc: '/search.svg', text: '검색', avatar: false },
];

export default function SideBar() {
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [dropdownState, setdropdownState] = useState<boolean>(false);
  const [newNoti, setNewNoti] = useState<boolean>(false);

  const showSettingdropdown = () => {
    setdropdownState(!dropdownState);
  };
  const authedUserInfo = useRecoilValue(authedUser);
  const test = async () => {
    const response = await fetch('/api/alarm/emit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: undefined,
    });
  };
  useEffect(() => {
    test();
    const eventSource = new EventSource('/api/alarm');
    eventSource.onmessage = (event) => {
      console.log(event.data);
      setNewNoti(event.data);
      eventSource.close();
    };
    eventSource.onerror = (error) => {
      console.log('에러니?', error);
      eventSource.close();
    };
  });

  return (
    <Wrapper>
      <Title />
      <SideMenuBox>
        {menuList.map((item) => (
          <Link key={item.routeSrc} href={item.routeSrc}>
            <Menu imgSrc={item.imgSrc} text={item.text} avatar={false} noti={newNoti} />
          </Link>
        ))}
        {authedUserInfo.logined && (
          <Link key={`/${authedUserInfo.userid}`} href={`/${authedUserInfo.userid}`}>
            <Menu imgSrc={authedUserInfo.profileimg} text={authedUserInfo.nickname} avatar noti={false} />
          </Link>
        )}
      </SideMenuBox>
      {dropdownState && (
        <Dropdown ref={dropdownRef}>
          <div>
            <li>
              <Link href="/myAccount">내 계정 정보 확인</Link>
            </li>
            <li>알림 일시중지</li>
            <li>로그아웃</li>
          </div>
        </Dropdown>
      )}
      <Setting onClick={showSettingdropdown}>
        <Menu imgSrc="/setting.svg" text="설정" avatar={false} noti={false} />
      </Setting>
    </Wrapper>
  );
}
