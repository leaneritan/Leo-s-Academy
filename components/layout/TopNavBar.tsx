"use client";
import React from 'react';
import Badge from '../ui/Badge';
import studentData from '@/data/student.json';

const TopNavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-[0_12px_32px_-4px_rgba(24,28,29,0.06)] z-50 px-6 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tighter text-teal-800 ">
        Leo's Academy
      </div>
      <div className="flex-1 md:flex-none" />
      <div className="flex items-center gap-4">
        <Badge variant="streak" icon="local_fire_department">
          {studentData.streak}
        </Badge>
        <Badge variant="xp" icon="workspace_premium">
          {studentData.xp} XP
        </Badge>
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-teal-600 text-white font-bold text-sm">L</div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
