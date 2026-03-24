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
  const isGoalReached = goal.completed >= goal.target;

  useEffect(() => {
    // 251 is the circumference of the circle (2 * PI * 40)
    const newOffset = 251 - (Math.min(percentage, 100) / 100) * 251;
    setOffset(newOffset);
  }, [percentage]);

  return (
    <Card className="p-10 text-center mb-10 overflow-hidden relative">
      <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-10">今月の目標</p>

      <div className="relative w-40 h-40 mx-auto mb-10 group">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="80" cy="80" r="40"
            stroke="#e5e9e9" strokeWidth="10" fill="transparent"
          />
          <circle
            cx="80" cy="80" r="40"
            stroke={isGoalReached ? "#805000" : "#056662"}
            strokeWidth="10" fill="transparent"
            strokeDasharray="251"
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isGoalReached ? (
            <span className="text-5xl animate-bounce">🏆</span>
          ) : (
            <>
              <span className="text-3xl font-extrabold text-on-surface">{goal.completed} / {goal.target}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">冊</span>
            </>
          )}
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-lg font-bold text-on-surface mb-2">
          {isGoalReached ? "目標達成！ おめでとう！ 📖" : "あと少し！"}
        </p>
        <p className="text-sm text-on-surface-variant italic">
          {isGoalReached
            ? "素晴らしいです！さらに新しい本に挑戦しましょう。"
            : "目標を達成するために、もう一冊読みましょう。"}
        </p>
      </div>

      {isGoalReached && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-0 left-0 animate-pulse text-2xl">✨</div>
          <div className="absolute bottom-0 right-0 animate-pulse text-2xl">✨</div>
        </div>
      )}
    </Card>
  );
};

export default MonthlyGoal;
