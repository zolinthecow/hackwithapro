'use server'
import prisma from "@/prisma";
async function getCentsAmountByUserId(userId:string) {
  const centsRecord = await prisma.cents.findUnique({
    where: {
      userId: userId,
    },
    select: {
      amount: true, // Select only the amount
    },
  });

    return centsRecord?.amount || 0;
}

export default getCentsAmountByUserId;