"use client";
import React from 'react';
import SubjectCard from '@/components/subjects/SubjectCard';
import MilestoneBanner from '@/components/subjects/MilestoneBanner';
import subjectsData from '@/data/subjects.json';

export default function SubjectsPage() {
  return (
    <div className="pb-20">
      <header className="mb-10">
        <h1 className="text-[1.75rem] font-bold text-on-surface mb-2">Explore Your Subjects</h1>
        <p className="text-on-surface-variant">Continue your path or start something new.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {subjectsData.map((subject) => (
          <SubjectCard key={subject.id} {...subject} />
        ))}
      </div>

      <MilestoneBanner />

      <div className="flex justify-center items-center gap-12 pt-10 border-t border-outline-variant/15 text-on-surface-variant">
        <div className="text-center">
          <p className="text-2xl font-bold text-on-surface">24</p>
          <p className="text-[10px] font-bold tracking-widest uppercase">Completed</p>
        </div>
        <div className="h-10 w-px bg-outline-variant/15" />
        <div className="text-center">
          <p className="text-2xl font-bold text-on-surface">85%</p>
          <p className="text-[10px] font-bold tracking-widest uppercase">Avg Score</p>
        </div>
        <div className="h-10 w-px bg-outline-variant/15" />
        <div className="text-center">
          <p className="text-2xl font-bold text-on-surface">12</p>
          <p className="text-[10px] font-bold tracking-widest uppercase">New Skills</p>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}
