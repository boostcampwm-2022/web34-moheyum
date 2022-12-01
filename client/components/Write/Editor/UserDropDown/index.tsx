import React, { KeyboardEvent, useState } from 'react';
import { DropDown, User } from './index.style';
import COLORS from '../../../../styles/color';
interface Props {
  dropDownDisplay: string;
  dropDownPosition: {
    x: string;
    y: string;
  };
  userList: { userid: string; nickname: string; profileimg: string }[];
  selectUser: number;
}

export default function UserDropDown({ dropDownDisplay, dropDownPosition, userList, selectUser }: Props) {
  return (
    <DropDown
      style={{
        position: 'absolute',
        display: dropDownDisplay,
        left: dropDownPosition.x,
        top: dropDownPosition.y,
      }}
    >
      {userList.map((user, index) =>
        index === selectUser ? (
          <User key={user.userid} style={{ backgroundColor: COLORS.PRIMARY_LIGHT }}>
            {user.userid}
          </User>
        ) : (
          <User key={user.userid} style={{ backgroundColor: COLORS.WHITE }}>
            {user.userid}
          </User>
        )
      )}
    </DropDown>
  );
}
