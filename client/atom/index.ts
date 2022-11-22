import { atom } from 'recoil';

interface newsfeedType {
  _id: string;
  title: string;
  description: string;
  author: string;
}
const newsfeedState = atom({
  key: 'newsfeed',
  default: [] as newsfeedType[],
});

const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false,
});

export { newsfeedState, isLoggedIn };
