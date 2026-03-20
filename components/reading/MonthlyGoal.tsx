"use client";
import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';
import readingData from '@/data/reading.json';

const MonthlyGoal = () => {
  const [offset, setOffset] = useState(251);
  const { monthlyGoal } = readingData;
  const percentage = (monthlyGoal.completed / monthlyGoal.target) * 100;

  useEffect(() => {
    // 251 is the circumference of the circle (2 * PI * 40)
    const newOffset = 251 - (percentage / 100) * 251;
    setOffset(newOffset);
  }, [percentage]);

  return (
    <Card className="p-10 text-center mb-10">
      <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-10">MONTHLY GOAL</p>

      <div className="relative w-40 h-40 mx-auto mb-10">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="80" cy="80" r="40"
            stroke="#e5e9e9" strokeWidth="8" fill="transparent"
          />
          <circle
            cx="80" cy="80" r="40"
            stroke="#056662" strokeWidth="8" fill="transparent"
            strokeDasharray="251"
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-on-surface">{monthlyGoal.completed}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">BOOK</span>
        </div>
      </div>

      <p className="text-sm font-semibold text-on-surface mb-2">Almost there!</p>
      <p className="text-xs text-on-surface-variant italic">Finish one more book to reach your monthly target.</p>
    </Card>
  );
};

export default MonthlyGoal;
