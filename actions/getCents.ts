'use server'
import prisma from "@/prisma";
import { ulid } from 'ulid';

async function getCentsAmountByUserId(userId:string) {
  let centsRecord = await prisma.cents.findUnique({
    where: {
      userId: userId,
    },
    select: {
      amount: true, // Select only the amount
    },
  });

  if (centsRecord == null) {
    centsRecord = await prisma.cents.create({
      data: {
        id: ulid(),
        amount: 0,
        userId,
      },
    });
  }

  return centsRecord?.amount || 0;
}

export default getCentsAmountByUserId;