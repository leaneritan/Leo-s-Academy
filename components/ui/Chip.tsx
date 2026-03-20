import React from 'react';

interface Props {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const Chip: React.FC<Props> = ({ label, active = false, onClick, className = '' }) => {
  const styles = active
    ? 'bg-primary-fixed-dim text-on-primary-fixed'
    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${styles} ${className}`}
    >
      {label}
    </button>
  );
};

export default Chip;
