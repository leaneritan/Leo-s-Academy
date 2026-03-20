"use client";
import React from 'react';
import studentData from '@/data/student.json';

const HeroHeader = () => {
  const dateStr = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div>
        <h1 className="text-4xl font-bold text-on-surface mb-2">
          Good afternoon, {studentData.name}! 👋
        </h1>
        <p className="text-on-surface-variant font-medium tracking-tight">
          {dateStr}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-[0_12px_32px_-4px_rgba(24,28,29,0.06)] flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
          <span className="material-symbols-outlined text-on-tertiary-fixed">local_fire_department</span>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Daily Streak</p>
          <p className="text-xl font-bold text-on-surface">{studentData.streak} Days Hot!</p>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
