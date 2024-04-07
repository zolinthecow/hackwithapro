'use server'
import prisma from "@/prisma";
const updateClaimTime = async (classTimeId: string) => {
await prisma.classTime.update({
    where: {
        id: classTimeId,
    },
    data: {
        lastClaimedTimeStamp: Date.now()
    },
});
}
export default updateClaimTime;