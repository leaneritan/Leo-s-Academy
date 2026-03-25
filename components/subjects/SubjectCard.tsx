"use client";
import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

interface SubjectCardProps {
  id: string;
  name: string;
  icon: string;
  tag: string;
  description: string;
  locked?: boolean;
  completedLessons: number;
  totalLessons: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  id, name, icon, tag, description, locked = false, completedLessons, totalLessons
}) => {
  const isAI = id === 'ai';
  const accentColor = isAI ? 'text-[#7c3aed]' : 'text-primary';
  const bgColor = isAI ? 'bg-purple-50' : 'bg-teal-50';

  const content = (
    <Card className={`p-7 h-full ${locked ? 'bg-surface-container-high/40 opacity-70 grayscale-[0.5]' : 'hover:-translate-y-1'}`}>
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${locked ? 'bg-slate-200' : `${bgColor} ${accentColor}`}`}>
          <span className="material-symbols-outlined text-2xl">
            {locked ? 'lock' : icon}
          </span>
        </div>
        <p className={`text-[0.75rem] font-bold tracking-widest uppercase ${locked ? 'text-slate-400' : accentColor}`}>
          {tag}
        </p>
      </div>

      <h3 className="text-xl font-bold text-on-surface mb-1">{name}</h3>
      <p className="text-sm text-on-surface-variant mb-8 line-clamp-2 h-10">{description}</p>

      <div className="space-y-3">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          <span>PROGRESS</span>
          <span>{completedLessons}/{totalLessons} lessons</span>
        </div>
        <ProgressBar
          value={(completedLessons / totalLessons) * 100}
          height="h-1.5"
          color={isAI ? 'purple' : 'primary'}
        />
      </div>
    </Card>
  );

  if (locked) return <div>{content}</div>;

  return (
    <Link href={`/subjects/${id}`} className="block h-full">
      {content}
    </Link>
  );
};

export default SubjectCard;
