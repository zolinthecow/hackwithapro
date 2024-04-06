import prisma from "@/prisma";
import ClaimRewardView from "./ClaimRewardView";

export default async function ClaimReward() {
  const classes = await prisma.class.findMany({
    include: {
      location: true,
      classTimes: true,
    },
  });

  return <ClaimRewardView classes={classes}/>;
}

