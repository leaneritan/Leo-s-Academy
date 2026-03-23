"use client";
import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';

interface Props {
  goal?: {
    target: number;
    completed: number;
  };
}

const MonthlyGoal: React.FC<Props> = ({ goal = { target: 2, completed: 1 } }) => {
  const [offset, setOffset] = useState(251);
  const percentage = (goal.completed / goal.target) * 100;

  useEffect(() => {
    // 251 is the circumference of the circle (2 * PI * 40)
    const newOffset = 251 - (percentage / 100) * 251;
    setOffset(newOffset);
  }, [percentage]);

  return (
    <Card className="p-10 text-center mb-10">
      <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-10">今月の目標</p>

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
          <span className="text-3xl font-extrabold text-on-surface">{goal.completed} / {goal.target}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">冊</span>
        </div>
      </div>

      <p className="text-sm font-semibold text-on-surface mb-2">あと少し！</p>
      <p className="text-xs text-on-surface-variant italic">目標を達成するために、もう一冊読みましょう。</p>
    </Card>
  );
};

export default MonthlyGoal;
