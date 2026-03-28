"use client";
import React from 'react';

interface Book {
  id: string;
  titleJapanese: string;
  status: string;
  coverColor?: string;
}

interface LibraryShelfProps {
  books: Book[];
  selectedBookId?: string;
  onBookClick: (id: string) => void;
  onAddClick: () => void;
}

const LibraryShelf: React.FC<LibraryShelfProps> = ({
  books,
  selectedBookId,
  onBookClick,
  onAddClick
}) => {
  return (
    <div className="relative pt-10 pb-4">
      <div className="flex items-end gap-1 px-4 overflow-x-auto no-scrollbar min-h-[160px]">
        {books.map((book) => {
          const isSelected = selectedBookId === book.id;
          const isReading = book.status === 'reading';
          const isFinished = book.status === 'finished';

          return (
            <button
              key={book.id}
              onClick={() => onBookClick(book.id)}
              className="relative group transition-all duration-300 hover:-translate-y-2 flex-shrink-0"
              style={{ width: '40px', height: '140px' }}
            >
              {/* Spine */}
              <div
                className="w-full h-full rounded-sm shadow-md flex flex-col items-center justify-center p-2 border-l border-white/20 border-r border-black/20"
                style={{ backgroundColor: book.coverColor || '#056662' }}
              >
                <span className="text-[10px] font-bold text-white [writing-mode:vertical-rl] text-center leading-tight">
                  {book.titleJapanese}
                </span>
              </div>

              {/* Selection Outline */}
              {isSelected && (
                <div className="absolute inset-0 border-2 border-[#056662] -m-1 rounded-md z-10" />
              )}

              {/* Badges */}
              {isReading && (
                <div className="absolute top-1 right-1 bg-[#056662] text-white text-[8px] p-0.5 rounded-full shadow-sm z-20">
                  <span className="material-symbols-outlined !text-[12px]">play_arrow</span>
                </div>
              )}
              {isFinished && (
                <div className="absolute top-1 right-1 bg-green-500 text-white text-[8px] p-0.5 rounded-full shadow-sm z-20">
                  <span className="material-symbols-outlined !text-[12px]">check</span>
                </div>
              )}
            </button>
          );
        })}

        {/* Empty Slot */}
        <button
          onClick={onAddClick}
          className="w-10 h-[140px] border-2 border-dashed border-outline-variant/30 rounded-sm flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      {/* Shelf Floor */}
      <div className="h-[8px] w-full bg-[#c8a87a] rounded-full shadow-sm mt-0.5" />
    </div>
  );
};

export default LibraryShelf;
