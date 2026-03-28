"use client";
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  titleJapanese: string;
  author: string;
  authorJapanese: string;
  status: string;
  progress: number;
  rating?: number;
  review?: string;
  quizScore?: number;
  coverColor?: string;
  coverImage?: string;
}

interface BookDetailPanelProps {
  book: Book;
  onDelete: (id: string) => Promise<void>;
  onRefresh: () => void;
}

const BookDetailPanel: React.FC<BookDetailPanelProps> = ({ book, onDelete, onRefresh }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(book.id);
    setShowConfirmDelete(false);
    setIsDeleting(false);
  };

  const isFinished = book.status === 'finished';

  return (
    <Card className="p-8 mt-8 border border-outline-variant/10 bg-white" hover={false}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Cover Representation */}
        <div
          className="w-32 h-48 rounded-lg shadow-xl flex items-center justify-center p-4 text-center relative overflow-hidden flex-shrink-0"
          style={{ backgroundColor: book.coverColor || '#056662' }}
        >
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.titleJapanese} className="absolute inset-0 w-full h-full object-cover" onError={(e) => {(e.target as HTMLImageElement).style.display = "none";}} />
          ) : (
            <span className="text-white font-bold text-lg leading-tight relative z-10">{book.titleJapanese}</span>
          )}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/10" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-on-surface">{book.titleJapanese}</h2>
              <p className="text-on-surface-variant font-medium">著者: {book.authorJapanese}</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${isFinished ? 'bg-green-100 text-green-700' : 'bg-primary-container text-on-primary-container'}`}>
              {isFinished ? '読み終わった ✓' : '読んでいます中'}
            </div>
          </div>

          {!isFinished ? (
            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                  <span>進捗</span>
                  <span>{book.progress}%</span>
                </div>
                <ProgressBar value={book.progress} />
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={`/reading/${book.id}`}>
                  <Button className="px-8">読み終わった！</Button>
                </Link>
                <Link href={`/reading/${book.id}`}>
                  <Button variant="ghost" className="border border-primary/20">詳細を見る</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-xl ${i < (book.rating || 0) ? 'text-amber-500 fill-1' : 'text-slate-200'}`}>
                      star
                    </span>
                  ))}
                </div>
                {book.quizScore !== undefined && (
                  <span className="text-sm font-bold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                    クイズ: {book.quizScore}点
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={`/reading/${book.id}`}>
                  <Button variant="ghost" className="border border-primary/20">クイズをもう一度</Button>
                </Link>
                <Link href={`/reading/${book.id}`}>
                  <Button variant="ghost" className="border border-primary/20">感想を見る</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Delete Section */}
          <div className="pt-4 border-t border-outline-variant/10">
            {!showConfirmDelete ? (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="text-red-500 text-sm font-bold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
                本を削除する
              </button>
            ) : (
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm font-bold text-red-700">
                  「{book.titleJapanese}」を削除しますか？この操作は元に戻せません。
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700 text-white border-0 py-2 px-4 text-xs"
                  >
                    {isDeleting ? '削除中...' : '削除する'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowConfirmDelete(false)}
                    className="text-slate-600 hover:bg-slate-100 py-2 px-4 text-xs"
                  >
                    キャンセル
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookDetailPanel;
