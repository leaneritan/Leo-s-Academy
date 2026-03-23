"use client";
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
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
}

interface Props {
  book?: Book;
}

const CurrentBook: React.FC<Props> = ({ book }) => {
  if (!book) return null;

  const initials = book.titleJapanese.substring(0, 2);

  return (
    <Card className="p-10 mb-12">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-48 h-64 bg-primary-container rounded-2xl flex-shrink-0 flex items-center justify-center text-on-primary-container font-extrabold text-4xl shadow-2xl relative overflow-hidden group">
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.titleJapanese}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <span className="relative z-10">{initials}</span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
            <span className="material-symbols-outlined text-5xl">open_in_new</span>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              読んでいます中
            </span>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold text-on-surface mb-2 leading-tight">{book.titleJapanese}</h2>
            <p className="text-lg text-on-surface-variant font-medium">著者: {book.authorJapanese}</p>
          </div>

          <div className="flex items-center gap-6">
            <Link href={`/reading/${book.id}`} className="w-full">
              <Button className="w-full py-4 text-xl font-bold bg-primary text-on-primary rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
                読み終わった！
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentBook;
