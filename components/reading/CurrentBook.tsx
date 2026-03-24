"use client";
import React from 'react';
import Card from '../ui/Card';
import Link from 'next/link';
import BookCover from './BookCover';

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

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-[#056662] to-[#2f7f7b] p-10 mb-12 border-0" hover={false}>
      {/* Decorative blur orb */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-400/20 blur-[120px] pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
        <BookCover
          titleJapanese={book.titleJapanese}
          coverImage={book.coverImage}
          size="large"
          index={0}
          className="shadow-2xl shadow-black/40"
        />

        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <span className="bg-[#ffb95f] text-[#2a1700] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
              読んでいます中
            </span>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold text-white mb-2 leading-tight drop-shadow-sm">
              {book.titleJapanese}
            </h2>
            <p className="text-xl text-white/80 font-medium">著者: {book.authorJapanese}</p>
          </div>

          <div className="pt-4">
            <Link href={`/reading/${book.id}`}>
              <button className="w-full md:w-auto px-12 py-5 text-xl font-bold bg-white text-[#056662] rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-slow border-0 cursor-pointer">
                読み終わった！
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentBook;
