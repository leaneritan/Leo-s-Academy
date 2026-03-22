"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import readingData from '@/data/reading.json';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const book = [readingData.current, ...readingData.finished].find(b => b.id === id);

  const [rating, setRating] = useState(book?.rating || 0);
  const [status, setStatus] = useState(book?.status || 'reading');
  const [review, setReview] = useState(book?.review || "");

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-on-surface mb-4">Book not found</h1>
        <Link href="/reading">
          <Button variant="primary">Back to Library</Button>
        </Link>
      </div>
    );
  }

  const initials = book.title
    .split(' ')
    .map((word: string) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/reading" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline group">
        <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
        Back to Library
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="aspect-[3/4] bg-surface-container rounded-2xl flex items-center justify-center text-on-surface-variant font-extrabold text-6xl shadow-2xl relative overflow-hidden">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
            {book.language === 'Japanese' && (
              <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-3 py-1.5 text-xl shadow-md">
                🇯🇵
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-8 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="bg-primary-container/20 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {book.language}
              </span>
              {book.dateFinished && (
                <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
                  Finished on {book.dateFinished}
                </span>
              )}
            </div>
            <h1 className="text-5xl font-extrabold text-on-surface leading-tight mb-2">{book.title}</h1>
            {book.titleJapanese && <p className="text-2xl text-on-surface-variant font-medium mb-2">{book.titleJapanese}</p>}
            <p className="text-xl text-on-surface-variant font-medium">
              by {book.author} {book.authorJapanese && <span className="opacity-70">({book.authorJapanese})</span>}
            </p>
          </div>

          <Card className="p-8 space-y-8" hover={false}>
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Status</label>
              <div className="bg-surface-container rounded-full p-1 flex">
                <button
                  onClick={() => setStatus('reading')}
                  className={`text-[10px] font-bold uppercase px-6 py-2 rounded-full transition-all ${status === 'reading' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant opacity-50 hover:opacity-100'}`}
                >
                  Reading
                </button>
                <button
                  onClick={() => setStatus('finished')}
                  className={`text-[10px] font-bold uppercase px-6 py-2 rounded-full transition-all ${status === 'finished' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant opacity-50 hover:opacity-100'}`}
                >
                  Finished
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`material-symbols-outlined text-4xl transition-all ${star <= rating ? 'text-tertiary fill-1 scale-110' : 'text-surface-container-highest hover:text-tertiary/40'}`}
                  >
                    star
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block">Review & Notes</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="What did you think of the book?"
                className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-6 rounded-t-xl focus:ring-0 transition-all text-base font-medium min-h-[150px] resize-none leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => router.push('/reading')}>Save Changes</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
