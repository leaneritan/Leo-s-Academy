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
              type="button" onClick={(e) => { e.preventDefault(); onPreview(lesson.id); }}
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
            const sections: any[] = [
              { type: 'hero', title: grammar.title, subtitle: grammar.breadcrumb || 'Grammar Lesson' }
            ];

            if (grammar.chart) {
              sections.push({ type: 'chart', title: 'Grammar Chart', chart: grammar.chart });
            }

            if (grammar.vocabulary) {
              sections.push({ type: 'vocabulary', title: 'Vocabulary', vocabulary: grammar.vocabulary });
            }

            if (grammar.explanation) {
               sections.push({ type: 'explanation', content: grammar.explanation });
            }

            if (grammar.examples) {
              sections.push({ type: 'examples', title: 'Example Sentences', examples: grammar.examples });
            }

            if (grammar.levelUp) {
               sections.push({ type: 'levelup', title: grammar.levelUp.title, content: grammar.levelUp.content });
            }

            return { title: grammar.title, sections };
          }
        }
      }
    }
    // Check AI data
    const aiLesson = aiLessonsData.find(l => l.id === lessonId);
    if (aiLesson) {
      return {
        title: aiLesson.title,
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
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col text-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-10 py-6 border-b border-white/10 bg-slate-950">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            Presentation Mode
          </div>
          <h1 className="text-xl font-black text-white">{lessonData.title}</h1>
        </div>
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-bold transition-all"
        >
          ×
          × 終了
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-20 overflow-y-auto">
        <div className="max-w-5xl w-full animate-in fade-in zoom-in-95 duration-500">
          {section.type === 'hero' && (
            <div className="text-center">
              <span className="text-9xl mb-12 block">{(section as any).emoji || '📚'}</span>
              <h2 className="text-7xl font-black text-white mb-6 tracking-tight">{(section as any).title}</h2>
              <p className="text-3xl text-slate-400 font-medium">{(section as any).subtitle}</p>
            </div>
          )}

          {section.type === 'explanation' && (
            <div className="bg-slate-900 rounded-[3rem] p-16 border-2 border-teal-500/20 shadow-2xl shadow-teal-500/5">
              <p className="text-5xl font-bold text-teal-400 leading-[1.4] text-center">
                {(section as any).content}
              </p>
            </div>
          )}

          {section.type === 'chart' && (
             <div className="space-y-10">
               <h3 className="text-4xl font-black text-center mb-10 text-white">Grammar Chart</h3>
               <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10">
                 <table className="w-full text-left">
                   <thead className="bg-slate-800">
                     <tr>
                       <th className="p-8 text-2xl font-black">Question</th>
                       <th className="p-8 text-2xl font-black">Answer</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {(section as any).chart.rows.map((row: any, i: number) => (
                       <tr key={i}>
                         <td className="p-8 text-3xl font-bold text-teal-400">{row.question}</td>
                         <td className="p-8 text-3xl font-medium text-slate-300">{row.answer}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {section.type === 'vocabulary' && (
            <div className="space-y-10">
              <h3 className="text-4xl font-black text-center mb-10 text-white">Vocabulary</h3>
              <div className="grid grid-cols-2 gap-6">
                {(section as any).vocabulary.map((v: any, i: number) => (
                  <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-white/10 flex items-center gap-6">
                    <span className="text-6xl">{v.emoji}</span>
                    <span className="text-4xl font-bold text-white">{v.word}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.type === 'examples' && (
            <div className="space-y-8">
               <h3 className="text-4xl font-black text-center mb-10 text-white">Example Sentences</h3>
               <div className="space-y-6">
                 {(section as any).examples.map((ex: any, i: number) => (
                   <div key={i} className="bg-slate-900 p-10 rounded-2xl border border-white/10">
                     <p className="text-4xl font-bold text-teal-400 mb-2">{ex.question}</p>
                     <p className="text-3xl font-medium text-slate-300">{ex.answer}</p>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {section.type === 'keypoint' && (
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-teal-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-teal-500/20">
                <span className="material-symbols-outlined text-5xl">star</span>
              </div>
              <h3 className="text-7xl font-black text-white mb-8">{(section as any).term}</h3>
              <p className="text-4xl text-slate-400 leading-relaxed max-w-3xl">{(section as any).detail}</p>
            </div>
          )}

          {section.type === 'levelup' && (
            <div className="space-y-12">
              <div className="flex items-center gap-6 justify-center">
                <span className="text-8xl">🚀</span>
                <h3 className="text-7xl font-black text-white tracking-tight">{(section as any).title}</h3>
              </div>
              <p className="text-4xl text-slate-300 leading-relaxed text-center max-w-4xl mx-auto">{(section as any).content}</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-10 py-10 flex items-center justify-between border-t border-white/10 bg-slate-950">
        <div className="flex gap-2">
          {lessonData.sections.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSection ? 'w-12 bg-teal-500' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          {currentSection > 0 && (
            <button
              onClick={() => setCurrentSection(s => s - 1)}
              className="px-10 py-5 bg-slate-800 text-white rounded-2xl font-black text-xl hover:bg-slate-700 transition-all border border-white/10"
            >
              ← 戻る
            </button>
          )}
          {!isLast ? (
            <button
              onClick={() => setCurrentSection(s => s + 1)}
              className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-teal-500/20 flex items-center gap-3"
            >
              次へ →
            </button>
          ) : (
            <button
              onClick={onExit}
              className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-teal-500/20 flex items-center gap-3"
            >
              終了！ 🏁
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
