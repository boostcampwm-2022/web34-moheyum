import { atom } from 'recoil';

interface AuthedUser {
  logined: boolean;
  userid: string;
  profileimg: string;
  nickname: string;
}

export const defaultAuthedUser: AuthedUser = {
  logined: false,
  userid: '',
  profileimg: '/default-profile.png',
  nickname: '',
};

export const authedUser = atom<AuthedUser>({
  key: 'authedUser',
  default: defaultAuthedUser,
});

export const newNotification = atom({
  key: 'state',
  default: false,
});
