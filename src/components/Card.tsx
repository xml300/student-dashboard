import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div className={`bg-card-background rounded-lg shadow-md p-4 ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
