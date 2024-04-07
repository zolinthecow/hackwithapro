"use server"
import prisma from "@/prisma";

export async function updateGemsAmountByUserId(userId:string, newAmount:number) {
  const updatedGemsRecord = await prisma.gems.update({
    where: {
      userId: userId,
    },
    data: {
      amount: newAmount,
    },
  });

  return updatedGemsRecord;
}
