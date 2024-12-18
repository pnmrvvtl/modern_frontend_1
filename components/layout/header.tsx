import Link from 'next/link';

const links = [
  { href: '/todos', label: 'All todos' },
  { href: '/todos/new', label: 'Create new todo' },
];

export default function Header() {
  return (
    <header className="p-6 bg-secondary border-b border-primary shadow-md">
      <nav className="flex space-x-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-lg font-medium text-primary hover:text-white bg-primary/10 hover:bg-primary transition-colors duration-200 px-4 py-2 rounded-lg shadow-sm"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
