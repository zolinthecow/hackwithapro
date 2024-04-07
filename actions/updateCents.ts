"use server"
import prisma from "@/prisma";

async function updateCentsAmountByUserId(userId:string, newAmount:number) {
  const updatedCentsRecord = await prisma.cents.update({
    where: {
      userId: userId,
    },
    data: {
      amount: newAmount,
    },
  });

  return updatedCentsRecord;
}

export default updateCentsAmountByUserId;