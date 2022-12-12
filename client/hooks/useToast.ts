import { useRecoilState } from 'recoil';
import { toastMessageList } from '../atom';

export default function useToast() {
  const [toastList, setToastList] = useRecoilState(toastMessageList);

  const addMessage = (message: string, key?: string) => {
    const newMessage = { message, key: key ?? `${Math.floor(Math.random() * 13579)}${message}` };
    setToastList([...toastList, newMessage]);
  };

  return { addMessage };
}
