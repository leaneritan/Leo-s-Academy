"use client";
import React from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import gradesData from '@/data/grades.json';

const AcademicOverview = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-on-surface mb-6">Academic Overview</h2>
      <div className="space-y-6">
        {gradesData.map((grade) => (
          <div key={grade.subject} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant">school</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-semibold text-on-surface truncate">{grade.subject}</span>
                <span className="text-sm font-bold text-primary">{Math.round((grade.score / grade.total) * 100)}%</span>
              </div>
              <ProgressBar value={(grade.score / grade.total) * 100} height="h-1.5" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AcademicOverview;
