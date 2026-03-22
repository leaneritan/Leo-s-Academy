"use client";
import React from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import readingData from '@/data/reading.json';
import Link from 'next/link';

const CurrentBook = () => {
  const { current } = readingData;
  const initials = current.title
    .split(' ')
    .map((word: string) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <Card className="p-10 mb-12">
      <div className="flex flex-col md:flex-row gap-10">
        <Link href={`/reading/${current.id}`} className="w-48 h-64 bg-primary-container rounded-2xl flex-shrink-0 flex items-center justify-center text-on-primary-container font-extrabold text-4xl shadow-2xl relative overflow-hidden group">
          {current.coverImage ? (
            <img src={current.coverImage} alt={current.title} className="w-full h-full object-cover" />
          ) : (
            <span>{initials}</span>
          )}
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl">open_in_new</span>
          </div>
          {current.language === 'Japanese' && (
            <div className="absolute top-2 right-2 bg-white/90 rounded-md px-2 py-1 text-sm shadow-sm">
              🇯🇵
            </div>
          )}
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
            <h2 className="text-4xl font-extrabold text-on-surface mb-2 leading-tight">{current.title}</h2>
            {current.titleJapanese && <p className="text-lg text-on-surface-variant mb-1 font-medium">{current.titleJapanese}</p>}
            <p className="text-lg text-on-surface-variant font-medium">
              by {current.author} {current.authorJapanese && <span className="text-sm opacity-70">({current.authorJapanese})</span>}
            </p>
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
