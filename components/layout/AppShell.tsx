"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import BottomNavBar from './BottomNavBar';

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLessonView = pathname?.startsWith('/lesson/');

  if (isLessonView) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavBar />
        <main className="pt-16 pb-20">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <SideNavBar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavBar />
        <main className="pt-24 pb-12 px-6 md:ml-64 max-w-[1280px]">
          <div className="max-w-[960px] mx-auto w-full">
            {children}
          </div>
        </main>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default AppShell;
