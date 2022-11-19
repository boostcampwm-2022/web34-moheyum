import React, { useState, useRef, RefObject } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { displayColumn } from '../../../styles/mixin';
import Menu from './Menu';
import Title from './Title';
import COLORS from '../../../styles/color';

const menuList = [
  { routeSrc: '/main', imgSrc: '/home.svg', text: '홈' },
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

const Dropdown = styled.div`
  width: fit-content;
  /* position: fixed; */
  margin-left: 30px;
  justify-content: center;
  align-items: right;
  margin-bottom: 10px;
  div {
    position: relative;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    background-color: ${COLORS.WHITE};
    border-radius: 10px;
    ${displayColumn}
    border: 1px solid ${COLORS.PRIMARY_DARK};
    li {
      list-style: none;
      font-size: 14px;
      margin: 10px 10px;
    }
  }
`;

const Wrapper = styled.aside`
  width: ${({ theme }) => theme.sidebar.maxWidth};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.sidebar.backgroundColor};
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: ${({ theme }) => theme.sidebar.minWidth};
  }
`;

const SideMenuBox = styled.div`
  width: 100%;
  flex: 1;
`;

const Setting = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;
