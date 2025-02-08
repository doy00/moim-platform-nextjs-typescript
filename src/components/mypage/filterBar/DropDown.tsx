'use client';

import { useState, useEffect } from 'react';
import arrowDownIcon from '@public/images/mypage/arrow-down.svg';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const menuVariants: Variants = {
  open: {
    clipPath: 'inset(0% 0% 0% 0% round 12px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: 'inset(10% 50% 90% 50% round 12px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
};

interface DropDownProps {
  onFilterChange: (value: string) => void;
  value: string;
}

export default function DropDown({ onFilterChange, value }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['전체', '모집중', '모집완료', '종료'];

  useEffect(() => {
    const closeDropdown = () => setIsOpen(false);
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setIsOpen(false);
    onFilterChange(option);
  };

  return (
    <div onClick={handleClick} className="relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-between w-32 border border-background400 rounded-xl bg-background100 px-3.5 py-3"
      >
        <span className="text-label-normal font-medium text-gray600">{value}</span>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2 }}
        >
          <Image src={arrowDownIcon} alt="arrow-down" width={24} height={24} />
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        className="absolute z-10 top-full left-0 w-full mt-1 border border-background400 rounded-xl bg-background100 overflow-hidden"
      >
        {options.map((option) => (
          <motion.button
            variants={itemVariants}
            key={option}
            onClick={() => handleOptionSelect(option)}
            className="w-full px-3.5 py-2 text-left hover:bg-background300"
          >
            <span className="text-label-normal font-medium text-gray600">{option}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
