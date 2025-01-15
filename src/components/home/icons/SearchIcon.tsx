import React from 'react';

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_57_30856)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.85714 10.5714C4.85714 7.41551 7.41551 4.85714 10.5714 4.85714C13.7273 4.85714 16.2857 7.41551 16.2857 10.5714C16.2857 13.7273 13.7273 16.2857 10.5714 16.2857C7.41551 16.2857 4.85714 13.7273 4.85714 10.5714ZM10.5714 2C5.83756 2 2 5.83756 2 10.5714C2 15.3053 5.83756 19.1429 10.5714 19.1429C12.4225 19.1429 14.1366 18.556 15.5377 17.5583L19.5613 21.5819C20.1191 22.1397 21.0237 22.1397 21.5816 21.5819C22.1394 21.024 22.1394 20.1194 21.5816 19.5616L17.5581 15.5381C18.556 14.1369 19.1429 12.4227 19.1429 10.5714C19.1429 5.83756 15.3053 2 10.5714 2Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_57_30856">
          <rect width="20" height="20" transform="translate(2 2)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SearchIcon;
