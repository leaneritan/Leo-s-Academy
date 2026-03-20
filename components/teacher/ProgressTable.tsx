"use client";
import React from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import gradesData from '@/data/grades.json';

const ProgressTable = () => {
  return (
    <Card className="col-span-full p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-on-surface mb-1">Student Progress Overview</h2>
          <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Academic Year 2024</p>
        </div>
        <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/50">
              <th className="pb-4 pr-6">Subject</th>
              <th className="pb-4 pr-6">Current Grade</th>
              <th className="pb-4 pr-6">Progress Bar</th>
              <th className="pb-4">Last Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {gradesData.map((grade) => {
              const percentage = (grade.score / grade.total) * 100;
              const isCaution = percentage < 75;
              return (
                <tr key={grade.subject}>
                  <td className="py-6 pr-6 font-bold text-on-surface">{grade.subject}</td>
                  <td className={`py-6 pr-6 font-bold ${isCaution ? 'text-tertiary' : 'text-primary'}`}>{percentage}%</td>
                  <td className="py-6 pr-6">
                    <div className="w-48">
                      <ProgressBar value={percentage} color={isCaution ? 'tertiary' : 'primary'} height="h-2" />
                    </div>
                  </td>
                  <td className="py-6 text-sm text-on-surface-variant">{grade.lastActivity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ProgressTable;
