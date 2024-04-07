import prisma from "@/prisma";
import ClaimRewardView from "./ClaimRewardView";
import { getSession } from "@auth0/nextjs-auth0";

export default async function ClaimReward() {
  const session = await getSession();
  const userId = session?.user.sub;
  const classes = await prisma.class.findMany({
    include: {
      location: true,
      classTimes: true,
    },
    where: {
      userId,
    },
  });

  return <ClaimRewardView classes={classes} userId={userId}/>;
}

