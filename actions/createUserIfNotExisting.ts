import prisma from '@/prisma'
import { ulid } from 'ulid';

export default async function createUserIfNotExisting(userId: string, nickname: string) {
  const prismaUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (prismaUser != null) return;

  await prisma.user.create({
    data: {
      id: userId,
      nickname: nickname,
      gems: {
        create: {
          id: ulid(),
          amount: 0,
        }
      },
      cents: {
        create: {
          id: ulid(),
          amount: 0,
        },
      },
    },
  });
}
