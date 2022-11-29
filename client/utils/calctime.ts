export const calcTime = (date: string, type: boolean = false): string => {
  const now: Date = new Date();
  const createdAt: Date = new Date(date);
  if (type) return createdAt.toLocaleString();
  const diff = Number(now) - Number(createdAt);
  let counter = Math.floor(diff / (1000 * 60 * 60 * 24)); // 몇 분, 시간 전 계산
  if (counter > 0) return createdAt.toLocaleDateString();
  counter = Math.floor(diff / (1000 * 60 * 60));
  if (counter > 0) return `${counter}시간 전`;

  return `${Math.floor(diff / (1000 * 60))}분 전`;
};
