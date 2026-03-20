"use client";
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const sentences = [
  "She walks to school",
  "The cat eats fish",
  "Leo reads a book"
];

const GameView = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userWords, setUserWords] = useState<string[]>([]);
  const [correct, setCorrect] = useState(false);

  const fullSentence = sentences[currentIdx];
  const words = fullSentence.split(' ').sort(() => Math.random() - 0.5);

  const handleWordClick = (word: string) => {
    const next = [...userWords, word];
    setUserWords(next);
    if (next.join(' ') === fullSentence) {
      setCorrect(true);
    }
  };

  const handleReset = () => {
    setUserWords([]);
    setCorrect(false);
  };

  const handleNext = () => {
    if (currentIdx + 1 < sentences.length) {
      setCurrentIdx(currentIdx + 1);
      handleReset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 text-center">
      <h2 className="text-3xl font-bold mb-4">Word Scramble</h2>
      <p className="text-on-surface-variant mb-12">Tap the words in the correct order to build the sentence!</p>

      <div className="bg-surface-container-low p-10 rounded-3xl min-h-[120px] mb-12 flex flex-wrap gap-3 justify-center items-center border-4 border-dashed border-outline-variant/20">
        {userWords.map((w, i) => (
          <span key={i} className="bg-primary text-white px-5 py-2 rounded-xl font-bold text-xl shadow-md">{w}</span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {words.filter(w => !userWords.includes(w) || userWords.filter(uw => uw === w).length < words.filter(tw => tw === w).length).map((w, i) => (
          <button
            key={i}
            onClick={() => handleWordClick(w)}
            className="bg-white border-2 border-primary/20 p-4 rounded-2xl font-bold text-xl hover:-translate-y-1 hover:shadow-lg transition-all active:scale-95"
          >
            {w}
          </button>
        ))}
      </div>

      {correct && (
        <div className="space-y-6">
          <p className="text-2xl font-extrabold text-green-600">Great Job! 🎉</p>
          <Button onClick={handleNext} className="w-full py-4 text-xl">
            {currentIdx + 1 < sentences.length ? 'Next Sentence' : 'Game Finished!'}
          </Button>
        </div>
      )}

      {!correct && userWords.length > 0 && (
        <button onClick={handleReset} className="text-on-surface-variant font-bold uppercase tracking-widest text-sm hover:underline">Reset</button>
      )}
    </div>
  );
};

export default GameView;
