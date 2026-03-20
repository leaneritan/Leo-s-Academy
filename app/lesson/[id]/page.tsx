"use client";
import React, { useState } from 'react';
import LessonHeader from '@/components/lesson/LessonHeader';
import LessonContent from '@/components/lesson/LessonContent';
import QuizView from '@/components/lesson/QuizView';
import GameView from '@/components/lesson/GameView';
import Card from '@/components/ui/Card';
import subjectsData from '@/data/subjects.json';
import Link from 'next/link';

export default function LessonPage({ params }: { params: { id: string } }) {
  const [tab, setTab] = useState<'lesson' | 'quiz' | 'game'>('lesson');

  // Find lesson in data
  let lesson: any = null;
  let subjectName = '';
  for (const s of subjectsData) {
    const l = s.lessons.find(l => l.id === params.id);
    if (l) {
      lesson = l;
      subjectName = s.name;
      break;
    }
  }

  if (!lesson) return <div className="p-20 text-center">Lesson not found.</div>;

  return (
    <div className="min-h-screen bg-background">
      <LessonHeader
        title={lesson.title}
        level={12}
        structure={lesson.structure}
        focus={lesson.focus}
      />

      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <nav className="flex gap-2 text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest mb-8">
          <Link href="/dashboard" className="hover:text-primary transition-colors">Home</Link>
          <span>></span>
          <Link href="/subjects" className="hover:text-primary transition-colors">{subjectName}</Link>
          <span>></span>
          <span className="text-on-surface-variant">{lesson.unit}</span>
          <span>></span>
          <span className="text-on-surface-variant">{lesson.id}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="bg-surface-container rounded-xl p-1 w-fit mb-12 flex items-center">
              <button
                onClick={() => setTab('lesson')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'lesson' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                Lesson
              </button>
              <button
                onClick={() => setTab('quiz')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'quiz' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[20px]">quiz</span>
                Quiz
              </button>
              <button
                onClick={() => setTab('game')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'game' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[20px]">sports_esports</span>
                Game
              </button>
            </div>

            {tab === 'lesson' && <LessonContent content={lesson.content} />}
            {tab === 'quiz' && <QuizView quiz={lesson.content.quiz} />}
            {tab === 'game' && <GameView />}

            {tab === 'lesson' && (
              <div className="mt-16 flex items-center justify-between pt-8 border-t border-outline-variant/15">
                <button className="text-on-surface-variant font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:text-primary transition-colors">
                   <span className="material-symbols-outlined">arrow_back</span>
                   Previous
                </button>
                <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20">
                   Next Lesson
                   <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <section>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-3">TEACHER'S NOTE</h4>
              <Card className="p-8 border-l-4 border-primary">
                <p className="text-on-surface-variant italic leading-relaxed text-lg">
                  "{lesson.content.teacherNote}"
                </p>
              </Card>
            </section>

            <section>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-3">LESSON REWARD</h4>
              <Card className="p-10 text-center bg-tertiary-fixed text-on-tertiary-fixed">
                <p className="text-5xl font-extrabold mb-4">+{lesson.xpReward} XP</p>
                <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-on-tertiary-fixed" />
                </div>
              </Card>
            </section>

            <section>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-3">LEARNING GOALS</h4>
              <Card className="p-8 space-y-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <p className="text-sm font-medium text-on-surface">Construct simple SVO sentences</p>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <p className="text-sm font-medium text-on-surface">Understand Subject-Verb agreement</p>
                </div>
              </Card>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
