import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-10 bg-secondary border-b border-primary">
      <Link href={'/sign-in'}>Sign In</Link>
    </header>
  );
}