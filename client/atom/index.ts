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

export const scrollHandle = atom({
  key: 'scrollHandle',
  default: { scrollY: 0, historyBack: false, nextPageId: 'START' },
});

export const newsfeedList = atom({
  key: 'newsfeedList',
  default: [],
});
