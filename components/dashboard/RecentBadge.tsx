"use client";
import React from 'react';
import Card from '../ui/Card';

const RecentBadge = () => {
  return (
    <section className="mb-8">
      <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-3">RECENT BADGE</p>
      <Card className="p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-tertiary-fixed mx-auto mb-4 flex items-center justify-center">
          <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">workspace_premium</span>
        </div>
        <h3 className="font-bold text-on-surface mb-1">10-Day Streak!</h3>
        <p className="text-xs text-on-surface-variant mb-4 px-4">Consistent learner with double digit streak.</p>
        <button className="text-primary text-[10px] font-bold tracking-widest uppercase hover:underline">View Showcase</button>
      </Card>
    </section>
  );
};

export default RecentBadge;
