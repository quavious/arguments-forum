export const array =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const buildFakeUsername = () => {
  return Array.from({ length: 8 })
    .map(() => {
      let index = Math.round(Math.random() * array.length);
      index = index === array.length ? 0 : index;
      return array[index];
    })
    .reduce((acc, val) => acc + val);
};

export { buildFakeUsername };
