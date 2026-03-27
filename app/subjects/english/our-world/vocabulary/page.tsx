"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import vocabularyData from '@/data/vocabulary.json';

type Word = {
  word: string;
  emoji: string;
  sentence: string;
};

type Unit = {
  id: number;
  label: string;
  words: Word[];
};

type Level = {
  id: number;
  label: string;
  units: Unit[];
};

type VocabData = {
  levels: Level[];
};

export default function VocabularyPage() {
  const [search, setSearch] = useState('');
  const [selectedLevelId, setSelectedLevelId] = useState<number | 'all'>('all');
  const [selectedWord, setSelectedWord] = useState<(Word & { levelId: number; unitLabel: string }) | null>(null);

  const data = vocabularyData as VocabData;

  const filteredLevels = useMemo(() => {
    return data.levels.map(level => {
      if (selectedLevelId !== 'all' && level.id !== selectedLevelId) return null;

      const filteredUnits = level.units.map(unit => {
        const filteredWords = unit.words.filter(word => {
          const s = search.toLowerCase();
          return word.word.toLowerCase().includes(s) ||
                 word.sentence.toLowerCase().includes(s) ||
                 unit.label.toLowerCase().includes(s);
        });

        if (filteredWords.length === 0) return null;
        return { ...unit, words: filteredWords };
      }).filter(u => u !== null) as Unit[];

      if (filteredUnits.length === 0) return null;
      return { ...level, units: filteredUnits };
    }).filter(l => l !== null) as Level[];
  }, [data, search, selectedLevelId]);

  const handleLevelPillClick = (id: number | 'all') => {
    setSelectedLevelId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-20">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tighter">Our World 🌍</h1>
        <p className="text-on-surface-variant font-medium">Grammar and language for English learners.</p>
      </header>

      {/* Tabs */}
      <div className="bg-surface-container rounded-xl p-1 w-fit mb-12 flex items-center">
        <Link
          href="/subjects/english/our-world"
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">menu_book</span>
          Grammar
        </Link>
        <div className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-white text-primary shadow-sm cursor-default">
          <span className="material-symbols-outlined text-[20px]">translate</span>
          Vocabulary
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-on-surface">Vocabulary</h2>
        <p className="text-sm text-on-surface-variant">Our World · Second Edition</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined text-xl">search</span>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search words..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-lowest border-none shadow-[0_8px_24px_-4px_rgba(24,28,29,0.08)] text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
        <button
          onClick={() => handleLevelPillClick('all')}
          className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${selectedLevelId === 'all' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
        >
          All
        </button>
        {[1, 2, 3, 4].map(id => (
          <button
            key={id}
            onClick={() => handleLevelPillClick(id)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${selectedLevelId === id ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            Level {id}
          </button>
        ))}
      </div>

      {/* Vocabulary List */}
      <div className="space-y-10">
        {filteredLevels.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">search_off</span>
            <p className="text-on-surface-variant font-medium">No words found</p>
          </div>
        ) : (
          filteredLevels.map(level => (
            <div key={level.id}>
              {level.units.map(unit => (
                <div key={unit.id} className="mb-10 last:mb-0">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary mt-6 mb-3">
                    {selectedLevelId === 'all' ? `Level ${level.id} · ${unit.label}` : unit.label}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {unit.words.map((word, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedWord({ ...word, levelId: level.id, unitLabel: unit.label })}
                        className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_16px_-2px_rgba(24,28,29,0.06)] hover:-translate-y-1 transition-transform duration-200 text-center flex flex-col items-center cursor-pointer"
                      >
                        <span className="text-3xl mb-2">{word.emoji}</span>
                        <span className="text-base font-semibold text-on-surface">{word.word}</span>
                        <span className="text-xs text-on-surface-variant italic mt-1 leading-relaxed">
                          {word.sentence}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Word Detail Modal */}
      {selectedWord && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-0 sm:p-4"
          onClick={() => setSelectedWord(null)}
        >
          <div
            className="bg-white w-full h-full sm:h-auto sm:max-w-sm sm:rounded-2xl p-6 shadow-2xl mx-auto animate-in zoom-in-95 slide-in-from-bottom-10 sm:slide-in-from-none duration-200 flex flex-col justify-center sm:block relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-6xl text-center mb-3">{selectedWord.emoji}</div>
            <h2 className="text-3xl font-bold text-on-surface text-center leading-tight">{selectedWord.word}</h2>
            <div className="flex justify-center mt-2">
              <span className="bg-primary-container text-primary text-xs font-semibold rounded-full px-3 py-1">
                Level {selectedWord.levelId} · {selectedWord.unitLabel}
              </span>
            </div>
            <div className="h-px bg-outline-variant/15 my-6" />
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">Example Sentence</p>
              <p className="text-base text-on-surface italic leading-relaxed mt-1">
                {selectedWord.sentence}
              </p>
            </div>
            <button
              onClick={() => setSelectedWord(null)}
              className="bg-surface-container text-on-surface-variant rounded-xl w-full py-3 mt-4 font-medium hover:bg-surface-container-high transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
