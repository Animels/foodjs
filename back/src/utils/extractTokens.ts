export const extractTokens = (header: string) => {
  return Object.fromEntries(header.split('; ').map((pair) => pair.split('=').map((v) => v.trim())));
};
