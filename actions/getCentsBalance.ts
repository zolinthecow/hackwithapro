'use server'

import PrismaClient from '@prisma/client';
import prisma from "@/prisma";

const getCentsBalances = async () => {
  const balances = await prisma.cents.findMany();
  return balances;
}

export default getCentsBalances;