import { getSession } from '@/app/supabase-server';
import AuthUI from './SignInAuthUI';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SignInAuthUI from './SignInAuthUI';

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    return redirect('/');
  }
  return <SignInAuthUI />;
}
