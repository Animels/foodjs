import prisma from '@prismaClient';

const createToken = async (userId: number, accessToken: string, refreshToken: string) => {
  return await prisma.token.create({
    data: {
      userId: userId,
      acessToken: accessToken,
      acessExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
      refreshToken: refreshToken,
      refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
};

const getUserTokens = async (userId: number) => {
  return await prisma.token.findMany({
    where: {
      userId: userId,
    },
  });
};

const deleteUserTokens = async (userId: number) => {
  return await prisma.token.deleteMany({
    where: {
      userId: userId,
    },
  });
};

const deleteExpiredUserTokens = async (userId: number) => {
  const tokens = await prisma.token.findMany({
    where: {
      userId: userId,
    },
  });

  const expiredTokens = tokens.filter((token) => token.refreshExpiresAt < new Date(Date.now()));

  if (expiredTokens) {
    for (let token of expiredTokens) {
      prisma.token.delete({
        where: {
          id: token.id,
        },
      });
    }
  }
};

const updateUserToken = async (tokenId: number, accessToken: string, refreshToken: string) => {
  return await prisma.token.update({
    where: {
      id: tokenId,
    },
    data: {
      acessToken: accessToken,
      acessExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
      refreshToken: refreshToken,
      refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
};

export const tokenRepository = {
  createToken,
  getUserTokens,
  deleteUserTokens,
  updateUserToken,
  deleteExpiredUserTokens,
};
