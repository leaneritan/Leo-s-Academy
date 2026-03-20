"use client";
import React from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import readingData from '@/data/reading.json';

const CurrentlyReading = () => {
  const { current } = readingData;

  return (
    <section className="mb-8">
      <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-3">CURRENTLY READING</p>
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="w-[60px] h-[90px] bg-primary-container rounded-md flex-shrink-0 flex items-center justify-center text-on-primary-container font-bold text-xl shadow-sm">
            {current.coverInitials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-on-surface truncate">{current.title}</h3>
            <p className="text-xs text-on-surface-variant truncate">by {current.author}</p>
            <p className="text-[10px] text-primary font-bold mt-2 bg-primary-container/10 w-fit px-2 py-0.5 rounded">CH. 14</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold">
            <span className="text-primary">{current.progress}% Complete</span>
            <span className="text-on-surface-variant uppercase tracking-widest">120 / 272 Pages</span>
          </div>
          <ProgressBar value={current.progress} height="h-1" />
        </div>
      </Card>
    </section>
  );
};

export default CurrentlyReading;
