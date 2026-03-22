"use client";
import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

const programs = [
  {
    id: 'our-world',
    title: 'Our World',
    description: 'Build vocabulary and grammar through everyday topics with guided levels and units.',
    icon: 'public',
    levels: '4 Levels · 9 Units each',
    color: 'bg-teal-50 text-primary',
    available: true,
  },
  {
    id: 'junior-high',
    title: 'Junior High English',
    description: 'Advanced reading comprehension, essay writing, and literary analysis.',
    icon: 'school',
    levels: 'Coming Soon',
    color: 'bg-slate-100 text-slate-400',
    available: false,
  },
];

export default function EnglishPage() {
  return (
    <div className="pb-20">
      <nav className="flex gap-2 text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest mb-8">
        <Link href="/subjects" className="hover:text-primary transition-colors">Subjects</Link>
        <span>›</span>
        <span className="text-on-surface-variant">English</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
          </div>
          <p className="text-[0.7rem] font-bold tracking-widest uppercase text-primary">Core Subject</p>
        </div>
        <h1 className="text-[1.75rem] font-bold text-on-surface mb-2">English</h1>
        <p className="text-on-surface-variant">Choose your program to start learning.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program) => {
          const cardContent = (
            <Card
              className={`p-8 h-full transition-all ${
                program.available
                  ? 'hover:-translate-y-1 cursor-pointer'
                  : 'opacity-60 grayscale-[0.4]'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${program.color}`}>
                  <span className="material-symbols-outlined text-2xl">{program.icon}</span>
                </div>
                {!program.available && (
                  <span className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-on-surface mb-2">{program.title}</h2>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{program.description}</p>
              <p className="text-[0.7rem] font-bold tracking-widest uppercase text-on-surface-variant/60">
                {program.levels}
              </p>
            </Card>
          );

          return program.available ? (
            <Link key={program.id} href={`/subjects/english/${program.id}`} className="block h-full">
              {cardContent}
            </Link>
          ) : (
            <div key={program.id}>{cardContent}</div>
          );
        })}
      </div>
    </div>
  );
}
