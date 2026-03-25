'use client';

import Link from 'next/link';

const nav = [
  { href: '/', label: '首页' },
  { href: '/result', label: '结果' },
  { href: '/export', label: '导出' },
  { href: '/share', label: '分享' },
  { href: '/versions', label: '版本管理' },
];

export function AppHeader() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <div className="font-semibold">JobPing AI</div>
        <nav className="flex gap-4 text-sm text-gray-600">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-black">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
