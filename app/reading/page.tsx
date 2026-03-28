"use client";
import React, { useEffect, useState, useMemo } from 'react';
import MonthlyGoal from '@/components/reading/MonthlyGoal';
import LibraryShelf from '@/components/reading/LibraryShelf';
import BookDetailPanel from '@/components/reading/BookDetailPanel';
import AddBookModal from '@/components/reading/AddBookModal';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Book {
  id: string;
  title: string;
  titleJapanese: string;
  author: string;
  authorJapanese: string;
  coverImage: string;
  coverColor?: string;
  language: string;
  status: string;
  progress: number;
  rating?: number;
  review?: string;
  dateFinished?: string;
  quizScore?: number;
  genre?: string;
}

interface ReadingData {
  books: Book[];
  monthlyGoal: {
    target: number;
    completed: number;
  };
}

export default function ReadingPage() {
  const [data, setData] = useState<ReadingData | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTeacherMode, setIsTeacherMode] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/reading');
      const json = await res.json();
      setData(json);

      // Default selection to the first reading book if none selected
      if (!selectedBookId) {
        const currentlyReading = json.books.find((b: Book) => b.status === 'reading');
        if (currentlyReading) {
          setSelectedBookId(currentlyReading.id);
        } else if (json.books.length > 0) {
          setSelectedBookId(json.books[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to fetch reading data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const unlocked = localStorage.getItem('teacher_unlocked') === 'true';
    setIsTeacherMode(unlocked);
  }, []);

  const selectedBook = useMemo(() => {
    return data?.books.find(b => b.id === selectedBookId) || null;
  }, [data, selectedBookId]);

  const finishedBooks = useMemo(() => {
    return data?.books.filter(b => b.status === 'finished') || [];
  }, [data]);

  // Fix Monthly Goal calculation: count books finished this month
  const currentMonth = new Date().toISOString().substring(0, 7); // "YYYY-MM"
  const completedThisMonth = useMemo(() => {
    return finishedBooks.filter(b => b.dateFinished?.startsWith(currentMonth)).length;
  }, [finishedBooks, currentMonth]);

  const enrichedGoal = useMemo(() => {
    if (!data) return undefined;
    return {
      ...data.monthlyGoal,
      completed: completedThisMonth
    };
  }, [data, completedThisMonth]);

  const handleAddBook = async (bookData: any) => {
    try {
      const res = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      const res = await fetch(`/api/reading?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        if (selectedBookId === id) setSelectedBookId(null);
        await fetchData();
      }
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  if (!data) return <div className="p-10 text-center">読み込み中...</div>;

  return (
    <div className="max-w-[960px] mx-auto px-4 pb-24">
      {/* PAGE HEADER */}
      <header className="mb-12 pt-8">
        <h1 className="text-4xl font-black text-on-surface mb-2 tracking-tighter flex items-center gap-3">
          図書館 <span className="text-4xl">📚</span>
        </h1>
        <p className="text-on-surface-variant font-medium text-lg">レオの読書記録</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT — MAIN CONTENT */}
        <div className="lg:col-span-8 space-y-12">

          {/* SECTION: 本棚 (The Shelf) */}
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-xl font-bold text-on-surface">本棚</h2>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                {data.books.length} 冊の本
              </span>
            </div>
            <div className="bg-white/40 rounded-3xl p-2 shadow-inner border border-outline-variant/5">
              <LibraryShelf
                books={data.books}
                selectedBookId={selectedBookId || undefined}
                onBookClick={setSelectedBookId}
                onAddClick={() => setIsAddModalOpen(true)}
              />
            </div>
          </section>

          {/* SECTION: 選択した本の詳細 (Selected book detail panel) */}
          <section className="transition-all duration-500 ease-in-out">
            {selectedBook ? (
              <>
                <h2 className="text-xl font-bold text-on-surface mb-4 px-1">選択した本の詳細</h2>
                <BookDetailPanel
                  book={selectedBook}
                  onDelete={handleDeleteBook}
                  onRefresh={fetchData}
                />
              </>
            ) : (
              <div className="p-12 text-center bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/30">
                <p className="text-on-surface-variant italic font-medium">本を選んで詳細を表示します。</p>
              </div>
            )}
          </section>

          {/* SECTION: 読み終わった本 ✓ */}
          {finishedBooks.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-6 px-1 flex items-center gap-2">
                読み終わった本 <span className="text-xl">✓</span>
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {finishedBooks.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => setSelectedBookId(book.id)}
                    className="flex-shrink-0 w-32 group"
                  >
                    <div
                      className="aspect-[2/3] rounded-lg shadow-md mb-3 flex items-center justify-center p-3 text-center relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ backgroundColor: book.coverColor || '#056662' }}
                    >
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={book.titleJapanese} className="absolute inset-0 w-full h-full object-cover" onError={(e) => {(e.target as HTMLImageElement).style.display = "none";}} />
                      ) : (
                        <span className="text-white font-bold text-[10px] leading-tight relative z-10">{book.titleJapanese}</span>
                      )}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/10" />
                    </div>
                    <p className="text-[11px] font-bold text-on-surface line-clamp-1 mb-1">{book.titleJapanese}</p>
                    <div className="flex justify-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined !text-[10px] ${i < (book.rating || 0) ? 'text-amber-500 fill-1' : 'text-slate-200'}`}>
                          star
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT — SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: 今月の目標 */}
          <MonthlyGoal goal={enrichedGoal} />

          {/* Card 2: 本を追加する */}
          <Card className="p-6 bg-primary text-on-primary border-0" hover={false}>
            <h3 className="text-lg font-black mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">auto_stories</span>
              本を追加する
            </h3>
            <p className="text-sm text-on-primary/80 mb-6 font-medium leading-relaxed">
              新しい本を読み始めよう！
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full bg-white text-primary font-bold py-3 shadow-xl shadow-black/10 border-0"
            >
              + 本を追加
            </Button>
          </Card>

          {/* Card 3: 読書のヒント */}
          <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10">
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined !text-xl">lightbulb</span>
              読書のヒント
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
              毎日15分読むだけで、語彙力がぐんぐん上がります。好きな物語を選んで楽しみましょう！
            </p>
          </div>
        </div>
      </div>

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBook}
      />

      {/* FLOATING ACTION BUTTON */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-24 right-8 md:bottom-12 md:right-12 bg-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 group"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
        <span className="absolute right-full mr-4 bg-on-surface text-surface px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          本を追加
        </span>
      </button>
    </div>
  );
}
