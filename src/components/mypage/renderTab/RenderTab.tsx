'use client';

import { useState } from 'react';
import Meetings from '@/components/mypage/Meetings';
import CreatedMeetings from '@/components/mypage/CreatedMeetings';
import FilterBar from '@/components/mypage/filterBar/FilterBar';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewTabs from '@/components/mypage/myReview/ReviewTabs';

export default function RenderTab() {
  const [activeTab, setActiveTab] = useState('meetings');
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // const handleCategorySelect = (category: string | null) => {
  //   setSelectedCategory(category);
  // };

  const handleStatusSelect = (status: string | null) => {
    setSelectedStatus(status);
    setActiveTab(activeTab);
  };

  // const handleTabChange = (tab: string) => {
  //   setActiveTab(tab);
  //   setSelectedStatus(null);
  // };

  const renderTab = () => {
    if (activeTab === 'reviews') {
      return <ReviewTabs />;
    }

    return (
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full"
          >
            {activeTab === 'meetings' ? (
              <Meetings filter={selectedStatus || '전체'} />
            ) : activeTab === 'created-meetings' ? (
              <CreatedMeetings filter={selectedStatus || '전체'} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 px-3 mb-[68px] lg:mb-0">
      <div className="flex px-4 justify-evenly items-center">
        <button
          className={`w-1/3 py-3.5 px-4 font-semibold text-sm ${
            activeTab === 'meetings' ? 'border-b-2 border-[#4A4642] ' : 'text-[#C1BDB8] '
          }`}
          onClick={() => setActiveTab('meetings')}
        >
          내 모임
        </button>
        <button
          className={`w-1/3 py-3.5 px-4 font-semibold text-sm ${
            activeTab === 'reviews' ? 'border-b-2 border-[#4A4642] ' : 'text-[#C1BDB8]'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          내 리뷰
        </button>
        <button
          className={`w-1/3 py-3.5 px-4 font-semibold text-sm ${
            activeTab === 'created-meetings' ? 'border-b-2 border-[#4A4642] ' : 'text-[#C1BDB8]'
          }`}
          onClick={() => setActiveTab('created-meetings')}
        >
          만든 모임
        </button>
      </div>
      {(activeTab === 'meetings' || activeTab === 'created-meetings') && (
        <FilterBar onStatusSelect={handleStatusSelect} selectedStatus={selectedStatus} />
      )}
      {renderTab()}
    </div>
  );
}
