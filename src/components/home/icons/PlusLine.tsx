import React from 'react';

const PlusLineIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_282_8792)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 12C5 11.4477 5.44771 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44771 13 5 12.5523 5 12Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 5.00003C12.5523 5.00003 13 5.44775 13 6.00003L13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18L11 6.00003C11 5.44775 11.4477 5.00003 12 5.00003Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_282_8792">
          <rect width="14" height="14" transform="translate(5 5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlusLineIcon;
