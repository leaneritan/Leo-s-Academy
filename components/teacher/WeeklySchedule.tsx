"use client";
import React from 'react';
import Card from '../ui/Card';
import scheduleData from '@/data/schedule.json';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const WeeklySchedule = () => {
  return (
    <Card className="col-span-full p-8 mb-8">
      <h2 className="text-xl font-bold text-on-surface mb-8">Weekly Schedule</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {days.map((day) => {
          const classes = (scheduleData as any)[day] || [];
          return (
            <div key={day} className="space-y-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-center text-on-surface-variant opacity-60 mb-2">{day}</p>
              {classes.map((c: any, i: number) => (
                <div key={i} className={`bg-${c.color} p-4 rounded-xl shadow-sm text-center border border-black/5 hover:scale-105 transition-transform cursor-pointer`}>
                  <p className="text-sm font-bold text-on-surface">{c.subject}</p>
                  <p className="text-[10px] font-medium opacity-60">{c.time}</p>
                </div>
              ))}
              <div className="border-2 border-dashed border-outline-variant/20 rounded-xl p-4 flex flex-col items-center justify-center opacity-40 hover:opacity-100 hover:bg-surface-container-high transition-all cursor-pointer group h-24">
                <span className="material-symbols-outlined text-xl group-hover:scale-125 transition-transform">add</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default WeeklySchedule;
