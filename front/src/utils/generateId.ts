export const generateId = () => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const getRandSymbol = () => str[Math.floor(Math.random() * str.length)];

  return Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, getRandSymbol).join('')
  ).join('-');
};
