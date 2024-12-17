import Link from 'next/link';

const links = [
  { href: '/todos', label: 'All todos' },
  { href: '/todos/new', label: 'Create new todo' },
];

export default function Header() {
  return (
    <header className="p-10 bg-secondary border-b border-primary">
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className="mr-4 underline">{label}</Link>
      )) }
    </header>
  );
}