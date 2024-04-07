'use server'
import prisma from "@/prisma";
import { ulid } from 'ulid';

async function getGemsAmountByUserId(userId:string) {
  let gemsRecord = await prisma.gems.findUnique({
    where: {
      userId: userId,
    },
    select: {
      amount: true, // Select only the amount
    },
  });

  if (gemsRecord == null) {
    gemsRecord = await prisma.gems.create({
      data: {
        id: ulid(),
        amount: 0,
        userId,
      },
    });
  }

  return gemsRecord?.amount || 0;
}

export default getGemsAmountByUserId;