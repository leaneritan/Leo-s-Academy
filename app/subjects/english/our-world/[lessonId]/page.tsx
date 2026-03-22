"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ourWorldData from '@/data/our-world.json';

type Grammar = {
  id: string;
  number: number;
  title: string;
  comingSoon: boolean;
  breadcrumb?: string;
  vocabulary?: { word: string; emoji: string }[];
  chart?: {
    rows: { question: string; answer: string }[];
    notes: string[];
  };
  examples?: { question: string; answer: string }[];
  quiz?: { question: string; options: string[]; correct: number }[];
  gameSentences?: string[][];
};

// ─── find lesson ─────────────────────────────────────────────────────────────
function findLesson(lessonId: string) {
  for (const level of ourWorldData.levels) {
    for (const unit of level.units) {
      for (const grammar of unit.grammars as Grammar[]) {
        if (grammar.id === lessonId) return { grammar, unit, level };
      }
    }
  }
  return null;
}

// ─── Grammar Chart ────────────────────────────────────────────────────────────
function GrammarChart({ chart }: { chart: Grammar['chart'] }) {
  if (!chart) return null;
  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_8px_24px_-4px_rgba(5,102,98,0.18)] mb-8">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary text-on-primary">
            <th className="py-4 px-6 text-left font-bold tracking-wide">Question</th>
            <th className="py-4 px-6 text-left font-bold tracking-wide">Answer</th>
          </tr>
        </thead>
        <tbody>
          {chart.rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'}
            >
              <td className="py-4 px-6 font-semibold text-on-surface">{row.question}</td>
              <td className="py-4 px-6 text-on-surface-variant">{row.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-primary/8 px-6 py-3 flex flex-wrap gap-4">
        {chart.notes.map((note, i) => (
          <span key={i} className="text-[0.75rem] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Lesson Tab ───────────────────────────────────────────────────────────────
function LessonTab({ grammar }: { grammar: Grammar }) {
  return (
    <div>
      <h3 className="text-[0.7rem] font-bold tracking-widest uppercase text-on-surface-variant mb-4">
        Grammar Chart
      </h3>
      <GrammarChart chart={grammar.chart} />

      {grammar.vocabulary && (
        <>
          <h3 className="text-[0.7rem] font-bold tracking-widest uppercase text-on-surface-variant mb-4 mt-8">
            Vocabulary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
            {grammar.vocabulary.map((item) => (
              <div
                key={item.word}
                className="bg-surface-container-lowest rounded-2xl p-4 text-center shadow-[0_4px_12px_-2px_rgba(24,28,29,0.07)] hover:-translate-y-0.5 transition-transform"
              >
                <span className="text-3xl block mb-2">{item.emoji}</span>
                <p className="text-sm font-semibold text-on-surface">{item.word}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {grammar.examples && (
        <>
          <h3 className="text-[0.7rem] font-bold tracking-widest uppercase text-on-surface-variant mb-4 mt-8">
            Example Sentences
          </h3>
          <div className="space-y-3">
            {grammar.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-2xl px-6 py-4 shadow-[0_4px_12px_-2px_rgba(24,28,29,0.06)] flex items-start gap-4"
              >
                <span className="text-[0.65rem] font-bold text-primary/50 w-5 mt-1 shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-on-surface text-sm">{ex.question}</p>
                  <p className="text-on-surface-variant text-sm mt-0.5">{ex.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Quiz Tab ─────────────────────────────────────────────────────────────────
function QuizTab({ quiz }: { quiz: NonNullable<Grammar['quiz']> }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quiz[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < quiz.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / quiz.length) * 100);
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <span className="text-6xl block mb-5">{pct === 100 ? '🏆' : pct >= 60 ? '🎉' : '💪'}</span>
        <h2 className="text-3xl font-bold text-on-surface mb-2">Quiz Complete!</h2>
        <p className="text-on-surface-variant mb-8 text-lg">
          You scored <strong>{score}</strong> out of <strong>{quiz.length}</strong>
        </p>
        <div className="bg-tertiary-fixed text-on-tertiary-fixed p-6 rounded-2xl mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-1">XP Reward</p>
          <p className="text-4xl font-extrabold">+{score * 150} XP</p>
        </div>
        <button
          onClick={handleRestart}
          className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Progress dots */}
      <div className="flex items-center gap-2 justify-center mb-8">
        {quiz.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${
              i < current
                ? 'w-6 h-2 bg-primary'
                : i === current
                ? 'w-8 h-2 bg-primary'
                : 'w-2 h-2 bg-surface-container-high'
            }`}
          />
        ))}
      </div>

      <p className="text-center text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-3">
        Question {current + 1} of {quiz.length}
      </p>
      <h2 className="text-2xl font-bold text-on-surface mb-8 text-center leading-snug">{q.question}</h2>

      <div className="grid grid-cols-1 gap-3 mb-8">
        {q.options.map((opt, i) => {
          let style =
            'bg-surface-container-lowest hover:bg-surface-container shadow-[0_2px_8px_-2px_rgba(24,28,29,0.08)]';
          if (selected !== null) {
            if (i === q.correct)
              style = 'bg-green-50 border-green-500 text-green-800 shadow-none';
            else if (i === selected)
              style = 'bg-red-50 border-red-400 text-red-700 shadow-none';
            else style = 'opacity-40 bg-slate-50 shadow-none';
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-5 rounded-2xl border-2 border-transparent text-left flex items-center gap-4 font-semibold text-sm transition-all ${style}`}
            >
              <span className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold text-on-surface-variant shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {selected !== null && i === q.correct && (
                <span className="material-symbols-outlined text-green-600 ml-auto text-xl">check_circle</span>
              )}
              {selected !== null && i === selected && i !== q.correct && (
                <span className="material-symbols-outlined text-red-500 ml-auto text-xl">cancel</span>
              )}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25"
        >
          {current + 1 < quiz.length ? 'Next Question' : 'Finish Quiz'}
        </button>
      )}
    </div>
  );
}

// ─── Game Tab ─────────────────────────────────────────────────────────────────
function GameTab({ sentences }: { sentences: NonNullable<Grammar['gameSentences']> }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userWords, setUserWords] = useState<string[]>([]);
  const [correct, setCorrect] = useState(false);
  const [completed, setCompleted] = useState(0);

  const target = sentences[currentIdx];

  // Shuffle once per sentence (stable via useMemo keyed to currentIdx)
  const shuffled = useMemo(() => {
    return [...target].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  // Words still available to tap
  const available = useMemo(() => {
    const used = [...userWords];
    return shuffled.filter((w) => {
      const idx = used.indexOf(w);
      if (idx !== -1) {
        used.splice(idx, 1);
        return false;
      }
      return true;
    });
  }, [shuffled, userWords]);

  const handleTap = (word: string) => {
    const next = [...userWords, word];
    setUserWords(next);
    if (next.join(' ') === target.join(' ')) {
      setCorrect(true);
      setCompleted((c) => c + 1);
    }
  };

  const handleReset = () => {
    setUserWords([]);
    setCorrect(false);
  };

  const handleNext = () => {
    if (currentIdx + 1 < sentences.length) {
      setCurrentIdx(currentIdx + 1);
      setUserWords([]);
      setCorrect(false);
    }
  };

  const allDone = completed === sentences.length;

  if (allDone) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <span className="text-6xl block mb-5">🎮</span>
        <h2 className="text-3xl font-bold text-on-surface mb-2">Game Complete!</h2>
        <p className="text-on-surface-variant mb-8">You built all {sentences.length} sentences correctly!</p>
        <div className="bg-tertiary-fixed text-on-tertiary-fixed p-6 rounded-2xl mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-1">XP Reward</p>
          <p className="text-4xl font-extrabold">+{sentences.length * 50} XP</p>
        </div>
        <button
          onClick={() => {
            setCurrentIdx(0);
            setUserWords([]);
            setCorrect(false);
            setCompleted(0);
          }}
          className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 text-center">
      <h2 className="text-2xl font-bold text-on-surface mb-2">Word Scramble</h2>
      <p className="text-on-surface-variant text-sm mb-2">
        Tap the words in the correct order to build the sentence.
      </p>
      <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant/50 mb-8">
        Sentence {currentIdx + 1} of {sentences.length}
      </p>

      {/* Drop zone */}
      <div
        className={`rounded-3xl min-h-[80px] p-6 mb-6 flex flex-wrap gap-3 justify-center items-center transition-all ${
          correct
            ? 'bg-green-50 border-2 border-green-400'
            : 'bg-surface-container-low border-2 border-dashed border-outline-variant/25'
        }`}
      >
        {userWords.length === 0 ? (
          <p className="text-on-surface-variant/40 text-sm font-medium">Tap words below to build the sentence</p>
        ) : (
          userWords.map((w, i) => (
            <span
              key={i}
              className={`px-5 py-2 rounded-xl font-bold text-lg shadow-md transition-all ${
                correct ? 'bg-green-500 text-white' : 'bg-primary text-on-primary'
              }`}
            >
              {w}
            </span>
          ))
        )}
      </div>

      {/* Word bank */}
      {!correct && (
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {available.map((w, i) => (
            <button
              key={i}
              onClick={() => handleTap(w)}
              className="bg-surface-container-lowest border-2 border-primary/15 px-5 py-2.5 rounded-2xl font-bold text-lg hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 transition-all active:scale-95"
            >
              {w}
            </button>
          ))}
        </div>
      )}

      {correct && (
        <div className="space-y-4">
          <p className="text-xl font-extrabold text-green-600">Correct! 🎉</p>
          <button
            onClick={handleNext}
            className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25"
          >
            {currentIdx + 1 < sentences.length ? 'Next Sentence' : 'Finish!'}
          </button>
        </div>
      )}

      {!correct && userWords.length > 0 && (
        <button
          onClick={handleReset}
          className="text-on-surface-variant/60 font-bold text-sm uppercase tracking-widest hover:text-on-surface-variant transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GrammarLessonPage({ params }: { params: { lessonId: string } }) {
  const [tab, setTab] = useState<'lesson' | 'quiz' | 'game'>('lesson');

  const found = findLesson(params.lessonId);
  if (!found) {
    return (
      <div className="p-20 text-center">
        <span className="text-5xl block mb-4">🔍</span>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Lesson not found</h2>
        <Link href="/subjects/english/our-world" className="text-primary font-bold">
          ← Back to Our World
        </Link>
      </div>
    );
  }

  const { grammar, unit, level } = found;

  const tabs: { id: typeof tab; label: string; icon: string }[] = [
    { id: 'lesson', label: 'Lesson', icon: 'menu_book' },
    { id: 'quiz', label: 'Quiz', icon: 'quiz' },
    { id: 'game', label: 'Game', icon: 'sports_esports' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky teal sub-header */}
      <div className="sticky top-16 z-40 bg-primary text-on-primary px-6 py-3.5 shadow-lg">
        <div className="max-w-[960px] mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-0.5">
              {grammar.breadcrumb}
            </p>
            <h1 className="text-base font-bold leading-tight">
              {grammar.title}
            </h1>
          </div>
          <Link
            href="/subjects/english/our-world"
            className="flex items-center gap-1.5 text-on-primary/70 hover:text-on-primary text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest mb-8">
          <Link href="/subjects" className="hover:text-primary transition-colors">Subjects</Link>
          <span>›</span>
          <Link href="/subjects/english" className="hover:text-primary transition-colors">English</Link>
          <span>›</span>
          <Link href="/subjects/english/our-world" className="hover:text-primary transition-colors">Our World</Link>
          <span>›</span>
          <span className="text-on-surface-variant">{level.title} · {unit.title}</span>
        </nav>

        {/* Tabs */}
        <div className="bg-surface-container rounded-xl p-1 w-fit mb-10 flex items-center">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === t.id
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'lesson' && <LessonTab grammar={grammar} />}
        {tab === 'quiz' && grammar.quiz && <QuizTab quiz={grammar.quiz} />}
        {tab === 'game' && grammar.gameSentences && <GameTab sentences={grammar.gameSentences} />}
      </div>
    </div>
  );
}
