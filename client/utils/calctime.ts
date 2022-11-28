export const calcTime = (date: string): string => {
  const now: Date = new Date();
  const createdAt: Date = new Date(date);
  let res: string = '';
  const times = [
    {
      time: '시간',
      milliseconds: 1000 * 60 * 60,
    },
    {
      time: '분',
      milliseconds: 1000 * 60,
    },
  ];
  try {
    times.forEach((ms) => {
      const diff = Math.floor((Number(now) - Number(createdAt)) / ms.milliseconds); // 몇 분, 시간 전 계산
      if (diff > 0) {
        res = `${diff}${ms.time} 전`;
        throw Error();
      }
      return false;
    });
  } catch (e) {
    return res;
  }

  return res ?? createdAt.toLocaleString();
};
