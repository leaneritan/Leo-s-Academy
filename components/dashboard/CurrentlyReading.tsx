"use client";
import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const CurrentlyReading = () => {
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    fetch('/api/reading')
      .then(res => res.json())
      .then(data => {
        const book = data.books.find((b: any) => b.status === 'reading');
        if (book) setCurrent(book);
      })
      .catch(err => console.error(err));
  }, []);

  if (!current) return null;

  return (
    <section className="mb-8">
      <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-3">現在読んでいる本</p>
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="w-[60px] h-[90px] bg-primary-container rounded-md flex-shrink-0 flex items-center justify-center text-on-primary-container font-bold text-xl shadow-sm relative overflow-hidden">
            {current.coverImage && <img src={current.coverImage} className="absolute inset-0 w-full h-full object-cover" />}
            <span className="relative z-10">{current.titleJapanese.substring(0, 1)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-on-surface truncate">{current.titleJapanese}</h3>
            <p className="text-xs text-on-surface-variant truncate">著者: {current.authorJapanese}</p>
            <p className="text-[10px] text-primary font-bold mt-2 bg-primary-container/10 w-fit px-2 py-0.5 rounded">読書中</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold">
            <span className="text-primary">{current.progress}% 完了</span>
          </div>
          <ProgressBar value={current.progress} height="h-1" />
        </div>
      </Card>
    </section>
  );
};

export default CurrentlyReading;
