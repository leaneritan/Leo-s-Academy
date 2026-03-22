"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import readingData from '@/data/reading.json';

interface Book {
  id: string;
  title: string;
  titleJapanese?: string;
  author: string;
  authorJapanese?: string;
  assignedBy?: string;
  progress?: number;
  language: string;
  status: string;
  coverImage?: string;
  rating?: number;
  review?: string;
  dateFinished?: string;
}

const BookDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [status, setStatus] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  useEffect(() => {
    const allBooks = [readingData.current, ...readingData.finished];
    const foundBook = allBooks.find((b: { id: string }) => b.id === params.id) as Book | undefined;
    if (foundBook) {
      setBook(foundBook);
      setStatus(foundBook.status);
      setRating(foundBook.rating || 0);
      setReview(foundBook.review || '');
    }
  }, [params.id]);

  if (!book) return <div className="p-10">Loading...</div>;

  const initials = book.title
    .split(' ')
    .map((word: string) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button
        onClick={() => router.push('/reading')}
        className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] mb-8 hover:underline"
      >
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        Back to Library
      </button>

      <Card className="p-10">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-64 h-96 bg-primary-container rounded-2xl flex-shrink-0 flex items-center justify-center text-on-primary-container font-extrabold text-6xl shadow-2xl overflow-hidden">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Badge variant={book.language === 'Japanese' ? 'secondary' : 'primary'}>
                  {book.language} {book.language === 'Japanese' && '🇯🇵'}
                </Badge>
              </div>

              <div className="bg-surface-container rounded-full p-1 flex">
                <button
                  onClick={() => setStatus('reading')}
                  className={`px-6 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${status === 'reading' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant opacity-50'}`}
                >
                  Reading
                </button>
                <button
                  onClick={() => setStatus('finished')}
                  className={`px-6 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${status === 'finished' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant opacity-50'}`}
                >
                  Finished
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">{book.title}</h1>
              {book.titleJapanese && (
                <h2 className="text-2xl font-bold text-primary/80">{book.titleJapanese}</h2>
              )}
              <div className="pt-2">
                <p className="text-xl text-on-surface-variant font-medium">by {book.author}</p>
                {book.authorJapanese && (
                  <p className="text-lg text-on-surface-variant/70 italic">{book.authorJapanese}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block">Your Rating</label>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className="focus:outline-none transition-transform active:scale-90"
                  >
                    <span className={`material-symbols-outlined text-3xl ${i < rating ? 'text-tertiary fill-1' : 'text-outline-variant'}`}>
                      star
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block">Review & Notes</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="What did you think of the book? (English or Japanese)"
                className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-6 rounded-t-xl focus:ring-0 transition-all text-base min-h-[200px] leading-relaxed"
              />
            </div>

            {book.dateFinished && (
              <div className="flex items-center gap-2 text-on-surface-variant opacity-60">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                <span className="text-xs font-medium">Finished on {book.dateFinished}</span>
              </div>
            )}

            <Button className="w-full py-4 text-sm uppercase tracking-widest font-bold">
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookDetailPage;
