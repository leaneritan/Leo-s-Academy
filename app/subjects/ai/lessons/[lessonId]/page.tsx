"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import aiLessonsData from '@/data/ai-lessons.json';

// --- Types ---
interface LessonData {
  id: string;
  title: string;
  subtitle: string;
  duration: number;
  xpReward: number;
  lesson: {
    heroEmoji: string;
    heroTitle: string;
    heroSubtitle: string;
    explanation: string;
    keyPoints: { term: string; detail: string }[];
    examples: { text: string; emoji: string }[];
    reminder: { label: string; title: string; body: string };
    teacherNote: string;
  };
  levelUp: {
    miniLessonTitle: string;
    miniLessonContent: string;
    categories: { label: string; items: string[] }[];
  };
  quiz: { question: string; options: string[]; correct: number }[];
  game: {
    type: string;
    instructions: string;
    pairs: { item: string; match: string }[];
  };
}

// --- Components ---

function LessonTab({ lesson }: { lesson: LessonData['lesson'] }) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="text-center py-10 bg-purple-50 rounded-[2.5rem] px-8 border border-purple-100/50">
        <span className="text-7xl block mb-6 animate-bounce">
          {lesson.heroEmoji}
        </span>
        <h2 className="text-4xl font-black text-on-surface mb-4 tracking-tight">
          {lesson.heroTitle}
        </h2>
        <p className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          {lesson.heroSubtitle}
        </p>
      </section>

      {/* Explanation */}
      <section className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-purple-100 text-[#7c3aed] flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">info</span>
          </span>
          The Big Idea
        </h3>
        <p className="text-lg text-on-surface-variant leading-loose">
          {lesson.explanation}
        </p>
      </section>

      {/* Key Points */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lesson.keyPoints.map((point, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[#7c3aed] font-black text-xs uppercase tracking-widest mb-4">
              {point.term}
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {point.detail}
            </p>
          </div>
        ))}
      </section>

      {/* Examples */}
      <section className="bg-surface-container-low rounded-[2.5rem] p-10">
        <h3 className="text-2xl font-bold text-on-surface mb-10 text-center">AI in the Real World</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lesson.examples.map((ex, i) => (
            <div key={i} className="flex items-center gap-5 bg-white p-5 rounded-2xl border border-outline-variant/10">
              <span className="text-3xl grayscale-[0.2]">{ex.emoji}</span>
              <p className="text-on-surface font-medium leading-snug">{ex.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reminder */}
      <section className="bg-gradient-to-br from-[#4a1d96] to-[#7c3aed] rounded-[2rem] p-10 text-white shadow-xl shadow-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {lesson.reminder.label}
          </span>
        </div>
        <h4 className="text-2xl font-bold mb-3">{lesson.reminder.title}</h4>
        <p className="text-white/80 leading-relaxed max-w-xl">
          {lesson.reminder.body}
        </p>
      </section>

      {/* Teacher Note */}
      <div className="bg-surface-container-lowest border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 text-center">
        <p className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest mb-2">Teacher Note</p>
        <p className="text-sm italic text-on-surface-variant/60">{lesson.teacherNote}</p>
      </div>
    </div>
  );
}

function LevelUpTab({ levelUp }: { levelUp: LessonData['levelUp'] }) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="max-w-2xl mx-auto text-center py-10">
        <span className="text-5xl block mb-6">🚀</span>
        <h2 className="text-3xl font-black text-on-surface mb-4">
          {levelUp.miniLessonTitle}
        </h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          {levelUp.miniLessonContent}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {levelUp.categories.map((cat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-outline-variant/15 shadow-sm">
            <h3 className="text-[#7c3aed] font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
              {cat.label}
            </h3>
            <ul className="space-y-4">
              {cat.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[#7c3aed] text-lg mt-0.5">check_circle</span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizTab({ quiz }: { quiz: LessonData['quiz'] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const q = quiz[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < quiz.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-md mx-auto text-center py-12 bg-white rounded-[2.5rem] border border-outline-variant/15 shadow-xl">
        <span className="text-6xl block mb-6">🏆</span>
        <h2 className="text-3xl font-black text-on-surface mb-2">Quiz Complete!</h2>
        <p className="text-on-surface-variant mb-8 text-lg">You scored {score} out of {quiz.length}</p>

        <div className="bg-purple-50 text-[#7c3aed] p-8 rounded-3xl mb-8 mx-8">
          <p className="text-xs font-black uppercase tracking-widest mb-2">XP Earned</p>
          <p className="text-5xl font-black">+{score * 30} XP</p>
        </div>

        <button
          onClick={() => {
            setCurrent(0);
            setSelected(null);
            setScore(0);
            setShowResult(false);
          }}
          className="bg-[#7c3aed] text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-lg shadow-purple-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-on-surface">Knowledge Check</h2>
        <span className="bg-purple-50 text-[#7c3aed] px-4 py-1.5 rounded-full text-xs font-black">
          Question {current + 1}/{quiz.length}
        </span>
      </div>

      <div className="bg-surface-container-low p-8 rounded-[2rem] mb-8 border border-outline-variant/10">
        <p className="text-xl font-bold text-on-surface leading-snug">{q.question}</p>
      </div>

      <div className="grid gap-4 mb-10">
        {q.options.map((opt, i) => {
          let state = "default";
          if (selected !== null) {
            if (i === q.correct) state = "correct";
            else if (i === selected) state = "wrong";
            else state = "dimmed";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`flex items-center gap-4 p-5 rounded-2xl text-left font-bold transition-all border-2 ${
                state === "default" ? "bg-white border-outline-variant/20 hover:border-[#7c3aed] hover:shadow-md" :
                state === "correct" ? "bg-green-50 border-green-500 text-green-700 shadow-sm shadow-green-100" :
                state === "wrong" ? "bg-red-50 border-red-500 text-red-700" :
                "bg-white border-outline-variant/10 opacity-40"
              }`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${
                state === "correct" ? "bg-green-500 text-white" :
                state === "wrong" ? "bg-red-500 text-white" :
                "bg-purple-100 text-[#7c3aed]"
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {state === "correct" && <span className="material-symbols-outlined">check_circle</span>}
              {state === "wrong" && <span className="material-symbols-outlined">cancel</span>}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full bg-[#7c3aed] text-white py-4 rounded-2xl font-black hover:-translate-y-1 transition-all shadow-lg shadow-purple-200"
        >
          {current + 1 < quiz.length ? 'Next Question' : 'Finish Quiz'}
        </button>
      )}
    </div>
  );
}

function GameTab({ game }: { game: LessonData['game'] }) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrongMatch, setWrongMatch] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Randomize items and matches only once
  const items = useMemo(() => [...game.pairs].map(p => p.item).sort(() => Math.random() - 0.5), [game.pairs]);
  const categories = useMemo(() => Array.from(new Set(game.pairs.map(p => p.match))).sort(() => Math.random() - 0.5), [game.pairs]);

  const handleItemClick = (item: string) => {
    if (matches[item]) return;
    setSelectedItem(item === selectedItem ? null : item);
    setWrongMatch(null);
  };

  const handleCategoryClick = (category: string) => {
    if (!selectedItem) return;

    const pair = game.pairs.find(p => p.item === selectedItem);
    if (pair && pair.match === category) {
      setMatches(prev => ({ ...prev, [selectedItem]: category }));
      setSelectedItem(null);
      setWrongMatch(null);
    } else {
      setWrongMatch(selectedItem);
      setTimeout(() => setWrongMatch(null), 1000);
    }
  };

  useEffect(() => {
    if (Object.keys(matches).length === game.pairs.length) {
      setTimeout(() => setShowResult(true), 500);
    }
  }, [matches, game.pairs.length]);

  if (showResult) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <span className="text-6xl block mb-6">🎮</span>
        <h2 className="text-3xl font-black text-on-surface mb-2">Game Complete!</h2>
        <p className="text-on-surface-variant mb-10">You matched everything correctly!</p>
        <button
          onClick={() => {
            setMatches({});
            setSelectedItem(null);
            setShowResult(false);
          }}
          className="bg-[#7c3aed] text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 text-center">
      <h2 className="text-2xl font-black text-on-surface mb-2">AI Match-Up</h2>
      <p className="text-on-surface-variant mb-12">{game.instructions}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        {/* Items to match */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 mb-4 px-2">Examples</p>
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => handleItemClick(item)}
              className={`w-full p-5 rounded-2xl border-2 font-bold transition-all text-sm ${
                matches[item] ? 'bg-green-50 border-green-200 text-green-800 opacity-60' :
                selectedItem === item ? 'bg-purple-50 border-[#7c3aed] text-[#7c3aed] shadow-md -translate-x-2' :
                wrongMatch === item ? 'bg-red-50 border-red-300 text-red-600 animate-shake' :
                'bg-white border-outline-variant/15 hover:border-[#7c3aed]'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{item}</span>
                {matches[item] && <span className="material-symbols-outlined text-green-600">done_all</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 mb-4 px-2">Categories</p>
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategoryClick(cat)}
              className={`w-full p-8 rounded-[2rem] border-2 font-black transition-all text-center flex flex-col items-center justify-center gap-3 ${
                selectedItem ? 'bg-purple-50 border-[#7c3aed] border-dashed hover:bg-purple-100 hover:scale-105' : 'bg-surface-container-low border-outline-variant/10'
              }`}
            >
              <span className="text-lg text-on-surface">{cat}</span>
              <div className="flex flex-wrap gap-1 justify-center">
                {Object.entries(matches).filter(([_, c]) => c === cat).map(([item], idx) => (
                  <div key={idx} className="w-2 h-2 rounded-full bg-green-500" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AILessonPage({ params }: { params: { lessonId: string } }) {
  const [tab, setTab] = useState<'lesson' | 'levelUp' | 'quiz' | 'game'>('lesson');
  const lesson = aiLessonsData.find(l => l.id === params.lessonId) as LessonData;

  if (!lesson) {
    return (
      <div className="p-20 text-center">
        <span className="text-5xl block mb-4">🔍</span>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Lesson not found</h2>
        <Link href="/subjects/ai" className="text-[#7c3aed] font-bold">
          ← Back to AI
        </Link>
      </div>
    );
  }

  const tabs: { id: typeof tab; label: string; icon: string; emoji?: string }[] = [
    { id: 'lesson', label: 'Lesson', icon: 'menu_book' },
    { id: 'levelUp', label: 'Level Up', icon: 'rocket', emoji: '🚀' },
    { id: 'quiz', label: 'Quiz', icon: 'quiz' },
    { id: 'game', label: 'Game', icon: 'sports_esports' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaff]">
      {/* Sticky Header */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-[#4a1d96] to-[#7c3aed] text-white px-6 py-4 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black opacity-70 uppercase tracking-[0.2em] mb-1">
              AI · Lesson 1
            </p>
            <h1 className="text-lg font-black tracking-tight leading-none">
              {lesson.title}
            </h1>
          </div>
          <Link
            href="/subjects/ai"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Exit
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Navigation Breadcrumb */}
        <nav className="flex gap-2 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mb-10">
          <Link href="/subjects" className="hover:text-[#7c3aed] transition-colors">Subjects</Link>
          <span>›</span>
          <Link href="/subjects/ai" className="hover:text-[#7c3aed] transition-colors">AI</Link>
          <span>›</span>
          <span className="text-on-surface-variant/70">{lesson.title}</span>
        </nav>

        {/* Tab Controls */}
        <div className="bg-white rounded-2xl p-1.5 w-fit mb-12 flex items-center shadow-sm border border-outline-variant/10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                tab === t.id
                  ? 'bg-purple-50 text-[#7c3aed] shadow-inner'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {t.emoji ? (
                <span className="text-base">{t.emoji}</span>
              ) : (
                <span className="material-symbols-outlined text-xl">{t.icon}</span>
              )}
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {tab === 'lesson' && <LessonTab lesson={lesson.lesson} />}
          {tab === 'levelUp' && <LevelUpTab levelUp={lesson.levelUp} />}
          {tab === 'quiz' && <QuizTab quiz={lesson.quiz} />}
          {tab === 'game' && <GameTab game={lesson.game} />}
        </div>
      </div>

      {/* Shake animation for matching game */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
