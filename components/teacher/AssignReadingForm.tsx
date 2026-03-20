"use client";
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const AssignReadingForm = () => {
  return (
    <Card className="p-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="material-symbols-outlined text-primary">menu_book</span>
        <h2 className="text-xl font-bold text-on-surface">Assign Reading Task</h2>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Book Title</label>
          <input
            type="text"
            placeholder="The Chronicles of Narnia"
            className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Deadline</label>
          <input
            type="date"
            className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
          />
        </div>

        <div className="bg-primary-container/10 p-4 rounded-lg flex gap-3">
          <span className="material-symbols-outlined text-primary text-[20px]">info</span>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Assigning a task will add the book to Leo's library and notify him in his dashboard.
          </p>
        </div>

        <Button variant="secondary" className="w-full">Assign Task</Button>
      </form>
    </Card>
  );
};

export default AssignReadingForm;
