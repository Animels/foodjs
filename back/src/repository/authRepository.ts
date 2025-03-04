import prisma from "@prismaClient";

const createUser = async (email: string, password: string) => {
  await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });
};

const findUser = async ({email, id}: {email?: string; id?: number}) => {
  if (id) {
    return await prisma.user.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }

  return await prisma.user.findFirstOrThrow({
    where: {
      email: email,
    },
  });
};

export const authRepository = {
  createUser,
  findUser,
};
