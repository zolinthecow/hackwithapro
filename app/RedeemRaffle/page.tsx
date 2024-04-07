import createClass from '@/actions/createClass';
import {getSession} from "@auth0/nextjs-auth0";
import RedeemRaffle from "@/app/RedeemRaffle/RedeemRaffle";

export default async function Component() {
  const session = await getSession();

  return (
    <RedeemRaffle userId={session?.user.sub}/>
  )
}
