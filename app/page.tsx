/**
 * v0 by Vercel.
 * @see https://v0.dev/t/32QtRsCVu75
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Class = {
  id: string;
  name: string;
  description: string;
  location: {
    lat: string;
    lng: string;
  };
};

export default function Component() {
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
            Classes
          </Link>
          <Link
            className="font-medium text-gray-900  dark:text-gray-50"
            href="#"
          >
            Claim Reward
          </Link>
          <Link
            className="font-medium text-gray-900  dark:text-gray-50"
            href="#"
          >
            Buy Raffle
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto container flex flex-col gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Classes</h1>
            <Button size="sm">New Class</Button>
          </div>
          <div className="border rounded-lg divide-y">
            <div className="grid grid-cols-3 items-stretch text-sm">
              <div className="flex items-center justify-center p-4">
                <img
                  alt="Avatar"
                  className="rounded-full object-cover"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '40/40',
                    objectFit: 'cover',
                  }}
                  width="40"
                />
              </div>
              <div className="flex flex-col justify-center p-4">
                <h3 className="font-semibold">Biology 101</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Introduction to Biology
                </p>
              </div>
              <div className="flex flex-col justify-center p-4">
                <h3 className="font-semibold">Room 203</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Science
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 items-stretch text-sm">
              <div className="flex items-center justify-center p-4">
                <img
                  alt="Avatar"
                  className="rounded-full object-cover"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '40/40',
                    objectFit: 'cover',
                  }}
                  width="40"
                />
              </div>
              <div className="flex flex-col justify-center p-4">
                <h3 className="font-semibold">Chemistry 101</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Basic Chemistry Concepts
                </p>
              </div>
              <div className="flex flex-col justify-center p-4">
                <h3 className="font-semibold">Room 205</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chemistry
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 items-stretch text-sm">
              <div className="flex items-center justify-center p-4">
                <img
                  alt="Avatar"
                  className="rounded-full object-cover"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '40/40',
                    objectFit: 'cover',
                  }}
                  width="40"
                />
              </div>
              <div className="flex flex-col justify-center p-4">
                <h3 className="font-semibold">Mathematics 101</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Introduction to Algebra
                </p>
              </div>
              <div className="flex flex-col justify-center p-4">
                <h3 className="font-semibold">Room 207</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Mathematics
                </p>
              </div>
            </div>
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
