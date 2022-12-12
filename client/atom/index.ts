import { atom } from 'recoil';
import { ToastMessage } from '../types/Toast';

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

export const toastMessageList = atom<ToastMessage[]>({
  key: 'toast',
  default: [],
});

export const scrollY = atom({
  key: 'scrollY',
  default: 0,
});

export const newsfeedList = atom({
  key: 'newsfeedList',
  default: [],
});

export const historyBack = atom({
  key: 'historyBack',
  default: false,
});
