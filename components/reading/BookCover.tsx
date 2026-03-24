"use client";
import React from 'react';

interface BookCoverProps {
  titleJapanese: string;
  coverImage?: string;
  index?: number;
  className?: string;
  size?: 'normal' | 'large';
}

const BookCover: React.FC<BookCoverProps> = ({
  titleJapanese,
  coverImage,
  index = 0,
  className = "",
  size = 'normal'
}) => {
  const gradients = [
    'from-[#056662] to-[#2f7f7b]', // Teal
    'from-[#805000] to-[#a26600]', // Amber
    'from-[#486361] to-[#6b8f8d]', // Sage
    'from-[#1a3a5c] to-[#2d6a8f]', // Navy
    'from-[#6b2d6b] to-[#9b4d9b]', // Purple
  ];

  const gradient = gradients[index % gradients.length];

  const sizeClasses = size === 'large'
    ? 'w-48 h-64 text-2xl px-6'
    : 'w-full aspect-[2/3] text-sm px-4';

  return (
    <div className={`relative ${sizeClasses} rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.02] flex-shrink-0 ${className}`}>
      {/* Styled Placeholder (Bottom Layer) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-center p-4`}>
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />

        {/* Spine Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 shadow-inner z-10" />
        <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/10 z-10" />

        {/* Japanese Title */}
        <h3 className="font-extrabold text-white leading-tight relative z-10 break-words max-w-full">
          {titleJapanese}
        </h3>
      </div>

      {/* Real Cover Image (Top Layer, if exists) */}
      {coverImage ? (
        <img
          src={coverImage}
          alt={titleJapanese}
          className="absolute inset-0 w-full h-full object-cover z-20"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : null}

      {/* Glass Gloss Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-30" />
    </div>
  );
};

export default BookCover;
