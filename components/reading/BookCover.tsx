"use client";
import React, { useState } from 'react';

interface BookCoverProps {
  id: string;
  title: string;
  coverImage?: string | null;
  className?: string;
  textClassName?: string;
}

const BookCover: React.FC<BookCoverProps> = ({ id, title, coverImage, className = "", textClassName = "" }) => {
  const [imgError, setImgError] = useState(false);

  // Try provided coverImage or fallback to ID-based convention
  const displayImage = coverImage || `/books/${id}.jpg`;

  const initials = title
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const colors = [
    'bg-primary-container text-on-primary-container',
    'bg-secondary-container text-on-secondary-container',
    'bg-tertiary-container text-on-tertiary-container',
    'bg-primary text-on-primary',
  ];

  // Deterministic color based on ID
  const colorIndex = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const colorClass = colors[colorIndex];

  if (displayImage && !imgError) {
    return (
      <div className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}>
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center rounded-lg shadow-lg font-extrabold ${colorClass} ${className} ${textClassName}`}>
      {initials}
    </div>
  );
};

export default BookCover;
