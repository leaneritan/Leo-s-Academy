"use client";
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressTable from '@/components/teacher/ProgressTable';
import GradeEntryForm from '@/components/teacher/GradeEntryForm';
import AssignReadingForm from '@/components/teacher/AssignReadingForm';
import WeeklySchedule from '@/components/teacher/WeeklySchedule';
import FlaggedTopics from '@/components/teacher/FlaggedTopics';

export default function TeacherPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const isUnlocked = localStorage.getItem('teacher_unlocked') === 'true';
    if (isUnlocked) {
      setUnlocked(true);
    }
  }, []);

  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (pin === '1234') {
      localStorage.setItem('teacher_unlocked', 'true');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
      // In a real app we'd trigger a shake animation here
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className={`p-12 w-full max-w-md text-center ${error ? 'animate-shake' : ''}`}>
          <div className="w-16 h-16 bg-primary-container rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-on-primary-container">lock</span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-2">Teacher Mode</h2>
          <p className="text-on-surface-variant mb-8">Enter PIN to continue</p>

          <div className="flex gap-4 mb-8 justify-center">
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="• • • •"
              className="w-48 text-center text-4xl tracking-[1em] bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 focus:ring-0 transition-all font-bold placeholder:text-xl placeholder:tracking-widest"
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            />
          </div>

          <Button onClick={handleUnlock} className="w-full py-4 text-lg">Unlock</Button>
          {error && <p className="text-error text-sm font-bold mt-4">Incorrect PIN</p>}
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tighter">Teacher Mode 👨‍🏫</h1>
        <p className="text-on-surface-variant font-medium">Managing curated curriculum for Leo.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProgressTable />
        <GradeEntryForm />
        <AssignReadingForm />
        <WeeklySchedule />
        <FlaggedTopics />
      </div>
    </div>
  );
}
