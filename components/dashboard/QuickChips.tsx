"use client";
import React from 'react';
import Chip from '../ui/Chip';

const QuickChips = () => {
  return (
    <section>
      <div className="flex flex-wrap gap-2">
        <Chip label="Library" className="text-xs" />
        <Chip label="Flashcards" className="text-xs" />
        <Chip label="Group Study" className="text-xs" />
      </div>
    </section>
  );
};

export default QuickChips;
