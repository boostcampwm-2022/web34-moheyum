import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRecoilValue, useRecoilState } from 'recoil';
import Menu from './Menu';
import Title from './Title';
import { authedUser, newNotification } from '../../atom';
import { Setting, SideMenuBox, Wrapper } from './index.style';
import SideBarDropdown from './SideBarDropdown';
import useToast from '../../hooks/useToast';

const menuList = [
  { routeSrc: '/', imgSrc: '/ico_home.svg', text: '홈', avatar: false },
  { routeSrc: '/notification', imgSrc: '/ico_notification.svg', text: '알림', avatar: false },
  { routeSrc: '/search', imgSrc: '/ico_search.svg', text: '검색', avatar: false },
];

export default function SideBar() {
  const [dropdownState, setdropdownState] = useState<boolean>(false);
  const toast = useToast();

  const showSettingdropdown = () => {
    setdropdownState(!dropdownState);
  };
  const authedUserInfo = useRecoilValue(authedUser);
  const [newNotiState, setNewNotiState] = useRecoilState(newNotification);
  useEffect(() => {
    const eventSource = new EventSource('/api/event');
    eventSource.onmessage = (event) => {
      setNewNotiState(event.data);
      toast.addMessage('새 알림이 도착했습니다.');
    };
    // eventSource.onerror = (error) => {
    //   toast.addMessage(`SSE error : ${error}`);
    // };
    return () => eventSource.close();
  }, []);

  return (
    <Wrapper>
      <Title />
      <SideMenuBox>
        {menuList.map((item) => (
          <Link key={item.routeSrc} href={item.routeSrc}>
            <Menu imgSrc={item.imgSrc} text={item.text} avatar={false} noti={newNotiState} />
          </Link>
        ))}
        {authedUserInfo.logined && (
          <Link key={`/${authedUserInfo.userid}`} href={`/${authedUserInfo.userid}`}>
            <Menu imgSrc={authedUserInfo.profileimg} text={authedUserInfo.nickname} avatar noti={false} />
          </Link>
        )}
      </SideMenuBox>
      {dropdownState && <SideBarDropdown />}
      <Setting onClick={showSettingdropdown}>
        <Menu imgSrc="/ico_setting.svg" text="설정" avatar={false} noti={false} />
      </Setting>
    </Wrapper>
  );
}
