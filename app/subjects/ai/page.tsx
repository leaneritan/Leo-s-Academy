"use client";
import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

const aiLessons = [
  {
    id: 'ai-l1-what-is-ai',
    title: 'What is Artificial Intelligence?',
    description: 'Understanding the basics of AI, how it learns, and where we use it.',
    icon: 'robot',
    emoji: '🤖',
    duration: '20 min',
    xp: '300 XP',
    available: true,
  },
  {
    id: 'ai-l2-machine-learning',
    title: 'Machine Learning Basics',
    description: 'How computers learn from data without being explicitly programmed.',
    icon: 'psychology',
    emoji: '🧠',
    duration: '25 min',
    xp: '400 XP',
    available: false,
  },
  {
    id: 'ai-l3-prompt-engineering',
    title: 'Talking to AI',
    description: 'The art of prompt engineering: how to get the best results from AI.',
    icon: 'chat',
    emoji: '💬',
    duration: '15 min',
    xp: '250 XP',
    available: false,
  },
];

export default function AISubjectPage() {
  return (
    <div className="pb-20">
      <nav className="flex gap-2 text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest mb-8">
        <Link href="/subjects" className="hover:text-[#7c3aed] transition-colors">Subjects</Link>
        <span>›</span>
        <span className="text-on-surface-variant">Artificial Intelligence</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#7c3aed] text-xl">psychology</span>
          </div>
          <p className="text-[0.7rem] font-bold tracking-widest uppercase text-[#7c3aed]">Future Skills</p>
        </div>
        <h1 className="text-[1.75rem] font-bold text-on-surface mb-2">🤖 Artificial Intelligence</h1>
        <p className="text-on-surface-variant">Learn how AI thinks, learns, and creates</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiLessons.map((lesson) => {
          const cardContent = (
            <Card
              className={`p-8 h-full transition-all ${
                lesson.available
                  ? 'hover:-translate-y-1 cursor-pointer border-l-4 border-[#7c3aed]'
                  : 'opacity-60 grayscale-[0.4]'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <span className="text-2xl">{lesson.emoji}</span>
                </div>
                {!lesson.available && (
                  <span className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-on-surface mb-2">{lesson.title}</h2>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{lesson.description}</p>
              <div className="flex gap-4">
                <p className="text-[0.7rem] font-bold tracking-widest uppercase text-on-surface-variant/60">
                  {lesson.duration}
                </p>
                <p className="text-[0.7rem] font-bold tracking-widest uppercase text-[#7c3aed]">
                  {lesson.xp}
                </p>
              </div>
            </Card>
          );

          return lesson.available ? (
            <Link key={lesson.id} href={`/subjects/ai/lessons/${lesson.id}`} className="block h-full">
              {cardContent}
            </Link>
          ) : (
            <div key={lesson.id}>{cardContent}</div>
          );
        })}
      </div>
    </div>
  );
}
