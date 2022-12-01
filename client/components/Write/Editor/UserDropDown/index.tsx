import React from 'react';
import { DropDown, User } from './index.style';
interface Props {
  dropDownDisplay: string;
  dropDownPosition: {
    x: string;
    y: string;
  };
  userList: { userid: string; nickname: string; profileimg: string }[];
}

export default function UserDropDown({ dropDownDisplay, dropDownPosition, userList }: Props) {
  return (
    <DropDown
      style={{
        position: 'absolute',
        display: dropDownDisplay,
        left: dropDownPosition.x,
        top: dropDownPosition.y,
      }}
    >
      {userList.map((user) => (
        <User key={user.userid}>{user.userid}</User>
      ))}
    </DropDown>
  );
}
