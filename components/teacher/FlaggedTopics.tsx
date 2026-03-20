"use client";
import React from 'react';
import Card from '../ui/Card';

const flagged = [
  { subject: 'Biological Sciences', topic: 'Cellular Respiration', score: '62%', note: 'Difficulty with ATP concepts' },
  { subject: 'Mathematics', topic: 'Linear Equations', score: '68%', note: 'Issues with negative integers' }
];

const FlaggedTopics = () => {
  return (
    <Card className="col-span-full p-8">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-tertiary">warning</span>
        <h2 className="text-xl font-bold text-on-surface">Flagged Learning Topics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flagged.map((item, i) => (
          <div key={i} className="bg-surface-container-low p-6 rounded-2xl flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-1">{item.subject}</p>
                <h3 className="text-lg font-bold text-on-surface">{item.topic}</h3>
              </div>
              <span className="bg-[#ef4444] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">Needs Review</span>
            </div>
            <p className="text-sm text-on-surface-variant italic mt-auto">"{item.note}" — Last score: {item.score}</p>
            <div className="absolute right-0 bottom-0 opacity-5 group-hover:scale-125 transition-transform pointer-events-none">
              <span className="material-symbols-outlined text-8xl">troubleshoot</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FlaggedTopics;
