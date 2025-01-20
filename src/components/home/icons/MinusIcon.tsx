import React from 'react';

const MinusIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 12C5 11.4477 5.44771 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44771 13 5 12.5523 5 12Z"
      />
    </svg>
  );
};

export default MinusIcon;
