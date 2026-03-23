"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Book {
  id: string;
  title: string;
  titleJapanese: string;
  author: string;
  authorJapanese: string;
  coverImage: string;
  language: string;
  status: string;
  progress: number;
  rating?: number;
  review?: string;
  dateFinished?: string;
  quizCompleted?: boolean;
}

const wonderQuiz = [
  {
    question: "Q1: オーガスト（オギー）はなぜ学校に行くのが怖かったですか？",
    options: ["a) 勉強が難しいから", "b) 顔が人と違うから", "c) 友達がいないから", "d) 先生が怖いから"],
    correct: 1
  },
  {
    question: "Q2: オギーの一番の願いは何でしたか？",
    options: ["a) 有名になること", "b) 普通の子どもとして扱われること", "c) 学校を休むこと", "d) 引っ越すこと"],
    correct: 1
  },
  {
    question: "Q3: この本のメインテーマは何ですか？",
    options: ["a) 冒険と戦い", "b) 優しさと受け入れること", "c) スポーツと友情", "d) 学校の勉強"],
    correct: 1
  },
  {
    question: "Q4: ジャックはオギーに対してどんな行動をとりましたか？",
    options: ["a) ずっといじめた", "b) 最初は意地悪だったが、後に本当の友達になった", "c) ずっと無視した", "d) 先生に言いつけた"],
    correct: 1
  }
];

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<number[]>([]);
  const [freeText, setFreeText] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/reading')
      .then(res => res.json())
      .then(data => {
        const found = data.books.find((b: any) => b.id === params.id);
        if (found) {
          setBook(found);
          if (found.status === 'finished') {
             setRating(found.rating || 0);
             setReview(found.review || "");
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  const handleSave = async () => {
    if (rating === 0) {
      alert("評価を選択してください。");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: params.id,
          rating,
          review,
          status: 'finished',
          dateFinished: new Date().toISOString().split('T')[0],
          quizCompleted: true
        }),
      });
      if (response.ok) {
        router.push('/reading');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center">読み込み中...</div>;
  if (!book) return <div className="p-10 text-center">本が見つかりませんでした。</div>;

  const isWonder = book.id === 'wonder';
  const isFinished = book.status === 'finished';

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => router.push('/reading')} className="flex items-center gap-2">
          <span className="material-symbols-outlined">arrow_back</span>
          戻る
        </Button>
      </div>

      <Card className="p-10 mb-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-48 h-64 bg-primary-container rounded-2xl flex-shrink-0 flex items-center justify-center text-on-primary-container font-extrabold text-4xl shadow-2xl relative overflow-hidden">
            {book.coverImage && (
              <img src={book.coverImage} alt={book.titleJapanese} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <span className="relative z-10">{book.titleJapanese.substring(0, 1)}</span>
          </div>
          <div className="flex-1">
             <h1 className="text-4xl font-extrabold text-on-surface mb-2">{book.titleJapanese}</h1>
             <p className="text-xl text-on-surface-variant mb-4">著者: {book.authorJapanese}</p>
             <div className="flex gap-2">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${isFinished ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-primary-container text-on-primary-container'}`}>
                  {isFinished ? '読み終わった' : '読書中'}
                </span>
             </div>
          </div>
        </div>
      </Card>

      {!isFinished && (
        <>
          {isWonder && (
            <section className="mb-10 space-y-8">
              <h2 className="text-2xl font-bold text-on-surface">理解度クイズ</h2>
              {wonderQuiz.map((q, idx) => (
                <Card key={idx} className="p-6">
                  <p className="font-bold mb-4">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          const newAns = [...answers];
                          newAns[idx] = oIdx;
                          setAnswers(newAns);
                        }}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[idx] === oIdx ? 'border-primary bg-primary/5 font-bold' : 'border-outline-variant/10 hover:border-primary/40'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Card>
              ))}

              <Card className="p-6">
                <p className="font-bold mb-4">Q5: この本を読んでどう思いましたか？</p>
                <textarea
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  placeholder="感想を書いてね..."
                  className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium min-h-[120px]"
                />
              </Card>
            </section>
          )}

          <section className="mb-10 space-y-8">
            <h2 className="text-2xl font-bold text-on-surface">評価とレビュー</h2>
            <Card className="p-8">
              <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-4">星評価</p>
              <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                    <span className={`material-symbols-outlined text-4xl ${star <= rating ? 'text-tertiary fill-1' : 'text-outline-variant'}`}>
                      star
                    </span>
                  </button>
                ))}
              </div>

              <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-4">レビュー</p>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="本を読んだ感想を教えてください。"
                className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium min-h-[120px]"
              />
            </Card>

            <Button
              className="w-full py-6 text-2xl font-bold bg-primary text-on-primary rounded-2xl shadow-xl hover:scale-[1.01] active:scale-95 transition-all"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? '保存中...' : '保存する'}
            </Button>
          </section>
        </>
      )}

      {isFinished && (
        <section className="space-y-8">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-on-surface">読書記録</h2>
              {book.dateFinished && <span className="text-on-surface-variant font-medium">読了日: {book.dateFinished}</span>}
            </div>

            <div className="mb-8">
              <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-4">星評価</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined text-3xl ${i < (book.rating || 0) ? 'text-tertiary fill-1' : 'text-outline-variant'}`}>
                    star
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-4">レビュー</p>
              <div className="p-6 bg-surface-container rounded-2xl border border-outline-variant/10 italic text-on-surface leading-relaxed">
                "{book.review}"
              </div>
            </div>
          </Card>

          <Button variant="ghost" className="w-full py-4 text-primary font-bold" onClick={() => router.push('/reading')}>
            図書館に戻る
          </Button>
        </section>
      )}
    </div>
  );
}
