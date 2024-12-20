import LoginForm from '@/components/base/login-form';
import { getUser } from '@/actions/get-user';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await getUser();

  if(user) {
    return redirect('/todos');
  }

  return (
    <LoginForm/>
  );
}
