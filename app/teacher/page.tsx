"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressTable from '@/components/teacher/ProgressTable';
import GradeEntryForm from '@/components/teacher/GradeEntryForm';
import AssignReadingForm from '@/components/teacher/AssignReadingForm';
import WeeklySchedule from '@/components/teacher/WeeklySchedule';
import FlaggedTopics from '@/components/teacher/FlaggedTopics';
import ourWorldData from '@/data/our-world.json';
import aiLessonsData from '@/data/ai-lessons.json';

const previewLessons = [
  { id: 'l1-u1-g1', title: 'Our World L1U1G1' },
  { id: 'l1-u1-g2', title: 'Our World L1U1G2' },
  { id: 'l1-u2-g1', title: 'Our World L1U2G1' },
  { id: 'l1-u2-g2', title: 'Our World L1U2G2' },
  { id: 'ai-l1-what-is-ai', title: 'AI Lesson 1' },
];

export default function TeacherPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [previewLessonId, setPreviewLessonId] = useState<string | null>(null);

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
        <LessonPreviewSection onPreview={setPreviewLessonId} />
        <ProgressTable />
        <GradeEntryForm />
        <AssignReadingForm />
        <WeeklySchedule />
        <FlaggedTopics />
      </div>

      {previewLessonId && (
        <PresentationMode
          lessonId={previewLessonId}
          onExit={() => setPreviewLessonId(null)}
        />
      )}
    </div>
  );
}

function LessonPreviewSection({ onPreview }: { onPreview: (id: string) => void }) {
  return (
    <Card className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-teal-600">visibility</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-on-surface">レッスンプレビュー</h2>
          <p className="text-on-surface-variant text-sm">Preview lessons in presentation mode.</p>
        </div>
      </div>

      <div className="space-y-3">
        {previewLessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
            <span className="font-semibold text-on-surface">{lesson.title}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPreview(lesson.id)}
              className="gap-2"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              プレビュー
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PresentationMode({ lessonId, onExit }: { lessonId: string, onExit: () => void }) {
  const [currentSection, setCurrentSection] = useState(0);

  const lessonData = useMemo(() => {
    // Check Our World data
    for (const level of ourWorldData.levels) {
      for (const unit of level.units) {
        for (const grammar of unit.grammars) {
          if (grammar.id === lessonId) {
            return {
              title: grammar.title,
              type: 'our-world',
              sections: [
                { type: 'hero', title: grammar.title, subtitle: 'Grammar Lesson' },
                { type: 'explanation', content: grammar.explanation },
                ...grammar.keyPoints.map(kp => ({ type: 'keypoint', ...kp })),
                { type: 'levelup', title: grammar.levelUp.title, content: grammar.levelUp.content },
              ]
            };
          }
        }
      }
    }
    // Check AI data
    const aiLesson = aiLessonsData.find(l => l.id === lessonId);
    if (aiLesson) {
      return {
        title: aiLesson.title,
        type: 'ai',
        sections: [
          { type: 'hero', title: aiLesson.lesson.heroTitle, subtitle: aiLesson.lesson.heroSubtitle, emoji: aiLesson.lesson.heroEmoji },
          { type: 'explanation', content: aiLesson.lesson.explanation },
          ...aiLesson.lesson.keyPoints.map(kp => ({ type: 'keypoint', term: kp.term, detail: kp.detail })),
          { type: 'levelup', title: aiLesson.levelUp.miniLessonTitle, content: aiLesson.levelUp.miniLessonContent },
        ]
      };
    }
    return null;
  }, [lessonId]);

  if (!lessonData) return null;

  const section = lessonData.sections[currentSection];
  const isLast = currentSection === lessonData.sections.length - 1;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      <div className="flex items-center justify-between px-10 py-6 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-black uppercase tracking-widest rounded-full">
            Presentation Mode
          </div>
          <h1 className="text-xl font-black text-on-surface">{lessonData.title}</h1>
        </div>
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-6 py-2 bg-surface-container-high hover:bg-surface-container-highest rounded-full text-sm font-bold transition-all"
        >
          <span className="material-symbols-outlined text-lg">close</span>
          終了
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-20 overflow-y-auto">
        <div className="max-w-4xl w-full animate-in fade-in slide-in-from-bottom-10 duration-500">
          {section.type === 'hero' && (
            <div className="text-center">
              <span className="text-9xl mb-12 block">{(section as any).emoji || '📚'}</span>
              <h2 className="text-7xl font-black text-on-surface mb-6 tracking-tight">{(section as any).title}</h2>
              <p className="text-3xl text-on-surface-variant font-medium">{(section as any).subtitle}</p>
            </div>
          )}

          {section.type === 'explanation' && (
            <div className="bg-teal-50 rounded-[3rem] p-16 border-2 border-teal-100">
              <p className="text-5xl font-bold text-teal-900 leading-[1.3] text-center">
                {(section as any).content}
              </p>
            </div>
          )}

          {section.type === 'keypoint' && (
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-teal-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-teal-100">
                <span className="material-symbols-outlined text-5xl">star</span>
              </div>
              <h3 className="text-6xl font-black text-on-surface mb-8">{(section as any).term}</h3>
              <p className="text-4xl text-on-surface-variant leading-relaxed">{(section as any).detail}</p>
            </div>
          )}

          {section.type === 'levelup' && (
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                <span className="text-6xl">🚀</span>
                <h3 className="text-6xl font-black text-on-surface tracking-tight">{(section as any).title}</h3>
              </div>
              <p className="text-4xl text-on-surface-variant leading-relaxed">{(section as any).content}</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-10 py-10 flex items-center justify-between border-t border-outline-variant/10">
        <div className="flex gap-2">
          {lessonData.sections.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSection ? 'w-12 bg-teal-600' : 'w-2 bg-outline-variant/20'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          {currentSection > 0 && (
            <button
              onClick={() => setCurrentSection(s => s - 1)}
              className="px-10 py-5 bg-surface-container-high text-on-surface rounded-2xl font-black text-xl hover:bg-surface-container-highest transition-all"
            >
              ← Back
            </button>
          )}
          {!isLast ? (
            <button
              onClick={() => setCurrentSection(s => s + 1)}
              className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-teal-100 flex items-center gap-3"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={onExit}
              className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-teal-100 flex items-center gap-3"
            >
              Finish! 🏁
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
