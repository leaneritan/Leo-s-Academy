import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = 'rounded-xl transition-all duration-200 flex items-center justify-center font-medium';

  const variants = {
    primary: 'bg-primary text-on-primary hover:-translate-y-0.5 shadow-lg shadow-primary/20 bg-gradient-to-br from-primary to-primary-container py-3 px-6',
    secondary: 'bg-secondary text-on-secondary py-3 px-6 hover:opacity-90',
    ghost: 'text-primary hover:bg-primary-fixed-dim/20 py-2 px-4',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
