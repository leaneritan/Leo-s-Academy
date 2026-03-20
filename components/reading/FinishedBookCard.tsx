"use client";
import React from 'react';
import Card from '../ui/Card';

interface Props {
  title: string;
  author: string;
  rating: number;
  review: string;
}

const FinishedBookCard: React.FC<Props> = ({ title, author, rating, review }) => {
  return (
    <Card className="p-8 flex gap-8">
      <div className="w-20 h-28 bg-slate-100 rounded-lg flex-shrink-0 border border-slate-200" />
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-on-surface mb-1 truncate">{title}</h3>
        <p className="text-sm text-on-surface-variant mb-4">by {author}</p>

        <div className="flex gap-0.5 mb-6">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`material-symbols-outlined text-[18px] ${i < rating ? 'text-tertiary fill-1' : 'text-slate-300'}`}>
              star
            </span>
          ))}
        </div>

        <p className="text-on-surface-variant italic leading-relaxed line-clamp-2">"{review}"</p>
      </div>
    </Card>
  );
};

export default FinishedBookCard;
