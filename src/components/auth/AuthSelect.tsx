'use client';

import { cn } from '@/lib/utils';
import { KeyboardEvent, useRef, useState } from 'react';
import AuthDropDown from './AuthDropDown';
import AuthDropUp from './AuthDropUp';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder: string;
  value: string | null;
  className?: string;
  onChange: (value: string) => void;
}

function AuthSelect({ options, placeholder, value, className, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputDivRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
    setHighlightedIndex(null);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setHighlightedIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev === null || prev === options.length - 1 ? 0 : prev + 1));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev === null || prev === 0 ? options.length - 1 : prev - 1));
    }

    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      if (highlightedIndex !== null) {
        handleSelect(options[highlightedIndex].value);
      }
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handleOnFocus = () => {
    if (inputDivRef.current) {
      inputDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setIsOpen(true);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative flex items-center w-full">
      <div
        tabIndex={0}
        ref={inputDivRef}
        onFocus={handleOnFocus}
        role="combobox"
        aria-controls="options-listbox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          'w-full flex text-sm items-center justify-between h-10 px-3 rounded-xl border-input bg-background400 cursor-pointer font-medium text-gray300 outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray200',
          className,
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className={cn('text-body-2-normal', value ? 'text-gray600' : 'text-gray300')}>
          {value ? selectedOption?.label : placeholder}
        </span>
        {isOpen ? <AuthDropUp /> : <AuthDropDown />}
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10 w-dvw h-dvh" onClick={handleToggle} />
          <ul
            id="options-listbox"
            className="absolute z-20 w-full mt-1 top-14 bg-background100 border border-gray200 rounded-xl shadow-lg"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                className={cn(
                  'px-3 py-2 cursor-pointer hover:bg-background300 rounded-xl m-1 text-body-2-normal font-medium text-gray400 hover:text-gray600',
                  highlightedIndex === index && 'bg-background300 text-gray600',
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default AuthSelect;
