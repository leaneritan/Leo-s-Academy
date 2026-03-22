"use client";
import React from 'react';
import MonthlyGoal from '@/components/reading/MonthlyGoal';
import GenreChips from '@/components/reading/GenreChips';
import CurrentBook from '@/components/reading/CurrentBook';
import FinishedBookCard from '@/components/reading/FinishedBookCard';
import readingData from '@/data/reading.json';

export default function ReadingPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
      <div className="lg:col-span-4">
        <header className="mb-10 lg:hidden">
          <h1 className="text-4xl font-bold text-on-surface mb-2">My Library</h1>
          <p className="text-on-surface-variant font-medium">Keep track of your reading adventures.</p>
        </header>

        <MonthlyGoal />
        <GenreChips />
      </div>

      <div className="lg:col-span-8">
        <header className="mb-10 hidden lg:block">
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tighter">My Library</h1>
          <p className="text-on-surface-variant font-medium">Keep track of your reading adventures.</p>
        </header>

        <CurrentBook />

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">RECENTLY FINISHED</p>
            <button className="text-primary text-xs font-bold hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {readingData.finished.map((book) => (
              <FinishedBookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
