import { atom } from 'recoil';
interface newsPeedType {
  _id: string;
  title: string;
  description: string;
  author: string;
}
const newsPeedState = atom({
  key: 'newsPeed',
  default: [] as newsPeedType[],
});

export default newsPeedState;
