import React from 'react';

const ArrowLeftLine: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 5L9.66939 11.2191C9.2842 11.6684 9.2842 12.3316 9.66939 12.7809L15 19"
        stroke="#c1bdb8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowLeftLine;
