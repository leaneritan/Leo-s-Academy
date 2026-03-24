"use client";
import React, { useEffect, useState } from 'react';
import MonthlyGoal from '@/components/reading/MonthlyGoal';
import CurrentBook from '@/components/reading/CurrentBook';
import FinishedBookCard from '@/components/reading/FinishedBookCard';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  titleJapanese: string;
  author: string;
  authorJapanese: string;
  coverImage: string;
  language: string;
  status: string;
  progress: number;
  rating?: number;
  review?: string;
  dateFinished?: string;
}

interface ReadingData {
  books: Book[];
  monthlyGoal: {
    target: number;
    completed: number;
  };
}

export default function ReadingPage() {
  const [data, setData] = useState<ReadingData | null>(null);
  const [isTeacherMode, setIsTeacherMode] = useState(false);

  useEffect(() => {
    fetch('/api/reading')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to fetch reading data:", err));

    const unlocked = localStorage.getItem('teacher_unlocked') === 'true';
    setIsTeacherMode(unlocked);
  }, []);

  if (!data) return <div className="p-10 text-center">読み込み中...</div>;

  const currentBook = data.books.find(b => b.status === 'reading');
  const finishedBooks = data.books.filter(b => b.status === 'finished');

  return (
    <div className="relative min-h-screen">
      {/* PAGE HEADER */}
      <header className="mb-12 p-8 -mx-8 -mt-8 rounded-b-3xl bg-gradient-to-b from-surface-container-low to-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tighter flex items-center gap-3">
              図書館 <span className="text-4xl">📚</span>
            </h1>
            <p className="text-on-surface-variant font-medium text-lg">レオの読書記録</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* RIGHT (Main Column) */}
        <div className="lg:col-span-8 space-y-12">
          {/* CURRENTLY READING */}
          <section>
            <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-6 px-1">
              現在読んでいる本
            </p>
            {currentBook ? (
              <CurrentBook book={currentBook} />
            ) : (
              <div className="p-10 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/30 text-center">
                <p className="text-on-surface-variant italic font-medium">現在読んでいる本はありません。</p>
                <p className="text-xs text-on-surface-variant mt-2">新しい本を読み始めましょう！</p>
              </div>
            )}
          </section>

          {/* FINISHED BOOKS GRID */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-8 flex items-center gap-2">
              読み終わった本 <span className="text-xl">📖</span>
            </h2>

            {finishedBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {finishedBooks.map((book, index) => (
                  <FinishedBookCard key={book.id} {...book} index={index + 1} />
                ))}
              </div>
            ) : (
              <div className="p-10 bg-white/50 rounded-2xl border border-outline-variant/10 text-center italic text-sm text-on-surface-variant">
                読み終わった本はまだありません。
              </div>
            )}
          </section>
        </div>

        {/* LEFT (Sidebar Column) */}
        <div className="lg:col-span-4 order-first lg:order-last">
          <div className="sticky top-24">
            <MonthlyGoal goal={data.monthlyGoal} />

            <div className="hidden lg:block p-6 bg-primary-container/5 rounded-2xl border border-primary/10">
              <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">lightbulb</span>
                読書のヒント
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                毎日15分読むだけで、語彙力がぐんぐん上がります。好きな物語を選んで楽しみましょう！
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BUTTON (Teacher Mode Only) */}
      {isTeacherMode && (
        <Link href="/teacher">
          <button className="fixed bottom-24 right-8 md:bottom-12 md:right-12 bg-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 group">
            <span className="material-symbols-outlined text-3xl">add</span>
            <span className="absolute right-full mr-4 bg-on-surface text-surface px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              本を追加
            </span>
          </button>
        </Link>
      )}
    </div>
  );
}
