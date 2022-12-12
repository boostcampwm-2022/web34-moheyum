import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRecoilState } from 'recoil';
import ReactLoading from 'react-loading';
import Image from 'next/image';
import { newNotification } from '../../atom';
import { Loader } from '../../styles/common';
import COLORS from '../../styles/color';
import usePaginator from '../../hooks/usePaginator';
import {
  ExceptionPage,
  NotificationContainer,
  TopBar,
  Wrapper,
  NewNoti,
  DropDown,
  PostButton,
  Menu,
  Footer,
} from './index.style';
import { NotificationCard } from './NotificationCard';
import { httpDelete } from '../../utils/http';
import useToast from '../../hooks/useToast';

export default function Notification() {
  const { loading, error, pages, lastFollowElementRef } = usePaginator(`/api/notification/list/`);
  const [notiState, setNotiState] = useRecoilState(newNotification);
  const [dropDownDisplay, setDropDownDisplay] = useState<boolean>(false);
  const toast = useToast();
  const updateNotification = () => {
    setNotiState(false);
    Router.reload();
  };
  const deleteAllHandler = async () => {
    const response = await httpDelete('/notification/list');
    if (response.statusCode !== 200) {
      toast.addMessage(`알림 목록 삭제에 실패하였습니다. ${response.message}`);
    } else {
      toast.addMessage(`알림 목록을 삭제하였습니다.`);
      setDropDownDisplay(false);
      Router.reload();
    }
  };
  useEffect(() => {
    setNotiState(false);
  }, []);
  return (
    <Wrapper>
      <TopBar>
        <h1>알림</h1>
        <Menu>
          <Image
            onClick={() => (dropDownDisplay ? setDropDownDisplay(false) : setDropDownDisplay(true))}
            src="/menu.svg"
            alt="Menu"
            width={30}
            height={30}
            priority
          />
          {dropDownDisplay && (
            <DropDown>
              <PostButton onClick={deleteAllHandler}>전체 삭제</PostButton>
            </DropDown>
          )}
        </Menu>
      </TopBar>
      {notiState && (
        <NewNoti onClick={updateNotification}>
          <div>새 소식</div>
        </NewNoti>
      )}
      <NotificationContainer>
        {pages.map((item: any, index: number) => {
          if (pages.length === index + 1)
            return (
              <NotificationCard
                url={item.url}
                message={item.message}
                createdAt={item.createdAt}
                notifId={item._id}
                key={item._id}
                ref={lastFollowElementRef}
              />
            );
          return (
            <NotificationCard
              url={item.url}
              message={item.message}
              createdAt={item.createdAt}
              notifId={item._id}
              key={item._id}
            />
          );
        })}
        <Footer>
          <Loader>{loading && <ReactLoading type="spin" color={COLORS.PRIMARY} />}</Loader>
        </Footer>
        {error && <ExceptionPage>error</ExceptionPage>}
      </NotificationContainer>
    </Wrapper>
  );
}
