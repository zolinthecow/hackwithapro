'use server'
import prisma from "@/prisma";
async function getGemsAmountByUserId(userId:string) {
  const gemsRecord = await prisma.gems.findUnique({
    where: {
      userId: userId,
    },
    select: {
      amount: true, // Select only the amount
    },
  });

    return gemsRecord.amount;
}

export default getGemsAmountByUserId;