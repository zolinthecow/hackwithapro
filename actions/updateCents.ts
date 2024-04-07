"use server"
import prisma from "@/prisma";

export async function updateCentsAmountByUserId(userId:string, newAmount:number) {
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
