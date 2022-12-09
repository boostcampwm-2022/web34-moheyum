import { useCallback, useRef, useState, useEffect } from 'react';
import Router from 'next/router';
import { useRecoilValue, useRecoilState } from 'recoil';
import { newNotification } from '../../atom';
import usePaginator, { NEXT } from '../../hooks/usePaginator';
import { ExceptionPage, NotificationContainer, TopBar, Wrapper, NewNoti } from './index.style';
import { NotificationCard } from './NotificationCard';

export default function Notification() {
  const [nextCursor, setNextCursor] = useState('START');
  const { loading, error, pages, next } = usePaginator(`/api/notification/list/`, nextCursor);
  const [globalState, setGlobalState] = useRecoilState(newNotification);
  const observer = useRef<any>();
  const updateNotification = () => {
    setGlobalState(false);
    Router.reload();
  };
  useEffect(() => {
    setGlobalState(false);
  }, []);
  const lastNotificationElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && next !== NEXT.END) {
          setNextCursor(next);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, next !== NEXT.END]
  );
  return (
    <Wrapper>
      <TopBar>
        <h1>알림</h1>
      </TopBar>
      {globalState && (
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
                key={item._id}
                ref={lastNotificationElementRef}
              />
            );
          return <NotificationCard url={item.url} message={item.message} createdAt={item.createdAt} key={item._id} />;
        })}
        {loading && <ExceptionPage>Loading</ExceptionPage>}
        {error && <ExceptionPage>error</ExceptionPage>}
      </NotificationContainer>
    </Wrapper>
  );
}
