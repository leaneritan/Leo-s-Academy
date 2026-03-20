"use client";
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const QuizView: React.FC<{ quiz: Question[] }> = ({ quiz }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quiz[current].correct) setScore(score + 1);
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
      <Card className="p-12 text-center max-w-md mx-auto">
        <span className="text-6xl mb-6 block">🎉</span>
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-on-surface-variant mb-8 text-lg">You scored {score} out of {quiz.length}</p>
        <div className="bg-tertiary-fixed text-on-tertiary-fixed p-6 rounded-2xl mb-8">
          <p className="text-sm font-bold uppercase tracking-widest mb-1">XP Reward</p>
          <p className="text-4xl font-extrabold">+{score * 150} XP</p>
        </div>
        <Button onClick={() => window.location.reload()} className="w-full">Back to Lesson</Button>
      </Card>
    );
  }

  const q = quiz[current];
  return (
    <div className="max-w-2xl mx-auto py-10">
      <p className="text-center text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-widest">
        Question {current + 1} of {quiz.length}
      </p>
      <h2 className="text-3xl font-bold text-on-surface mb-12 text-center">{q.question}</h2>

      <div className="grid grid-cols-1 gap-4 mb-12">
        {q.options.map((opt, i) => {
          let styles = 'bg-surface-container-low hover:bg-surface-container-highest';
          if (selected !== null) {
            if (i === q.correct) styles = 'bg-green-100 border-green-500 text-green-700';
            else if (i === selected) styles = 'bg-red-100 border-red-500 text-red-700';
            else styles = 'opacity-50 bg-slate-100';
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-6 rounded-2xl border-2 border-transparent text-lg font-semibold transition-all text-left flex items-center gap-4 ${styles}`}
            >
              <span className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-sm">{i + 1}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <Button onClick={handleNext} className="w-full py-4 text-xl">
          {current + 1 < quiz.length ? 'Next Question' : 'Finish Quiz'}
        </Button>
      )}
    </div>
  );
};

export default QuizView;
