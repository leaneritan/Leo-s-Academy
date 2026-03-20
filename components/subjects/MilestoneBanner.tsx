"use client";
import React from 'react';
import Button from '../ui/Button';

const MilestoneBanner = () => {
  return (
    <section className="relative overflow-hidden bg-primary-container text-on-primary-container p-10 rounded-2xl mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-tertiary">stars</span>
            <span className="text-xs font-bold tracking-widest uppercase opacity-80">ACADEMIC MILESTONE</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Mastering the Basics</h2>
          <p className="text-on-primary-container/80 mb-8 max-w-md">
            You're only 4 lessons away from completing the English core curriculum! Complete this unit to earn the 'Eloquent' badge.
          </p>
          <Button variant="secondary" className="bg-white text-primary border-0 font-bold px-8">
            Begin Learning
          </Button>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="w-48 h-64 bg-white/20 backdrop-blur-md rounded-xl rotate-12 flex items-center justify-center border border-white/30 shadow-2xl">
            <span className="material-symbols-outlined text-7xl text-white/50">auto_awesome</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-400/20 blur-[120px]" />
    </section>
  );
};

export default MilestoneBanner;
