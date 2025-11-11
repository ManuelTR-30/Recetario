
import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const getBarColor = () => {
    if (percentage < 33) return 'bg-red-500';
    if (percentage < 67) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Progreso</span>
        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${getBarColor()}`} 
          style={{ width: `${percentage}%` }}>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
