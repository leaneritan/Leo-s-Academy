"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import ourWorldData from '@/data/our-world.json';

type Grammar = {
  id: string;
  number: number;
  title: string;
  comingSoon: boolean;
};

type Unit = {
  id: string;
  number: number;
  title: string;
  comingSoon: boolean;
  grammars: Grammar[];
};

type Level = {
  id: string;
  number: number;
  title: string;
  comingSoon: boolean;
  units: Unit[];
};

export default function OurWorldPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const levels = ourWorldData.levels as Level[];

  // Flat list of all grammar points for search
  const allGrammars = useMemo(() => {
    const results: { grammar: Grammar; unit: Unit; level: Level }[] = [];
    for (const level of levels) {
      for (const unit of level.units) {
        for (const grammar of unit.grammars) {
          if (!grammar.comingSoon) {
            results.push({ grammar, unit, level });
          }
        }
      }
    }
    return results;
  }, [levels]);

  const filteredGrammars = useMemo(() => {
    if (!search.trim()) return [];
    return allGrammars.filter(g =>
      g.grammar.title.toLowerCase().includes(search.toLowerCase()) ||
      g.unit.title.toLowerCase().includes(search.toLowerCase()) ||
      g.level.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [allGrammars, search]);

  const activeLevel = levels.find(l => l.id === selectedLevel);
  const activeUnit = activeLevel?.units.find(u => u.id === selectedUnit);

  const handleLevelClick = (levelId: string, comingSoon: boolean) => {
    if (comingSoon) return;
    if (selectedLevel === levelId) {
      setSelectedLevel(null);
      setSelectedUnit(null);
    } else {
      setSelectedLevel(levelId);
      setSelectedUnit(null);
    }
  };

  const handleUnitClick = (unitId: string, comingSoon: boolean) => {
    if (comingSoon) return;
    setSelectedUnit(selectedUnit === unitId ? null : unitId);
  };

  return (
    <div className="pb-20">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tighter">Our World 🌍</h1>
        <p className="text-on-surface-variant font-medium">Grammar and language for English learners.</p>
      </header>

      {/* Search Bar */}
      <div className="relative mb-10 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined text-xl">search</span>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search grammar points..."
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

      {/* Search results */}
      {search.trim() ? (
        <div>
          <p className="text-[0.7rem] font-bold tracking-widest uppercase text-on-surface-variant mb-4">
            {filteredGrammars.length} result{filteredGrammars.length !== 1 ? 's' : ''}
          </p>
          {filteredGrammars.length === 0 ? (
            <div className="text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl block mb-3 opacity-30">search_off</span>
              <p className="font-medium">No grammar points found</p>
              <p className="text-sm mt-1 opacity-60">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredGrammars.map(({ grammar, unit, level }) => (
                <Link
                  key={grammar.id}
                  href={`/subjects/english/our-world/${grammar.id}`}
                  className="block"
                >
                  <Card className="p-5 hover:-translate-y-0.5 transition-all flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] font-bold tracking-widest uppercase text-primary mb-1">
                        {level.title} · {unit.title}
                      </p>
                      <p className="font-semibold text-on-surface">{grammar.title}</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant/40">chevron_right</span>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Level cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {levels.map((level) => {
              const isSelected = selectedLevel === level.id;
              const isGreyedOut = selectedLevel !== null && !isSelected;
              return (
                <button
                  key={level.id}
                  onClick={() => handleLevelClick(level.id, level.comingSoon)}
                  disabled={level.comingSoon}
                  className={`relative rounded-2xl p-6 text-left transition-all ${
                    level.comingSoon
                      ? 'bg-surface-container opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-on-primary shadow-lg shadow-primary/25 scale-[1.02]'
                      : isGreyedOut
                      ? 'bg-surface-container opacity-40 grayscale'
                      : 'bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(24,28,29,0.08)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-4px_rgba(5,102,98,0.15)]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      isSelected ? 'bg-white/20' : 'bg-teal-50'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-xl ${
                        isSelected ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {level.comingSoon ? 'lock' : 'layers'}
                    </span>
                  </div>
                  <p
                    className={`text-lg font-bold ${
                      isSelected ? 'text-on-primary' : 'text-on-surface'
                    }`}
                  >
                    {level.title}
                  </p>
                  <p
                    className={`text-[0.65rem] font-bold tracking-widest uppercase mt-1 ${
                      isSelected ? 'text-on-primary/70' : 'text-on-surface-variant/50'
                    }`}
                  >
                    {level.comingSoon ? 'Coming Soon' : '9 Units'}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Units grid */}
          {activeLevel && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-outline-variant/15" />
                <p className="text-[0.7rem] font-bold tracking-widest uppercase text-on-surface-variant">
                  {activeLevel.title} — Units
                </p>
                <div className="h-px flex-1 bg-outline-variant/15" />
              </div>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-8">
                {activeLevel.units.map((unit) => {
                  const isUnitSelected = selectedUnit === unit.id;
                  const isUnitGreyedOut = selectedUnit !== null && !isUnitSelected;
                  return (
                    <button
                      key={unit.id}
                      onClick={() => handleUnitClick(unit.id, unit.comingSoon)}
                      disabled={unit.comingSoon}
                      className={`rounded-xl p-4 text-center transition-all ${
                        unit.comingSoon
                          ? 'bg-surface-container opacity-40 cursor-not-allowed'
                          : isUnitSelected
                          ? 'bg-primary-container text-on-primary-container shadow-md'
                          : isUnitGreyedOut
                          ? 'bg-surface-container opacity-40 grayscale'
                          : 'bg-surface-container-lowest shadow-[0_4px_12px_-2px_rgba(24,28,29,0.08)] hover:-translate-y-0.5'
                      }`}
                    >
                      <p className="text-sm font-bold text-on-surface">{unit.title}</p>
                      {unit.comingSoon && (
                        <p className="text-[0.6rem] font-bold tracking-widest uppercase text-on-surface-variant/40 mt-0.5">
                          Soon
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Grammar points */}
              {activeUnit && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-outline-variant/15" />
                    <p className="text-[0.7rem] font-bold tracking-widest uppercase text-on-surface-variant">
                      {activeLevel.title} · {activeUnit.title} — Grammar Points
                    </p>
                    <div className="h-px flex-1 bg-outline-variant/15" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeUnit.grammars.map((grammar) =>
                      grammar.comingSoon ? (
                        <div
                          key={grammar.id}
                          className="rounded-2xl p-6 bg-surface-container opacity-50 flex items-center gap-4"
                        >
                          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface-variant/40 text-xl">lock</span>
                          </div>
                          <div>
                            <p className="text-[0.65rem] font-bold tracking-widest uppercase text-on-surface-variant/40 mb-1">
                              Grammar {grammar.number}
                            </p>
                            <p className="font-semibold text-on-surface-variant/50">Coming Soon</p>
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={grammar.id}
                          href={`/subjects/english/our-world/${grammar.id}`}
                          className="block"
                        >
                          <div className="rounded-2xl p-6 bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(24,28,29,0.08)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-4px_rgba(5,102,98,0.15)] transition-all flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-[0.65rem] font-bold tracking-widest uppercase text-primary/70 mb-1">
                                Grammar {grammar.number}
                              </p>
                              <p className="font-semibold text-on-surface">{grammar.title}</p>
                            </div>
                            <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-primary transition-colors">
                              arrow_forward
                            </span>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Grammar points list below level cards */}
          {!selectedLevel && (
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-outline-variant/15" />
                <p className="text-[0.7rem] font-bold tracking-widest uppercase text-on-surface-variant">
                  Grammar Points List
                </p>
                <div className="h-px flex-1 bg-outline-variant/15" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allGrammars.map(({ grammar, unit, level }) => (
                  <Link
                    key={grammar.id}
                    href={`/subjects/english/our-world/${grammar.id}`}
                    className="block"
                  >
                    <div className="rounded-xl p-4 bg-surface-container-lowest shadow-[0_4px_12px_-2px_rgba(24,28,29,0.08)] hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center gap-3 border border-outline-variant/5">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-lg">description</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.6rem] font-bold text-primary/60 uppercase truncate">
                          {level.title} · {unit.title}
                        </p>
                        <p className="text-sm font-semibold text-on-surface truncate">{grammar.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
