export const generateId = () => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const getRandSymbol = () => {
    const index = Math.floor(Math.random() * 100) ;
    if (index > str.length) getRandSymbol();
    return str[index];
  };

  return Array.from({ length: 4 })
    .map(() =>
      Array.from({ length: 4 })
        .map(() => getRandSymbol())
        .join('')
    )
    .join('-');
};
