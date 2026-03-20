import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'xp' | 'streak' | 'level' | 'tag';
  icon?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'tag', icon, className = '' }) => {
  const variants = {
    xp: 'bg-surface-container-high text-on-surface rounded-full py-1 px-3 flex items-center gap-1 text-sm font-bold',
    streak: 'bg-tertiary-fixed text-on-tertiary-fixed rounded-full py-1 px-3 flex items-center gap-1 text-sm font-bold',
    level: 'bg-tertiary text-on-tertiary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider',
    tag: 'text-[0.75rem] font-bold tracking-widest text-primary uppercase',
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
      {children}
    </div>
  );
};

export default Badge;
