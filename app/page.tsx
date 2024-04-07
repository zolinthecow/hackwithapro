import Link from 'next/link';
import Image from 'next/image';
import prisma from "@/prisma";
import { Button } from '@/components/ui/button';

import avatar1 from '@/assets/images/avatar1.jpeg';
import avatar2 from '@/assets/images/avatar2.jpeg';
import avatar3 from '@/assets/images/avatar3.jpeg';
import avatar4 from '@/assets/images/avatar4.jpeg';
import avatar5 from '@/assets/images/avatar5.jpeg';
import avatar6 from '@/assets/images/avatar6.jpeg';
import {getSession} from "@auth0/nextjs-auth0";

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export default async function Component() {
  const user = await getSession();

  const classes = await prisma.class.findMany({
    include: {
      location: true,
      classTimes: true,
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 flex items-center h-14 gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link className="flex items-center gap-2" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">Table 7 :)</span>
        </Link>
        <nav className="flex items-center gap-4 ml-auto">
          <Link
            className="font-medium text-gray-900  dark:text-gray-50"
            href="#"
          >
            <div className="tab-button">
            Classes
            </div>
          </Link>
          <Link
            className="font-medium text-gray-900  dark:text-gray-50"
            href="/claimReward"
          >
            <div className="tab-button">
            Claim Reward
            </div>
          </Link>
          <Link
            className="font-medium text-gray-900  dark:text-gray-50"
            href="/RedeemRaffle"
          >
            <div className="tab-button">
            Buy Raffle
            </div>
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto container flex flex-col gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Classes</h1>
            <Button size={"sm"} asChild>
              <Link href={"add-class"}>
                New Class
              </Link>
            </Button>
          </div>
          <div className="border rounded-lg divide-y">
            {classes.map((classInfo, idx) => (
              <div key={classInfo.id} className="grid grid-cols-3 items-stretch text-sm">
                <div className="flex items-center justify-center p-4">
                  <Image src={avatarImages[idx]} alt={classInfo.name} height={40} width={40} objectFit={'cover'} className="rounded-full object-cover" />
                </div>
                <div className="flex flex-col justify-center p-4">
                  <h3 className="font-semibold">{classInfo.name}</h3>
                </div>
                <div className="flex flex-col justify-center p-4">
                  <h3 className="font-semibold">{classInfo.location?.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// @ts-expect-error for now
function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
