import createClass from '@/actions/createClass';
import {getSession} from "@auth0/nextjs-auth0";
import AddClassPage from "@/components/add-class/addClassPage";
import {redirect} from "next/navigation";

export default async function Component() {
  const session = await getSession();

  async function redirectToHome() {
    'use server';

    redirect('/');
  }

  return (
    <AddClassPage createClass={createClass} userId={session?.user.sub} redirectToHome={redirectToHome} />
  )
}
