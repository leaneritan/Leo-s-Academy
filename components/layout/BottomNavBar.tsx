"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/dashboard', icon: 'home' },
  { label: 'Subjects', href: '/subjects', icon: 'menu_book' },
  { label: 'Reading', href: '/reading', icon: 'book' },
  { label: 'Profile', href: '/profile', icon: 'person' },
];

const BottomNavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-t border-slate-100 flex md:hidden items-center justify-around z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
