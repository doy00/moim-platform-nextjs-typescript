import React from 'react';

const BlankIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" strokeWidth="1.5"
        strokeDasharray="10 10" />
    </svg>
  );
};

export default BlankIcon;
