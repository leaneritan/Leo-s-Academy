import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div className={`bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_-4px_rgba(24,28,29,0.06)] ${hover ? 'hover:-translate-y-1 transition-transform duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
