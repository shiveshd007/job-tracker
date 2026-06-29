'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/applications', label: 'Applications' },
  { href: '/applications/new', label: 'Add application' },
];

export default function Sidebar({
  userEmail,
}: {
  userEmail?: string | null;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-slate-900 text-slate-100 flex flex-col min-h-screen">
      <div className="px-6 py-6 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white">Job Tracker</h2>
        <p className="text-xs text-slate-400 mt-1 truncate">{userEmail}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded text-sm transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full text-left px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}