import React, { useState } from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import Menu from './Menu';
import Title from './Title';
import { Setting, SideMenuBox, Wrapper } from './index.style';
import { authedUser } from '../../../atom';
import SideBarDropdown from './SideBarDropdown';

const menuList = [
  { routeSrc: '/', imgSrc: '/home.svg', text: '홈', avatar: false },
  { routeSrc: '/notification', imgSrc: '/announce.svg', text: '알림', avatar: false },
  { routeSrc: '/search', imgSrc: '/search.svg', text: '검색', avatar: false },
];

export default function SideBar() {
  const [dropdownState, setdropdownState] = useState<boolean>(false);
  const showSettingdropdown = () => {
    setdropdownState(!dropdownState);
  };
  const authedUserInfo = useRecoilValue(authedUser);
  return (
    <Wrapper>
      <Title />
      <SideMenuBox>
        {menuList.map((item) => (
          <Link key={item.routeSrc} href={item.routeSrc}>
            <Menu imgSrc={item.imgSrc} text={item.text} avatar={false} />
          </Link>
        ))}
        {authedUserInfo.logined && (
          <Link key={`/${authedUserInfo.userid}`} href={`/${authedUserInfo.userid}`}>
            <Menu imgSrc={authedUserInfo.profileimg} text={authedUserInfo.nickname} avatar />
          </Link>
        )}
      </SideMenuBox>
      {dropdownState && <SideBarDropdown />}
      <Setting onClick={showSettingdropdown}>
        <Menu imgSrc="/setting.svg" text="설정" avatar={false} />
      </Setting>
    </Wrapper>
  );
}
