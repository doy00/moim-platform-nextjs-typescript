import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryTab, LocationTab, StatusTab } from './Tabs';

interface FilterTabsProps {
  onCategorySelect: (category: string | null) => void;
  onStatusSelect: (status: string | null) => void;
}

export default function FilterTabs({ onCategorySelect, onStatusSelect }: FilterTabsProps) {
  const [activeTab, setActiveTab] = useState('category');

  const filterTab = () => {
    return (
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full"
          >
            {activeTab === 'category' ? (
              <CategoryTab onCategorySelect={onCategorySelect} onStatusSelect={onStatusSelect} />
            ) : activeTab === 'location' ? (
              <LocationTab />
            ) : (
              <StatusTab onStatusSelect={onStatusSelect} onCategorySelect={onCategorySelect} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-evenly items-center border-b border-[#C1BDB8]">
        <button
          className={`w-1/3 py-3.5 px-4 font-semibold text-sm ${
            activeTab === 'category' ? 'border-b-2 border-[#4A4642] ' : 'text-[#C1BDB8] '
          }`}
          onClick={() => setActiveTab('category')}
        >
          카테고리
        </button>
        <button
          className={`w-1/3 py-3.5 px-4 font-semibold text-sm ${
            activeTab === 'location' ? 'border-b-2 border-[#4A4642] ' : 'text-[#C1BDB8] '
          }`}
          onClick={() => setActiveTab('location')}
        >
          지역
        </button>
        <button
          className={`w-1/3 py-3.5 px-4 font-semibold text-sm ${
            activeTab === 'status' ? 'border-b-2 border-[#4A4642] ' : 'text-[#C1BDB8] '
          }`}
          onClick={() => setActiveTab('status')}
        >
          상태
        </button>
      </div>
      <div>{filterTab()}</div>
    </div>
  );
}
