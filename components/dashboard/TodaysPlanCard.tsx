"use client";
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import subjectsData from '@/data/subjects.json';
import Link from 'next/link';

const TodaysPlanCard = () => {
  const englishLessons = subjectsData.find(s => s.id === 'english')?.lessons || [];
  const todayTasks = englishLessons.slice(0, 2);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-on-surface">Today's Plan</h2>
        <Link href="/schedule" className="text-primary font-semibold text-sm hover:underline">View Schedule</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {todayTasks.map((task) => (
          <Card key={task.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container">menu_book</span>
              </div>
              <span className="text-[10px] font-bold bg-surface-container-high px-2 py-1 rounded-full uppercase tracking-widest text-on-surface-variant">
                {task.duration} MIN
              </span>
            </div>

            <h3 className="text-lg font-bold text-on-surface mb-1">{task.title}</h3>
            <p className="text-sm text-on-surface-variant mb-6">{task.unit} {task.content.heroEmoji}</p>

            <Link href={`/lesson/${task.id}`}>
              <Button className="w-full">
                {task.completed ? 'Review' : 'Start Lesson'}
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TodaysPlanCard;
