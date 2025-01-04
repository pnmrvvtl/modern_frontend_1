import Link from 'next/link';
import SignOutButton from '@/components/base/sign-out-button';
import { getUser } from '@/actions/get-user';

const links = [
  { href: '/todos', label: 'All todos' },
  { href: '/todos/new', label: 'Create new todo' },
];

export default async function Header() {
  const user = await getUser();

  return (
    <header className="p-6 bg-secondary border-b border-primary">
      <nav className="flex justify-between items-center">
        <div className="flex space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-lg font-medium text-primary hover:text-white bg-primary/10 hover:bg-primary transition-colors duration-200 px-4 py-2 rounded-lg shadow-sm"
            >
              {label}
            </Link>
          ))}
        </div>

        <SignOutButton user={user}/>
      </nav>
    </header>
  );
}
