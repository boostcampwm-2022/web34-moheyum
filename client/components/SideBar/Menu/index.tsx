import React from 'react';
import Image from 'next/legacy/image';
import { Wrapper, NewNoti, Item, ImageBox, Text, BorderBottom } from './index.style';

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
      {avatar ? (
        <Item>
          <ImageBox>
            <Image className="avatarBox" src={imgSrc} alt="item" width={25} height={25} priority />
          </ImageBox>
          <Text>{text}</Text>
        </Item>
      ) : (
        <Item>
          <ImageBox>
            <Image src={imgSrc} alt="item" width={25} height={25} priority />
          </ImageBox>
          <Text>{text}</Text>
        </Item>
      )}
      {noti && text === '알림' && <NewNoti />}
      <BorderBottom />
    </Wrapper>
  );
}
