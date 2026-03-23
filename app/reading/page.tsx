"use client";
import React, { useEffect, useState } from 'react';
import MonthlyGoal from '@/components/reading/MonthlyGoal';
import CurrentBook from '@/components/reading/CurrentBook';
import FinishedBookCard from '@/components/reading/FinishedBookCard';

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

  useEffect(() => {
    fetch('/api/reading')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to fetch reading data:", err));
  }, []);

  if (!data) return <div className="p-10 text-center">読み込み中...</div>;

  const currentBook = data.books.find(b => b.status === 'reading');
  const finishedBooks = data.books.filter(b => b.status === 'finished');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
      <div className="lg:col-span-4">
        <header className="mb-10 lg:hidden">
          <h1 className="text-4xl font-bold text-on-surface mb-2">図書館</h1>
          <p className="text-on-surface-variant font-medium">読書の記録をつけよう。</p>
        </header>

        <MonthlyGoal goal={data.monthlyGoal} />
      </div>

      <div className="lg:col-span-8">
        <header className="mb-10 hidden lg:block">
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tighter">図書館</h1>
          <p className="text-on-surface-variant font-medium">読書の記録をつけよう。</p>
        </header>

        <section className="mb-12">
          <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-6">現在読んでいる本</p>
          {currentBook ? (
            <CurrentBook book={currentBook} />
          ) : (
            <p className="text-on-surface-variant italic">現在読んでいる本はありません。</p>
          )}
        </section>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">読み終わった本</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {finishedBooks.length > 0 ? (
              finishedBooks.map((book) => (
                <FinishedBookCard key={book.id} {...book} />
              ))
            ) : (
              <p className="text-on-surface-variant italic text-sm">読み終わった本はまだありません。</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
