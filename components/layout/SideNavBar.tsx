"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import studentData from '@/data/student.json';

const navItems = [
  { label: 'Home', href: '/dashboard', icon: 'home' },
  { label: 'Subjects', href: '/subjects', icon: 'menu_book' },
  { label: 'Reading', href: '/reading', icon: 'book' },
  { label: 'Teacher Mode', href: '/teacher', icon: 'admin_panel_settings', lock: true },
];

const SideNavBar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-50 hidden md:flex flex-col border-r border-slate-200 z-40">
      <div className="h-16 px-6 flex flex-col justify-center border-b border-slate-100">
        <h1 className="text-xl font-bold tracking-tighter text-teal-800">Leo's Academy</h1>
        <p className="text-sm text-on-surface-variant">Level {studentData.level} {studentData.title}</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 pt-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-on-surface-variant hover:translate-x-1'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.lock && <span className="material-symbols-outlined text-sm opacity-50">lock</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNavBar;
