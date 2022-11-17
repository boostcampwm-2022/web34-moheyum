import React, { useState, useRef, RefObject } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { displayColumn } from '../../styles/mixin';
import Menu from './SideBar/Menu';
import Title from './SideBar/Title';
import COLORS from '../../styles/color';

const menuList = [
  { routeSrc: '/main', imgSrc: '/home.svg', text: '홈' },
  { routeSrc: '/announce', imgSrc: '/announce.svg', text: '알림' },
  { routeSrc: '/search', imgSrc: '/search.svg', text: '검색' },
];

export default function SideBar() {
  const menuTagList = menuList.map((item) => (
    <Link key={item.routeSrc} href={item.routeSrc} style={{ textDecorationLine: 'none' }}>
      <Menu imgSrc={item.imgSrc} text={item.text} />
    </Link>
  ));
  const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState({ modalDisplay: 'none', sideBoxHeight: 'calc(100vh - 145px)' });
  const showSettingModal = () => {
    if (modalState.modalDisplay === 'none') {
      setModalState((prev) => ({
        ...prev,
        modalDisplay: 'flex',
        sideBoxHeight: `calc(100vh - 285px)`,
      }));
    } else {
      setModalState((prev) => ({
        ...prev,
        modalDisplay: 'none',
        sideBoxHeight: `calc(100vh - 145px)`,
      }));
    }
  };
  return (
    <Wrapper>
      <Title />
      <SideMenuBox style={{ height: modalState.sideBoxHeight }}>{menuTagList}</SideMenuBox>
      <Modal style={{ display: modalState.modalDisplay }} ref={modalRef}>
        <div>
          <li>
            <Link href="/myAccount">내 계정 정보 확인</Link>
          </li>
          <li>비밀번호 변경</li>
          <li>알림 일시중지</li>
          <li>로그아웃</li>
        </div>
      </Modal>
      <Setting onClick={showSettingModal}>
        <Menu imgSrc="/setting.svg" text="설정" />
      </Setting>
    </Wrapper>
  );
}

const Modal = styled.div`
  width: 100%;
  height: 130px;
  justify-content: center;
  align-items: right;
  margin-bottom: 10px;
  div {
    position: relative;
    width: 65%;
    height: 100%;
    background-color: ${COLORS.WHITE};
    border-radius: 10px;
    ${displayColumn}
    padding-top: 15px;
    border: 1px solid ${COLORS.PRIMARY_DARK};
    li {
      list-style: none;
      margin-left: 10px;
      font-size: 14px;
      margin-bottom: 15px;
    }
  }
`;

const Wrapper = styled.aside`
  width: ${({ theme }) => theme.sidebar.maxWidth};
  height: 100%;
  ${displayColumn}
  background-color: ${({ theme }) => theme.sidebar.backgroundColor};
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: ${({ theme }) => theme.sidebar.minWidth};
  }
`;

const SideMenuBox = styled.div`
  width: 100%;
`;

const Setting = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;
