import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-stone-600">진행도</span>
        <span className="text-sm font-semibold text-stone-600">{`${current} / ${total}`}</span>
      </div>
      <div className="w-full bg-amber-200 rounded-full h-2.5">
        <div
          className="bg-orange-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;