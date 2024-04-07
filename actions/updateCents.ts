"use server"
import prisma from "@/prisma";
import { ulid } from 'ulid';

async function updateCentsAmountByUserId(userId:string, newAmount:number) {
  const updatedCentsRecord = await prisma.cents.upsert({
    where: {
      userId: userId,
    },
    create: {
      amount: newAmount,
      id: ulid(),
      userId,
    },
    update: {
      amount: newAmount,
    },
  });

  return updatedCentsRecord;
}

export default updateCentsAmountByUserId;