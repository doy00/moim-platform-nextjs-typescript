import { useState } from 'react';
import arrowDownIcon from '../../../../public/images/mypage/arrow-down.svg';
import Image from 'next/image';

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('진행 중');

  const options = ['진행 중', '진행 예정', '종료'];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-32 border border-background400 rounded-xl bg-background100 px-3.5 py-3"
      >
        <span className="text-label-normal font-medium text-gray600">{selected}</span>
        <Image
          src={arrowDownIcon}
          alt="arrow-down"
          width={24}
          height={24}
          className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full left-0 w-full mt-1 border border-background400 rounded-xl bg-background100 overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="w-full px-3.5 py-2 text-left hover:bg-background300"
            >
              <span className="text-label-normal font-medium text-gray600">{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
