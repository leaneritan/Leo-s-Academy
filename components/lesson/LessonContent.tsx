"use client";
import React from 'react';
import Button from '../ui/Button';

interface Section {
  type: string;
  title: string;
  body?: string;
  bullets?: { term: string; detail: string }[];
  items?: { sentence: string; emoji: string }[];
  label?: string;
}

interface Props {
  content: {
    heroEmoji: string;
    heroTitle: string;
    heroSubtitle: string;
    sections: Section[];
    teacherNote: string;
  };
}

const LessonContent: React.FC<Props> = ({ content }) => {
  return (
    <div className="space-y-12">
      <div className="bg-primary-container p-16 rounded-3xl text-center shadow-inner">
        <span className="text-7xl block mb-6">{content.heroEmoji}</span>
        <h2 className="text-4xl font-extrabold text-white mb-3">{content.heroTitle}</h2>
        <p className="text-on-primary-container/80 text-lg max-w-xl mx-auto">{content.heroSubtitle}</p>
      </div>

      <div className="space-y-16 py-8">
        {content.sections.map((section, idx) => {
          if (section.type === 'explanation') {
            return (
              <section key={idx} className="border-l-4 border-primary pl-8 py-2">
                <h3 className="text-2xl font-bold text-on-surface mb-6">{section.title}</h3>
                <p className="text-on-surface-variant mb-8 text-lg leading-relaxed">{section.body}</p>
                <ul className="space-y-4">
                  {section.bullets?.map((bullet, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-on-surface-variant leading-relaxed">
                        <strong className="text-on-surface">{bullet.term}:</strong> {bullet.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }
          if (section.type === 'examples') {
            return (
              <section key={idx}>
                <h3 className="text-2xl font-bold text-on-surface mb-8">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items?.map((item, i) => (
                    <div key={i} className="bg-surface-container-low p-8 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-xl font-semibold text-on-surface">{item.sentence}</p>
                      <span className="text-3xl">{item.emoji}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          if (section.type === 'reminder') {
            return (
              <section key={idx} className="bg-surface-container-low border-l-8 border-surface-container-highest p-10 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-2">{section.label}</p>
                  <h3 className="text-2xl font-bold text-on-surface mb-4">{section.title}</h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed">{section.body}</p>
                </div>
                <span className="material-symbols-outlined text-9xl absolute -right-4 -bottom-4 opacity-5 pointer-events-none">lightbulb</span>
              </section>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default LessonContent;
