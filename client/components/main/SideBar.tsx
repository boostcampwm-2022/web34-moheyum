import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/legacy/image';
import { displayColumn, displayCenter } from '../../styles/mixin';
import COLORS from '../../styles/color';

const menuList = [
  { imgSrc: '/home.svg', text: '홈' },
  { imgSrc: '/announce.svg', text: '알림' },
  { imgSrc: '/search.svg', text: '검색' },
];

function makeItemTag(src: string, text: string) {
  return (
    <Item>
      <div className="imageBox">
        <Image src={src} alt="item" width={25} height={25} priority />
      </div>
      <div className="text">{text}</div>
    </Item>
  );
}

export default function SideBar() {
  const menuTagList = menuList.map((item) => makeItemTag(item.imgSrc, item.text));
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>
          <Image src="/logo_purple.svg" alt="Logo" layout="fill" priority />
        </Title>
        <SmallTitle>
          <Image src="/small_logo.svg" alt="Logo" layout="fill" priority />
        </SmallTitle>
      </TitleWrapper>
      <SideMenuBox>{menuTagList}</SideMenuBox>
      <Setting>{makeItemTag('/setting.svg', '설정')}</Setting>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  width: ${({ theme }) => theme.sidebar.maxWidth};
  height: 100%;
  ${displayColumn}
  background-color: ${({ theme }) => theme.sidebar.backgroundColor};
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: ${({ theme }) => theme.sidebar.minWidth};
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 2px ridge ${COLORS.PRIMARY};
`;
const SideMenuBox = styled.div`
  width: 100%;
  height: calc(100vh - 145px);
`;

const Title = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: none;
  }
`;

const SmallTitle = styled.div`
  position: relative;
  width: 100%;
  height: 45px;
  margin-top: 8px;
  margin-bottom: 7px;
  display: none;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: block;
  }
`;

const Item = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  margin-left: 5%;
  border-bottom: 1px solid ${COLORS.PRIMARY};
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: 80%;
    margin-left: 10%;
  }
  .imageBox {
    width: 35%;
    ${displayCenter}
    @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
      width: 100%;
    }
  }
  .text {
    margin-top: 8px;
    margin-right: 5px;
    width: 65%;
    text-align: center;
    @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
      display: none;
    }
  }
`;

const Setting = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;
