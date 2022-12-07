import React from 'react';
import Image from 'next/legacy/image';
import { Wrapper, NewNoti } from './index.style';

export default function Menu({
  imgSrc,
  text,
  avatar,
  noti,
}: {
  imgSrc: string;
  text: string;
  avatar: boolean;
  noti: boolean;
}) {
  return (
    <Wrapper>
      <div>
        {avatar ? (
          <>
            <div className="imageBox">
              <Image className="avatarBox" src={imgSrc} alt="item" width={25} height={25} priority />
            </div>
            <div className="text">{text}</div>
          </>
        ) : (
          <>
            <div className="imageBox">
              <Image src={imgSrc} alt="item" width={25} height={25} priority />
            </div>
            <div className="text">{text}</div>
          </>
        )}
        {noti && text === '알림' && <NewNoti />}
      </div>
      <span />
    </Wrapper>
  );
}
