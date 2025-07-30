import React from 'react';

interface StyledContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StyledContainer: React.FC<StyledContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg w-full p-8 md:p-12 ${className}`}>
      {children}
    </div>
  );
};

export default StyledContainer;