import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-surface-light dark:bg-surface-dark 
        rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 
        p-5 transition-all duration-200 
        ${onClick ? 'active:scale-[0.98] cursor-pointer hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};