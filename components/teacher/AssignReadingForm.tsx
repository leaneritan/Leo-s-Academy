"use client";
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const AssignReadingForm = () => {
  const [language, setLanguage] = useState('English');

  return (
    <Card className="p-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="material-symbols-outlined text-primary">menu_book</span>
        <h2 className="text-xl font-bold text-on-surface">Assign Reading Task</h2>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Book Title</label>
            <input
              type="text"
              placeholder="The Chronicles of Narnia"
              className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Japanese Title (Optional)</label>
            <input
              type="text"
              placeholder="ナルニア国物語"
              className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
            >
              <option value="English">English</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Deadline</label>
            <input
              type="date"
              className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Cover Image</label>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="border border-outline-variant/30 px-6 py-3 flex gap-2">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              Upload Cover Photo
            </Button>
            <p className="text-[10px] text-on-surface-variant font-medium">JPG or PNG (max. 2MB)</p>
          </div>
        </div>

        <div className="bg-primary-container/10 p-4 rounded-lg flex gap-3">
          <span className="material-symbols-outlined text-primary text-[20px]">info</span>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Assigning a task will add the book to Leo&apos;s library and notify him in his dashboard.
          </p>
        </div>

        <Button variant="secondary" className="w-full">Assign Task</Button>
      </form>
    </Card>
  );
};

export default AssignReadingForm;
