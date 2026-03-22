"use client";
import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import BookCover from './BookCover';

interface Props {
  id: string;
  title: string;
  author: string;
  rating: number;
  review: string;
  language: string;
  coverImage?: string | null;
}

const FinishedBookCard: React.FC<Props> = ({ id, title, author, rating, review, language, coverImage }) => {
  return (
    <Link href={`/reading/${id}`} className="block">
      <Card className="p-8 flex gap-8">
        <BookCover
          id={id}
          title={title}
          coverImage={coverImage}
          className="w-20 h-28 flex-shrink-0"
          textClassName="text-xl"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-on-surface mb-1 truncate">{title}</h3>
            {language === 'Japanese' && (
              <span className="text-lg leading-none shrink-0" title="Japanese">🇯🇵</span>
            )}
          </div>
          <p className="text-sm text-on-surface-variant mb-4">by {author}</p>

          <div className="flex gap-0.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`material-symbols-outlined text-[18px] ${i < rating ? 'text-tertiary fill-1' : 'text-slate-300'}`}>
                star
              </span>
            ))}
          </div>

          <p className="text-on-surface-variant italic leading-relaxed line-clamp-2">
            &quot;{review}&quot;
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default FinishedBookCard;
