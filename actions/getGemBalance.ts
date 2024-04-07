'use server'

import PrismaClient from '@prisma/client';
import prisma from "@/prisma";

const getGemBalances = async () => {
  const balances = await prisma.gems.findMany();
  return balances;
}

export default getGemBalances;