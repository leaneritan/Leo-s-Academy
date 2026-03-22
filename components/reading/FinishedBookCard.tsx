"use client";
import React from 'react';
import Card from '../ui/Card';
import Link from 'next/link';

interface Props {
  id: string;
  title: string;
  author: string;
  rating: number;
  review: string;
  language: string;
  coverImage?: string;
}

const FinishedBookCard: React.FC<Props> = ({ id, title, author, rating, review, language, coverImage }) => {
  const initials = title
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/reading/${id}`}>
      <Card className="p-8 flex gap-8 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="w-20 h-28 bg-surface-container rounded-lg flex-shrink-0 flex items-center justify-center text-on-surface-variant font-bold shadow-sm overflow-hidden border border-outline-variant/10">
          {coverImage ? (
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl">{initials}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-on-surface truncate">{title}</h3>
            {language === 'Japanese' && <span className="text-sm">🇯🇵</span>}
          </div>
          <p className="text-sm text-on-surface-variant mb-4">by {author}</p>

          <div className="flex gap-0.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`material-symbols-outlined text-[18px] ${i < rating ? 'text-tertiary fill-1' : 'text-slate-300'}`}>
                star
              </span>
            ))}
          </div>

          <p className="text-on-surface-variant italic leading-relaxed line-clamp-2">&quot;{review}&quot;</p>
        </div>
      </Card>
    </Link>
  );
};

export default FinishedBookCard;
