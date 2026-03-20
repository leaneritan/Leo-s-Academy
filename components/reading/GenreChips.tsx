"use client";
import React, { useState } from 'react';
import Chip from '../ui/Chip';

const genres = ['Fantasy', 'Science', 'History', 'Biography'];

const GenreChips = () => {
  const [active, setActive] = useState('Fantasy');
  return (
    <section>
      <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-4">GENRES</p>
      <div className="flex flex-wrap gap-2">
        {genres.map(genre => (
          <Chip
            key={genre}
            label={genre}
            active={active === genre}
            onClick={() => setActive(genre)}
          />
        ))}
      </div>
    </section>
  );
};

export default GenreChips;
