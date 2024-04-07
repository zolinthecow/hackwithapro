"use server"
import prisma from "@/prisma";
import { ulid } from 'ulid';


async function updateGemsAmountByUserId(userId:string, newAmount:number) {
  const updatedGemsRecord = await prisma.gems.upsert({
    where: {
      userId: userId,
    },
    create: {
      id: ulid(),
      amount: newAmount,
      userId,
    },
    update: {
      amount: newAmount,
    },
  });

  return updatedGemsRecord;
}

export default updateGemsAmountByUserId;