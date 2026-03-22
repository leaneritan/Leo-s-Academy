"use client";
import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import BookCover from './BookCover';
import readingData from '@/data/reading.json';

const CurrentBook = () => {
  const { current } = readingData;
  return (
    <Card className="p-10 mb-12">
      <div className="flex flex-col md:flex-row gap-10">
        <Link href={`/reading/${current.id}`} className="flex-shrink-0">
          <BookCover
            id={current.id}
            title={current.title}
            coverImage={current.coverImage}
            className="w-48 h-64 shadow-2xl relative group cursor-pointer"
            textClassName="text-4xl"
          />
        </Link>

        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              Assigned by {current.assignedBy}
            </span>
            <div className="bg-surface-container rounded-full p-1 flex">
              <button className="bg-white text-primary text-[10px] font-bold uppercase px-4 py-1 rounded-full shadow-sm">Reading</button>
              <button className="text-on-surface-variant text-[10px] font-bold uppercase px-4 py-1 rounded-full opacity-50">Finished</button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-extrabold text-on-surface mb-2 leading-tight">{current.title}</h2>
              {current.language === 'Japanese' && <span className="text-2xl" title="Japanese">🇯🇵</span>}
            </div>
            <p className="text-lg text-on-surface-variant font-medium">by {current.author}</p>
          </div>

          <div className="flex items-center gap-6">
            <Link href={`/reading/${current.id}`}>
              <Button variant="ghost" className="font-bold uppercase tracking-widest text-xs border border-outline-variant/20 hover:border-primary/40 px-6">
                Write a note
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                <span>Progress</span>
                <span>{current.progress}%</span>
              </div>
              <ProgressBar value={current.progress} height="h-2" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentBook;
