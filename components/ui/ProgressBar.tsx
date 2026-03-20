import React from 'react';

interface Props {
  value: number; // 0–100
  color?: 'primary' | 'tertiary';
  height?: string;
}

const ProgressBar: React.FC<Props> = ({ value, color = 'primary', height = 'h-2' }) => {
  const colorClass = color === 'primary' ? 'bg-primary' : 'bg-tertiary';
  return (
    <div className={`w-full bg-surface-container-high rounded-full ${height} overflow-hidden`}>
      <div
        className={`h-full ${colorClass} transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};

export default ProgressBar;
