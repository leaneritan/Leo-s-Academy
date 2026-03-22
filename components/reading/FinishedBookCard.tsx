"use client";
import React from 'react';
import Card from '../ui/Card';
import Link from 'next/link';

interface Props {
  id: string;
  titleJapanese: string;
  authorJapanese: string;
  rating: number;
  review: string;
  coverImage?: string;
  dateFinished?: string;
}

const FinishedBookCard: React.FC<Props> = ({ id, titleJapanese, authorJapanese, rating, review, coverImage, dateFinished }) => {
  const initials = titleJapanese.substring(0, 1);

  return (
    <Link href={`/reading/${id}`}>
      <Card className="p-8 flex gap-8 hover:bg-surface-container-low transition-colors cursor-pointer group">
        <div className="w-20 h-28 bg-primary-container rounded-lg flex-shrink-0 border border-outline-variant/10 overflow-hidden relative flex items-center justify-center font-bold text-on-primary-container">
          {coverImage && (
            <img
              src={coverImage}
              alt={titleJapanese}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <span className="relative z-10">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-on-surface mb-1 truncate">{titleJapanese}</h3>
          <p className="text-sm text-on-surface-variant mb-2">著者: {authorJapanese}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`material-symbols-outlined text-[18px] ${i < rating ? 'text-tertiary fill-1' : 'text-slate-300'}`}>
                  star
                </span>
              ))}
            </div>
            {dateFinished && (
              <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                読了日: {dateFinished}
              </span>
            )}
          </div>

          <p className="text-on-surface-variant italic leading-relaxed line-clamp-2">"{review}"</p>
        </div>
      </Card>
    </Link>
  );
};

export default FinishedBookCard;
