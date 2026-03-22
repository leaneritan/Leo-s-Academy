"use client";
import React, { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BookCover from '@/components/reading/BookCover';
import readingData from '@/data/reading.json';

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Find book in current or finished
  const book = useMemo(() => {
    return id === readingData.current.id
      ? readingData.current
      : readingData.finished.find(b => b.id === id);
  }, [id]);

  const [status, setStatus] = useState(book?.status || 'reading');
  const [rating, setRating] = useState(book?.rating || 0);
  const [review, setReview] = useState(book?.review || "");

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-2xl font-bold text-on-surface mb-4">Book not found</h1>
        <Button onClick={() => router.push('/reading')}>Back to Library</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <button
            onClick={() => router.push('/reading')}
            className="flex items-center gap-2 text-primary font-bold hover:underline mb-4 group"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Library
          </button>
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tighter">Book Details</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 flex justify-center md:justify-start">
          <BookCover
            id={book.id}
            title={book.title}
            coverImage={book.coverImage}
            className="w-full max-w-[280px] aspect-[2/3] text-6xl"
          />
        </div>

        <div className="md:col-span-8 space-y-10">
          <section>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h2 className="text-3xl font-extrabold text-on-surface leading-tight">{book.title}</h2>
              {book.language === 'Japanese' && <span className="text-2xl" title="Japanese">🇯🇵</span>}
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest">
                {book.language}
              </span>
            </div>
            {book.titleJapanese && book.titleJapanese !== book.title && (
              <p className="text-xl text-on-surface-variant mb-4 font-medium">{book.titleJapanese}</p>
            )}

            <p className="text-xl text-on-surface-variant font-medium">by {book.author}</p>
            {book.authorJapanese && book.authorJapanese !== book.author && (
              <p className="text-base text-on-surface-variant/70 font-medium">{book.authorJapanese}</p>
            )}
          </section>

          <Card className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div>
                <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-4">Status</label>
                <div className="inline-flex bg-surface-container rounded-full p-1">
                  <button
                    onClick={() => setStatus('reading')}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${status === 'reading' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant opacity-50'}`}
                  >
                    Reading
                  </button>
                  <button
                    onClick={() => setStatus('finished')}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${status === 'finished' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant opacity-50'}`}
                  >
                    Finished
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-4">My Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="group transition-transform hover:scale-125 focus:outline-none"
                    >
                      <span className={`material-symbols-outlined text-3xl ${star <= rating ? 'text-tertiary fill-1' : 'text-outline-variant/30'}`}>
                        star
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-4">Reviews & Notes</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="What did you think of this book? (Supports English & Japanese)"
                className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-6 rounded-t-xl focus:ring-0 transition-all text-sm leading-relaxed min-h-[160px] font-medium"
              />
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <p className="text-[10px] text-on-surface-variant/60 font-medium italic">
                   {book.dateFinished ? `Finished on ${book.dateFinished}` : 'Last read recently'}
                 </p>
                 <Button className="px-8 py-2.5 text-xs font-bold uppercase tracking-widest">Save Changes</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
