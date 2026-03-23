"use client";
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const AssignReadingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    titleJapanese: '',
    author: '',
    coverImage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'assign' }),
      });
      if (response.ok) {
        setFormData({ title: '', titleJapanese: '', author: '', coverImage: '' });
        alert("課題を割り当てました！");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="material-symbols-outlined text-primary">menu_book</span>
        <h2 className="text-xl font-bold text-on-surface">読書の課題を出す</h2>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div>
          <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">本のタイトル (English)</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Wonder"
            required
            className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">日本語タイトル</label>
          <input
            type="text"
            value={formData.titleJapanese}
            onChange={(e) => setFormData({ ...formData, titleJapanese: e.target.value })}
            placeholder="ワンダー"
            required
            className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">著者名</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="R.J. Palacio"
            required
            className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant block mb-3">表紙写真 (URL または /books/filename.jpg)</label>
          <input
            type="text"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            placeholder="/books/wonder.jpg"
            className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary p-4 rounded-t-lg focus:ring-0 transition-all text-sm font-medium"
          />
        </div>

        <div className="bg-primary-container/10 p-4 rounded-lg flex gap-3">
          <span className="material-symbols-outlined text-primary text-[20px]">info</span>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            課題を出すと、レオのライブラリに本が追加されます。
          </p>
        </div>

        <Button variant="secondary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '割り当てる'}
        </Button>
      </form>
    </Card>
  );
};

export default AssignReadingForm;
