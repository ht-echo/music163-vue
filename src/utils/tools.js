export const getPlayCount = (num) => {
  if (!num) return 0;
  if (num < 10000) {
    return num;
  }
  const numTemp = num / 10000;
  const result = numTemp.toFixed(1) + 'w';
  return result;
};
