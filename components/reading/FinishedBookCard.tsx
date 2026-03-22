"use client";
import React from 'react';
import Card from '../ui/Card';
import Link from 'next/link';

interface Props {
  id: string;
  title: string;
  titleJapanese?: string;
  author: string;
  authorJapanese?: string;
  rating: number;
  review: string;
  coverImage?: string;
  language?: string;
}

const FinishedBookCard: React.FC<Props> = ({ id, title, titleJapanese, author, authorJapanese, rating, review, coverImage, language }) => {
  const initials = title
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <Link href={`/reading/${id}`}>
      <Card className="p-8 flex gap-8">
        <div className="w-20 h-28 bg-surface-container rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden">
          {coverImage ? (
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-on-surface-variant font-bold text-xl">{initials}</span>
          )}
          {language === 'Japanese' && (
            <div className="absolute top-1 right-1 bg-white/90 rounded px-1 py-0.5 text-[10px] shadow-sm">
              🇯🇵
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-xl font-bold text-on-surface truncate">{title}</h3>
          </div>
          {titleJapanese && <p className="text-xs text-on-surface-variant mb-1">{titleJapanese}</p>}
          <p className="text-sm text-on-surface-variant mb-4">by {author} {authorJapanese && <span className="text-xs opacity-70">({authorJapanese})</span>}</p>

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
