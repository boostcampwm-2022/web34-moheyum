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

export default newsfeedState;
