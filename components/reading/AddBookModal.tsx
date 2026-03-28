"use client";
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (book: any) => Promise<void>;
}

const COLORS = [
  '#056662', // Teal
  '#805000', // Amber
  '#486361', // Sage
  '#1a3a5c', // Navy
  '#6b2d6b', // Purple
  '#c84c4c', // Reddish
];

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [coverColor, setCoverColor] = useState(COLORS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onAdd({
      type: 'add',
      titleJapanese: title,
      authorJapanese: author,
      genre,
      coverColor,
      progress: 0
    });
    setIsSubmitting(false);
    setTitle('');
    setAuthor('');
    setGenre('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-md p-8 bg-white relative overflow-hidden" hover={false}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h2 className="text-2xl font-black text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">library_add</span>
          本を追加する
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant px-1">
              タイトル
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="本の名まえ"
              className="w-full px-4 py-3 rounded-xl bg-surface-container border-0 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant px-1">
              著者
            </label>
            <input
              required
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="作者の名まえ"
              className="w-full px-4 py-3 rounded-xl bg-surface-container border-0 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant px-1">
              ジャンル (任意)
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="例: 冒険, 科学, ファンタジー"
              className="w-full px-4 py-3 rounded-xl bg-surface-container border-0 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant px-1">
              表紙の色
            </label>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setCoverColor(color)}
                  className={`w-10 h-10 rounded-full transition-all duration-200 ${coverColor === color ? 'ring-4 ring-primary/20 scale-110 shadow-lg' : 'hover:scale-105'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-4 text-lg font-bold mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? '追加中...' : '追加する'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddBookModal;
