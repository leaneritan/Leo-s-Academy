"use client";
import React from 'react';
import Card from '../ui/Card';
import Link from 'next/link';
import BookCover from './BookCover';

interface Props {
  id: string;
  titleJapanese: string;
  authorJapanese: string;
  rating: number;
  review: string;
  coverImage?: string;
  dateFinished?: string;
  index?: number;
}

const FinishedBookCard: React.FC<Props> = ({
  id,
  titleJapanese,
  authorJapanese,
  rating,
  review,
  coverImage,
  dateFinished,
  index = 0
}) => {
  return (
    <Link href={`/reading/${id}`} className="block group">
      <Card className="p-6 h-full flex flex-col items-center bg-white border border-outline-variant/10 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
        <BookCover
          titleJapanese={titleJapanese}
          coverImage={coverImage}
          index={index}
          className="mb-6 w-full max-w-[160px] shadow-lg"
        />

        <div className="w-full text-center space-y-2">
          <h3 className="text-lg font-bold text-on-surface line-clamp-1">{titleJapanese}</h3>
          <p className="text-xs text-on-surface-variant font-medium opacity-70">著者: {authorJapanese}</p>

          <div className="flex justify-center gap-0.5 py-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`material-symbols-outlined text-sm ${i < rating ? 'text-amber-500 fill-1' : 'text-slate-200'}`}>
                star
              </span>
            ))}
          </div>

          <p className="text-xs text-on-surface-variant italic leading-relaxed line-clamp-1 px-2 border-t border-outline-variant/10 pt-3">
            "{review}"
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default FinishedBookCard;
