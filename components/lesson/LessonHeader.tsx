"use client";
import React from 'react';
import Badge from '../ui/Badge';

interface Props {
  title: string;
  level: number;
  structure: string;
  focus: string;
}

const LessonHeader: React.FC<Props> = ({ title, level, structure, focus }) => {
  return (
    <div className="sticky top-16 bg-primary-container text-on-primary-container px-6 py-4 z-40 flex items-center justify-between border-t border-white/10">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        <Badge variant="level">LEVEL {level}</Badge>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-1">Structure</p>
          <p className="text-sm font-semibold">{structure}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-1">Focus</p>
          <p className="text-sm font-semibold">{focus}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;
