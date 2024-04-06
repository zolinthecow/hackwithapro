'use server'

import prisma from "@/prisma";

export default async function deleteClass(id: string) {
  await prisma.class.delete({
    where: {
      id,
    },
  });
}
