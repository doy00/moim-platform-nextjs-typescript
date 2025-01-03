import React from 'react';

const ConeIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_87_27716)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.7356 7.3056L9.67508 3.8161C9.84301 3.19236 10.4086 2.75891 11.0545 2.75891H12.9446C13.5905 2.75891 14.1561 3.19236 14.324 3.8161L15.2635 7.3056H8.7356ZM8.25483 9.09131L6.90497 14.1051H17.0942L15.7443 9.09131H8.25483ZM5.48855 19.366L6.4242 15.8908H17.5749L18.5106 19.366H20.8389C21.4306 19.366 21.9103 19.8457 21.9103 20.4374C21.9103 21.0293 21.4306 21.5088 20.8389 21.5088H3.1603C2.56856 21.5088 2.08887 21.0293 2.08887 20.4374C2.08887 19.8457 2.56856 19.366 3.1603 19.366H5.48855Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_87_27716">
          <rect width="20" height="20" fill="currentColor" transform="translate(2 2)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ConeIcon;
