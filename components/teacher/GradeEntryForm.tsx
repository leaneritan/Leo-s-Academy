"use client";
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const GradeEntryForm = () => {
  return (
    <Card className="p-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="material-symbols-outlined text-primary">edit_note</span>
        <h2 className="text-xl font-bold text-on-surface">Grade Entry Form</h2>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Subject</label>
          <select className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium">
            <option>Mathematics</option>
            <option>English Literature</option>
            <option>Biological Sciences</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Test Name</label>
            <input
              type="text"
              placeholder="Unit 1 Test"
              className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">Score (%)</label>
            <input
              type="number"
              placeholder="95"
              className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
            />
          </div>
        </div>

        <Button className="w-full">Record Grade</Button>
      </form>
    </Card>
  );
};

export default GradeEntryForm;
